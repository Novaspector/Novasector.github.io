"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Mail, Phone, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("")
  const { toast } = useToast()

  const courses = [
    { id: "basic-computer", name: "Basic Computer Skills", price: "J$8,000", duration: "4 weeks" },
    { id: "microsoft-office", name: "Microsoft Office Mastery", price: "J$12,000", duration: "6 weeks" },
    { id: "web-development", name: "Web Development Basics", price: "J$18,000", duration: "8 weeks" },
    { id: "python-programming", name: "Python Programming", price: "J$15,000", duration: "8 weeks" },
    { id: "digital-marketing", name: "Digital Marketing Basics", price: "J$10,000", duration: "5 weeks" },
    { id: "smartphone-tablet", name: "Smartphone & Tablet Mastery", price: "J$6,000", duration: "3 weeks" },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Application submitted successfully!",
      description: "We'll review your application and contact you within 2 business days.",
    })

    setIsSubmitting(false)

    // Reset form
    const form = e.target as HTMLFormElement
    form.reset()
    setSelectedCourse("")
  }

  const selectedCourseDetails = courses.find((course) => course.id === selectedCourse)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Apply for IT Training Classes</h1>
            <p className="text-xl text-slate-300 mb-8">
              Fill out the application form below. All applications are reviewed personally to ensure the best fit for
              each student.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Application Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <GraduationCap className="h-6 w-6 mr-2 text-emerald-600" />
                      Course Application Form
                    </CardTitle>
                    <CardDescription>
                      Please provide accurate information. All fields marked with * are required.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Personal Information</h3>

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

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input id="email" name="email" type="email" required className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              className="mt-1"
                              placeholder="876-xxx-xxxx"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="age">Age *</Label>
                            <Input id="age" name="age" type="number" min="16" max="100" required className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="parish">Parish *</Label>
                            <Select name="parish" required>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select your parish" />
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
                        </div>
                      </div>

                      {/* Course Selection */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Course Selection</h3>

                        <div>
                          <Label htmlFor="course">Preferred Course *</Label>
                          <Select name="course" required onValueChange={setSelectedCourse}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.name} - {course.price}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="schedule">Preferred Schedule *</Label>
                          <Select name="schedule" required>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select preferred time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekday-morning">Weekday Morning (9:00 AM - 12:00 PM)</SelectItem>
                              <SelectItem value="weekday-afternoon">Weekday Afternoon (1:00 PM - 4:00 PM)</SelectItem>
                              <SelectItem value="weekday-evening">Weekday Evening (6:00 PM - 9:00 PM)</SelectItem>
                              <SelectItem value="saturday-morning">Saturday Morning (9:00 AM - 12:00 PM)</SelectItem>
                              <SelectItem value="saturday-afternoon">Saturday Afternoon (1:00 PM - 4:00 PM)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Background Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Background Information</h3>

                        <div>
                          <Label htmlFor="education">Highest Level of Education *</Label>
                          <Select name="education" required>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="primary">Primary School</SelectItem>
                              <SelectItem value="secondary">Secondary School</SelectItem>
                              <SelectItem value="college">College/Community College</SelectItem>
                              <SelectItem value="university">University</SelectItem>
                              <SelectItem value="postgraduate">Postgraduate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="experience">Computer Experience Level *</Label>
                          <Select name="experience" required>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No experience</SelectItem>
                              <SelectItem value="basic">Basic (can use email, browse internet)</SelectItem>
                              <SelectItem value="intermediate">
                                Intermediate (comfortable with most software)
                              </SelectItem>
                              <SelectItem value="advanced">Advanced (some programming/technical experience)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="employment">Current Employment Status</Label>
                          <Select name="employment">
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select employment status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="employed">Employed Full-time</SelectItem>
                              <SelectItem value="part-time">Employed Part-time</SelectItem>
                              <SelectItem value="self-employed">Self-employed</SelectItem>
                              <SelectItem value="unemployed">Unemployed</SelectItem>
                              <SelectItem value="retired">Retired</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="goals">What do you hope to achieve from this course? *</Label>
                          <Textarea
                            id="goals"
                            name="goals"
                            required
                            className="mt-1 min-h-[100px]"
                            placeholder="Tell us about your goals and what you want to learn..."
                          />
                        </div>

                        <div>
                          <Label htmlFor="challenges">
                            Any specific challenges or learning needs we should know about?
                          </Label>
                          <Textarea
                            id="challenges"
                            name="challenges"
                            className="mt-1 min-h-[80px]"
                            placeholder="Optional: Any physical limitations, learning preferences, etc."
                          />
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Payment Preference</h3>

                        <div>
                          <Label htmlFor="payment">Preferred Payment Method *</Label>
                          <Select name="payment" required>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-cash">Full Payment - Cash (5% discount)</SelectItem>
                              <SelectItem value="full-transfer">Full Payment - Bank Transfer (5% discount)</SelectItem>
                              <SelectItem value="split-payment">Split Payment (50% deposit, 50% by week 3)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="student-discount" name="studentDiscount" />
                          <Label htmlFor="student-discount" className="text-sm">
                            I am a current student and have a valid student ID (10% discount)
                          </Label>
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Agreement</h3>

                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <Checkbox id="terms" name="terms" required className="mt-1" />
                            <Label htmlFor="terms" className="text-sm leading-relaxed">
                              I agree to the terms and conditions, including the refund policy (50% refund if cancelled
                              before course starts, no refund after first class) *
                            </Label>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Checkbox id="contact-consent" name="contactConsent" required className="mt-1" />
                            <Label htmlFor="contact-consent" className="text-sm leading-relaxed">
                              I consent to being contacted via phone, email, or WhatsApp regarding my application and
                              course updates *
                            </Label>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Checkbox id="marketing-consent" name="marketingConsent" className="mt-1" />
                            <Label htmlFor="marketing-consent" className="text-sm leading-relaxed">
                              I would like to receive updates about new courses and special offers (optional)
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-3"
                      >
                        {isSubmitting ? (
                          "Submitting Application..."
                        ) : (
                          <>
                            Submit Application <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Course Summary Sidebar */}
              <div className="space-y-6">
                {selectedCourseDetails && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Selected Course</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h3 className="font-semibold">{selectedCourseDetails.name}</h3>
                        <div className="text-2xl font-bold text-emerald-600">{selectedCourseDetails.price}</div>
                        <div className="text-sm text-slate-600">Duration: {selectedCourseDetails.duration}</div>
                        <div className="text-sm text-slate-600">Max class size: 6-8 students</div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Application Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Submit Application</h4>
                          <p className="text-xs text-slate-600">Complete and submit this form</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Review Process</h4>
                          <p className="text-xs text-slate-600">We'll review within 2 business days</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Confirmation Call</h4>
                          <p className="text-xs text-slate-600">Brief phone interview if approved</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">4</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Payment & Enrollment</h4>
                          <p className="text-xs text-slate-600">Secure your spot with payment</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-emerald-600" />
                        <span>876-555-0123</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-emerald-600" />
                        <span>training@richardsit.com</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-3">
                        Questions about the application? Call or WhatsApp us during business hours (Mon-Fri 9AM-6PM, Sat
                        9AM-2PM).
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-600">Common questions about our application process</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What happens after I submit my application?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    I personally review each application within 2 business days. If approved, I'll call you for a brief
                    chat to discuss your goals and answer any questions. This helps ensure you're in the right course.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Why do you review applications instead of first-come-first-served?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    With small class sizes, I want to ensure each group has students with similar experience levels and
                    goals. This creates a better learning environment for everyone and allows me to tailor the teaching
                    approach to the group's needs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What if my application is not approved?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    If a course isn't the right fit, I'll suggest alternatives or recommend waiting for a more suitable
                    class. I may also suggest starting with a prerequisite course to build foundational skills first.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I change courses after applying?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Yes, you can request a course change before enrollment is finalized. Just contact me and we can
                    discuss which course would be the best fit for your goals and experience level.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
