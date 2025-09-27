import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Award, Clock, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import WhatsAppButton from "@/components/whatsapp-button"
import SMSButton from "@/components/sms-button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Trusted IT Partner in <span className="text-emerald-400">Jamaica</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              From computer repairs to cutting-edge web development, I provide personalized IT solutions and training
              that empower your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3" asChild>
                <Link href="/services">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
                asChild
              >
                <Link href="/classes">View Training Classes</Link>
              </Button>
            </div>

            {/* Quick Contact Options */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <p className="text-slate-300 text-sm mb-2 sm:mb-0 sm:mr-4">Need immediate help?</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20"
                  asChild
                >
                  <a href="tel:876-293-9373">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </a>
                </Button>
                <SMSButton
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                  message="Hi! I need urgent IT help. Can you assist me?"
                />
                <WhatsAppButton
                  variant="ghost"
                  size="sm"
                  className="text-green-400 hover:text-green-300 hover:bg-green-900/20"
                  message="Hi! I need urgent IT help. Can you assist me?"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-slate-200 hover:bg-slate-700"
                  asChild
                >
                  <a href="mailto:info@richardsit.com">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Richards IT?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              With over a decade of experience, I combine technical expertise with genuine care for my clients' success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Touch</h3>
              <p className="text-slate-600">
                One-on-one attention ensuring solutions tailored to your specific needs and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Expertise</h3>
              <p className="text-slate-600">
                10+ years of experience with hundreds of satisfied clients across Jamaica.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-slate-600">
                Same-day service for urgent issues, with most problems resolved within 24 hours.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fair Pricing</h3>
              <p className="text-slate-600">
                Transparent, competitive rates with no hidden fees. Payment plans available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete IT Solutions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From fixing your computer to building your online presence, I've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Computer Repair & Setup</CardTitle>
                <CardDescription>
                  Hardware repairs, software installation, virus removal, and system optimization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Hardware diagnostics & repair</li>
                  <li>• Operating system installation</li>
                  <li>• Data recovery services</li>
                  <li>• Performance optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Website Development</CardTitle>
                <CardDescription>
                  Professional websites that help your business grow and attract customers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Custom website design</li>
                  <li>• E-commerce solutions</li>
                  <li>• Mobile-responsive design</li>
                  <li>• SEO optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">IT Training Classes</CardTitle>
                <CardDescription>
                  Learn valuable tech skills with hands-on training in small, focused groups.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Basic computer skills</li>
                  <li>• Microsoft Office training</li>
                  <li>• Web development basics</li>
                  <li>• Digital marketing</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Learn Tech Skills That Matter</h2>
              <p className="text-lg text-slate-600 mb-8">
                Whether you're starting from scratch or looking to advance your career, my training programs are
                designed to give you practical, job-ready skills.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Small Class Sizes</h3>
                    <p className="text-slate-600">Maximum 8 students per class for personalized attention</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Hands-On Learning</h3>
                    <p className="text-slate-600">Real projects and practical exercises, not just theory</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Flexible Scheduling</h3>
                    <p className="text-slate-600">Evening and weekend classes available</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/classes">
                  Browse Training Classes <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-slate-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Popular Classes</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-lg">Computer Basics for Beginners</h4>
                  <p className="text-slate-600 text-sm">Perfect for seniors and first-time users</p>
                  <p className="text-emerald-600 font-semibold mt-2">J$8,000 • 4 weeks</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-lg">Microsoft Office Mastery</h4>
                  <p className="text-slate-600 text-sm">Word, Excel, PowerPoint, and Outlook</p>
                  <p className="text-emerald-600 font-semibold mt-2">J$12,000 • 6 weeks</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-lg">Website Building Workshop</h4>
                  <p className="text-slate-600 text-sm">Create your own professional website</p>
                  <p className="text-emerald-600 font-semibold mt-2">J$15,000 • 8 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What My Clients Say</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real feedback from real people who've experienced the Richards IT difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-emerald-600">MJ</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Maria Johnson</h4>
                    <p className="text-sm text-slate-600">Small Business Owner</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  "Richard saved my business! When my computer crashed with all my customer data, he recovered
                  everything and set up a proper backup system. Professional and caring service."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-emerald-600">DW</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">David Williams</h4>
                    <p className="text-sm text-slate-600">Retiree</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  "At 68, I thought I was too old to learn computers. Richard's patient teaching style made it easy. Now
                  I video call my grandchildren and manage my finances online!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-emerald-600">SP</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Palmer</h4>
                    <p className="text-sm text-slate-600">Restaurant Owner</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  "The website Richard built for my restaurant has brought in so many new customers. The online ordering
                  system pays for itself every month. Highly recommended!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Solve Your Tech Challenges?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Don't let technology hold you back. Whether you need repairs, training, or a new website, I'm here to help
            you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-slate-100 text-lg px-8 py-3" asChild>
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-3 bg-transparent"
              asChild
            >
              <a href="tel:876-293-9373">Call Now: 876-293-9373</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
