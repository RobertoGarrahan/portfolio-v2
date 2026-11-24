import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Perfil & Hero",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "greeting",
      title: "Saudação",
      type: "localizedString",
    }),
    defineField({
      name: "role",
      title: "Cargo / Título",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Apresentação",
      type: "localizedText",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
    }),
    defineField({
      name: "resumePt",
      title: "Currículo PDF (Português)",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "resumeEn",
      title: "Currículo PDF (English)",
      type: "file",
      options: { accept: ".pdf" },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role.pt",
    },
  },
});
