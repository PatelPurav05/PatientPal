import { NextResponse } from "next/server"
import { answerQuestion } from "@/lib/ai-utils"

export async function POST(request: Request) {
  const { question } = await request.json()

  if (!question) {
    return NextResponse.json({ error: "No question provided" }, { status: 400 })
  }

  try {
    const answer = await answerQuestion(question)
    return NextResponse.json({ answer })
  } catch (error) {
    console.error("Error processing question:", error)
    return NextResponse.json({ error: "Failed to process question" }, { status: 500 })
  }
}

