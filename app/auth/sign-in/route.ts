import { redirect } from "next/navigation"

export async function GET(request: Request) {
  // In a real app, this would handle authentication
  // For now, we'll just redirect to the dashboard
  redirect("/dashboard")
}

