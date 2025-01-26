import { OpenAI } from "langchain/llms/openai"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { VectorDBQAChain } from "langchain/chains"
import { Document } from "langchain/document"

// Initialize OpenAI
const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY })
const embeddings = new OpenAIEmbeddings()

// Initialize in-memory vector store
let vectorStore: MemoryVectorStore | null = null

export async function processDocument(fileBuffer: Buffer) {
  const text = fileBuffer.toString("utf-8")
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })
  const docs = await splitter.createDocuments([text])

  console.log("Processing document, buffer length:", fileBuffer.length)
  console.log("Created docs:", docs.length)

  if (!vectorStore) {
    vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings)
  } else {
    await vectorStore.addDocuments(docs)
  }
}

export async function generateSummary(content: string) {
  const response = await model.call(`Please provide a concise summary of the following medical report: ${content}`)
  return response
}

export async function answerQuestion(question: string) {
  if (!vectorStore) {
    throw new Error("No documents have been processed yet")
  }

  const chain = VectorDBQAChain.fromLLM(model, vectorStore)
  const response = await chain.call({ query: question })
  return response.text
}

export async function generateTimeline(content: string) {
  const response = await model.call(
    `Extract a timeline of health events from the following medical report. Return the result as a JSON array of objects, each with 'date' and 'event' properties: ${content}`,
  )
  return JSON.parse(response)
}

