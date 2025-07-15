"use client"

import { GraduationCap, Code, Zap } from "lucide-react"
import data from "@/data.json"
import { motion, useMotionValue, animate, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const number = parseInt(value.replace(/\D/g, ""))
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
      motionValue.set(0)
      if (ref.current) ref.current.textContent = "0"
    }
    return () => controls && controls.stop && controls.stop()
  }, [number, motionValue, inView])

  return (
    <span>
      <span ref={ref}>0</span>{suffix}
    </span>
  )
}

export function About() {
  const iconMap = {
    GraduationCap,
    Code,
    Zap,
  }

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
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${data.sections.about.sections[0].color}`}>
                    <GraduationCap className={`h-6 w-6 ${data.sections.about.sections[0].iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{data.sections.about.sections[0].title}</h3>
                </div>
                <div className="pl-11">
                  <h4 className="text-lg font-medium text-blue-400 mb-1">
                    {data.personal.education.institution}
                  </h4>
                  <p className="text-gray-300 mb-2">{data.personal.education.degree}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span>{data.personal.education.graduation}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${data.sections.about.sections[1].color}`}>
                    <Code className={`h-6 w-6 ${data.sections.about.sections[1].iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{data.sections.about.sections[1].title}</h3>
                </div>
                <div className="pl-11">
                  <p className="text-gray-300 leading-relaxed">
                    {data.sections.about.sections[1].description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${data.sections.about.sections[2].color}`}>
                    <Zap className={`h-6 w-6 ${data.sections.about.sections[2].iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{data.sections.about.sections[2].title}</h3>
                </div>
                <div className="pl-11">
                  <p className="text-gray-300 leading-relaxed">
                    {data.sections.about.sections[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Stats/Highlights */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">My Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {data.personal.stats && data.personal.stats.length > 0 ? (
                  data.personal.stats.map((stat, index) => {
                    const cardRef = useRef(null)
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
                        <div className={`text-3xl font-bold bg-gradient-to-r ${getEnhancedColor(stat.color)} bg-clip-text text-transparent mb-2 drop-shadow-lg`}>
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

              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">Quick Facts</h4>
                <ul className="space-y-2 text-gray-300">
                  {data.personal.quickFacts && data.personal.quickFacts.length > 0 ? (
                    data.personal.quickFacts.map((fact, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className={`w-2 h-2 bg-${
                          index === 0 ? "blue" : 
                          index === 1 ? "green" : 
                          index === 2 ? "purple" : "orange"
                        }-400 rounded-full`}></span>
                        <span className="text-white">{fact}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">No quick facts available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
