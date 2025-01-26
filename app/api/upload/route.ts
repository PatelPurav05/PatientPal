import { type NextRequest, NextResponse } from "next/server"
import { processDocument } from "@/lib/ai-utils"
import { saveDocument } from "@/lib/documentStorage"
import { authMiddleware } from "@/lib/auth-middleware"

export const runtime = "edge"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(req: NextRequest) {
  const authResult = await authMiddleware(req)
  if ("error" in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }

  const { userId } = authResult

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid file type. Please upload a PDF." }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 })
    }

    const fileBuffer = await file.arrayBuffer()
    console.log("File received:", file.name, file.type, file.size)
    console.log("File content length:", fileBuffer.byteLength)

    // Save the document to Firebase Storage
    await saveDocument(userId, file.name, fileBuffer)

    // Process the document
    await processDocument(Buffer.from(fileBuffer), file.name)

    // Return success response with file metadata
    return NextResponse.json({
      message: "File processed and stored successfully",
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadDate: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error processing file:", error)
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
  }
}

