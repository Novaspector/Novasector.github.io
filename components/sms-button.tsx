import type React from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SMSButtonProps {
  phoneNumber?: string
  message?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
}

export default function SMSButton({
  phoneNumber = "18762939373",
  message = "Hi! I found your website and I'm interested in your IT services.",
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: SMSButtonProps) {
  const smsUrl = `sms:${phoneNumber}${message ? `?body=${encodeURIComponent(message)}` : ""}`

  return (
    <Button variant={variant} size={size} className={cn("", className)} asChild {...props}>
      <a href={smsUrl}>
        {children || (
          <>
            <MessageSquare className="h-4 w-4 mr-2" />
            Send SMS: 876-293-9373
          </>
        )}
      </a>
    </Button>
  )
}
