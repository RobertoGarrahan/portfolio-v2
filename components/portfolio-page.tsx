"use client";

import { useState, useEffect } from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { StickyTabs } from "@/components/sticky-tabs";
import { ExperienceTab } from "@/components/experience-tab";
import { EducationTab } from "@/components/education-tab";
import { ProjectsSection } from "@/components/projects-section";
import { ExtrasTab } from "@/components/extras-tab";
import { Footer } from "@/components/footer";
import { useActiveSection } from "@/hooks/use-active-section";
import { SECTION_IDS, type PortfolioData } from "@/lib/data";
import type { Language } from "@/lib/translations";

interface PortfolioPageProps {
  data: PortfolioData;
}

export function PortfolioPage({ data }: PortfolioPageProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [activeSection, setActiveSection] = useActiveSection(
    SECTION_IDS,
    "experiencia",
  );

  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  const profile = data.profile[language];

  return (
    <main className="min-h-[100dvh]">
      <AnimatedBackground />

      <Header
        language={language}
        setLanguage={setLanguage}
        hidden={isTabsSticky}
      />

      <HeroSection language={language} profile={profile} />

      <StickyTabs
        language={language}
        setLanguage={setLanguage}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onStickyChange={setIsTabsSticky}
      />

      <ExperienceTab
        language={language}
        experiences={data.experiences[language]}
      />

      <EducationTab language={language} data={data.education[language]} />

      <ProjectsSection language={language} projects={data.projects[language]} />

      <ExtrasTab language={language} data={data.extras[language]} />

      <Footer language={language} profile={profile} />
    </main>
  );
}
