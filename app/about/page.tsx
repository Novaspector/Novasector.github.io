import { Users, Target, Award, Heart, GraduationCap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Richards IT Consultancy</h1>
            <p className="text-xl text-slate-300 mb-8">
              A fresh start in Jamaica's tech landscape - bringing modern IT solutions and practical training to
              businesses and individuals across the island.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">My Story</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Hi, I'm Michael Richards, a recent graduate from the University of Technology, Jamaica (UTech). After
                completing my degree in Computer Science, I realized there was a gap in affordable, practical IT
                services for small businesses and individuals in Jamaica.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Growing up in Kingston, I saw many small business owners struggling with basic technology tasks - from
                setting up email to creating simple websites. I also noticed that many of my peers wanted to learn tech
                skills but couldn't afford expensive courses.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                That's why I started Richards IT Consultancy - to bridge this gap with affordable, practical solutions
                and training that actually makes sense for the Jamaican market.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-2">2023</div>
                <div className="text-sm text-slate-600">UTech Graduate</div>
              </Card>
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-2">10+</div>
                <div className="text-sm text-slate-600">Happy Clients</div>
              </Card>
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-2">25+</div>
                <div className="text-sm text-slate-600">Students Trained</div>
              </Card>
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-2">1</div>
                <div className="text-sm text-slate-600">Year in Business</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mission & Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              What drives me and guides every decision I make for this business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <Card className="p-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center">
                  <Target className="h-6 w-6 mr-3 text-emerald-600" />
                  My Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  To make technology accessible and affordable for every Jamaican business and individual. I believe
                  that with the right guidance and training, anyone can harness technology to improve their life and
                  business, regardless of their background or budget.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center">
                  <Heart className="h-6 w-6 mr-3 text-emerald-600" />
                  My Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  To see a Jamaica where every small business has a strong online presence, where seniors are
                  comfortable with technology, and where young people have the digital skills they need to compete
                  globally while staying rooted in Jamaica.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-slate-600">
                Every service and class is delivered with attention to detail and genuine care
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-slate-600">Supporting local businesses and individuals to grow and succeed together</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordability</h3>
              <p className="text-slate-600">Fair pricing that makes technology services accessible to everyone</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Patience</h3>
              <p className="text-slate-600">Taking time to explain things clearly, especially for beginners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Credentials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Education & Skills</h2>
              <p className="text-lg text-slate-600">My educational background and technical expertise</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-emerald-600" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
                      <p className="text-slate-600">University of Technology, Jamaica (UTech)</p>
                      <p className="text-sm text-slate-500">Graduated: 2023</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">CAPE Computer Science</h3>
                      <p className="text-slate-600">Kingston College</p>
                      <p className="text-sm text-slate-500">Completed: 2019</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Award className="h-5 w-5 mr-2 text-emerald-600" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm">Programming Languages</h4>
                      <p className="text-sm text-slate-600">Python, JavaScript, HTML/CSS, Java</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Web Development</h4>
                      <p className="text-sm text-slate-600">React, Node.js, WordPress, Basic SEO</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Database & Cloud</h4>
                      <p className="text-sm text-slate-600">MySQL, MongoDB, Google Cloud, AWS Basics</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Other Skills</h4>
                      <p className="text-sm text-slate-600">Network Setup, Cybersecurity Basics, Microsoft Office</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why I Started This Business */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Why I Started This Business</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Help My Community</h3>
                  <p className="text-slate-600 text-sm">
                    I saw too many small business owners struggling with basic tech tasks that could easily be solved
                    with the right guidance.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Bridge the Gap</h3>
                  <p className="text-slate-600 text-sm">
                    Most IT services are either too expensive or too complex for small businesses and individuals. I
                    wanted to change that.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Share Knowledge</h3>
                  <p className="text-slate-600 text-sm">
                    I believe knowledge should be shared, not hoarded. Teaching others gives me as much satisfaction as
                    solving technical problems.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Whether you need IT support for your business or want to learn new tech skills, I'm here to help. Let's have
            a conversation about your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/services">View Services</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
