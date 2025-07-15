"use client"

import {
  GraduationCap,
  Code,
  Zap,
  Target,
  Trophy,
  Users,
  Star,
  Award,
  Code2,
  Users2,
  TrendingUp,
  BookOpen,
  Heart,
  Rocket,
  ClubIcon as Football,
  CastleIcon as ChessKnight,
} from "lucide-react"
import data from "@/data.json"
import { motion, useMotionValue, animate, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const number = Number.parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/\d+/g, "")
  const motionValue = useMotionValue(0)

  useEffect(() => {
    let controls: any
    if (inView) {
      controls = animate(motionValue, number, {
        duration: 1.2,
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toLocaleString()
          }
        },
      })
    } else {
      // Reset motionValue when not in view to restart animation on re-entry
      motionValue.set(0)
      if (ref.current) ref.current.textContent = "0"
    }
    return () => controls && controls.stop && controls.stop()
  }, [number, motionValue, inView])

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  )
}

export function About() {
  const iconMap = {
    GraduationCap,
    Code,
    Zap,
    Target,
    BookOpen,
    Heart,
    Rocket,
    Trophy,
    Users,
    Star,
    Award,
    Code2,
    Users2,
    TrendingUp,
    Football,
    ChessKnight,
  } as const

  const cardRefs = useRef<HTMLDivElement[]>([])
  const factRefs = useRef<HTMLDivElement[]>([])

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {data.sections.about.title}
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6">
                              {data.sections.about.sections.map((section, index) => {
                  const IconComponent = iconMap[section.icon as keyof typeof iconMap]
                  const sectionRef = useRef<HTMLDivElement>(null)
                  const inView = useInView(sectionRef, { amount: 0.6 })
                  
                  return (
                    <motion.div
                      key={index}
                      ref={sectionRef}
                      className="space-y-4"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${section.color}`}>
                        {IconComponent && <IconComponent className={`h-6 w-6 ${section.iconColor}`} />}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                    </div>
                    <div className="pl-11">
                      {section.title === "Education" ? (
                        // Special handling for Education section
                        <>
                          <h4 className="text-lg font-medium text-blue-400 mb-1">
                            {data.personal.education.institution}
                          </h4>
                          <p className="text-gray-300 mb-2">{data.personal.education.degree}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span>{data.personal.education.graduation}</span>
                          </div>
                        </>
                      ) : (
                        // For all other sections
                        <p className="text-gray-300 leading-relaxed">{section.description}</p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
            {/* Right side - Stats/Highlights */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">My Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                                  {data.personal.stats && data.personal.stats.length > 0 ? (
                    data.personal.stats.map((stat, index) => {
                      const cardRef = useRef<HTMLDivElement>(null)
                      const inView = useInView(cardRef, { amount: 0.7 })

                    // Enhanced gradient colors for better visibility
                    const getEnhancedColor = (color: string) => {
                      switch (color) {
                        case "from-orange-400 to-red-400":
                          return "from-orange-500 to-red-500"
                        case "from-blue-400 to-cyan-400":
                          return "from-blue-500 to-cyan-500"
                        case "from-green-400 to-emerald-400":
                          return "from-green-500 to-emerald-500"
                        case "from-purple-400 to-pink-400":
                          return "from-purple-500 to-pink-500"
                        default:
                          return color
                      }
                    }

                    return (
                                              <motion.div
                          key={index}
                          ref={cardRef}
                        className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                      >
                        <div
                          className={`text-3xl font-bold bg-gradient-to-r ${getEnhancedColor(stat.color)} bg-clip-text text-transparent mb-2 drop-shadow-lg`}
                        >
                          <AnimatedNumber value={stat.number} inView={inView} />
                        </div>
                        <div className="text-white text-sm font-medium">{stat.label}</div>
                      </motion.div>
                    )
                  })
                ) : (
                  <div className="col-span-2 text-center text-gray-400">
                    <p>Stats data not available</p>
                  </div>
                )}
              </div>
              <motion.div
                className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <Star className="h-5 w-5 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Quick Facts</h4>
                </div>
                <div className="space-y-4">
                                      {data.personal.quickFacts && data.personal.quickFacts.length > 0 ? (
                      data.personal.quickFacts.map((fact, index) => {
                        const iconMap = [Code2, Target, Users2, TrendingUp]
                        const IconComponent = iconMap[index] || Code2
                        const colors = [
                          "from-blue-500/20 to-cyan-500/20 text-blue-400",
                          "from-green-500/20 to-emerald-500/20 text-green-400",
                          "from-purple-500/20 to-pink-500/20 text-purple-400",
                          "from-orange-500/20 to-red-500/20 text-orange-400",
                        ]
                        const colorClass = colors[index % colors.length]
                        const factRef = useRef<HTMLDivElement>(null)
                        const inView = useInView(factRef, { amount: 0.6 })

                      return (
                                                  <motion.div
                            key={index}
                            ref={factRef}
                          className="p-4 rounded-lg bg-gradient-to-r from-gray-700/30 to-gray-800/30 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:scale-102"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClass} flex-shrink-0`}>
                              {IconComponent && <IconComponent className="h-5 w-5" />}
                            </div>
                            <div className="flex-1">
                              <h5 className="text-white font-semibold">{fact.title}</h5>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })
                  ) : (
                    <div className="text-gray-400 text-center py-4">No quick facts available</div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
