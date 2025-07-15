"use client"

import { useEffect, useRef } from "react"

export function SkillsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const skills = [
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    {
      name: "PostgreSQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    {
      name: "TailwindCSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
  ]

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0

    const animate = () => {
      scrollPosition += 0.5
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    const skillName = target.alt
    
    // Create a fallback SVG based on skill name
    if (skillName === "TailwindCSS") {
      target.style.display = "none"
      const parent = target.parentElement
      if (parent) {
        parent.innerHTML = `
          <svg viewBox="0 0 24 24" class="w-full h-full">
            <defs>
              <linearGradient id="tailwind-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#06B6D4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0891B2;stop-opacity:1" />
              </linearGradient>
            </defs>
            <path fill="url(#tailwind-gradient)" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
          </svg>
        `
      }
    }
  }

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Tech Arsenal
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Technologies I work with</p>
        </div>

        {/* Skills Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-hidden whitespace-nowrap"
            style={{ scrollBehavior: "auto" }}
          >
            {duplicatedSkills.map((skill, index) => (
              <div key={`${skill.name}-${index}`} className="flex-shrink-0 group cursor-pointer">
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <img
                      src={skill.logo || "/placeholder.svg"}
                      alt={skill.name}
                      className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
                      crossOrigin="anonymous"
                      onError={handleImageError}
                    />
                  </div>
                  <p className="text-center text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                    {skill.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </div>

        {/* Additional Skills Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {["REST APIs", "SQL", "Framer Motion", "Material-UI", "Express.js", "Socket.io", "JWT", "Cloudinary"].map(
            (skill, index) => (
              <div
                key={skill}
                className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-center hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
              >
                <span className="text-gray-300 font-medium">{skill}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
