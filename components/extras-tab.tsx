"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Trophy,
  Heart,
  Calendar,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";
import { translations, type Language } from "@/lib/translations";
import type {
  EventItem,
  ExtrasSectionData,
  HackathonItem,
  VolunteeringItem,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const VISIBLE_ITEMS = 3;

type ExtraCardItem = HackathonItem | VolunteeringItem | EventItem;

interface ExtrasTabProps {
  language: Language;
  data: ExtrasSectionData;
}

interface ExtrasCardProps {
  title: string;
  icon: LucideIcon;
  items: ExtraCardItem[];
  learnMoreLabel: string;
  language: Language;
  variants: {
    hidden: { opacity: number; scale: number };
    visible: {
      opacity: number;
      scale: number;
      transition: { duration: number; ease: "easeOut" };
    };
  };
}

function ExtrasCard({
  title,
  icon: Icon,
  items,
  learnMoreLabel,
  language,
  variants,
}: ExtrasCardProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const hasMore = items.length > VISIBLE_ITEMS;
  const maxPage = Math.max(0, Math.ceil(items.length / VISIBLE_ITEMS) - 1);
  const safePage = Math.min(page, maxPage);
  const startIndex = safePage * VISIBLE_ITEMS;
  const visibleItems = hasMore
    ? items.slice(startIndex, startIndex + VISIBLE_ITEMS)
    : items;

  const canScrollUp = safePage > 0;
  const canScrollDown = safePage < maxPage;

  const handlePrev = () => {
    if (!canScrollUp) return;
    setDirection(-1);
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!canScrollDown) return;
    setDirection(1);
    setPage((prev) => Math.min(maxPage, prev + 1));
  };

  const prevLabel = language === "pt" ? "Ver itens anteriores" : "Previous items";
  const nextLabel = language === "pt" ? "Ver próximos itens" : "Next items";

  return (
    <motion.div
      variants={variants}
      className="glass bg-card rounded-xl border border-border/50 shadow-lg overflow-hidden flex flex-col"
    >
      <div className="p-4 bg-primary/5 border-b border-border/50 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>

      <div className="p-4 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={safePage}
            initial={{ opacity: 0, y: direction * 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction * -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-3"
          >
            {visibleItems.map((item) => (
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
                    <div className="text-xs text-muted-foreground">
                      {item.result} • {item.year}
                    </div>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-primary hover:underline w-fit"
                      >
                        {learnMoreLabel} →
                      </a>
                    )}
                  </div>
                )}

                {"organization" in item && (
                  <div className="mt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary">
                        {item.organization}
                      </span>

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          {learnMoreLabel} →
                        </a>
                      )}
                    </div>

                    {item.description && (
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
          </motion.div>
        </AnimatePresence>
      </div>

      {hasMore && (
        <div className="px-4 py-2.5 border-t border-border/50 bg-primary/5 flex items-center justify-between">
          <span className="text-xs text-muted-foreground tabular-nums">
            {startIndex + 1}–{startIndex + visibleItems.length} / {items.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canScrollUp}
              aria-label={prevLabel}
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                canScrollUp
                  ? "cursor-pointer bg-primary/15 border-primary/40 text-primary hover:bg-primary/25 hover:border-primary/65 hover:scale-105 active:scale-95"
                  : "opacity-35 cursor-not-allowed bg-secondary/40 border-border/40 text-muted-foreground",
              )}
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canScrollDown}
              aria-label={nextLabel}
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                canScrollDown
                  ? "cursor-pointer bg-primary/15 border-primary/40 text-primary hover:bg-primary/25 hover:border-primary/65 hover:scale-105 active:scale-95"
                  : "opacity-35 cursor-not-allowed bg-secondary/40 border-border/40 text-muted-foreground",
              )}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function ExtrasTab({ language, data }: ExtrasTabProps) {
  const t = translations[language];

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
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const sections = [
    {
      key: "hackathons",
      title: t.hackathons,
      icon: Trophy,
      items: data.hackathons,
    },
    {
      key: "volunteering",
      title: t.volunteering,
      icon: Heart,
      items: data.volunteering,
    },
    {
      key: "events",
      title: t.events,
      icon: Calendar,
      items: data.events,
    },
  ];

  return (
    <motion.section
      id="extras"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      className="scroll-mt-14 pt-0 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto border-t border-border/50 pt-6">
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center"
        >
          {t.extrasTitle}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(({ key, title, icon, items }) => (
            <ExtrasCard
              key={key}
              title={title}
              icon={icon}
              items={items}
              learnMoreLabel={t.learnMore}
              language={language}
              variants={itemVariants}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
