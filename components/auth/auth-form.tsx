"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight } from "lucide-react"

export const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const { signIn, signUp, error, loading } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password, name)
      }
    } catch (err) {
      // Error is handled in useAuth hook
    }
  }

  React.useEffect(() => {
    if (error) {
      toast({
        title: "Authentication error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!isLogin}
            className="transition-all duration-200 hover:border-gray-400 focus:border-primary"
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="transition-all duration-200 hover:border-gray-400 focus:border-primary"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="transition-all duration-200 hover:border-gray-400 focus:border-primary"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0E6E52] hover:bg-[#0A5B43] text-white transition-all duration-200"
      >
        {loading ? (
          "Please wait..."
        ) : (
          <>
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsLogin(!isLogin)}
        className="w-full text-gray-600 hover:text-gray-900 transition-colors"
      >
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Sign In"}
      </Button>
    </form>
  )
}

