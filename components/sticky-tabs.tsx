"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Languages, Briefcase, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Language, translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

interface StickyTabsProps {
  language: Language
  setLanguage: (lang: Language) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  onStickyChange?: (isSticky: boolean) => void
}

const STICKY_HEADER_HEIGHT = 52

export function StickyTabs({ language, setLanguage, activeTab, setActiveTab, onStickyChange }: StickyTabsProps) {
  const { theme, setTheme } = useTheme()
  const t = translations[language]
  const [isSticky, setIsSticky] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [tabsOffsetTop, setTabsOffsetTop] = useState(0)

  useEffect(() => {
    const updateOffset = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect()
        const scrollTop = window.scrollY
        setTabsOffsetTop(rect.top + scrollTop)
      }
    }

    updateOffset()
    window.addEventListener("resize", updateOffset)
    return () => window.removeEventListener("resize", updateOffset)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 56
      const newIsSticky = window.scrollY > tabsOffsetTop - headerHeight
      setIsSticky(newIsSticky)
      onStickyChange?.(newIsSticky)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [tabsOffsetTop, onStickyChange])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en")
  }

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return
    
    setActiveTab(tabId)
    
    // Scroll to tab content area with offset for sticky header
    // Only scroll if we're already past the tabs (in sticky mode)
    if (isSticky && tabsRef.current) {
      const scrollTarget = tabsOffsetTop - STICKY_HEADER_HEIGHT
      window.scrollTo({
        top: scrollTarget,
        behavior: "smooth"
      })
    }
  }

  const tabs = [
    { id: "experience", label: t.experience, icon: Briefcase },
    { id: "education", label: t.education, icon: GraduationCap },
    { id: "extras", label: t.extras, icon: Award },
  ]

  return (
    <>
      {/* Placeholder to maintain layout when tabs become fixed */}
      <div ref={tabsRef} className={cn(isSticky && "h-[52px]")} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={cn(
          "z-50 glass border-b border-border/50 transition-all duration-300 pointer-events-auto",
          isSticky ? "fixed top-0 left-0 right-0 bg-background/95 shadow-sm" : "relative bg-background/70",
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!isSticky ? (
              <motion.div
                key="normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="py-3"
              >
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-0.5 sm:gap-1 p-1 rounded-full bg-muted/50 border border-border/30">
                      {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => handleTabChange(id)}
                          className={cn(
                            "relative flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                            activeTab === id
                              ? "text-foreground bg-background shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="compact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between h-[52px] gap-4"
              >
                {/* Logo - clickable */}
                <motion.a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="text-lg font-bold text-foreground shrink-0 cursor-pointer select-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {"<RG/>"}
                </motion.a>

                {/* Tabs - horizontally scrollable pill style */}
                <div className="flex-1 overflow-x-auto scrollbar-hide">
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center gap-0.5 sm:gap-1 p-0.5 rounded-full bg-muted/50 border border-border/30">
                      {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => handleTabChange(id)}
                          className={cn(
                            "relative flex items-center gap-0.5 sm:gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                            activeTab === id
                              ? "text-foreground bg-background shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                          )}
                        >
                          <Icon className="w-5.5 h-5.5" />
                          <span className="hidden sm:inline">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Controls - ensure buttons are clickable */}
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    aria-label={`Switch to ${language === "en" ? "Portuguese" : "English"}`}
                    className="h-8 w-8 p-0 relative"
                  >
                    <Languages className="h-4 w-4" />
                    <span className="absolute -bottom-0 text-[8px] font-medium">{language.toUpperCase()}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label={theme === "dark" ? t.lightMode : t.darkMode}
                    className="h-8 w-8 p-0"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
