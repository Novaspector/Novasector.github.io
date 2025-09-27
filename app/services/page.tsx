import { CheckCircle, ArrowRight, Shield, Zap, Users, Settings, Database, Monitor } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Affordable IT Services for Jamaica</h1>
            <p className="text-xl text-slate-300 mb-8">
              Professional IT solutions tailored for small businesses, students, and individuals across Kingston and
              beyond.
            </p>
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/contact">
                Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Computer Repair & Setup</CardTitle>
                <CardDescription>
                  Hardware troubleshooting, software installation, and system optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Virus removal and system cleanup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Hardware upgrades and repairs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Operating system installation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Data backup and recovery</span>
                  </li>
                </ul>
                <div className="text-2xl font-bold text-emerald-600 mb-2">J$3,000 - J$8,000</div>
                <div className="text-sm text-slate-600">Depending on complexity</div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Website Development</CardTitle>
                <CardDescription>Simple, professional websites for small businesses and entrepreneurs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Business websites (5-10 pages)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Mobile-responsive design</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Basic SEO optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Contact forms and social media links</span>
                  </li>
                </ul>
                <div className="text-2xl font-bold text-emerald-600 mb-2">J$15,000 - J$35,000</div>
                <div className="text-sm text-slate-600">One-time setup fee</div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Network Setup & Support</CardTitle>
                <CardDescription>Home and small office network installation and troubleshooting</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">WiFi setup and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Router configuration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Network security setup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Printer and device sharing</span>
                  </li>
                </ul>
                <div className="text-2xl font-bold text-emerald-600 mb-2">J$4,000 - J$10,000</div>
                <div className="text-sm text-slate-600">Per setup</div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Data Management</CardTitle>
                <CardDescription>Data backup, recovery, and organization services</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">File organization and cleanup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Cloud storage setup (Google Drive, OneDrive)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Automated backup solutions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Data recovery from damaged drives</span>
                  </li>
                </ul>
                <div className="text-2xl font-bold text-emerald-600 mb-2">J$2,500 - J$7,500</div>
                <div className="text-sm text-slate-600">Per service</div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Basic Cybersecurity</CardTitle>
                <CardDescription>Essential security setup for personal and small business computers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Antivirus installation and setup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Firewall configuration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Password manager setup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Security awareness training</span>
                  </li>
                </ul>
                <div className="text-2xl font-bold text-emerald-600 mb-2">J$3,500 - J$6,000</div>
                <div className="text-sm text-slate-600">Per system</div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Tech Consultation</CardTitle>
                <CardDescription>
                  One-on-one guidance for technology decisions and digital transformation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Technology needs assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Software recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Digital marketing strategy basics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Budget planning for tech upgrades</span>
                  </li>
                </ul>
                <div className="text-2xl font-bold text-emerald-600 mb-2">J$2,000/hour</div>
                <div className="text-sm text-slate-600">Minimum 1 hour session</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Service Areas</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Currently serving the greater Kingston area with plans to expand island-wide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Kingston & St. Andrew</h3>
              <p className="text-slate-600">On-site visits available</p>
              <p className="text-sm text-emerald-600 font-medium">No travel fee</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Spanish Town & Portmore</h3>
              <p className="text-slate-600">On-site visits available</p>
              <p className="text-sm text-emerald-600 font-medium">J$1,000 travel fee</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Remote Support</h3>
              <p className="text-slate-600">Available island-wide</p>
              <p className="text-sm text-emerald-600 font-medium">Via phone/video call - 876-293-9373</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Contact me today for a free consultation. Let's discuss how I can help solve your tech challenges.
          </p>
          <p className="text-lg text-slate-300 mb-8">Call us at 876-293-9373</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/contact">
                Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
            >
              <Link href="/classes">View Training Classes</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
