"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Language, translations } from "@/lib/translations"

interface NavbarProps {
  language: Language
  setLanguage: (lang: Language) => void
}

export function Navbar({ language, setLanguage }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en")
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass bg-background/70 border-b border-border/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.span className="text-xl font-bold text-foreground" whileHover={{ scale: 1.05 }}>
            {"<Dev />"}
          </motion.span>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              aria-label={`Switch to ${language === "en" ? "Portuguese" : "English"}`}
              className="relative overflow-hidden"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Languages className="h-5 w-5" />
              </motion.div>
              <span className="absolute -bottom-0.5 text-[10px] font-medium">{language.toUpperCase()}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? t.lightMode : t.darkMode}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.95 }}>
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </motion.div>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
