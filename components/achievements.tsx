"use client"

import { Trophy, Code2, Users, Gamepad2, Star } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect } from "react"
import { useMotionValue, animate } from "framer-motion"
import data from "@/data.json"

const iconMap = {
  Trophy,
  Users,
  Star,
}

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

export function Achievements() {
  const programmingStats = data.achievementsData.programmingStats
  const achievements = data.achievementsData.achievements
  const bottomCardRef = useRef(null)
  const bottomCardInView = useInView(bottomCardRef, { amount: 0.7 })

  return (
    <section id="achievements" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Recognition and milestones</p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Programming Stats */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="h-8 w-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Programming Excellence</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {programmingStats.map((stat, index) => {
                const cardRef = useRef(null)
                const inView = useInView(cardRef, { amount: 0.7 })
                return (
                  <motion.div 
                    key={index} 
                    ref={cardRef}
                    className="relative group"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                  >
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-white mb-2">{stat.platform}</h4>
                        <div
                          className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                        >
                          <AnimatedNumber value={stat.rating} inView={inView} />
                        </div>
                        {stat.platform !== "LeetCode" ? (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${stat.color} text-white`}
                          >
                            {stat.badge}
                          </span>
                        ) : (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium bg-transparent text-transparent"
                          >
                            {stat.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div 
              ref={bottomCardRef}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">
                <AnimatedNumber value="750+" inView={bottomCardInView} />
              </div>
              <p className="text-gray-300">Problems solved across platforms</p>
            </motion.div>
          </div>

          {/* Other Achievements */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">Recognition & Leadership</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Trophy
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} bg-opacity-20`}>
                        <Icon
                          className={`h-6 w-6 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{achievement.title}</h4>
                        <p className="text-gray-300 mb-2">{achievement.description}</p>
                        <p className="text-sm text-gray-400">{achievement.organization}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sports Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Gamepad2 className="h-8 w-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Sports & Recreation</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Football", detail: "Inter-IIT Team", color: "from-green-400 to-blue-500" },
                { name: "Chess", detail: "1729 Rating", color: "from-yellow-400 to-orange-500" },
                { name: "Badminton", detail: "Recreational", color: "from-purple-400 to-pink-500" },
                { name: "Table Tennis", detail: "Recreational", color: "from-blue-400 to-cyan-500" },
              ].map((sport, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 text-center"
                >
                  <div
                    className={`text-lg font-bold bg-gradient-to-r ${sport.color} bg-clip-text text-transparent mb-1`}
                  >
                    {sport.name}
                  </div>
                  <div className="text-xs text-gray-400">{sport.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
