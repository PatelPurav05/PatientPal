import { NextResponse } from "next/server"
import { OpenAI } from "langchain/llms/openai"
import { ConversationalRetrievalQAChain } from "langchain/chains"
import { HNSWLib } from "langchain/vectorstores/hnswlib"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OpenAI API key is not set")
}

// Initialize OpenAI model
const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY })

// Initialize vector store (this should be done once and reused)
let vectorStore: HNSWLib

async function initializeVectorStore() {
  // In a real application, you would load the actual report content here
  const reportContent = "This is a sample blood report content."

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 })
  const docs = await textSplitter.createDocuments([reportContent])

  vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings())
}

initializeVectorStore()

export async function POST(request: Request) {
  const { question } = await request.json()

  if (!question) {
    return NextResponse.json({ error: "No question provided" }, { status: 400 })
  }

  try {
    const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever())

    const response = await chain.call({ question, chat_history: [] })

    return NextResponse.json({ answer: response.text })
  } catch (error) {
    console.error("Error processing question:", error)
    return NextResponse.json({ error: "Failed to process question" }, { status: 500 })
  }
}

