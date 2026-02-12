"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Award, FolderKanban } from "lucide-react"
import { translations, type Language } from "@/lib/translations"
import { cn } from "@/lib/utils"

interface TabsNavigationProps {
  language: Language
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function TabsNavigation({ language, activeTab, setActiveTab }: TabsNavigationProps) {
  const t = translations[language]

  const tabs = [
    { id: "experience", label: t.experience, icon: Briefcase },
    { id: "education", label: t.education, icon: GraduationCap },
    { id: "extras", label: t.extras, icon: Award },
    { id: "projects", label: t.projectsTab, icon: FolderKanban },
  ]

  return (
    <div className="sticky top-16 z-40 glass bg-background/80 border-b border-border/50 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-secondary/50">
            {tabs.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeTab === id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
