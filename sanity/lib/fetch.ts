import {
  educationData,
  experiencesData,
  extrasData,
  projectsData,
  socialLinks,
  type PortfolioData,
  type ProfileData,
} from "@/lib/data";
import { translations, type Language } from "@/lib/translations";
import { isSanityConfigured } from "../env";
import { sanityClient } from "./client";
import { PORTFOLIO_QUERY } from "./queries";

export const SANITY_REVALIDATE_SECONDS = 60;

export const SANITY_TAGS = [
  "portfolio",
  "profile",
  "experience",
  "education",
  "certification",
  "languageCourse",
  "project",
  "hackathon",
  "volunteering",
  "event",
] as const;

interface LocalizedString {
  pt?: string | null;
  en?: string | null;
}

interface LocalizedStringArray {
  pt?: string[] | null;
  en?: string[] | null;
}

interface SanityPortfolioResponse {
  profile?: {
    name?: string | null;
    greeting?: LocalizedString | null;
    role?: LocalizedString | null;
    intro?: LocalizedString | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    email?: string | null;
    resumePtUrl?: string | null;
    resumeEnUrl?: string | null;
  } | null;
  experiences?: Array<{
    _id: string;
    company?: string | null;
    role?: LocalizedString | null;
    startDate?: string | null;
    endDate?: string | null;
    isCurrent?: boolean | null;
    description?: LocalizedString | null;
    technologies?: LocalizedStringArray | null;
    website?: string | null;
  }>;
  degrees?: Array<{
    _id: string;
    degree?: LocalizedString | null;
    institution?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    isCurrent?: boolean | null;
    description?: LocalizedString | null;
  }>;
  certifications?: Array<{
    _id: string;
    name?: LocalizedString | null;
    issuer?: LocalizedString | null;
    year?: string | null;
  }>;
  courses?: Array<{
    _id: string;
    name?: LocalizedString | null;
    platform?: string | null;
  }>;
  projects?: Array<{
    _id: string;
    title?: string | null;
    description?: LocalizedString | null;
    imageUrl?: string | null;
    technologies?: string[] | null;
    liveUrl?: string | null;
    githubUrl?: string | null;
    isPrivate?: boolean | null;
  }>;
  hackathons?: Array<{
    _id: string;
    name?: LocalizedString | null;
    result?: LocalizedString | null;
    year?: string | null;
    link?: string | null;
  }>;
  volunteering?: Array<{
    _id: string;
    name?: LocalizedString | null;
    organization?: LocalizedString | null;
    description?: LocalizedString | null;
    link?: string | null;
  }>;
  events?: Array<{
    _id: string;
    name?: LocalizedString | null;
    period?: LocalizedString | null;
  }>;
}

function pickLocalized(
  field: LocalizedString | null | undefined,
  lang: Language,
  fallback = "",
): string {
  const primary = field?.[lang]?.trim();
  if (primary) return primary;
  const secondary = field?.[lang === "pt" ? "en" : "pt"]?.trim();
  return secondary || fallback;
}

function pickLocalizedArray(
  field: LocalizedStringArray | null | undefined,
  lang: Language,
): string[] {
  const primary = field?.[lang]?.filter(Boolean);
  if (primary && primary.length > 0) return primary;
  const secondary = field?.[lang === "pt" ? "en" : "pt"]?.filter(Boolean);
  return secondary ?? [];
}

function formatEndDate(
  isCurrent: boolean | null | undefined,
  endDate: string | null | undefined,
  lang: Language,
): string {
  if (isCurrent) return lang === "pt" ? "Presente" : "Present";
  return endDate?.trim() || (lang === "pt" ? "Presente" : "Present");
}

function buildFallbackProfile(lang: Language): ProfileData {
  const t = translations[lang];
  return {
    name: t.name,
    greeting: t.greeting,
    role: t.role,
    intro: t.intro,
    resumeUrl:
      lang === "pt"
        ? "/CV_Luiz_Roberto_Garrahan_de_Oliveira_PT.pdf"
        : "/CV_Luiz_Roberto_Garrahan_de_Oliveira_EN.pdf",
    socialLinks,
  };
}

export function getFallbackPortfolioData(): PortfolioData {
  return {
    profile: {
      en: buildFallbackProfile("en"),
      pt: buildFallbackProfile("pt"),
    },
    experiences: experiencesData,
    education: educationData,
    projects: projectsData,
    extras: extrasData,
  };
}

function mapSanityResponse(raw: SanityPortfolioResponse): PortfolioData {
  const fallback = getFallbackPortfolioData();

  const buildProfile = (lang: Language): ProfileData => {
    const base = fallback.profile[lang];
    const p = raw.profile;
    if (!p) return base;

    const resumeUrl =
      lang === "pt"
        ? p.resumePtUrl || p.resumeEnUrl || base.resumeUrl
        : p.resumeEnUrl || p.resumePtUrl || base.resumeUrl;

    return {
      name: p.name?.trim() || base.name,
      greeting: pickLocalized(p.greeting, lang, base.greeting),
      role: pickLocalized(p.role, lang, base.role),
      intro: pickLocalized(p.intro, lang, base.intro),
      resumeUrl,
      socialLinks: {
        github: p.githubUrl?.trim() || base.socialLinks.github,
        linkedin: p.linkedinUrl?.trim() || base.socialLinks.linkedin,
        email: p.email?.trim() || base.socialLinks.email,
      },
    };
  };

  const buildExperiences = (lang: Language) => {
    if (!raw.experiences || raw.experiences.length === 0) {
      return fallback.experiences[lang];
    }
    return raw.experiences.map((item) => ({
      id: item._id,
      company: item.company?.trim() || "",
      role: pickLocalized(item.role, lang),
      period: {
        start: item.startDate?.trim() || "",
        end: formatEndDate(item.isCurrent, item.endDate, lang),
      },
      description: pickLocalized(item.description, lang),
      technologies: pickLocalizedArray(item.technologies, lang),
      website: item.website?.trim() || undefined,
    }));
  };

  const buildEducation = (lang: Language) => {
    const base = fallback.education[lang];
    return {
      degrees:
        raw.degrees && raw.degrees.length > 0
          ? raw.degrees.map((item) => ({
              id: item._id,
              degree: pickLocalized(item.degree, lang),
              institution: item.institution?.trim() || "",
              period: {
                start: item.startDate?.trim() || "",
                end: formatEndDate(item.isCurrent, item.endDate, lang),
              },
              description: pickLocalized(item.description, lang),
            }))
          : base.degrees,
      certifications:
        raw.certifications && raw.certifications.length > 0
          ? raw.certifications.map((item) => ({
              id: item._id,
              name: pickLocalized(item.name, lang),
              issuer: pickLocalized(item.issuer, lang),
              year: item.year?.trim() || "",
            }))
          : base.certifications,
      courses:
        raw.courses && raw.courses.length > 0
          ? raw.courses.map((item) => ({
              id: item._id,
              name: pickLocalized(item.name, lang),
              platform: item.platform?.trim() || undefined,
            }))
          : base.courses,
    };
  };

  const buildProjects = (lang: Language) => {
    if (!raw.projects || raw.projects.length === 0) {
      return fallback.projects[lang];
    }
    return raw.projects.map((item) => ({
      id: item._id,
      title: item.title?.trim() || "",
      description: pickLocalized(item.description, lang),
      image: item.imageUrl || "/placeholder.svg",
      technologies: item.technologies?.filter(Boolean) ?? [],
      liveUrl: item.liveUrl?.trim() || undefined,
      githubUrl: item.githubUrl?.trim() || undefined,
      private: Boolean(item.isPrivate),
    }));
  };

  const buildExtras = (lang: Language) => {
    const base = fallback.extras[lang];
    return {
      ...base,
      hackathons:
        raw.hackathons && raw.hackathons.length > 0
          ? raw.hackathons.map((item) => ({
              id: item._id,
              name: pickLocalized(item.name, lang),
              result: pickLocalized(item.result, lang),
              year: item.year?.trim() || "",
              link: item.link?.trim() || undefined,
            }))
          : base.hackathons,
      volunteering:
        raw.volunteering && raw.volunteering.length > 0
          ? raw.volunteering.map((item) => ({
              id: item._id,
              name: pickLocalized(item.name, lang),
              organization: pickLocalized(item.organization, lang),
              description: pickLocalized(item.description, lang),
              link: item.link?.trim() || undefined,
            }))
          : base.volunteering,
      events:
        raw.events && raw.events.length > 0
          ? raw.events.map((item) => ({
              id: item._id,
              name: pickLocalized(item.name, lang),
              role: pickLocalized(item.period, lang),
            }))
          : base.events,
    };
  };

  return {
    profile: { en: buildProfile("en"), pt: buildProfile("pt") },
    experiences: { en: buildExperiences("en"), pt: buildExperiences("pt") },
    education: { en: buildEducation("en"), pt: buildEducation("pt") },
    projects: { en: buildProjects("en"), pt: buildProjects("pt") },
    extras: { en: buildExtras("en"), pt: buildExtras("pt") },
  };
}

export async function getPortfolioData(): Promise<PortfolioData> {
  if (!isSanityConfigured || !sanityClient) {
    return getFallbackPortfolioData();
  }

  try {
    const raw = await sanityClient.fetch<SanityPortfolioResponse>(
      PORTFOLIO_QUERY,
      {},
      {
        next: {
          revalidate: SANITY_REVALIDATE_SECONDS,
          tags: [...SANITY_TAGS],
        },
      },
    );

    return mapSanityResponse(raw ?? {});
  } catch (error) {
    console.error("Failed to fetch portfolio data from Sanity:", error);
    return getFallbackPortfolioData();
  }
}
