import { defineQuery } from "next-sanity";

export const PORTFOLIO_QUERY = defineQuery(`{
  "profile": *[_type == "profile"][0]{
    name,
    greeting,
    role,
    intro,
    githubUrl,
    linkedinUrl,
    email,
    "resumePtUrl": resumePt.asset->url,
    "resumeEnUrl": resumeEn.asset->url
  },
  "experiences": *[_type == "experience"] | order(order asc, _createdAt desc){
    "_id": _id,
    company,
    role,
    startDate,
    endDate,
    isCurrent,
    description,
    technologies,
    website
  },
  "degrees": *[_type == "education"] | order(order asc, _createdAt desc){
    "_id": _id,
    degree,
    institution,
    startDate,
    endDate,
    isCurrent,
    description
  },
  "certifications": *[_type == "certification"] | order(order asc, _createdAt desc){
    "_id": _id,
    name,
    issuer,
    year
  },
  "courses": *[_type == "languageCourse"] | order(order asc, _createdAt desc){
    "_id": _id,
    name,
    platform
  },
  "projects": *[_type == "project"] | order(order asc, _createdAt desc){
    "_id": _id,
    title,
    description,
    "imageUrl": image.asset->url,
    technologies,
    liveUrl,
    githubUrl,
    isPrivate
  },
  "hackathons": *[_type == "hackathon"] | order(order asc, _createdAt desc){
    "_id": _id,
    name,
    result,
    year,
    link
  },
  "volunteering": *[_type == "volunteering"] | order(order asc, _createdAt desc){
    "_id": _id,
    name,
    organization,
    description,
    link
  },
  "events": *[_type == "event"] | order(order asc, _createdAt desc){
    "_id": _id,
    name,
    period
  }
}`);
