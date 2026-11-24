"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { translations, type Language } from "@/lib/translations";
import type { ProfileData } from "@/lib/data";

interface HeroSectionProps {
  language: Language;
  profile: ProfileData;
}

export function HeroSection({ language, profile }: HeroSectionProps) {
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
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const socialIcons = [
    { icon: Github, href: profile.socialLinks.github, label: "GitHub" },
    { icon: Linkedin, href: profile.socialLinks.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.socialLinks.email}`, label: "Email" },
  ];

  const scrollToNextSection = () => {
    document
      .getElementById("experiencia")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resumeFile = profile.resumeUrl;

  const resumeDownloadName =
    language === "pt"
      ? "CV_Luiz_Roberto_Garrahan_de_Oliveira.pdf"
      : "Luiz_Roberto_Garrahan_de_Oliveira_Resume.pdf";

  return (
    <section
      id="hero-section"
      className="relative min-h-[calc(100dvh-5.5rem)] sm:min-h-[calc(100dvh-5.25rem)] [@media(min-width:640px)_and_(max-height:820px)]:min-h-[calc(100dvh-5.75rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-14 sm:pt-16 sm:pb-24 md:pb-28 [@media(min-width:640px)_and_(max-height:820px)]:pt-14 [@media(min-width:640px)_and_(max-height:820px)]:pb-16"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full text-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-base sm:text-lg mb-1.5 sm:mb-2 [@media(min-width:640px)_and_(max-height:820px)]:mb-1"
        >
          {profile.greeting}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-7xl [@media(min-width:640px)_and_(max-height:820px)]:text-5xl font-bold text-foreground mb-2.5 sm:mb-4 [@media(min-width:640px)_and_(max-height:820px)]:mb-2 text-balance"
        >
          {profile.name}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl [@media(min-width:640px)_and_(max-height:820px)]:text-2xl font-semibold text-primary mb-4 sm:mb-6 [@media(min-width:640px)_and_(max-height:820px)]:mb-3"
        >
          {profile.role}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-sm sm:text-lg [@media(min-width:640px)_and_(max-height:820px)]:text-base max-w-2xl mx-auto mb-5 sm:mb-8 [@media(min-width:640px)_and_(max-height:820px)]:mb-5 leading-relaxed text-pretty"
        >
          {profile.intro}
        </motion.p>

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-3 mb-6 sm:mb-10 [@media(min-width:640px)_and_(max-height:820px)]:mb-6"
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
              className="p-2 sm:p-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="gap-2 h-10 sm:h-12 px-5 sm:px-6 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            <motion.a
              href={resumeFile}
              download={resumeDownloadName}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              {t.downloadResume}
            </motion.a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-5 sm:bottom-6 md:bottom-7 [@media(min-width:640px)_and_(max-height:820px)]:bottom-4 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          type="button"
          onClick={scrollToNextSection}
          aria-label={t.scrollExplore}
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-primary/15 border border-primary/45 text-primary shadow-md shadow-primary/20 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-primary/25 hover:border-primary/70 hover:shadow-[0_0_20px_-2px_color-mix(in_oklch,var(--primary)_60%,transparent)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
