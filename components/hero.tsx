"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ExternalLink, ChevronDown } from "lucide-react"
import Link from "next/link"
import data from "@/data.json"

export function Hero() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const roles = data.personal.roles

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))

      setTypingSpeed(isDeleting ? 30 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, roles])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative z-10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Animated greeting */}
          <div className="mb-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
            <span className="text-blue-400 text-lg font-mono">{data.sections.hero.greeting}</span>
          </div>

          {/* Main name with gradient */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {data.personal.name}
            </span>
          </h1>

          {/* Typing animation */}
          <div className="h-16 mb-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
            <p className="text-2xl md:text-3xl text-gray-300">
              <span className="text-blue-400">{"<"}</span>
              {text}
              <span className="animate-pulse">|</span>
              <span className="text-blue-400">{"/>"}</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
            {data.personal.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
            {data.sections.hero.ctaButtons.map((button, index) => (
              <Button
                key={index}
                size="lg"
                className={`${
                  button.variant === "primary"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                    : "border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent"
                } px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25`}
                asChild
              >
                <a 
                  href={button.href}
                  onClick={(e) => handleSmoothScroll(e, button.href.replace('#', ''))}
                  className="cursor-pointer"
                >
                  {button.icon === "Mail" && <Mail className="mr-2 h-5 w-5" />}
                  {button.icon === "ExternalLink" && <ExternalLink className="mr-2 h-5 w-5" />}
                  {button.text}
                </a>
              </Button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-8 mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards]">
            {[
              { href: data.social.github, icon: Github, label: "GitHub" },
              { href: data.social.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${data.social.email}`, icon: Mail, label: "Email" },
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full border border-gray-600 hover:border-blue-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <social.icon className="h-6 w-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-[fadeInUp_1s_ease-out_1.4s_forwards]">
            <button
              onClick={(e) => handleSmoothScroll(e, 'about')}
              className="group cursor-pointer hover:scale-110 transition-all duration-300 animate-[bounce_3s_ease-in-out_infinite]"
            >
              <ChevronDown className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
