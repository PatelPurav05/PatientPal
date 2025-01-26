"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { FileUpload } from "@/components/dashboard/file-upload"
import { Reports } from "@/components/dashboard/reports"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useToast } from "@/components/ui/use-toast"

function ErrorFallback({ error, resetErrorBoundary }) {
  const { toast } = useToast()

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  )
}

export default function DashboardPage() {
  const { signOut } = useAuth()
  const [refreshReports, setRefreshReports] = useState(0)
  const { toast } = useToast()

  const handleUploadSuccess = () => {
    setRefreshReports((prev) => prev + 1)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="flex h-16 items-center px-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button onClick={signOut} variant="ghost" className="ml-auto">
              Sign Out
            </Button>
          </div>
        </div>

        <main className="max-w-6xl mx-auto py-8 px-4 space-y-8">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // Reset the state of your app here
            }}
            onError={(error) => {
              console.error("Error in dashboard:", error)
              toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
              })
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Upload Report</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload onUploadSuccess={handleUploadSuccess} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Reports key={refreshReports} />
              </CardContent>
            </Card>
          </ErrorBoundary>
        </main>
      </div>
    </ProtectedRoute>
  )
}

