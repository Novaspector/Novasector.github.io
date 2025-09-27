"use client"

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") {
    console.log("isAdminAuthenticated: Running on server, returning false.")
    return false
  }

  const isAuth = localStorage.getItem("admin_authenticated")
  const loginTime = localStorage.getItem("admin_login_time")

  console.log("isAdminAuthenticated: Checking localStorage...")
  console.log("  admin_authenticated:", isAuth)
  console.log("  admin_login_time:", loginTime)

  if (!isAuth || !loginTime) {
    console.log("isAdminAuthenticated: Not authenticated (missing items).")
    return false
  }

  // Session expires after 8 hours
  const eightHours = 8 * 60 * 60 * 1000
  const now = Date.now()
  const loginTimestamp = Number.parseInt(loginTime)

  console.log("  Current time:", now)
  console.log("  Login timestamp:", loginTimestamp)
  console.log("  Time elapsed:", now - loginTimestamp)
  console.log("  Expiry (8 hours):", eightHours)

  if (now - loginTimestamp > eightHours) {
    console.log("isAdminAuthenticated: Session expired. Clearing localStorage.")
    localStorage.removeItem("admin_authenticated")
    localStorage.removeItem("admin_login_time")
    return false
  }

  const authenticated = isAuth === "true"
  console.log("isAdminAuthenticated: Authenticated status:", authenticated)
  return authenticated
}

export function logoutAdmin(): void {
  console.log("logoutAdmin: Clearing localStorage.")
  localStorage.removeItem("admin_authenticated")
  localStorage.removeItem("admin_login_time")
}
