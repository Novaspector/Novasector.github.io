"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { studentDB } from "@/lib/supabase"

export default function HomePage() {
  const [stats, setStats] = useState({
    projectsCompleted: 5,
    happyClients: 10,
    studentsTrained: 25,
    yearsInBusiness: 1,
  })

  useEffect(() => {
    /**
     * Ensures we always have an array of students, no matter what shape
     * `studentDB.getAllStudents()` returns (array, `{ data }`, or object map).
     */
    async function loadStats() {
      try {
        const result = await studentDB.getAllStudents()

        // Supabase-style: { data, error }
        const maybeArray = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : // Fallback if an object map was returned
              Object.values(result ?? {})

        // Ensure we always have a clean array with real objects
        const students = (Array.isArray(maybeArray) ? maybeArray : []).filter(
          (item) => !!item && typeof item === "object",
        )

        const completedStudents = students.filter((s) => s?.status === "completed").length
        const totalStudents = students.length

        setStats({
          projectsCompleted: Math.max(5, Math.floor(totalStudents * 0.8)),
          happyClients: Math.max(10, totalStudents + 5),
          studentsTrained: Math.max(25, totalStudents),
          yearsInBusiness: 1,
        })
      } catch (error) {
        console.error("Failed to load stats:", error)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Affordable IT Solutions for Jamaica</h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300 leading-relaxed">
              Fresh graduate from UTech offering modern IT consulting and practical tech training to help Jamaican
              businesses and individuals succeed in the digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/services">
                  View Our Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/classes">Browse Classes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What We Offer</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Practical IT solutions and training designed for the Jamaican market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-emerald-500 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Small Business IT Support</CardTitle>
                <CardDescription>Affordable tech support for local businesses getting started online</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Website setup and maintenance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Social media integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Basic cybersecurity setup
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-500 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Computer Repair & Setup</CardTitle>
                <CardDescription>Reliable computer repair and setup services across Kingston</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Hardware troubleshooting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Software installation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Network setup
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-500 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Tech Training Classes</CardTitle>
                <CardDescription>Practical tech skills training for students and professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Basic programming (Python, HTML/CSS)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Microsoft Office mastery
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Digital marketing basics
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Choose Richards IT?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">Fresh UTech Graduate</h3>
                    <p className="text-slate-600">
                      Recent graduate with up-to-date knowledge of the latest technologies and trends.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">Affordable Pricing</h3>
                    <p className="text-slate-600">
                      Student-friendly and small business rates that won't break your budget.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">Local Understanding</h3>
                    <p className="text-slate-600">
                      Born and raised in Jamaica, I understand the unique challenges local businesses face.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Get Started?</h3>
              <p className="text-slate-600 mb-6">
                Contact me today for a free consultation and let's discuss how technology can help your business grow.
              </p>
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link href="/contact">
                  Get Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">{stats.projectsCompleted}+</div>
              <div className="text-slate-300">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">{stats.happyClients}+</div>
              <div className="text-slate-300">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">{stats.studentsTrained}+</div>
              <div className="text-slate-300">Students Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">{stats.yearsInBusiness}</div>
              <div className="text-slate-300">Year in Business</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
