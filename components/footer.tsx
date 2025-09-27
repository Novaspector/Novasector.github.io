import Link from "next/link"
import { Code, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">Richards IT</span>
            </Link>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Empowering businesses and individuals through innovative technology solutions and comprehensive IT
              education.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  IT Strategy & Consulting
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Cybersecurity Solutions
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Cloud Migration
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Database Solutions
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  IT Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Training */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Training Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/classes" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Programming Fundamentals
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Cybersecurity Training
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  AWS Cloud Practitioner
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Data Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300">
                  <div>15 Trafalgar Road</div>
                  <div>New Kingston, Kingston 10</div>
                  <div>Jamaica</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300">876-555-0123</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300">info@richardsit.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 Richards IT Consultancy. All rights reserved. Proudly Jamaican.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
