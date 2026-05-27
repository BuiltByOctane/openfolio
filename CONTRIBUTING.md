# Contributing to Openfolio

Thanks for the interest. Openfolio is a small, fast-moving project — keep PRs focused and we'll move fast on review.

## Ground rules

- Be kind. See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
- One topic per PR. If you're shipping a template *and* fixing a parser bug, that's two PRs.
- TypeScript strict, no `any` unless commented.
- No new runtime dependencies without discussion in an issue first.

## Ways to contribute

| Area | Where to start |
| --- | --- |
| **New template theme** | [`components/templates/`](./components/templates) — see [Add a template](#add-a-template) |
| **New feature** | Open an issue with the proposal first |
| **Bug fix** | File a bug issue (or skip it if the fix is obvious) and open a PR |
| **Docs** | README, this file, inline JSDoc, screenshots in `docs/` |
| **GitHub parser** | [`lib/parsers/`](./lib/parsers) — improve fallback data, language detection, pinned repo extraction |

## Dev setup

```bash
git clone https://github.com/builtbyoctane/openfolio.git
cd openfolio
pnpm install
cp .env.local.example .env.local
pnpm dev
```

`pnpm dev` runs Next.js at <http://localhost:3000>. Pre-merge checks:

```bash
pnpm lint
pnpm build
```

## Add a template

Templates are pure React components that receive a `PortfolioData` object (see [`types/portfolio.ts`](./types/portfolio.ts)) and render a full-page portfolio.

1. **Create the file.** `components/templates/YourTemplate.tsx`. Export a default component with this signature:

   ```ts
   import type { PortfolioData } from "@/types/portfolio";

   export default function YourTemplate({ data }: { data: PortfolioData }) {
     return <main>{/* … */}</main>;
   }
   ```

2. **Register the id.** Add it to `TEMPLATE_IDS` in `types/portfolio.ts`. The Zod schema picks up the new id automatically.

3. **Register the component.** In `components/templates/index.ts`, add entries to `TEMPLATES`, `TEMPLATE_LABELS`, and `TEMPLATE_DESCRIPTIONS`.

4. **Test with fixtures.** Use the fixtures in `lib/fixtures/` to preview the template against varied data shapes (empty bio, no projects, long location, missing avatar, etc.). Templates must not crash when optional fields are missing.

5. **Screenshots.** Drop a screenshot (1200×800 PNG) into your PR description so reviewers can see it without checking out the branch.

### Template checklist

- [ ] Handles missing/empty `bio`, `avatar`, `location`, `experience`, `education`, `skills`, `projects`
- [ ] Renders contact handles (github/linkedin/twitter store handles only — build the URL inside the template)
- [ ] Responsive on mobile (≤ 375px) and desktop (≥ 1280px)
- [ ] Dark-on-light or light-on-dark — pick one, be deliberate
- [ ] No `<img src="…github.com…">` without `loading="lazy"` for repo screenshots
- [ ] Passes `pnpm lint` and `pnpm build`

## Commit conventions

[Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add aurora template
fix: handle empty repo list in github parser
docs: rewrite README
chore: bump next to 16.2.7
```

Scopes are optional and project-flavored (`feat(template): …`, `fix(parser): …`).

## PR process

1. Branch from `main`. Keep the diff small.
2. Open the PR with the template (`.github/PULL_REQUEST_TEMPLATE.md` will prefill).
3. CI must be green. Lint and build must pass.
4. A maintainer reviews. Address feedback in new commits — don't force-push during review.
5. Squash-merge once approved.

## Reporting bugs

Open an issue with:

- What you did (URL pasted, template picked, button clicked)
- What you expected
- What actually happened (screenshot or recording helps)
- Browser + OS

## Proposing features

Open an issue *before* writing code. A short proposal — problem, sketch of a solution, alternatives considered — saves both sides time.

## Security

Don't open a public issue for a security report. Email <oss@octane.team> instead.

## License

By contributing you agree your work is released under the [MIT License](./LICENSE).
