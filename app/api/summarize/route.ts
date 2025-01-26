import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI API key is not set" }, { status: 500 })
  }

  try {
    // In a real application, you would fetch the actual report content here
    const reportContent = "This is a sample blood report content."

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes medical reports.",
        },
        {
          role: "user",
          content: `Please summarize the following blood report: ${reportContent}`,
        },
      ],
    })

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error("No summary generated")
    }

    const summary = completion.choices[0].message.content

    if (!summary) {
      throw new Error("Summary is empty")
    }

    return NextResponse.json({ summary })
  } catch (error) {
    console.error("Error generating summary:", error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
    }
  }
}

