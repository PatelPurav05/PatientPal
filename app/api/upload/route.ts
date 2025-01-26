import { type NextRequest, NextResponse } from "next/server"
import { processDocument } from "@/lib/ai-utils"

export const config = {
  runtime: "edge",
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(req: NextRequest) {
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

  try {
    const fileBuffer = await file.arrayBuffer()
    console.log("File received:", file.name, file.type, file.size)
    console.log("File content length:", fileBuffer.byteLength)

    await processDocument(Buffer.from(fileBuffer))
    return NextResponse.json({ message: "File processed successfully" })
  } catch (error) {
    console.error("Error processing file:", error)
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
  }
}

