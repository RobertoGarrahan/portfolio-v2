"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Download,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { translations, type Language } from "@/lib/translations";
import { socialLinks } from "@/lib/data";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  language: Language;
}

export function HeroSection({ language }: HeroSectionProps) {
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const socialIcons = [
    { icon: Github, href: socialLinks.github, label: "GitHub" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${socialLinks.email}`, label: "Email" },
  ];

  const scrollToProjects = () => {
    document
      .getElementById("projects-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNextSection = () => {
    const currentSection = document.getElementById("hero-section");
    if (!currentSection) return;

    const nextSection = currentSection.nextElementSibling as HTMLElement;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resumeFile =
    language === "pt"
      ? "/CV_Luiz_Roberto_Garrahan_de_Oliveira_PT.pdf"
      : "/CV_Luiz_Roberto_Garrahan_de_Oliveira_EN.pdf";

  const resumeDownloadName =
    language === "pt"
      ? "CV_Luiz_Roberto_Garrahan_de_Oliveira.pdf"
      : "Luiz_Roberto_Garrahan_de_Oliveira_Resume.pdf";

  return (
    <section
      id="hero-section"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full text-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-lg mb-2"
        >
          {t.greeting}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-4 text-balance"
        >
          {t.name}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-6"
        >
          {t.role}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed text-pretty"
        >
          {t.intro}
        </motion.p>

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-3 mb-10"
        >
          {socialIcons.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="gap-2 h-12 px-6 text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            <motion.a
              href={resumeFile}
              download={resumeDownloadName}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-5 h-5" />
              {t.downloadResume}
            </motion.a>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="gap-2 h-12 px-6 text-base font-semibold shadow-md hover:shadow-lg transition-shadow border border-border"
            onClick={scrollToProjects}
          >
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FolderOpen className="w-5 h-5" />
              {t.projects}
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToNextSection}
          aria-label="Scroll down"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="
    flex items-center justify-center p-2 rounded-full
    bg-background/60 backdrop-blur
    transition-all duration-300
    hover:bg-primary/10
    hover:shadow-lg
  "
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground transition-colors group-hover:text-primary" />
        </motion.button>
      </motion.div>
    </section>
  );
}
