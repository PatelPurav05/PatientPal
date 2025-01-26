import { NextResponse } from "next/server"
import { generateTimeline } from "@/lib/ai-utils"

export async function POST(request: Request) {
  const { content } = await request.json()

  if (!content) {
    return NextResponse.json({ error: "No content provided" }, { status: 400 })
  }

  try {
    const timeline = await generateTimeline(content)
    return NextResponse.json({ data: timeline })
  } catch (error) {
    console.error("Error generating timeline:", error)
    return NextResponse.json({ error: "Failed to generate timeline" }, { status: 500 })
  }
}

