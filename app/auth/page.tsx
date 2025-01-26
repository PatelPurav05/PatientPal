import { AuthForm } from "@/components/auth/auth-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">PatientPal Authentication</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or create a new one to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>
      <p className="mt-4 text-sm text-gray-600">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-[#0E6E52] hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-[#0E6E52] hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}

