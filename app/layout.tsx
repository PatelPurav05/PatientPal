import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ToastProvider } from "@/components/ui/toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "PatientPal - Your Health Records Assistant",
  description: "Unlock the secret to your health records with PatientPal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}

