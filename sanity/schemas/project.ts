import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título do projeto",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "technologies",
      title: "Tecnologias",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "isPrivate",
      title: "Projeto confidencial (NDA)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "liveUrl",
      title: "URL da Demo",
      type: "url",
      hidden: ({ document }) => Boolean(document?.isPrivate),
    }),
    defineField({
      name: "githubUrl",
      title: "URL do GitHub",
      type: "url",
      hidden: ({ document }) => Boolean(document?.isPrivate),
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
      title: "title",
      subtitle: "description.pt",
      media: "image",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order ?? "-"} · ${title ?? "Sem título"}`,
        subtitle,
        media,
      };
    },
  },
});
