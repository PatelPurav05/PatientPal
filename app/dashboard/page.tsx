"use client"

import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/hooks/useAuth"

export default function DashboardPage() {
  const { signOut } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-xl mb-4">Welcome to your PatientPal dashboard!</p>
            <p>This is a placeholder for future functionality.</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

