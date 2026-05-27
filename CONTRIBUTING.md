# Contributing to Openfolio

Thanks for the interest. Openfolio is a small, fast-moving project — keep PRs focused and we'll move fast on review.

## Ground rules

- Be kind. See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
- One topic per PR. If you're shipping a template *and* fixing a parser bug, that's two PRs.
- TypeScript strict, no `any` unless commented.
- No new runtime dependencies without discussion in an issue first.
- Respect the feature-sliced layout (see below).

## Project layout

Two top-level buckets under `src/`:

- `src/feature/<name>/` — self-contained vertical slice. Owns its `pages/`, `components/`, `hooks/`, `store/`, `api/`, `utils/`, `types/`. Only create the sub-folders you need.
- `src/shared/` — cross-feature reusables: `ui/<component>/`, `hooks/`, `lib/`, `constants/`.
- `src/app/` — Next.js routing. Route files are thin re-exports of feature pages. Route segment config (`revalidate`, `dynamic`, `runtime`, etc.) must live inline in `src/app/` because Next.js can't pick it up across re-exports.

Rules of thumb:

- Code used by **one** feature lives in that feature. Never import across features.
- Two consumers → **promote to `shared/`**. Don't promote "in case".
- Folders + files are `kebab-case` (`chat-header.tsx`, `match-store.ts`). Components export `PascalCase`.
- One component per file. Co-locate styles/tests next to source.
- Suffixes: `-page.tsx`, `-store.ts`, `-card.tsx`, `-template.tsx` — match the sibling pattern.
- No deep nesting beyond `feature/<name>/<bucket>/<file>`. If a bucket grows past ~8 files, split by sub-folder.
- Delete dead folders. Don't keep empty ones.

Path alias `@/*` maps to `./src/*`. Import with `@/feature/...`, `@/shared/...`.

## Ways to contribute

| Area | Where to start |
| --- | --- |
| **New template theme** | [`src/shared/ui/templates/`](./src/shared/ui/templates) — see [Add a template](#add-a-template) |
| **New feature** | Open an issue with the proposal first. Code goes in [`src/feature/<name>/`](./src/feature) |
| **Bug fix** | File a bug issue (or skip it if the fix is obvious) and open a PR |
| **Docs** | README, this file, inline JSDoc, screenshots in `docs/` |
| **GitHub parser** | [`src/feature/build/api/github-client.ts`](./src/feature/build/api/github-client.ts) — improve fallback data, language detection, pinned repo extraction |

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

Templates are pure React components that receive a `PortfolioData` object (see [`src/shared/types/portfolio.ts`](./src/shared/types/portfolio.ts)) and render a full-page portfolio.

1. **Create the file.** `src/shared/ui/templates/your-template.tsx` (kebab-case filename, PascalCase default export). Signature:

   ```ts
   import type { PortfolioData } from "@/shared/types/portfolio";

   export default function YourTemplate({ data }: { data: PortfolioData }) {
     return <main>{/* … */}</main>;
   }
   ```

2. **Register the id.** Add it to `TEMPLATE_IDS` in `src/shared/types/portfolio.ts`. The Zod schema picks up the new id automatically.

3. **Register the component.** In `src/shared/ui/templates/index.ts`, add entries to `TEMPLATES`, `TEMPLATE_LABELS`, and `TEMPLATE_DESCRIPTIONS`.

4. **Test with fixtures.** Visit `/dev/templates` to render every template against the bundled fixtures (full + github-only). Fixtures live at [`src/feature/dev/utils/sample-portfolio.ts`](./src/feature/dev/utils/sample-portfolio.ts). Templates must not crash on missing optional fields.

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
