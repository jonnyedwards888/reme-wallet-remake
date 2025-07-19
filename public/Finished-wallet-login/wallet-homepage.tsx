"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function WalletHomepage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("lucashooper100@outlook.com")
  const [password, setPassword] = useState("password123")

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(90deg, #1a0536 0%, rgb(83, 0, 39) 48%, #1a0536 100%)",
      }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
      `}</style>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center">
            <img src="/wallet-login-logo.svg" alt="Wallet Logo" className="h-16 w-auto" />
          </div>
        </div>

        {/* Login Card */}
        <Card
          className="shadow-2xl border border-white/10"
          style={{ background: "rgba(45, 25, 75, 0.3)", backdropFilter: "blur(8px)" }}
        >
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Welcome Heading */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-300 text-sm">Please sign in to your account</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 pr-12"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Login Button with improved spacing */}
              <div className="pt-4">
                <Button
                  className="w-full h-12 text-white font-semibold text-lg bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 transition-all duration-200"
                  style={{
                    boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3), 0 0 20px rgba(147, 51, 234, 0.2)",
                  }}
                >
                  LOGIN
                </Button>
              </div>

              {/* Secondary Links - Horizontal Layout */}
              <div className="flex justify-between items-center pt-2 pb-2">
                <button className="text-pink-300 hover:text-pink-400 font-medium text-sm transition-colors">
                  Forgot Password?
                </button>
                <span className="text-gray-400 text-sm">Not Got A Wallet?</span>
              </div>

              {/* Ghost Style Action Buttons */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full h-11 bg-transparent text-blue-300 border-2 border-blue-300 hover:bg-blue-50 hover:border-blue-300 font-medium transition-all duration-200"
                >
                  Register Here
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-11 bg-transparent text-teal-300 border-2 border-teal-300 hover:bg-teal-50 hover:border-teal-300 font-medium transition-all duration-200"
                >
                  Do you need help?
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Footer Links */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-4 text-sm">
            <a
              href="https://remelife.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors font-medium"
            >
              ReMeLife
            </a>
            <span className="text-white/40">|</span>
            <a
              href="https://remelife.com/terms-and-conditions/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors font-medium"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
