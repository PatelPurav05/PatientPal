import { NextResponse } from "next/server"
import { generateSummary } from "@/lib/ai-utils"

export async function POST(request: Request) {
  const { content } = await request.json()

  if (!content) {
    return NextResponse.json({ error: "No content provided" }, { status: 400 })
  }

  try {
    const summary = await generateSummary(content)
    return NextResponse.json({ summary })
  } catch (error) {
    console.error("Error generating summary:", error)
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}

