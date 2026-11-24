import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import {
  educationData,
  experiencesData,
  extrasData,
  projectsData,
  socialLinks,
} from "../lib/data.ts";
import { translations } from "../lib/translations.ts";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    const rawValue = line.slice(eqIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error(
    "Erro: NEXT_PUBLIC_SANITY_PROJECT_ID não definido no .env.local.",
  );
  process.exit(1);
}

if (!token) {
  console.error(
    "Erro: SANITY_API_WRITE_TOKEN não definido no .env.local. Gere um token com permissão de Editor em sanity.io/manage.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const assetCache = new Map<string, string>();

async function uploadPublicAsset(
  type: "image" | "file",
  publicRelativePath: string,
) {
  const cleanPath = publicRelativePath.replace(/^\/+/, "");
  const fullPath = path.join(process.cwd(), "public", cleanPath);

  if (!existsSync(fullPath)) {
    console.warn(`Aviso: arquivo não encontrado em public/: ${cleanPath}`);
    return undefined;
  }

  const cacheKey = `${type}:${cleanPath}`;
  let assetId = assetCache.get(cacheKey);

  if (!assetId) {
    const uploaded = await client.assets.upload(
      type,
      createReadStream(fullPath),
      {
        filename: path.basename(fullPath),
      },
    );
    assetId = uploaded._id;
    assetCache.set(cacheKey, assetId);
    console.log(`  Upload concluído (${type}): ${cleanPath} -> ${assetId}`);
  }

  return {
    _type: type,
    asset: {
      _type: "reference",
      _ref: assetId,
    },
  };
}

function isCurrentPeriod(endPt?: string, endEn?: string) {
  return (
    endPt?.toLowerCase() === "presente" || endEn?.toLowerCase() === "present"
  );
}

async function seedProfile() {
  console.log("Enviando Perfil & Hero (e currículos PDF)...");
  const resumePt = await uploadPublicAsset(
    "file",
    "CV_Luiz_Roberto_Garrahan_de_Oliveira_PT.pdf",
  );
  const resumeEn = await uploadPublicAsset(
    "file",
    "CV_Luiz_Roberto_Garrahan_de_Oliveira_EN.pdf",
  );

  // Uses deterministic ID "profile" to match the singleton in sanity/structure.ts.
  await client.createOrReplace({
    _id: "profile",
    _type: "profile",
    name: translations.pt.name,
    greeting: {
      pt: translations.pt.greeting,
      en: translations.en.greeting,
    },
    role: {
      pt: translations.pt.role,
      en: translations.en.role,
    },
    intro: {
      pt: translations.pt.intro,
      en: translations.en.intro,
    },
    githubUrl: socialLinks.github,
    linkedinUrl: socialLinks.linkedin,
    email: socialLinks.email,
    ...(resumePt ? { resumePt } : {}),
    ...(resumeEn ? { resumeEn } : {}),
  });
}

async function seedExperiences() {
  console.log("Enviando Experiências Profissionais...");
  const ptList = experiencesData.pt;
  const enList = experiencesData.en;

  for (let i = 0; i < ptList.length; i++) {
    const pt = ptList[i];
    const en = enList[i] ?? pt;
    const isCurrent = isCurrentPeriod(pt.period.end, en.period.end);

    await client.createOrReplace({
      _id: `experience-${pt.id}`,
      _type: "experience",
      company: pt.company,
      role: { pt: pt.role, en: en.role },
      startDate: pt.period.start,
      isCurrent,
      ...(!isCurrent ? { endDate: pt.period.end } : {}),
      description: { pt: pt.description, en: en.description },
      technologies: { pt: pt.technologies, en: en.technologies },
      ...(pt.website ? { website: pt.website } : {}),
      order: i + 1,
    });
  }
}

async function seedEducation() {
  console.log("Enviando Formação Acadêmica, Certificações e Idiomas...");

  const ptDegrees = educationData.pt.degrees;
  const enDegrees = educationData.en.degrees;
  for (let i = 0; i < ptDegrees.length; i++) {
    const pt = ptDegrees[i];
    const en = enDegrees[i] ?? pt;
    const isCurrent = isCurrentPeriod(pt.period.end, en.period.end);

    await client.createOrReplace({
      _id: `education-${pt.id}`,
      _type: "education",
      degree: { pt: pt.degree, en: en.degree },
      institution: pt.institution,
      startDate: pt.period.start,
      isCurrent,
      ...(!isCurrent ? { endDate: pt.period.end } : {}),
      description: { pt: pt.description, en: en.description },
      order: i + 1,
    });
  }

  const ptCerts = educationData.pt.certifications;
  const enCerts = educationData.en.certifications;
  for (let i = 0; i < ptCerts.length; i++) {
    const pt = ptCerts[i];
    const en = enCerts[i] ?? pt;

    await client.createOrReplace({
      _id: `certification-${pt.id}`,
      _type: "certification",
      name: { pt: pt.name, en: en.name },
      issuer: { pt: pt.issuer, en: en.issuer },
      year: pt.year,
      order: i + 1,
    });
  }

  const ptCourses = educationData.pt.courses;
  const enCourses = educationData.en.courses;
  for (let i = 0; i < ptCourses.length; i++) {
    const pt = ptCourses[i];
    const en = enCourses[i] ?? pt;

    await client.createOrReplace({
      _id: `language-course-${pt.id}`,
      _type: "languageCourse",
      name: { pt: pt.name, en: en.name },
      ...(pt.platform ? { platform: pt.platform } : {}),
      order: i + 1,
    });
  }
}

async function seedProjects() {
  console.log("Enviando Projetos (e imagens)...");
  const ptList = projectsData.pt;
  const enList = projectsData.en;

  for (let i = 0; i < ptList.length; i++) {
    const pt = ptList[i];
    const en = enList[i] ?? pt;
    const image = pt.image
      ? await uploadPublicAsset("image", pt.image)
      : undefined;

    await client.createOrReplace({
      _id: `project-${pt.id}`,
      _type: "project",
      title: pt.title,
      description: { pt: pt.description, en: en.description },
      ...(image ? { image } : {}),
      technologies: en.technologies,
      isPrivate: Boolean(pt.private),
      ...(pt.liveUrl ? { liveUrl: pt.liveUrl } : {}),
      ...(pt.githubUrl ? { githubUrl: pt.githubUrl } : {}),
      order: i + 1,
    });
  }
}

async function seedExtras() {
  console.log("Enviando Extras (Hackathons, Voluntariado & Eventos)...");

  const ptHackathons = extrasData.pt.hackathons;
  const enHackathons = extrasData.en.hackathons;
  for (let i = 0; i < ptHackathons.length; i++) {
    const pt = ptHackathons[i];
    const en = enHackathons[i] ?? pt;

    await client.createOrReplace({
      _id: `hackathon-${pt.id}`,
      _type: "hackathon",
      name: { pt: pt.name, en: en.name },
      result: { pt: pt.result, en: en.result },
      year: pt.year,
      ...(pt.link ? { link: pt.link } : {}),
      order: i + 1,
    });
  }

  const ptVolunteering = extrasData.pt.volunteering;
  const enVolunteering = extrasData.en.volunteering;
  for (let i = 0; i < ptVolunteering.length; i++) {
    const pt = ptVolunteering[i];
    const en = enVolunteering[i] ?? pt;

    await client.createOrReplace({
      _id: `volunteering-${pt.id}`,
      _type: "volunteering",
      name: { pt: pt.name, en: en.name },
      organization: { pt: pt.organization, en: en.organization },
      description: { pt: pt.description, en: en.description },
      ...(pt.link ? { link: pt.link } : {}),
      order: i + 1,
    });
  }

  const ptEvents = extrasData.pt.events;
  const enEvents = extrasData.en.events;
  for (let i = 0; i < ptEvents.length; i++) {
    const pt = ptEvents[i];
    const en = enEvents[i] ?? pt;

    await client.createOrReplace({
      _id: `event-${pt.id}`,
      _type: "event",
      name: { pt: pt.name, en: en.name },
      period: { pt: pt.role, en: en.role },
      order: i + 1,
    });
  }
}

async function main() {
  console.log(
    `Iniciando migração para Sanity (projectId: ${projectId}, dataset: ${dataset})...`,
  );
  await seedProfile();
  await seedExperiences();
  await seedEducation();
  await seedProjects();
  await seedExtras();
  console.log("Migração concluída com sucesso! Todos os documentos estão publicados no /studio.");
}

main().catch((error) => {
  console.error("Erro ao executar seed do Sanity:", error);
  process.exit(1);
});
