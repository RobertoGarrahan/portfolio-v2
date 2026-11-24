import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certificação",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome da certificação",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Instituição emissora",
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
      subtitle: "issuer.pt",
      year: "year",
    },
    prepare({ title, subtitle, year }) {
      return {
        title: title ?? "Sem título",
        subtitle: [subtitle, year].filter(Boolean).join(" • "),
      };
    },
  },
});
