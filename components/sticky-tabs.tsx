"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Languages,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Language, translations } from "@/lib/translations";
import type { SectionId } from "@/lib/data";
import { cn } from "@/lib/utils";

interface StickyTabsProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeSection: SectionId;
  onSelectSection?: (section: SectionId) => void;
  onStickyChange?: (isSticky: boolean) => void;
}

export function StickyTabs({
  language,
  setLanguage,
  activeSection,
  onSelectSection,
  onStickyChange,
}: StickyTabsProps) {
  const { theme, setTheme } = useTheme();
  const t = translations[language];
  const [isSticky, setIsSticky] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsOffsetTop, setTabsOffsetTop] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        setTabsOffsetTop(rect.top + window.scrollY);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 56;
      const newIsSticky = window.scrollY > tabsOffsetTop - headerHeight;
      setIsSticky(newIsSticky);
      onStickyChange?.(newIsSticky);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabsOffsetTop, onStickyChange]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en");
  };

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: SectionId,
  ) => {
    event.preventDefault();
    onSelectSection?.(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  const navItems: { id: SectionId; label: string; icon: typeof Briefcase }[] = [
    { id: "experiencia", label: t.experience, icon: Briefcase },
    { id: "educacao", label: t.education, icon: GraduationCap },
    { id: "projetos", label: t.projectsTab, icon: FolderKanban },
    { id: "extras", label: t.extras, icon: Award },
  ];

  return (
    <>
      <div ref={tabsRef} className={cn(isSticky && "h-[52px]")} />

      <motion.nav
        aria-label="Section navigation"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
        className={cn(
          "z-50 backdrop-blur-md border-b transition-all duration-300 pointer-events-auto",
          isSticky
            ? "fixed top-0 left-0 right-0 bg-background/90 border-primary/20 shadow-md shadow-primary/5"
            : "relative bg-background/60 border-border/40",
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
                className="pt-2.5 pb-3.5 sm:pt-3 sm:pb-6 [@media(min-width:640px)_and_(max-height:820px)]:pt-2 [@media(min-width:640px)_and_(max-height:820px)]:pb-7"
              >
                <div className="flex justify-center">
                  <div className="grid grid-cols-4 sm:inline-flex sm:flex-nowrap w-full sm:w-auto items-center gap-1 p-1.5 rounded-2xl sm:rounded-full bg-card/85 dark:bg-card/90 backdrop-blur-md border border-primary/45 ring-1 ring-primary/20 shadow-[0_0_24px_-4px_color-mix(in_oklch,var(--primary)_40%,transparent),0_8px_20px_-6px_color-mix(in_oklch,var(--primary)_25%,transparent)]">
                    {navItems.map(({ id, label, icon: Icon }) => {
                      const isActive = activeSection === id;
                      return (
                        <a
                          key={id}
                          href={`#${id}`}
                          aria-current={isActive ? "location" : undefined}
                          onClick={(e) => handleSectionClick(e, id)}
                          className={cn(
                            "group relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 rounded-xl sm:rounded-full text-[11px] sm:text-sm leading-tight font-medium transition-all duration-300 ease-out text-center whitespace-nowrap",
                            isActive
                              ? "text-primary font-semibold"
                              : "text-muted-foreground hover:text-foreground hover:bg-primary/10",
                          )}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="activeSectionPill"
                              transition={{
                                duration: 0.3,
                                ease: "easeOut",
                              }}
                              className="absolute inset-0 rounded-xl sm:rounded-full bg-primary/15 dark:bg-primary/20 border border-primary/35 shadow-sm"
                            />
                          )}
                          <Icon
                            className={cn(
                              "relative z-10 w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0 transition-colors duration-200",
                              isActive
                                ? "text-primary"
                                : "group-hover:text-primary",
                            )}
                          />
                          <span className="relative z-10">{label}</span>
                        </a>
                      );
                    })}
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
                className="flex items-center justify-between min-h-[52px] py-1.5 sm:py-0 gap-2 sm:gap-4"
              >
                <motion.a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    window.history.replaceState(null, "", window.location.pathname);
                  }}
                  className="text-lg font-bold text-foreground shrink-0 cursor-pointer select-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {"<RG/>"}
                </motion.a>

                <div className="flex-1 flex items-center justify-center min-w-0">
                  <div className="inline-flex max-w-full flex-wrap sm:flex-nowrap items-center justify-center gap-1 p-1 sm:p-0.5 rounded-2xl sm:rounded-full bg-card/85 backdrop-blur-md border border-primary/35 ring-1 ring-primary/15 shadow-[0_0_16px_-4px_color-mix(in_oklch,var(--primary)_30%,transparent)]">
                    {navItems.map(({ id, label, icon: Icon }) => {
                      const isActive = activeSection === id;
                      return (
                        <a
                          key={id}
                          href={`#${id}`}
                          aria-label={label}
                          title={label}
                          aria-current={isActive ? "location" : undefined}
                          onClick={(e) => handleSectionClick(e, id)}
                          className={cn(
                            "group relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-full text-xs font-medium transition-all duration-300 ease-out whitespace-nowrap",
                            isActive
                              ? "text-primary font-semibold"
                              : "text-muted-foreground hover:text-foreground hover:bg-primary/10",
                          )}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="activeSectionPillCompact"
                              transition={{
                                duration: 0.3,
                                ease: "easeOut",
                              }}
                              className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/20 border border-primary/35 shadow-sm"
                            />
                          )}
                          <Icon
                            className={cn(
                              "relative z-10 w-4 h-4 shrink-0 transition-colors duration-200",
                              isActive
                                ? "text-primary"
                                : "group-hover:text-primary",
                            )}
                          />
                          <span className="relative z-10 hidden sm:inline">
                            {label}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    aria-label={`Switch to ${language === "en" ? "Portuguese" : "English"}`}
                    className="h-8 w-8 p-0 relative"
                  >
                    <Languages className="h-4 w-4" />
                    <span className="absolute -bottom-0 text-[8px] font-medium">
                      {language.toUpperCase()}
                    </span>
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
      </motion.nav>
    </>
  );
}
