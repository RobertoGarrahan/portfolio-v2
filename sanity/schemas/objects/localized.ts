import { defineField, defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Texto Bilíngue (PT/EN)",
  type: "object",
  fields: [
    defineField({
      name: "pt",
      title: "Português",
      type: "string",
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
    }),
  ],
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Descrição Bilíngue (PT/EN)",
  type: "object",
  fields: [
    defineField({
      name: "pt",
      title: "Português",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
    }),
  ],
});

export const localizedStringArray = defineType({
  name: "localizedStringArray",
  title: "Lista Bilíngue (PT/EN)",
  type: "object",
  fields: [
    defineField({
      name: "pt",
      title: "Português",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
});
