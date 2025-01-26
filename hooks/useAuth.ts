"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  getAuth,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const storeAuthToken = useCallback(async () => {
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      localStorage.setItem("authToken", token)
    }
  }, [])

  const addUserToFirestore = async (user: User, name: string) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error adding user to Firestore:", error)
      throw error
    }
  }

  const updateLastLogin = async (userId: string) => {
    try {
      await setDoc(
        doc(db, "users", userId),
        {
          lastLogin: new Date().toISOString(),
        },
        { merge: true },
      )
    } catch (error) {
      console.error("Error updating last login:", error)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setError(null)
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await addUserToFirestore(userCredential.user, name)
      await storeAuthToken()
      router.push("/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during sign up")
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      await updateLastLogin(userCredential.user.uid)
      await storeAuthToken()
      router.push("/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during sign in")
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setError(null)
    try {
      await firebaseSignOut(auth)
      localStorage.removeItem("authToken")
      router.push("/")
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred during sign out")
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await storeAuthToken()
      } else {
        localStorage.removeItem("authToken")
      }
    })

    return () => unsubscribe()
  }, [storeAuthToken])

  return { signUp, signIn, signOut, error, loading }
}

