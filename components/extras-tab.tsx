"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Heart, Users, Calendar } from "lucide-react";
import { translations, type Language } from "@/lib/translations";
import { Badge } from "@/components/ui/badge";

interface ExtrasTabProps {
  language: Language;
}

export function ExtrasTab({ language }: ExtrasTabProps) {
  const t = translations[language];
  const extras = t.extrasData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const sections = [
    {
      key: "hackathons",
      title: t.hackathons,
      icon: Trophy,
      data: extras.hackathons,
    },
    //{ key: "awards", title: t.awards, icon: Award, data: extras.awards },
    {
      key: "volunteering",
      title: t.volunteering,
      icon: Heart,
      data: extras.volunteering,
    },
    //{ key: "communities", title: t.communities, icon: Users, data: extras.communities },
    { key: "events", title: t.events, icon: Calendar, data: extras.events },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center"
      >
        {t.extrasTitle}
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map(({ key, title, icon: Icon, data }) => (
          <motion.div
            key={key}
            variants={itemVariants}
            className="glass bg-card rounded-xl border border-border/50 shadow-lg overflow-hidden"
          >
            <div className="p-4 bg-primary/5 border-b border-border/50 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{title}</h3>
            </div>
            <div className="p-4 space-y-3">
              {data.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 4 }}
                  className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <h4 className="font-medium text-foreground text-sm">
                    {item.name}
                  </h4>
                  {"result" in item && (
                    <div className="mt-1 flex flex-col gap-1">
                      {/* role + year */}
                      <div className="text-xs text-muted-foreground">
                        {item.result} • {item.year}
                      </div>

                      {/* link */}
                      {"link" in item && item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
          text-xs font-medium text-primary
          hover:underline
          w-fit
        "
                        >
                          {t.learnMore} →
                        </a>
                      )}
                    </div>
                  )}

                  {"issuer" in item && (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {item.issuer}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.year}
                      </span>
                    </div>
                  )}
                  {"organization" in item && (
                    <div className="mt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary">
                          {item.organization}
                        </span>

                        {"link" in item && item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-primary hover:underline"
                          >
                            {t.learnMore} →
                          </a>
                        )}
                      </div>

                      {"description" in item && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
                  {"role" in item && !("organization" in item) && (
                    <span className="text-xs text-muted-foreground">
                      {item.role}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
