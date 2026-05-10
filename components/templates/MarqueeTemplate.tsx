import { Mail, Globe, Github, Linkedin, Twitter } from "lucide-react";
import { Fragment } from "react";
import type { PortfolioData } from "@/types/portfolio";

function ContactIcon({ kind, className }: { kind: string; className?: string }) {
  const cls = className ?? "w-3.5 h-3.5";
  switch (kind) {
    case "email":
      return <Mail className={cls} />;
    case "website":
      return <Globe className={cls} />;
    case "github":
      return <Github className={cls} />;
    case "linkedin":
      return <Linkedin className={cls} />;
    case "twitter":
      return <Twitter className={cls} />;
    default:
      return null;
  }
}

function ContactIconRow({
  contact,
}: {
  contact: PortfolioData["contact"];
}) {
  const items: { kind: string; href: string }[] = [];
  if (contact.email) items.push({ kind: "email", href: `mailto:${contact.email}` });
  if (contact.website) items.push({ kind: "website", href: contact.website });
  if (contact.github)
    items.push({ kind: "github", href: `https://github.com/${contact.github}` });
  if (contact.linkedin)
    items.push({
      kind: "linkedin",
      href: `https://linkedin.com/in/${contact.linkedin}`,
    });
  if (contact.twitter)
    items.push({
      kind: "twitter",
      href: `https://twitter.com/${contact.twitter}`,
    });
  if (items.length === 0) return null;
  return (
    <div className="flex items-center gap-4">
      {items.map((it) => (
        <a
          key={it.kind}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-900 hover:text-neutral-500"
          aria-label={it.kind}
        >
          <ContactIcon kind={it.kind} className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

function SectionRule({ number, title }: { number: string; title: string }) {
  return (
    <div className="border-t border-neutral-900">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 pt-6 md:pt-8">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-xs tracking-widest text-neutral-900">
              {number}
            </div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <div className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarqueeTemplate({ data }: { data: PortfolioData }) {
  const nameParts = data.name.split(" ").filter(Boolean);
  const lastName = nameParts.length > 1 ? nameParts.slice(-1)[0] : nameParts[0] ?? "";
  const firstNames =
    nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : "";

  return (
    <main className="min-h-screen bg-[#F5F2EB] font-sans text-neutral-900 antialiased selection:bg-neutral-900 selection:text-[#F5F2EB]">
      <section className="px-6 pt-10 pb-10 md:px-10 md:pt-16 md:pb-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-baseline justify-between font-mono text-xs tracking-[0.2em] text-neutral-900 uppercase">
            <span>Portfolio</span>
            <span className="hidden md:inline">Available for new work</span>
          </div>

          <h1 className="mt-8 text-[64px] leading-[0.85] font-black tracking-tight sm:text-[88px] md:mt-16 md:text-[140px] lg:text-[180px] xl:text-[200px]">
            {firstNames && <span className="block">{firstNames}</span>}
            <span className="block font-serif font-normal tracking-tighter italic">
              {lastName}.
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-y-3 text-sm md:mt-14 md:flex-row md:items-baseline md:justify-between">
            <p className="max-w-2xl">
              <span className="font-medium">{data.headline}.</span>{" "}
              {data.location && (
                <span className="text-neutral-500">Based in {data.location}.</span>
              )}
            </p>
            <ContactIconRow contact={data.contact} />
          </div>
        </div>
      </section>

      {data.bio && (
        <>
          <SectionRule number="01" title="About" />
          <section className="px-6 py-10 md:px-10 md:py-16">
            <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 gap-y-6">
              <div className="col-span-12 md:col-span-2">
                <div className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
                  Statement
                </div>
              </div>
              <div className="col-span-12 md:col-span-10">
                <p className="text-2xl leading-[1.05] font-medium tracking-tight text-balance md:text-4xl lg:text-5xl">
                  {data.bio}
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {data.experience.length > 0 && (
        <>
          <SectionRule number="02" title="Experience" />
          <section className="px-6 py-10 md:px-10 md:py-14">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-y-12 md:gap-y-16">
              {data.experience.map((job, idx) => (
                <article
                  key={idx}
                  className="grid grid-cols-12 gap-x-6 gap-y-4"
                >
                  <div className="col-span-12 font-mono text-xs tracking-widest text-neutral-500 md:col-span-2">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <h3 className="text-2xl leading-tight font-medium tracking-tight md:text-3xl">
                      {job.role}
                    </h3>
                  </div>
                  <div className="col-span-12 text-sm md:col-span-3 md:text-right">
                    <div className="font-medium">{job.company}</div>
                    <div className="mt-1 font-mono text-xs tracking-widest text-neutral-500">
                      {job.dates}
                    </div>
                  </div>
                  {job.bullets.length > 0 && (
                    <div className="col-span-12 mt-2 md:col-span-10 md:col-start-3">
                      <ul className="grid grid-cols-1 gap-x-10 gap-y-3 text-sm leading-relaxed md:grid-cols-2">
                        {job.bullets.map((b, i) => (
                          <li key={i} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-[0.6em] inline-block h-px w-3 flex-shrink-0 bg-neutral-900"
                            />
                            <span className="text-pretty">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {data.projects.length > 0 && (
        <>
          <SectionRule number="03" title="Selected work" />
          <section className="px-6 py-10 md:px-10 md:py-14">
            <div className="mx-auto flex max-w-[1400px] flex-col">
              {data.projects.map((p, idx) => {
                const inner = (
                  <div className="grid grid-cols-12 gap-x-6 gap-y-3">
                    <div className="col-span-12 font-mono text-xs tracking-widest text-neutral-500 md:col-span-2">
                      {String(idx + 1).padStart(2, "0")} / Project
                    </div>
                    <div className="col-span-12 md:col-span-10">
                      <h3 className="text-3xl leading-[0.95] font-black tracking-tight md:text-5xl lg:text-6xl">
                        {p.name}
                        {p.link && (
                          <span
                            aria-hidden
                            className="ml-3 inline-block translate-y-[-0.15em] text-2xl md:text-3xl"
                          >
                            ↗
                          </span>
                        )}
                      </h3>
                      {p.description && (
                        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-pretty text-neutral-700 md:text-base">
                          {p.description}
                        </p>
                      )}
                      {p.tech.length > 0 && (
                        <div className="mt-4 font-mono text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
                          {p.tech.join(" · ")}
                        </div>
                      )}
                    </div>
                  </div>
                );
                return (
                  <div
                    key={idx}
                    className="group border-t border-neutral-900/20 py-8 transition-colors first:border-t-0 hover:bg-neutral-900 hover:text-[#F5F2EB] md:py-12"
                  >
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="block">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {data.skills.length > 0 && (
        <>
          <SectionRule number="04" title="Practice" />
          <section className="px-6 py-10 md:px-10 md:py-16">
            <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 gap-y-6">
              <div className="col-span-12 font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase md:col-span-2">
                What I do
              </div>
              <div className="col-span-12 md:col-span-10">
                <p className="text-2xl leading-snug tracking-tight text-pretty md:text-3xl">
                  {data.skills.map((s, i) => (
                    <Fragment key={s}>
                      <span>{s}</span>
                      {i < data.skills.length - 1 && (
                        <span className="text-neutral-400">, </span>
                      )}
                    </Fragment>
                  ))}
                  <span>.</span>
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {data.education.length > 0 && (
        <>
          <SectionRule number="05" title="Education" />
          <section className="px-6 py-10 md:px-10 md:py-14">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-y-6">
              {data.education.map((e, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2"
                >
                  <div className="col-span-12 font-mono text-xs tracking-widest text-neutral-500 md:col-span-2">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <div className="text-xl font-medium tracking-tight md:text-2xl">
                      {e.school}
                    </div>
                    <div className="mt-1 text-sm text-neutral-600">{e.degree}</div>
                  </div>
                  <div className="col-span-12 font-mono text-xs tracking-widest text-neutral-500 md:col-span-3 md:text-right">
                    {e.dates}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <footer className="border-t border-neutral-900 px-6 pt-12 pb-8 md:px-10 md:pt-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-baseline justify-between font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
            <span>End of file</span>
            <span>
              © {new Date().getFullYear()} {data.name}
            </span>
          </div>
          <h2 className="mt-6 text-[64px] leading-[0.85] font-black tracking-tight sm:text-[88px] md:mt-10 md:text-[140px] lg:text-[180px] xl:text-[200px]">
            {firstNames && <span className="block">{firstNames}</span>}
            <span className="block font-serif font-normal tracking-tighter italic">
              {lastName}.
            </span>
          </h2>
          <div className="mt-10 flex flex-col gap-y-4 text-sm md:mt-14 md:flex-row md:items-baseline md:justify-between">
            <div className="max-w-md">
              <div className="font-medium">Let&apos;s talk.</div>
              <div className="text-neutral-600">
                {data.contact.email && (
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="underline decoration-1 decoration-neutral-900 underline-offset-4 hover:bg-neutral-900 hover:text-[#F5F2EB] hover:no-underline"
                  >
                    {data.contact.email}
                  </a>
                )}
                {data.location && <span> · {data.location}</span>}
              </div>
            </div>
            <ContactIconRow contact={data.contact} />
          </div>
        </div>
      </footer>
    </main>
  );
}
