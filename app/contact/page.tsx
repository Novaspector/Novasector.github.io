"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import WhatsAppButton from "@/components/whatsapp-button"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent successfully!",
      description: "I'll get back to you within 24 hours, usually much sooner!",
    })

    setIsSubmitting(false)

    // Reset form
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-slate-300 mb-8">
              Ready to solve your tech challenges or learn new skills? I'd love to hear from you! Let's discuss how I
              can help your business or personal tech journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Send Me a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" required className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" required className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" className="mt-1" placeholder="876-xxx-xxxx" />
                </div>

                <div>
                  <Label htmlFor="parish">Parish</Label>
                  <Select name="parish">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your parish (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kingston">Kingston</SelectItem>
                      <SelectItem value="st-andrew">St. Andrew</SelectItem>
                      <SelectItem value="st-catherine">St. Catherine</SelectItem>
                      <SelectItem value="clarendon">Clarendon</SelectItem>
                      <SelectItem value="manchester">Manchester</SelectItem>
                      <SelectItem value="st-elizabeth">St. Elizabeth</SelectItem>
                      <SelectItem value="westmoreland">Westmoreland</SelectItem>
                      <SelectItem value="hanover">Hanover</SelectItem>
                      <SelectItem value="st-james">St. James</SelectItem>
                      <SelectItem value="trelawny">Trelawny</SelectItem>
                      <SelectItem value="st-ann">St. Ann</SelectItem>
                      <SelectItem value="st-mary">St. Mary</SelectItem>
                      <SelectItem value="portland">Portland</SelectItem>
                      <SelectItem value="st-thomas">St. Thomas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="inquiry">What can I help you with? *</Label>
                  <Select name="inquiry" required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-repair">Computer Repair/Setup</SelectItem>
                      <SelectItem value="website">Website Development</SelectItem>
                      <SelectItem value="network">Network Setup</SelectItem>
                      <SelectItem value="training">IT Training Classes</SelectItem>
                      <SelectItem value="consultation">Tech Consultation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Tell me about your needs *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    className="mt-1 min-h-[120px]"
                    placeholder="Describe your tech challenge, what you want to learn, or how I can help..."
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Approximate Budget (Optional)</Label>
                  <Select name="budget">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5000">Under J$5,000</SelectItem>
                      <SelectItem value="5000-10000">J$5,000 - J$10,000</SelectItem>
                      <SelectItem value="10000-20000">J$10,000 - J$20,000</SelectItem>
                      <SelectItem value="20000-plus">J$20,000+</SelectItem>
                      <SelectItem value="discuss">Let's discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Contact Information</h2>

              <div className="space-y-6 mb-8">
                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone & WhatsApp</h3>
                      <p className="text-slate-600">
                        876-293-9373
                        <br />
                        <span className="text-sm text-emerald-600">WhatsApp available 8AM-8PM</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-slate-600">
                        info@richardsit.com
                        <br />
                        <span className="text-sm text-emerald-600">Usually respond within 4 hours</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Service Area</h3>
                      <p className="text-slate-600">
                        Kingston & St. Andrew (On-site)
                        <br />
                        Spanish Town & Portmore (+J$1,000)
                        <br />
                        <span className="text-sm text-emerald-600">Remote support island-wide</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Availability</h3>
                      <p className="text-slate-600">
                        Monday - Friday: 8:00 AM - 8:00 PM
                        <br />
                        Saturday: 9:00 AM - 4:00 PM
                        <br />
                        Sunday: Emergency calls only
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Contact Options */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">Prefer to Call or Text?</h3>
                <div className="grid gap-3">
                  <Button variant="outline" className="justify-start bg-transparent" asChild>
                    <a href="tel:876-293-9373">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now: 876-293-9373
                    </a>
                  </Button>
                  <WhatsAppButton
                    variant="outline"
                    className="justify-start bg-transparent hover:bg-green-50"
                    message="Hi! I found your website and I'm interested in your IT services. Can we discuss my needs?"
                  />
                  <Button variant="outline" className="justify-start bg-transparent" asChild>
                    <a href="mailto:info@richardsit.com">
                      <Mail className="h-4 w-4 mr-2" />
                      Email: info@richardsit.com
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Questions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Quick answers to questions I get asked most often
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How quickly can you help with urgent issues?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  For urgent computer problems, I usually respond within 2-4 hours during business hours. Emergency
                  support is available for critical business issues.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer payment plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Yes! For larger projects (over J$15,000), I offer 50% upfront and 50% on completion. Training classes
                  can also be split into two payments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can you help with older computers?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  I specialize in getting the most out of older systems. Sometimes a good cleanup and optimization can
                  make an old computer feel new again.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you provide training for seniors?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Yes, I love working with seniors! I'm very patient and explain everything step-by-step. Many of my
                  students are 50+ and they do great.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Center Location */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Training Center Location</h2>
            <p className="text-lg text-slate-600">Classes are held in New Kingston for easy access</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Richards IT Training Center</h3>
                <div className="space-y-2 text-slate-600">
                  <p>15 Trafalgar Road</p>
                  <p>New Kingston, Kingston 10</p>
                  <p>Jamaica</p>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                    <div>
                      <strong>Parking:</strong> Limited street parking
                    </div>
                    <div>
                      <strong>Public Transport:</strong> Multiple bus routes
                    </div>
                    <div>
                      <strong>Nearby:</strong> Devon House, Sovereign Centre
                    </div>
                    <div>
                      <strong>Accessibility:</strong> Ground floor access
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
