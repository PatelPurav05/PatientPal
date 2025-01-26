import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0E6E52] to-[#094537] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-6">About PatientPal</h1>
      <p className="text-xl text-white/80 mb-8 max-w-2xl text-center">
        PatientPal is your trusted health records assistant. We help you understand and manage your medical information
        with ease and confidence.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

