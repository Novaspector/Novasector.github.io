"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
}

export default function WhatsAppButton({
  phoneNumber = "18762939373",
  message = "Hi! I'm interested in your IT services.",
  className = "",
  variant = "default",
  size = "default",
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={`${className} ${variant === "default" ? "bg-green-600 hover:bg-green-700" : ""}`}
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
        <MessageCircle className="h-4 w-4 mr-2" />
        WhatsApp Me
      </a>
    </Button>
  )
}
