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
    // In a real application, you would fetch the actual report data here
    const reportData = "Multiple blood test results over the past year show varying cholesterol levels."

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts timeline data from medical reports.",
        },
        {
          role: "user",
          content: `Please extract timeline data for cholesterol levels from the following report data: ${reportData}`,
        },
      ],
    })

    const timelineData = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json({ data: timelineData })
  } catch (error) {
    console.error("Error generating timeline data:", error)
    return NextResponse.json({ error: "Failed to generate timeline data" }, { status: 500 })
  }
}

