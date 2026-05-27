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

```
app/                Next.js App Router (routes, layout, metadata, sitemap)
  api/publish/      Persists a draft as a published portfolio
  build/github/     GitHub URL input page
  build/preview/    Template picker + publish flow
  [slug]/           Public portfolio route (renders selected template)
components/
  templates/        Portfolio templates (one file per template)
  TemplatePicker.tsx, TemplateRenderer.tsx
lib/                Drafts store, GitHub fetch/parse helpers, fixtures
types/portfolio.ts  PortfolioData zod schema + TemplateId union
data/profiles/      Published portfolio JSON (file-based store)
public/             Static assets (favicon, manifest)
```

## Contributing

Openfolio is open source and we want your help. Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

Quick ideas:

- **New template themes** — design a portfolio template, drop it in `components/templates/`, register it.
- **New features** — better GitHub parsing, custom domains, OG image generator, analytics opt-in.
- **Bug fixes & polish** — parsing edge cases, a11y, layout, performance.
- **Docs & examples** — README, template authoring guide, screenshots, recorded demos.

By contributing you agree to abide by the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

[MIT](./LICENSE) © Delbin George and contributors.

Made by [octane.team](https://octane.team).
