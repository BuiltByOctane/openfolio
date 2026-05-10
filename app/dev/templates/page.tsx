import Link from "next/link";
import { TEMPLATES, TEMPLATE_LABELS } from "@/components/templates";
import { samplePortfolio, githubOnlyFixture } from "@/lib/fixtures/sample-portfolio";
import { TEMPLATE_IDS, type TemplateId } from "@/types/portfolio";

export const dynamic = "force-static";

export default function DevTemplatesPage({
  searchParams,
}: {
  searchParams?: { fixture?: string; t?: string };
}) {
  const fixture = searchParams?.fixture === "github" ? githubOnlyFixture : samplePortfolio;
  const single = (searchParams?.t as TemplateId | undefined) ?? null;

  if (single && TEMPLATE_IDS.includes(single)) {
    const Tpl = TEMPLATES[single];
    return <Tpl data={fixture} />;
  }

  return (
    <div className="bg-neutral-50 px-6 py-12 text-neutral-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-medium tracking-tight">Template gallery (dev)</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Rendering every template against the{" "}
          <Link
            href="/dev/templates"
            className="underline decoration-neutral-300 underline-offset-4"
          >
            full fixture
          </Link>{" "}
          /{" "}
          <Link
            href="/dev/templates?fixture=github"
            className="underline decoration-neutral-300 underline-offset-4"
          >
            github-only fixture
          </Link>{" "}
          (no experience or education).
        </p>

        <ul className="mt-8 grid gap-8">
          {TEMPLATE_IDS.map((id) => (
            <li key={id} className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
              <div className="flex items-baseline justify-between border-b border-neutral-200 px-4 py-3">
                <h2 className="text-sm font-medium">{TEMPLATE_LABELS[id]}</h2>
                <Link
                  href={`/dev/templates?t=${id}${searchParams?.fixture === "github" ? "&fixture=github" : ""}`}
                  className="text-xs text-neutral-500 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900"
                >
                  open fullscreen →
                </Link>
              </div>
              <iframe
                title={id}
                src={`/dev/templates?t=${id}${searchParams?.fixture === "github" ? "&fixture=github" : ""}`}
                className="block h-[640px] w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
