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

    // Tabs
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

    // Content Data - Experiences
    experiences: [
      {
        id: 1,
        company: "Bram Offshore",
        role: "Technology Trainee",
        period: { start: "02/2026", end: "Present" },
        description:
          "Working as a Technology Trainee, supporting the development and maintenance of internal systems, automations, and integrations. Participating in technical analysis, process improvements, software project support, and collaboration with multidisciplinary teams, with a strong focus on continuous learning and best practices.",
        technologies: [
          "Process Automation",
          "Systems Analysis",
          "Clean Code Practices",
          "Team Collaboration",
        ],
        website: "https://www.bramoffshore.com.br/en",
      },
      {
        id: 2,
        company: "Dinamiza Tecnologia",
        role: "Co-founder and Software Engineer",
        period: { start: "08/2025", end: "Present" },
        description:
          "Responsible for leading client meetings, defining project technologies and architectures. Also responsible for developing software across multiple projects, including automations and AI-driven integrations.",
        technologies: [
          "Software Architecture",
          "Artificial Intelligence",
          "Next.js",
          "TypeScript",
          "Node.js",
          "MySQL",
          "AWS",
        ],
        website: "https://dinamiza.com.br",
      },
      {
        id: 3,
        company: "Hunter",
        role: "Junior Full Stack Developer",
        period: { start: "08/2023", end: "07/2025" },
        description:
          "Responsible for developing and maintaining the company’s legacy software, supporting monitoring and maintenance of AWS servers, including S3 bucket management. Also supervised an intern who worked on technical support and assisted with system development.",
        technologies: [
          "Next.js",
          "Node.js",
          "TypeScript",
          "REST APIs",
          "Tailwind CSS",
          "MySQL",
          "AWS",
        ],
        website: "https://somoshunter.com.br/",
      },
      {
        id: 4,
        company: "Wizard",
        role: "English Teacher",
        period: { start: "04/2022", end: "10/2022" },
        description:
          "Responsible for preparing and teaching English classes for children, as well as occasionally teaching adult groups.",
        technologies: [
          "English Language",
          "Lesson Planning",
          "Teaching Methodologies",
          "Communication",
        ],
        website: "https://promocoes.wizard.com.br/wizard-on/",
      },
    ],

    // Content Data - Education
    educationList: [
      {
        id: 1,
        degree: "Postgraduate Degree in Software Engineering",
        institution: "PUC Rio",
        period: { start: "2025", end: "Present" },
        description:
          "Postgraduate program focused on software engineering, system architecture, code quality, development best practices, and the application of advanced concepts in real-world projects.",
      },
      {
        id: 2,
        degree: "Bachelor's Degree in Information Systems",
        institution: "UniLaSalle",
        period: { start: "2021", end: "2025" },
        description:
          "Undergraduate program focused on software development, systems analysis, databases, software engineering, and core information technology fundamentals.",
      },
    ],

    // Content Data - Certifications
    certificationsList: [
      {
        id: 1,
        name: "Business Intelligence Foundation",
        issuer: "CertiProf",
        year: "2024",
      },
      {
        id: 2,
        name: "Scrum Fundamentals",
        issuer: "International Association for Software Quality",
        year: "2024",
      },
      {
        id: 3,
        name: "Java Foundations",
        issuer: "Oracle Academy",
        year: "2023",
      },
    ],

    // Content Data - Courses
    coursesList: [
      { id: 1, name: "Portuguese - Fluent" },
      { id: 2, name: "English - Fluent", platform: "Wizard" },
      { id: 3, name: "French - Intermediate", platform: "Wizard" },
    ],

    // Content Data - Extras
    extrasData: {
      hackathons: [
        {
          id: 1,
          name: "IoT UniLaSalle Hackathon",
          result: "1st Place",
          year: "2022",
          link: "https://www.linkedin.com/posts/robertogarrahan_ontem-tive-a-oportunidade-de-participar-activity-6992675281442385920-dm4z?utm_source=share&utm_medium=member_desktop&rcm=ACoAADcuVUABqkY7rNDtkW_VaxEwJCAB3TOYT6A",
        },
        {
          id: 2,
          name: "NASA International Space Apps Challenge",
          result: "Mentor",
          year: "2024",
          link: "https://www.linkedin.com/posts/robertogarrahan_nasa-spaceappschallenge-mentoria-activity-7119508121630179329-uYj8?utm_source=share&utm_medium=member_desktop&rcm=ACoAADcuVUABqkY7rNDtkW_VaxEwJCAB3TOYT6A",
        },
        {
          id: 3,
          name: "NASA International Space Apps Challenge",
          result: "Mentor",
          year: "2025",
          link: "https://www.linkedin.com/posts/robertogarrahan_este-final-de-semana-tive-a-honra-de-ser-activity-7249469723132784640-D7R5?utm_source=share&utm_medium=member_desktop&rcm=ACoAADcuVUABqkY7rNDtkW_VaxEwJCAB3TOYT6A",
        },
      ],

      awards: [
        {
          id: 1,
          name: "Best Developer Award",
          issuer: "Technology Company",
          year: "2023",
        },
        {
          id: 2,
          name: "Innovation Award",
          issuer: "Startup Inc",
          year: "2020",
        },
      ],

      volunteering: [
        {
          id: 1,
          name: "Rondon Volunteer",
          organization: "Projeto Rondon",
          link: "https://www.unilasalle.edu.br/rj/noticias/operacao-sentinelas-avancadas",
          description:
            "Volunteer in the Brazilian Ministry of Defense's Projeto Rondon, where I spent 18 days with my team in Primavera de Rondônia delivering technology and education workshops to the local community.",
        },
        {
          id: 2,
          name: "Researcher",
          organization: "Scientific Research Program",
          link: "https://www.unilasalle.edu.br/rj/noticias/pesquisa-que-transforma-vidas",
          description:
            "Responsible for the database of the SmartCare research project, focused on developing a smart home solution for elderly people with Alzheimer’s.",
        },
      ],

      communities: [
        { id: 1, name: "React Community", role: "Active Member" },
        { id: 2, name: "Local Dev Meetup", role: "Organizer" },
      ],

      events: [
        { id: 1, name: "Blockchain Rio", role: "2025" },
        { id: 2, name: "AI Expo Rio", role: "2025" },
        { id: 3, name: "Rio Innovation Week", role: "2023 & 2024" },
        { id: 4, name: "Tomorrow Congress", role: "2024" },
      ],
    },

    // Content Data - Projects
    projectsList: [
      {
        id: 1,
        title: "Ânimo Consultoria",
        description:
          "Institutional website for UniLaSalle’s junior company, featuring multiple sections such as services, home, contact, and about.",
        image: "/animo.png",
        technologies: ["HTML", "CSS", "JavaScript", "Git"],
        liveUrl: "https://animo-consultoria.vercel.app/index.html",
        githubUrl: "https://github.com/RobertoGarrahan/animo-consultoria",
      },
      {
        id: 2,
        title: "Assu Motors",
        description:
          "Landing page for Assurance Motors and development of a fleet management system.",
        image: "/assumotors.png",
        technologies: ["Next.js", "TypeScript", "Node.js", "MySQL", "AWS"],
        liveUrl: "https://assumotors.com",
      },
      {
        id: 3,
        title: "Cota Remédio",
        description:
          "E-commerce platform focused on high-cost medications, allowing users to request quotes and purchase medicines from suppliers.",
        image: "/cotaremedio.png",
        technologies: ["React.js", "Tailwind", "MongoDB"],
        liveUrl: "https://cota-remedio.web.app/",
      },
      {
        id: 4,
        title: "Roomly",
        description:
          "My undergraduate final project: a platform for managing shared space reservations.",
        image: "/roomly.png",
        technologies: [
          "Next.js",
          "TypeScript",
          "Node.js",
          "MongoDB",
          "Tailwind",
        ],
        githubUrl: "https://github.com/RobertoGarrahan/roomly",
      },
      {
        id: 5,
        title: "Portfolio V1",
        description: "First version of my personal portfolio.",
        image: "/portfoliov1.png",
        technologies: ["React.js", "Tailwind"],
        githubUrl: "https://github.com/RobertoGarrahan/Portfolio",
        liveUrl: "https://v1robertogarrahan.vercel.app/",
      },
      {
        id: 6,
        title: "Fleet Hunter",
        description:
          "Vehicle tracking and fleet management system, including drivers, rentals, and inspections.",
        image: "/huntergps.png",
        technologies: ["React.js", "Node.js", "Tailwind", "MySQL", "AWS"],
        private: true,
      },
      {
        id: 7,
        title: "Mr Tech",
        description:
          "AI platform for reading, summarizing, and organizing bank statements.",
        image: "/mrtech.jpg",
        technologies: ["Next.js", "AI"],
        private: true,
      },
      {
        id: 8,
        title: "Rangel Systems",
        description: "System for managing clients and industrial equipment.",
        image: "/rangelsystems.png",
        technologies: ["Next.js", "Supabase", "AI"],
        private: true,
      },
    ],
  },
  ///////////////////////////////////////////////////////
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

    // Tabs
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

    // Content Data - Experiences
    experiences: [
      {
        id: 1,
        company: "Bram Offshore",
        role: "Trainee Tech",
        period: { start: "02/2026", end: "Presente" },
        description:
          "Atuação como Trainee de Tecnologia, apoiando o desenvolvimento e manutenção de sistemas internos, automações e integrações. Participação em análises técnicas, melhoria de processos, suporte a projetos de software e colaboração com times multidisciplinares, com foco em aprendizado contínuo e boas práticas.",
        technologies: [
          "Automação de Processos",
          "Análise de Sistemas",
          "Boas Práticas de Código",
          "Trabalho em Equipe",
        ],
        website: "https://www.bramoffshore.com.br/",
      },
      {
        id: 2,
        company: "Dinamiza Tecnologia",
        role: "Co-fundador e Engenheiro de Software",
        period: { start: "08/2025", end: "Presente" },
        description:
          "Responsável por conduzir reuniões com clientes, definir tecnologias e arquiteturas de projetos. Também responsável pelo desenvolvimento dos softwares em diversos projetos, automações e integrações com IA.",
        technologies: [
          "Arquitetura de Projetos",
          "IA",
          "Next.js",
          "TypeScript",
          "Node.js",
          "MySQL",
          "AWS",
        ],
        website: "https://dinamiza.com.br",
      },

      {
        id: 3,
        company: "Hunter",
        role: "Desenvolvedor FullStack Junior",
        period: { start: "08/2023", end: "07/2025" },
        description:
          "Responsável pelo desenvolvimento do software legado da empresa, apoio no monitoramento e manutenção dos servidores AWS, incluindo gerenciamento de buckets S3. Também responsável pela supervisão de um estagiário, que atuou com suporte técnico e auxiliou no desenvolvimento do sistema.",
        technologies: [
          "Next.js",
          "Node.js",
          "TypeScript",
          "Rest APIs",
          "TailWind",
          "MySQL",
          "AWS",
        ],
        website: "https://somoshunter.com.br/",
      },
      {
        id: 4,
        company: "Wizard",
        role: "Professor de Inglês",
        period: { start: "04/2022", end: "10/2022" },
        description:
          "Responsável por preparar e ministrar aulas de inglês para turmas infantis, além de lecionar ocasionalmente para turmas adultas.",
        technologies: [
          "Inglês",
          "Planejameneto de Aulas",
          "Metodologias de Ensino",
          "Comunicação",
        ],
        website: "https://promocoes.wizard.com.br/wizard-on/",
      },
    ],

    // Content Data - Education
    educationList: [
      {
        id: 1,
        degree: "Pós-Graduação em Engenharia de Software",
        institution: "PUC Rio",
        period: { start: "2025", end: "Presente" },
        description:
          "Pós-graduação com foco em engenharia de software, arquitetura de sistemas, qualidade de código, boas práticas de desenvolvimento e aplicação de conceitos avançados em projetos reais.",
      },
      {
        id: 2,
        degree: "Bacharelado em Sistemas de Informação",
        institution: "UniLaSalle",
        period: { start: "2021", end: "2025" },
        description:
          "Graduação voltada ao desenvolvimento de software, análise de sistemas, bancos de dados, engenharia de software e fundamentos de tecnologia da informação.",
      },
    ],

    // Content Data - Certifications
    certificationsList: [
      {
        id: 1,
        name: "Business Intelligence Foundation",
        issuer: "Certiprof",
        year: "2024",
      },
      {
        id: 2,
        name: "Scrum Fundamentals",
        issuer: "Asociacion Internacional de Calidad de Software",
        year: "2024",
      },
      {
        id: 3,
        name: "Java Foundations",
        issuer: "Oracle Academy",
        year: "2023",
      },
    ],

    // Content Data - Courses
    coursesList: [
      { id: 1, name: "Portugês - Fluente" },
      { id: 2, name: "Inglês - Fluente", platform: "Wizard" },
      { id: 3, name: "Francês - Intermediário", platform: "Wizard" },
    ],

    // Content Data - Extras
    extrasData: {
      hackathons: [
        {
          id: 1,
          name: "IOT UniLaSalle Hackathon",
          result: "1º Lugar",
          year: "2022",
          link: "https://www.linkedin.com/posts/robertogarrahan_ontem-tive-a-oportunidade-de-participar-activity-6992675281442385920-dm4z?utm_source=share&utm_medium=member_desktop&rcm=ACoAADcuVUABqkY7rNDtkW_VaxEwJCAB3TOYT6A",
        },
        {
          id: 2,
          name: "NASA International Space Apps Challenge",
          result: "Mentor",
          year: "2024",
          link: "https://www.linkedin.com/posts/robertogarrahan_nasa-spaceappschallenge-mentoria-activity-7119508121630179329-uYj8?utm_source=share&utm_medium=member_desktop&rcm=ACoAADcuVUABqkY7rNDtkW_VaxEwJCAB3TOYT6A",
        },
        {
          id: 3,
          name: "NASA International Space Apps Challenge",
          result: "Mentor",
          year: "2025",
          link: "https://www.linkedin.com/posts/robertogarrahan_este-final-de-semana-tive-a-honra-de-ser-activity-7249469723132784640-D7R5?utm_source=share&utm_medium=member_desktop&rcm=ACoAADcuVUABqkY7rNDtkW_VaxEwJCAB3TOYT6A",
        },
      ],
      awards: [
        {
          id: 1,
          name: "Prêmio Melhor Desenvolvedor",
          issuer: "Empresa de Tecnologia",
          year: "2023",
        },
        { id: 2, name: "Prêmio Inovação", issuer: "Startup Inc", year: "2020" },
      ],
      volunteering: [
        {
          id: 1,
          name: "Rondonista",
          organization: "Projeto Rondon",
          link: "https://www.unilasalle.edu.br/rj/noticias/operacao-sentinelas-avancadas",
          description:
            "Voluntário no Projeto Rondon do Ministério da Defesa, onde passei 18 dias com minha equipe da cidade de Primavera de Rondônia ministrando oficinas de tecnologia e educação.",
        },
        {
          id: 2,
          name: "Pesquisador",
          organization: "Iniciação Científica",
          link: "https://www.unilasalle.edu.br/rj/noticias/pesquisa-que-transforma-vidas",
          description:
            "Responsavel pelo banco de dados do projeto de iniciação cientifica smartcare, dedicado a construção de uma smarthome para idosos com alzheimer.",
        },
      ],
      communities: [
        { id: 1, name: "Comunidade React", role: "Membro Ativo" },
        { id: 2, name: "Meetup Local de Dev", role: "Organizador" },
      ],
      events: [
        { id: 1, name: "Blockchain Rio", role: "2025" },
        { id: 2, name: "AI Expo Rio", role: "2025" },
        { id: 3, name: "Rio Innovation Week", role: "2023 e 2024" },
        { id: 4, name: "Congresso do Amanhã", role: "2024" },
      ],
    },

    // Content Data - Projects
    projectsList: [
      {
        id: 1,
        title: "Ânimo Consultoria",
        description:
          "Site institucional da empresa junior da UniLaSalle com diversas abas de serviço, home, contato e sobre.",
        image: "/animo.png",
        technologies: ["HTML", "CSS", "JavaScript", "Git"],
        liveUrl: "https://animo-consultoria.vercel.app/index.html",
        githubUrl: "https://github.com/RobertoGarrahan/animo-consultoria",
      },
      {
        id: 2,
        title: "Assu Motors",
        description:
          "Landing page da empresa Assurance Motors e desenvolvimento do software de gerenciamento de frota.",
        image: "/assumotors.png",
        technologies: ["Next.js", "TypeScript", "Node.js", "MySQL", "AWS"],
        liveUrl: "https://assumotors.com",
      },
      {
        id: 3,
        title: "Cota Remédio",
        description:
          "E-commerce focado em medicamentos de alto valor, sendo possivel realizar orçamentos e comprar os medicamentos com fornecedores.",
        image: "/cotaremedio.png",
        technologies: ["React.js", "TailWind", "MongoDB"],
        liveUrl: "https://cota-remedio.web.app/",
      },
      {
        id: 4,
        title: "Roomly",
        description:
          "Meu TCC da faculdade, uma plataforma para gerenciamento de reservas de espaços compartilhados.",
        image: "/roomly.png",
        technologies: [
          "Next.js",
          "TypeScript",
          "Node.js",
          "MongoDB",
          "Tailwind",
        ],
        githubUrl: "https://github.com/RobertoGarrahan/roomly",
      },
      {
        id: 5,
        title: "Portfolio V1",
        description: "Primeira versão do meu portfolio.",
        image: "/portfoliov1.png",
        technologies: ["React.js", "Tailwind"],
        githubUrl: "https://github.com/RobertoGarrahan/Portfolio",
        liveUrl: "https://v1robertogarrahan.vercel.app/",
      },
      {
        id: 6,
        title: "Fleet Hunter",
        description:
          "Sistema de localização de veículos, gerenciamento da frota, motoristas, locações e vistorias.",
        image: "/huntergps.png",
        technologies: ["React.js", "Node.js", "Tailwind", "MySQL", "AWS"],
        private: true,
      },
      {
        id: 7,
        title: "Mr Tech",
        description:
          "Plataforma de IA para leitura, resumo e organização de extratos bancarios.",
        image: "/mrtech.jpg",
        technologies: ["Next.js", "AI"],
        private: true,
      },
      {
        id: 8,
        title: "Rangel Systems",
        description:
          "Sistema para controle de clientes e equipamentos industriais.",
        image: "/rangelsystems.png",
        technologies: ["Next.js", "Supabase", "AI"],
        private: true,
      },
    ],
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
