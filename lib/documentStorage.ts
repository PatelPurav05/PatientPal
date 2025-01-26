import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage, auth, db } from "./firebase"
import { collection, addDoc, query, where, getDocs, type DocumentData } from "firebase/firestore"

export async function saveDocument(fileName: string, content: ArrayBuffer): Promise<void> {
  const user = auth.currentUser
  if (!user) throw new Error("User not authenticated")

  // Upload file to Firebase Storage
  const storageRef = ref(storage, `documents/${user.uid}/${fileName}`)
  await uploadBytes(storageRef, content)

  // Save metadata to Firestore
  await addDoc(collection(db, "documents"), {
    userId: user.uid,
    fileName: fileName,
    uploadDate: new Date().toISOString(),
  })

  console.log(`Document saved: ${fileName}`)
}

export async function getDocument(fileName: string): Promise<ArrayBuffer | null> {
  const user = auth.currentUser
  if (!user) throw new Error("User not authenticated")

  const storageRef = ref(storage, `documents/${user.uid}/${fileName}`)
  try {
    const url = await getDownloadURL(storageRef)
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    return arrayBuffer
  } catch (error) {
    console.error(`Error retrieving document: ${fileName}`, error)
    return null
  }
}

export async function getAllDocuments(): Promise<DocumentData[]> {
  const user = auth.currentUser
  if (!user) throw new Error("User not authenticated")

  const q = query(collection(db, "documents"), where("userId", "==", user.uid))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

