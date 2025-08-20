"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Lock, Eye, EyeOff, Zap, Star, Gift, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "admin@admin.com" && password === "123") {
      // Store user session
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", "Admin User")
      localStorage.setItem("userXP", "2450")
      localStorage.setItem("userLevel", "Gold")

      // Redirect to main page with features enabled
      router.push("/?authenticated=true")
    } else {
      alert("Invalid credentials. Use admin@admin.com / 123")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/discount-ticket-background.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-orange-400/20 rounded-full animate-float" />
        <div
          className="absolute top-40 right-20 w-12 h-12 bg-orange-500/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-orange-600/20 rounded-full animate-float"
          style={{ animationDelay: "4s" }}
        />
        <div className="sparkle top-1/4 left-1/3" style={{ animationDelay: "0s" }} />
        <div className="sparkle top-3/4 right-1/4" style={{ animationDelay: "1s" }} />
        <div className="sparkle top-1/2 left-3/4" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 w-full bg-black/20 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-orange-400">StudentSaver</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Don't have an account?</span>
              <Button
                variant="outline"
                className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black bg-transparent"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="text-white space-y-8">
            <div>
              <Badge className="mb-4 bg-orange-400/20 text-orange-400 border-orange-400/30 animate-glow backdrop-blur-sm">
                <Gift className="w-4 h-4 mr-2" />
                Exclusive Student Access
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Welcome Back to
                <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  StudentSaver
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Sign in to access your personalized dashboard with exclusive student discounts from 1000+ brands.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center border border-orange-400/30">
                  <Star className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">1000+ Brands</h3>
                  <p className="text-sm text-white/70">Top retailers</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center border border-orange-400/30">
                  <Gift className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Up to 70% Off</h3>
                  <p className="text-sm text-white/70">Maximum savings</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center border border-orange-400/30">
                  <Users className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">2M+ Students</h3>
                  <p className="text-sm text-white/70">Trusted community</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-400/20 rounded-lg flex items-center justify-center border border-orange-400/30">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Instant Access</h3>
                  <p className="text-sm text-white/70">No waiting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md border-orange-400/30 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-gray-300">Access your student discounts</p>
                <div className="mt-4 p-3 bg-orange-400/20 rounded-lg border border-orange-400/30">
                  <p className="text-sm text-orange-200">Demo: admin@admin.com / 123</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSignIn}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <Input
                      type="email"
                      placeholder="student@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/10 border-orange-400/40 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white/10 border-orange-400/40 text-white placeholder:text-gray-300 focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-orange-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-orange-400/40 bg-white/10 text-orange-400 focus:ring-orange-400/20"
                    />
                    <span className="text-gray-200">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-black hover:from-orange-500 hover:to-orange-700 font-semibold py-3 text-lg animate-glow disabled:opacity-50"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-400/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/10 text-gray-300 backdrop-blur-sm">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-orange-400/40 text-white hover:bg-orange-400/20 bg-white/5 backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-orange-400/40 text-white hover:bg-orange-400/20 bg-white/5 backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-200">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
