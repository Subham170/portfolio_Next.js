"use client"

import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, MapPin, Phone, Briefcase } from "lucide-react"
import Link from "next/link"
import data from "@/data.json"

export function Contact() {
  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {data.sections.contact.title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg">{data.sections.contact.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left side - Contact info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Get in touch</h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  {data.sections.contact.description}
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: data.contact.email,
                    href: `mailto:${data.contact.email}`,
                    color: "text-blue-400",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: data.contact.location,
                    color: "text-green-400",
                  },
                  {
                    icon: Briefcase,
                    label: "Current Status",
                    value: "Open for Collaboration",
                    color: "text-purple-400",
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gray-800/50 border border-gray-700">
                      <contact.icon
                        className={`h-5 w-5 ${contact.color}`}
                      />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{contact.label}</p>
                      {contact.href ? (
                        <Link href={contact.href} className="text-white hover:text-blue-400 transition-colors">
                          {contact.value}
                        </Link>
                      ) : (
                        <p className="text-white">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - CTA */}
            <div className="flex flex-col justify-center">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-center">
                <div className="mb-8">
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-xl font-bold text-white mb-2">Ready to collaborate?</h4>
                  <p className="text-gray-400">Let's discuss your next project</p>
                </div>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                    asChild
                  >
                    <Link href={`mailto:${data.contact.email}`}>
                      <Mail className="mr-2 h-5 w-5" />
                      Send Email
                    </Link>
                  </Button>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 bg-transparent"
                      asChild
                    >
                      <Link href={data.social.linkedin}>
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 bg-transparent"
                      asChild
                    >
                      <Link href={data.social.github}>
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">© 2025 {data.personal.name}. Built with Next.js, TypeScript, and lots of ☕</p>
        </div>
      </div>
    </section>
  )
}
