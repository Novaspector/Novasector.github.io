import { Clock, Users, Award, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ClassesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Practical Tech Training for Jamaica</h1>
            <p className="text-xl text-slate-300 mb-8">
              Learn essential tech skills with hands-on training designed for students, professionals, and entrepreneurs
              in Jamaica. Small class sizes, affordable rates.
            </p>
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/signup">
                Apply for Classes <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Available Courses</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Practical skills training with real-world applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Basic Computer Skills */}
            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    Beginner
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">J$8,000</div>
                    <div className="text-sm text-slate-600">4 weeks</div>
                  </div>
                </div>
                <CardTitle className="text-xl">Basic Computer Skills</CardTitle>
                <CardDescription>Essential computer skills for beginners and seniors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>2 hours per week</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Max 6 students</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Next start: March 15, 2024</span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">What you'll learn:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Using Windows and basic navigation</li>
                    <li>• Internet browsing and email setup</li>
                    <li>• Microsoft Word and Excel basics</li>
                    <li>• Online safety and security</li>
                  </ul>
                </div>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/signup">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Microsoft Office */}
            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Intermediate
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">J$12,000</div>
                    <div className="text-sm text-slate-600">6 weeks</div>
                  </div>
                </div>
                <CardTitle className="text-xl">Microsoft Office Mastery</CardTitle>
                <CardDescription>Advanced Word, Excel, and PowerPoint skills for professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>3 hours per week</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Max 8 students</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Next start: March 22, 2024</span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">What you'll learn:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Advanced Excel formulas and charts</li>
                    <li>• Professional document formatting</li>
                    <li>• Creating impressive presentations</li>
                    <li>• Mail merge and automation</li>
                  </ul>
                </div>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/signup">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Web Development */}
            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Intermediate
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">J$18,000</div>
                    <div className="text-sm text-slate-600">8 weeks</div>
                  </div>
                </div>
                <CardTitle className="text-xl">Web Development Basics</CardTitle>
                <CardDescription>Learn to build websites with HTML, CSS, and JavaScript</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>3 hours per week</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Max 6 students</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Next start: April 5, 2024</span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">What you'll learn:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• HTML structure and semantic markup</li>
                    <li>• CSS styling and responsive design</li>
                    <li>• JavaScript basics and interactivity</li>
                    <li>• Building your first website</li>
                  </ul>
                </div>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/signup">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Python Programming */}
            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    Beginner
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">J$15,000</div>
                    <div className="text-sm text-slate-600">8 weeks</div>
                  </div>
                </div>
                <CardTitle className="text-xl">Python Programming</CardTitle>
                <CardDescription>Learn programming fundamentals with Python</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>3 hours per week</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Max 6 students</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Next start: April 12, 2024</span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">What you'll learn:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Variables, data types, and loops</li>
                    <li>• Functions and problem-solving</li>
                    <li>• Working with files and data</li>
                    <li>• Building simple applications</li>
                  </ul>
                </div>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/signup">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Digital Marketing */}
            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    Beginner
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">J$10,000</div>
                    <div className="text-sm text-slate-600">5 weeks</div>
                  </div>
                </div>
                <CardTitle className="text-xl">Digital Marketing Basics</CardTitle>
                <CardDescription>Social media marketing and online business fundamentals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>2.5 hours per week</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Max 8 students</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Next start: April 19, 2024</span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">What you'll learn:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Facebook and Instagram marketing</li>
                    <li>• Creating engaging content</li>
                    <li>• Google My Business setup</li>
                    <li>• Basic online advertising</li>
                  </ul>
                </div>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/signup">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Smartphone & Tablet */}
            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    Beginner
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">J$6,000</div>
                    <div className="text-sm text-slate-600">3 weeks</div>
                  </div>
                </div>
                <CardTitle className="text-xl">Smartphone & Tablet Mastery</CardTitle>
                <CardDescription>Get the most out of your mobile devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>2 hours per week</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Max 8 students</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Next start: March 29, 2024</span>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">What you'll learn:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Essential apps and settings</li>
                    <li>• WhatsApp, email, and messaging</li>
                    <li>• Taking and sharing photos</li>
                    <li>• Online banking and payments</li>
                  </ul>
                </div>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/signup">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Class Information */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Class Information</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about our training programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Small Class Sizes</h3>
              <p className="text-slate-600">
                Maximum 8 students per class ensures personalized attention and hands-on learning
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certificate of Completion</h3>
              <p className="text-slate-600">Receive a certificate upon successful completion of each course</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-slate-600">Evening and weekend classes available to accommodate work schedules</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Payment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Class Location</h2>
              <div className="space-y-4">
                <p className="text-lg text-slate-600">
                  Classes are held at our training center in New Kingston, easily accessible by public transportation.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Address:</h3>
                  <p className="text-slate-600">
                    15 Trafalgar Road
                    <br />
                    New Kingston, Kingston 10
                    <br />
                    Jamaica
                  </p>
                </div>
                <p className="text-sm text-slate-600">
                  <strong>Parking:</strong> Limited street parking available
                  <br />
                  <strong>Public Transport:</strong> Multiple bus routes nearby
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Payment Options</h2>
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Full Payment</h3>
                  <p className="text-slate-600 text-sm mb-2">Pay the full course fee upfront</p>
                  <p className="text-emerald-600 font-semibold">5% discount applied</p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Split Payment</h3>
                  <p className="text-slate-600 text-sm mb-2">50% deposit, 50% by week 3</p>
                  <p className="text-slate-500">No additional fees</p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Student Discount</h3>
                  <p className="text-slate-600 text-sm mb-2">Valid student ID required</p>
                  <p className="text-emerald-600 font-semibold">10% off all courses</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Apply now for our upcoming classes. Spaces are limited and fill up quickly!
          </p>
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/signup">
              Apply for Classes <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
