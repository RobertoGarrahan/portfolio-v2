import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Evento",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do evento",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      title: "Ano / Edição (ex: 2026 ou 2023 e 2024)",
      type: "localizedString",
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
      subtitle: "period.pt",
    },
  },
});
