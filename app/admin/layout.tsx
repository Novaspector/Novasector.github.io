"use client"

import type React from "react"
import Link from "next/link"
import { Users, FileText, Settings, BarChart3, LogOut } from "lucide-react"
import AdminGuard from "@/components/admin-guard"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-slate-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-900">Admin Dashboard</h2>
          </div>

          <nav className="px-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center px-4 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <FileText className="h-5 w-5 mr-3" />
              Applications
            </Link>

            <Link
              href="/admin/students"
              className="flex items-center px-4 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Users className="h-5 w-5 mr-3" />
              Students
            </Link>

            <Link
              href="/admin/analytics"
              className="flex items-center px-4 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              Analytics
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center px-4 py-2 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <LogoutButton />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">{children}</div>
      </div>
    </AdminGuard>
  )
}

function LogoutButton() {
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_authenticated")
      localStorage.removeItem("admin_login_time")
      window.location.href = "/admin/login"
    }
  }

  return (
    <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent">
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  )
}
