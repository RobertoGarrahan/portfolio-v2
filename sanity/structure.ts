import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfólio")
    .items([
      S.listItem()
        .title("Perfil & Hero (Currículo PDF)")
        .id("profile")
        .child(S.document().schemaType("profile").documentId("profile")),
      S.divider(),
      S.documentTypeListItem("experience").title("Experiência Profissional"),
      S.documentTypeListItem("education").title("Formação Acadêmica"),
      S.documentTypeListItem("certification").title("Certificações"),
      S.documentTypeListItem("languageCourse").title("Idiomas & Cursos"),
      S.documentTypeListItem("project").title("Projetos"),
      S.divider(),
      S.documentTypeListItem("hackathon").title("Extras: Hackathons"),
      S.documentTypeListItem("volunteering").title("Extras: Voluntariado & Pesquisa"),
      S.documentTypeListItem("event").title("Extras: Eventos"),
    ]);
