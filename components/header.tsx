"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Language, translations } from "@/lib/translations";
import { useEffect, useState } from "react";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  hidden?: boolean;
}

export function Header({ language, setLanguage, hidden = false }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const t = translations[language];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: hidden ? -100 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 bg-background/70 ${hidden ? "pointer-events-none" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <motion.span
            className="text-xl font-bold text-foreground"
            whileHover={{ scale: 1.05 }}
          >
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
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Languages className="h-5 w-5" />
              </motion.div>
              <span className="absolute -bottom-0.5 text-[10px] font-medium">
                {language.toUpperCase()}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? t.lightMode : t.darkMode}
            >
              <motion.div
                className="relative flex items-center justify-center w-5 h-5"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </motion.div>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
