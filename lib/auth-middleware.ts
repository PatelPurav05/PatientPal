import { type NextRequest, NextResponse } from "next/server"
import { adminAuth } from "./firebase-admin"

export async function authMiddleware(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1]

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 })
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    const userId = decodedToken.uid
    return { userId }
  } catch (error) {
    console.error("Error verifying auth token:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}

