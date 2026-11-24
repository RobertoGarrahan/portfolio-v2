import { defineField, defineType } from "sanity";

export const hackathon = defineType({
  name: "hackathon",
  title: "Hackathon",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do hackathon",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "result",
      title: "Resultado / Papel (ex: 1º Lugar, Mentor)",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Ano",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link (opcional)",
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
      title: "name.pt",
      result: "result.pt",
      year: "year",
    },
    prepare({ title, result, year }) {
      return {
        title: title ?? "Sem título",
        subtitle: [result, year].filter(Boolean).join(" • "),
      };
    },
  },
});
