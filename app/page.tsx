"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AnimatedBackground } from "@/components/animated-background"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StickyTabs } from "@/components/sticky-tabs"
import { ExperienceTab } from "@/components/experience-tab"
import { EducationTab } from "@/components/education-tab"
import { ExtrasTab } from "@/components/extras-tab"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"
import type { Language } from "@/lib/translations"

export default function Home() {
  const [language, setLanguage] = useState<Language>("en")
  const [activeTab, setActiveTab] = useState("experience")
  const [isTabsSticky, setIsTabsSticky] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("portfolio-language", language)
  }, [language])

  const tabContent = {
    experience: <ExperienceTab language={language} />,
    education: <EducationTab language={language} />,
    extras: <ExtrasTab language={language} />,
  }

  return (
    <main className="min-h-screen">
      <AnimatedBackground />

      <Header language={language} setLanguage={setLanguage} hidden={isTabsSticky} />

      <HeroSection language={language} />

      <StickyTabs
        language={language}
        setLanguage={setLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStickyChange={setIsTabsSticky}
      />

      {/* Tab content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {tabContent[activeTab as keyof typeof tabContent]}
          </motion.div>
        </AnimatePresence>
      </section>

      <ProjectsSection language={language} />

      <Footer language={language} />
    </main>
  )
}
