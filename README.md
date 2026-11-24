# Roberto Garrahan - Portfolio v2

Portfólio pessoal desenvolvido em Next.js com layout vertical contínuo (single-page scroll), suporte a português e inglês, alternância de tema claro/escuro e gerenciamento de conteúdo via Sanity CMS embutido na rota `/studio`.

## Stack e versões

| Categoria | Tecnologia | Versão |
| --- | --- | --- |
| Framework | Next.js (App Router + Turbopack) | `^16.4.6` |
| UI | React / React DOM | `^19.3.1` |
| Linguagem | TypeScript | `^7.0.2` |
| Estilização | Tailwind CSS | `^4.1.9` |
| CMS | Sanity / `next-sanity` / `@sanity/vision` | `^6.24.0` / `^13.5.1` / `^6.24.0` |
| Animações | Framer Motion | `12.26.2` |
| Componentes e ícones | Radix UI (shadcn/ui) e Lucide React | `^0.454.0` |
| Linter | Oxlint | `^1.95.0` |
| Runtime | Node.js | `22+` |

## Arquitetura

A página inicial ([`app/page.tsx`](app/page.tsx)) é um Server Component com revalidação periódica (`revalidate = 60`). Ela busca todos os dados do portfólio em uma única query GROQ no Sanity e repassa o resultado para o componente cliente [`components/portfolio-page.tsx`](components/portfolio-page.tsx), que controla idioma, tema e navegação por âncoras.

As seções seguem um fluxo vertical fixo:

1. Hero (apresentação, links sociais e download do currículo PDF no idioma ativo)
2. Experiência profissional (`#experiencia`)
3. Educação, certificações e idiomas (`#educacao`)
4. Projetos (`#projetos`)
5. Extras: hackathons, voluntariado/pesquisa e eventos com paginação vertical de 3 itens (`#extras`)

A barra de navegação ([`components/sticky-tabs.tsx`](components/sticky-tabs.tsx)) acompanha a rolagem e usa o hook [`hooks/use-active-section.ts`](hooks/use-active-section.ts) (`IntersectionObserver`) para destacar a seção visível, pausando a detecção durante cliques programáticos para evitar saltos intermediários.

### Estrutura de pastas

```text
app/
  page.tsx                        # Server Component da página inicial (ISR + busca Sanity)
  layout.tsx                      # Fontes, metadata e ThemeProvider
  globals.css                     # Tokens de cor, tema e scroll-behavior
  api/revalidate/route.ts         # Webhook POST para revalidação sob demanda do Sanity
  studio/[[...tool]]/             # Sanity Studio embutido na rota /studio
components/
  portfolio-page.tsx              # Shell client com estado de idioma e Scroll Spy
  header.tsx / sticky-tabs.tsx    # Topo e barra de navegação fixa com âncoras
  hero-section.tsx                # Hero e download de currículo
  experience-tab.tsx              # Linha do tempo de experiências
  education-tab.tsx               # Formação, certificações e idiomas
  projects-section.tsx            # Lista de projetos e selo NDA
  extras-tab.tsx                  # Cards de hackathons, extras e eventos
  footer.tsx                      # Rodapé e links sociais
  ui/                             # Primitivos shadcn/ui
hooks/
  use-active-section.ts           # Scroll Spy com IntersectionObserver
lib/
  data.ts                         # Tipos e dados estáticos de fallback (PT/EN)
  translations.ts                 # Textos de interface (PT/EN)
sanity/
  env.ts                          # Leitura das variáveis de ambiente do Sanity
  structure.ts                    # Organização do menu lateral do Studio
  schemas/                        # Schemas bilíngues (profile, experience, education, project, etc.)
  lib/
    client.ts                     # Client next-sanity
    queries.ts                    # Query GROQ consolidada do portfólio
    fetch.ts                      # Busca no Sanity com fallback por seção para lib/data.ts
scripts/
  seed-sanity.ts                  # Migração idempotente de lib/data.ts e public/ para o Sanity
sanity.config.ts                  # Configuração do Sanity Studio
```

## Sanity CMS e revalidação

Os schemas em [`sanity/schemas/`](sanity/schemas) usam objetos bilíngues (`localizedString`, `localizedText` e `localizedStringArray`) para manter português e inglês no mesmo documento. A ordem de exibição é controlada pelo campo `order`.

Se as variáveis do Sanity não estiverem configuradas ou alguma coleção estiver vazia no dataset, [`sanity/lib/fetch.ts`](sanity/lib/fetch.ts) carrega automaticamente os dados locais de [`lib/data.ts`](lib/data.ts) naquela seção.

A rota [`app/api/revalidate/route.ts`](app/api/revalidate/route.ts) valida a assinatura HMAC do webhook do Sanity usando `SANITY_REVALIDATE_SECRET` e invalida imediatamente as tags de cache (`revalidateTag`) e a rota `/`, atualizando o site em produção sem precisar de novo deploy.

## Como rodar localmente

### Requisitos

- Node.js 22 ou superior (o script de seed usa suporte nativo a TypeScript do Node)
- npm

### Instalação

```bash
git clone https://github.com/RobertoGarrahan/portfolio-v2.git
cd portfolio-v2
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto (ou rode `npx sanity@latest init --env`):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
SANITY_REVALIDATE_SECRET=segredo_do_webhook
SANITY_API_WRITE_TOKEN=token_editor_usado_apenas_no_seed
```

Sem essas variáveis o site ainda inicia normalmente em `http://localhost:3000` usando os dados de fallback em `lib/data.ts`.

### Execução

```bash
npm run dev
```

- Site público: `http://localhost:3000`
- Painel Sanity Studio: `http://localhost:3000/studio`

Para popular o dataset do Sanity com os dados locais e enviar as imagens e currículos PDF de `public/`:

```bash
npm run seed:sanity
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js |
| `npm run build` | Gera o build de produção com validação de tipos do TypeScript 7 |
| `npm run start` | Sobe o servidor de produção após o build |
| `npm run lint` | Executa o Oxlint no projeto |
| `npm run seed:sanity` | Envia os dados de `lib/data.ts` e assets de `public/` para o Sanity via `createOrReplace` |
| `npx tsc --noEmit` | Executa a checagem de tipos sem emitir arquivos |
