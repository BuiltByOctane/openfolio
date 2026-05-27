# Openfolio

> Instant portfolio for every developer. Paste a GitHub URL, pick a template, share the link.

Openfolio turns a public GitHub profile into a hosted portfolio site in seconds. Built for backend, DevOps, QA, data, and every developer who'd rather ship code than design a website.

- **No login.** Uses the public GitHub API.
- **No editing.** Regenerate to update.
- **No trackers.** No cookies, no analytics.
- **Open source.** Ship a template or a feature.

## Quickstart

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

Other package managers work too — `npm install && npm run dev`, `yarn`, `bun`.

### Environment

Copy `.env.local.example` to `.env.local` and fill in:

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin used in metadata, OG tags, sitemap, robots, JSON-LD. |

## Tech

- [Next.js 16](https://nextjs.org) (App Router, React 19, React Compiler)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Zod](https://zod.dev) for portfolio schema validation
- [lucide-react](https://lucide.dev) for icons
- TypeScript

## Project layout

Feature-sliced under `src/`. Two top-level buckets: `feature/` (self-contained vertical slices) and `shared/` (cross-feature reusables). Route files in `src/app/` are thin re-exports — logic lives in the feature.

```
src/
  app/                              Next.js App Router (thin shims, segment config)
    layout.tsx                      root layout, metadata, JSON-LD
    page.tsx                        → feature/home
    [slug]/                         → feature/portfolio (page + opengraph-image)
    build/github/, build/preview/   → feature/build
    api/fetch-github/, api/publish/ → feature/build, feature/publish
    dev/templates/                  → feature/dev
    robots.ts, sitemap.ts, globals.css, not-found.tsx

  feature/
    home/pages/                     landing page
    build/
      pages/                        github-page, preview-page
      components/                   preview-client, published-dialog, template-picker
      api/                          github-client, fetch-github-handler
    publish/api/                    publish-handler
    portfolio/
      pages/                        portfolio-page, portfolio-og-image
      components/                   template-renderer
    dev/
      pages/                        templates-page (gallery)
      utils/                        sample-portfolio fixtures

  shared/
    lib/                            drafts.ts, profiles.ts (file-based stores)
    types/portfolio.ts              PortfolioData zod schema + TemplateId union
    ui/templates/                   11 portfolio templates + index.ts

data/profiles/                      Published portfolio JSON (runtime store)
public/                             Static assets (favicon, manifest)
```

**Layout rules:** code used by ONE feature stays inside that feature. Two consumers → promote to `shared/`. Files + folders are kebab-case; default exports are PascalCase. Path alias `@/*` → `./src/*`.

## Contributing

Openfolio is open source and we want your help. Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

Quick ideas:

- **New template themes** — design a portfolio template, drop it in `src/shared/ui/templates/`, register it.
- **New features** — better GitHub parsing, custom domains, OG image generator, analytics opt-in.
- **Bug fixes & polish** — parsing edge cases, a11y, layout, performance.
- **Docs & examples** — README, template authoring guide, screenshots, recorded demos.

By contributing you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

[MIT](./LICENSE) © Delbin George and contributors.

Made by [octane.team](https://octane.team).
