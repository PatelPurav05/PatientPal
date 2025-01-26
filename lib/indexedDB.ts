const DB_NAME = "PatientPalDB"
const DB_VERSION = 1
const STORE_NAME = "files"

let dbInstance: IDBDatabase | null = null

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance)
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      dbInstance = request.result
      resolve(dbInstance)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" })
      }
    }
  })
}

export async function saveFile(file: File): Promise<string> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const id = Date.now().toString()
    const request = store.put({
      id,
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      content: file,
      uploadedAt: new Date().toISOString(),
    })

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(id)
  })
}

export async function getFile(id: string): Promise<File | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(id)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      if (request.result) {
        const { content, name, type, lastModified } = request.result
        resolve(new File([content], name, { type, lastModified }))
      } else {
        resolve(null)
      }
    }
  })
}

export async function getAllFiles(): Promise<{ id: string; name: string; size: number; uploadedAt: string }[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const files = request.result.map(({ id, name, size, uploadedAt }) => ({
        id,
        name,
        size,
        uploadedAt,
      }))
      resolve(files)
    }
  })
}

