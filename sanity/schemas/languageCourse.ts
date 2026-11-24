import { defineField, defineType } from "sanity";

export const languageCourse = defineType({
  name: "languageCourse",
  title: "Idioma / Curso",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Idioma ou curso (ex: Inglês - Fluente)",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "platform",
      title: "Escola / Plataforma (opcional)",
      type: "string",
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
      title: "name.pt",
      subtitle: "platform",
    },
  },
});
