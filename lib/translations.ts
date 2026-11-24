export const translations = {
  en: {
    // Hero
    greeting: "Hello, I'm",
    name: "Roberto Garrahan",
    role: "Software Engineer",
    intro:
      "I build scalable and secure applications, APIs, and modern systems. Passionate about technology, clean code, and solving real-world problems. Always learning and evolving.",
    viewResume: "View Resume",
    downloadResume: "Download Resume",
    projects: "Projects",
    contact: "Contact",
    scrollExplore: "Feel free to explore the page",

    // Navigation
    experience: "Experience",
    education: "Education",
    extras: "Extras",
    projectsTab: "Projects",

    // Experience
    experienceTitle: "Professional Experience",
    present: "Present",
    visitCompanyWebsite: "Visit company website",

    // Education
    educationTitle: "Education & Certifications",
    certifications: "Certifications",
    courses: "Languages",

    // Extras
    extrasTitle: "Achievements & Activities",
    hackathons: "Hackathons",
    awards: "Awards",
    volunteering: "Extras",
    communities: "Communities",
    events: "Events",
    learnMore: "Learn more",

    // Projects
    projectsTitle: "Featured Projects",
    liveDemo: "Live Demo",
    viewCode: "View Code",

    // Footer
    copyright: "All rights reserved.",
    builtWith: "Built with Next.js & Tailwind CSS",

    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
  },
  pt: {
    // Hero
    greeting: "Olá, eu sou",
    name: "Roberto Garrahan",
    role: "Engenheiro de Software",
    intro:
      "Eu desenvolvo aplicações, APIs e sistemas modernos de forma escalável e segura. Sou apaixonado por tecnologia, código limpo e por resolver problemas do mundo real. Estou sempre aprendendo e evoluindo.",
    viewResume: "Ver Currículo",
    downloadResume: "Baixar Currículo",
    projects: "Projetos",
    contact: "Contato",
    scrollExplore: "Sinta-se à vontade para explorar a página",

    // Navigation
    experience: "Experiência",
    education: "Educação",
    extras: "Extras",
    projectsTab: "Projetos",

    // Experience
    experienceTitle: "Experiência Profissional",
    present: "Presente",
    visitCompanyWebsite: "Visitar site da empresa",

    // Education
    educationTitle: "Educação & Certificações",
    certifications: "Certificações",
    courses: "Idiomas",

    // Extras
    extrasTitle: "Conquistas & Atividades",
    hackathons: "Hackathons",
    awards: "Prêmios",
    volunteering: "Extras",
    communities: "Comunidades",
    events: "Eventos",
    learnMore: "Saiba mais",

    // Projects
    projectsTitle: "Projetos em Destaque",
    liveDemo: "Ver Demo",
    viewCode: "Ver Código",

    // Footer
    copyright: "Todos os direitos reservados.",
    builtWith: "Construído com Next.js & Tailwind CSS",

    // Theme
    lightMode: "Modo Claro",
    darkMode: "Modo Escuro",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
