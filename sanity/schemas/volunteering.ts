import { defineField, defineType } from "sanity";

export const volunteering = defineType({
  name: "volunteering",
  title: "Voluntariado / Pesquisa",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Título / Papel",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "organization",
      title: "Organização / Programa",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "localizedText",
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
      subtitle: "organization.pt",
    },
  },
});
