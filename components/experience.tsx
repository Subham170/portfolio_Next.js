"use client"

import { Calendar } from "lucide-react"
import data from "@/data.json"

export function Experience() {
  return (
    <section id="experience" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {data.sections.experience.title}
            </span>
          </h2>
          <p className="text-gray-400 text-lg">{data.sections.experience.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {data.experience.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline line */}
              {index < data.experience.length - 1 && (
                <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-blue-500 to-purple-500 opacity-30" />
              )}

              {/* Timeline dot */}
              <div
                className={`absolute left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-r ${exp.gradient} shadow-lg`}
              />

              {/* Content */}
              <div className="ml-16 p-8 rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                  <div>
                    <h3
                      className={`text-2xl font-bold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent mb-2`}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-xl text-white font-semibold">{exp.company}</p>
                    {exp.description && <p className="text-gray-400 italic text-sm mt-1">{exp.description}</p>}
                  </div>
                  <div className="flex flex-col items-start lg:items-end gap-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{exp.duration}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${exp.gradient} text-white`}
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.gradient} mt-2 flex-shrink-0`} />
                      <p className="text-gray-300 leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:border-blue-500/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
