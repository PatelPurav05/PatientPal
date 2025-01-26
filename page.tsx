import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { NavMenu } from "@/components/nav-menu"
import { AnimatedImage } from "@/components/animated-image"
import { PublicationLogos } from "@/components/publication-logos"
import { FeatureList } from "@/components/feature-list"
import { IMAGES } from "@/lib/constants"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0E6E52] to-[#094537]">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 md:p-6 animate-fade-in">
        <Link href="/" className="text-white font-semibold text-xl hover:opacity-80 transition-opacity">
          PatientPal
        </Link>
        <NavMenu />
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20 md:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Unlock The Secret To Your Health Records
            </h1>
            <p className="text-white/80 text-lg">
              Upload your health records to learn more about them, ask questions, and trace your records over time
            </p>
            <div className="flex gap-4">
              <Button
                asChild
                size="lg"
                className="bg-pink-400 hover:bg-pink-500 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/auth/sign-in">
                  SIGN IN
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] animate-fade-in-left">
            <AnimatedImage
              src={IMAGES.hero.src}
              alt="Two medical professionals reviewing a patient's health records with medical icons"
              width={IMAGES.hero.width}
              height={IMAGES.hero.height}
              className="object-contain"
            />
          </div>
        </div>

        <PublicationLogos />
      </section>

      {/* How To Get Started Section */}
      <section className="px-4 py-12 md:py-20 md:px-6 max-w-6xl mx-auto">
        <Card className="bg-white/5 border-none">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] order-2 md:order-1">
                <AnimatedImage
                  src={IMAGES.started.src}
                  alt="Medical professional working on laptop with medical symbols and laboratory equipment"
                  width={IMAGES.started.width}
                  height={IMAGES.started.height}
                  className="object-contain"
                />
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <CardTitle className="text-3xl md:text-4xl text-white">How To Get Started?</CardTitle>
                <CardDescription className="text-white/80 text-lg">
                  Sign in or create an account above using the sign in button. You will have access to upload your files
                  to learn more about our records.
                </CardDescription>
                <Button asChild variant="secondary" size="lg" className="rounded-full">
                  <Link href="/auth/sign-in">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 md:py-20 md:px-6 max-w-6xl mx-auto">
        <Card className="bg-white/5 border-none">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <CardTitle className="text-3xl md:text-4xl text-white">Features:</CardTitle>
                <FeatureList />
              </div>
              <div className="relative h-[400px]">
                <AnimatedImage
                  src={IMAGES.features.src}
                  alt="Doctor with clipboard and stethoscope next to medical symbols and laboratory flask"
                  width={IMAGES.features.width}
                  height={IMAGES.features.height}
                  className="object-contain"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/10 mt-20">
        <div className="px-4 py-12 md:py-16 md:px-6 max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="col-span-2">
              <div className="text-xl font-semibold text-white mb-4">PatientPal</div>
              <p className="text-white/60 max-w-sm">
                Your trusted health records assistant. We help you understand and manage your medical information with
                ease and confidence.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">Company</div>
              <div className="grid gap-3">
                <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm">
                  Home
                </Link>
                <Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm">
                  About
                </Link>
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">Connect</div>
              <div className="grid gap-3">
                {["Email", "Twitter", "LinkedIn", "Instagram"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-white/60 hover:text-white transition-colors text-sm group flex items-center gap-2"
                  >
                    {item}
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/40">
            © {new Date().getFullYear()} PatientPal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

