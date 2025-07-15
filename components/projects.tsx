"use client"

import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Zap, Users, TrendingUp, MessageCircle, ShoppingCart } from "lucide-react"
import Link from "next/link"
import data from "@/data.json"

export function Projects() {
  const iconMap = {
    Users,
    Zap,
    TrendingUp,
    MessageCircle,
    ShoppingCart,
  }

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {data.sections.projects.title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg">{data.sections.projects.subtitle}</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-3xl bg-gradient-to-br ${project.bgGradient} backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 group h-full`}
              >
                {/* Background decoration */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Project header (no emoji) */}
                  <div className="text-center mb-6">
                    <h3
                      className={`text-xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-3`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">{project.description}</p>
                      {/* <p className="text-gray-400 text-xs leading-relaxed">{project.longDescription}</p> */}
                    </div>

                    {/* Achievements */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-white">Key Achievements</h4>
                      <div className="space-y-2">
                        {project.achievements.map((achievement, i) => {
                          const IconComponent = iconMap[achievement.icon as keyof typeof iconMap]
                          return (
                            <div key={i} className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg bg-gray-800/50 ${achievement.color}`}>
                                <IconComponent className="h-3 w-3" />
                              </div>
                              <span className="text-gray-300 text-xs">{achievement.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Source Code Button */}
                  <div className="pt-4 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 hover:scale-105 bg-transparent text-xs w-full"
                      asChild
                    >
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
