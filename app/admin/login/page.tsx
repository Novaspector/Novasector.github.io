"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input" // This is the component for the input field
import { Label } from "@/components/ui/label" // This is the component for the label
import { useToast } from "@/components/ui/use-toast" // Declare the useToast hook

// At the top of the file, update the constants:
const ADMIN_EMAIL = "Rishawnacxc2019@gmail.com"
const ADMIN_PASSWORD = "134557026(@RR"

export default function AdminLogin() {
  // Inside the AdminLogin component, add a new state for email:
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast() // Use the declared useToast hook

  // Update the handleLogin function to check both email and password:
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    console.log("Attempting login...")
    console.log("Entered email (trimmed):", trimmedEmail)
    console.log("Entered password (trimmed):", trimmedPassword)
    console.log("Expected email:", ADMIN_EMAIL)
    console.log("Expected password:", ADMIN_PASSWORD)

    if (trimmedEmail === ADMIN_EMAIL && trimmedPassword === ADMIN_PASSWORD) {
      localStorage.setItem("admin_authenticated", "true")
      localStorage.setItem("admin_login_time", Date.now().toString())
      console.log("Login successful. localStorage set.")

      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      })

      router.push("/admin")
    } else {
      console.log("Login failed: Incorrect credentials.")
      toast({
        title: "Access Denied",
        description: "Incorrect email or password. Please try again.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <p className="text-slate-600">Enter email and password to access admin dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Inside the <form> element, add the email input field before the password field: */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label> {/* This is the label */}
              <div className="relative">
                <Input // This is the actual input field
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password" // This text should be visible inside the input
                  required
                  className="pr-10"
                />
                <Button // This is the eye icon button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700">
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
