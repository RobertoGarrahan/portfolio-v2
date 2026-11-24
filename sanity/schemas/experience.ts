import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experiência Profissional",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Empresa",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Cargo",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Início (ex: 02/2026)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isCurrent",
      title: "Emprego atual",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "endDate",
      title: "Fim (ex: 02/2026)",
      type: "string",
      hidden: ({ document }) => Boolean(document?.isCurrent),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Tecnologias / Habilidades",
      type: "localizedStringArray",
    }),
    defineField({
      name: "website",
      title: "Site da empresa",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Ordem de exibição",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "company",
      subtitle: "role.pt",
      order: "order",
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order ?? "-"} · ${title ?? "Sem empresa"}`,
        subtitle,
      };
    },
  },
});
