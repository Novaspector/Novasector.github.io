"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/auth"

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    console.log("AdminGuard: useEffect triggered.")
    const checkAuth = () => {
      console.log("AdminGuard: Running checkAuth.")
      const authenticated = isAdminAuthenticated()
      setIsAuthenticated(authenticated)
      setIsLoading(false)

      if (!authenticated) {
        console.log("AdminGuard: Not authenticated, redirecting to /admin/login.")
        router.push("/admin/login")
      } else {
        console.log("AdminGuard: Authenticated.")
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    console.log("AdminGuard: Loading state...")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log("AdminGuard: Not authenticated, rendering null (will redirect).")
    return null
  }

  console.log("AdminGuard: Authenticated, rendering children.")
  return <>{children}</>
}
