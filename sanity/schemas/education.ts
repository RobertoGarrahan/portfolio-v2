import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Formação Acadêmica",
  type: "document",
  fields: [
    defineField({
      name: "degree",
      title: "Curso / Título",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "institution",
      title: "Instituição",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Ano de início (ex: 2026)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isCurrent",
      title: "Em andamento",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "endDate",
      title: "Ano de conclusão (ex: 2026)",
      type: "string",
      hidden: ({ document }) => Boolean(document?.isCurrent),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "localizedText",
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
      title: "degree.pt",
      subtitle: "institution",
      order: "order",
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order ?? "-"} · ${title ?? "Sem curso"}`,
        subtitle,
      };
    },
  },
});
