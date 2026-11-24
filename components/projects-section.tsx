"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { translations, type Language } from "@/lib/translations";
import type { ProjectItem } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectsSectionProps {
  language: Language;
  projects: ProjectItem[];
}

export function ProjectsSection({ language, projects }: ProjectsSectionProps) {
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <motion.section
      id="projetos"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      className="scroll-mt-14 pt-0 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto border-t border-border/50 pt-6">
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center"
        >
          {t.projectsTitle}
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group glass bg-card rounded-xl border border-border/50 shadow-lg overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                {project.private ? (
                  <div className="w-full flex justify-center">
                    <Badge
                      variant="default"
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wide"
                    >
                      NDA Project
                    </Badge>
                  </div>
                ) : (
                  <>
                    {project.liveUrl && (
                      <Button asChild size="sm" className="flex-1 gap-2">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t.liveDemo}
                        </motion.a>
                      </Button>
                    )}

                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className={`${project.liveUrl ? "flex-1" : "w-full"} gap-2 bg-transparent`}
                      >
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Github className="w-4 h-4" />
                          {t.viewCode}
                        </motion.a>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      </div>
    </motion.section>
  );
}
