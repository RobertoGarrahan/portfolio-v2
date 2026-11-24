"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { translations, type Language } from "@/lib/translations";
import type { EducationSectionData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface EducationTabProps {
  language: Language;
  data: EducationSectionData;
}

export function EducationTab({ language, data }: EducationTabProps) {
  const t = translations[language];
  const { degrees, certifications, courses } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  return (
    <motion.section
      id="educacao"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      className="scroll-mt-14 pt-0 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto border-t border-border/50 pt-6">
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center"
        >
          {t.educationTitle}
        </motion.h2>

        <div className="grid gap-8">
          {degrees.map((edu) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass bg-card p-6 rounded-xl border border-border/50 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {edu.degree}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {edu.period.start} — {edu.period.end}
                    </span>
                  </div>
                  <p className="text-primary font-medium mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              {t.certifications}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="glass bg-card p-4 rounded-xl border border-border/50 shadow-md"
                >
                  <h4 className="font-semibold text-foreground mb-1">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {cert.year}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {t.courses}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="glass bg-card p-4 rounded-xl border border-border/50 shadow-md"
                >
                  <h4 className="font-semibold text-foreground mb-1">
                    {course.name}
                  </h4>
                  {course.platform && (
                    <p className="text-sm text-muted-foreground">
                      {course.platform}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
