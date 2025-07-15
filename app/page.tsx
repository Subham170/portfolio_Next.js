import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { SkillsCarousel } from "@/components/skills-carousel"
import { Achievements } from "@/components/achievements"
import { Contact } from "@/components/contact"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatedBackground />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <SkillsCarousel />
      <Achievements />
      <Contact />
    </main>
  )
}
