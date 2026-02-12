"use client";

import { motion } from "framer-motion";
import { translations, type Language } from "@/lib/translations";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface ExperienceTabProps {
  language: Language;
}

export function ExperienceTab({ language }: ExperienceTabProps) {
  const t = translations[language];
  const experiences = t.experiences;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center"
      >
        {t.experienceTitle}
      </motion.h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            variants={itemVariants}
            className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-12 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1.5 md:-translate-x-2 mt-2" />

            {/* Content */}
            <div
              className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass bg-card p-6 rounded-xl border border-border/50 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold text-foreground">
                    {exp.company}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {exp.period.start} —{" "}
                    {exp.period.end === "Present" ? t.present : exp.period.end}
                  </span>
                </div>

                <h4 className="text-primary font-semibold mb-3">{exp.role}</h4>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {exp.website && (
                  <div className="mt-4">
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      {t.visitCompanyWebsite}
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
