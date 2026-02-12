"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Mail, Heart } from "lucide-react"
import { translations, type Language } from "@/lib/translations"
import { socialLinks } from "@/lib/data"

interface FooterProps {
  language: Language
}

export function Footer({ language }: FooterProps) {
  const t = translations[language]

  const socialIcons = [
    { icon: Github, href: socialLinks.github, label: "GitHub" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${socialLinks.email}`, label: "Email" },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-20 py-8 border-t border-border/50 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t.name}. {t.copyright}
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
