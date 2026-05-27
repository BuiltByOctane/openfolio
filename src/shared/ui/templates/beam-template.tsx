import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Globe,
  MapPin,
} from "lucide-react";
import type { PortfolioData } from "@/shared/types/portfolio";

export default function BeamTemplate({ data }: { data: PortfolioData }) {
  const { contact } = data;
  const hasExperience = data.experience.length > 0;
  const hasProjects = data.projects.length > 0;
  const hasSkills = data.skills.length > 0;
  const hasEducation = data.education.length > 0;
  const hasContact =
    !!contact.email ||
    !!contact.website ||
    !!contact.github ||
    !!contact.linkedin ||
    !!contact.twitter;

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
      <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-sm font-medium tracking-tight text-zinc-100 hover:text-white">
            {data.name}
          </a>
          <ul className="flex items-center gap-6 text-sm text-zinc-400">
            <li>
              <a href="#about" className="hover:text-zinc-100">
                About
              </a>
            </li>
            {hasExperience && (
              <li>
                <a href="#work" className="hover:text-zinc-100">
                  Work
                </a>
              </li>
            )}
            {hasProjects && (
              <li>
                <a href="#projects" className="hover:text-zinc-100">
                  Projects
                </a>
              </li>
            )}
            {hasContact && (
              <li>
                <a href="#contact" className="hover:text-zinc-100">
                  Contact
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-3xl px-6">
        <section id="about" className="pt-20 pb-20">
          <div className="flex items-center gap-3">
            {data.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.avatar}
                alt={data.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border border-zinc-800/60 object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full border border-zinc-800/60 bg-zinc-900" />
            )}
            {data.location && (
              <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span>{data.location}</span>
              </div>
            )}
          </div>

          <h1 className="mt-6 text-4xl font-medium tracking-tight text-zinc-100">
            {data.name}
          </h1>
          <p className="mt-2 text-zinc-400">{data.headline}</p>
          {data.bio && (
            <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-zinc-300">
              {data.bio}
            </p>
          )}
        </section>

        {hasExperience && (
          <section id="work" className="border-t border-zinc-800/60 py-16">
            <h2 className="text-xs font-medium tracking-[0.14em] text-zinc-500 uppercase">
              Experience
            </h2>
            <ol className="mt-8 space-y-10">
              {data.experience.map((job, i) => (
                <li key={i}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[15px] text-zinc-100">
                      <span className="font-medium">{job.role}</span>
                      <span className="text-zinc-500"> · </span>
                      <span className="text-zinc-300">{job.company}</span>
                    </h3>
                    <span className="shrink-0 text-sm tabular-nums text-zinc-500">
                      {job.dates}
                    </span>
                  </div>
                  {job.bullets.length > 0 && (
                    <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-zinc-300">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3">
                          <span aria-hidden className="mt-[10px] h-px w-3 shrink-0 bg-zinc-700" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        {hasProjects && (
          <section id="projects" className="border-t border-zinc-800/60 py-16">
            <h2 className="text-xs font-medium tracking-[0.14em] text-zinc-500 uppercase">
              Projects
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {data.projects.map((p, i) => {
                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[15px] font-medium text-zinc-100 group-hover:text-white">
                        {p.name}
                      </h3>
                      {p.link && (
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-zinc-300"
                          strokeWidth={1.75}
                        />
                      )}
                    </div>
                    {p.description && (
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {p.description}
                      </p>
                    )}
                    {p.tech.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-zinc-800/60 bg-zinc-900/60 px-1.5 py-0.5 text-[11px] text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                );
                return p.link ? (
                  <a
                    key={i}
                    href={p.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group block rounded-md border border-zinc-800/60 bg-zinc-950 p-5 hover:border-zinc-700 hover:bg-zinc-900/40"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={i}
                    className="group block rounded-md border border-zinc-800/60 bg-zinc-950 p-5"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {hasSkills && (
          <section id="skills" className="border-t border-zinc-800/60 py-16">
            <h2 className="text-xs font-medium tracking-[0.14em] text-zinc-500 uppercase">
              Skills
            </h2>
            <ul className="mt-8 flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <li
                  key={s}
                  className="rounded border border-zinc-800/60 bg-zinc-900/60 px-2 py-1 text-[12px] text-zinc-300"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}

        {hasEducation && (
          <section id="education" className="border-t border-zinc-800/60 py-16">
            <h2 className="text-xs font-medium tracking-[0.14em] text-zinc-500 uppercase">
              Education
            </h2>
            <ol className="mt-8 space-y-6">
              {data.education.map((e, i) => (
                <li key={i}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[15px] text-zinc-100">
                      <span className="font-medium">{e.school}</span>
                      <span className="text-zinc-500"> · </span>
                      <span className="text-zinc-300">{e.degree}</span>
                    </h3>
                    <span className="shrink-0 text-sm tabular-nums text-zinc-500">
                      {e.dates}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {hasContact && (
          <footer id="contact" className="border-t border-zinc-800/60 py-10">
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-400">
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-100"
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.website && (
                <>
                  <Dot />
                  <li>
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 hover:text-zinc-100"
                    >
                      <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {contact.website.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                </>
              )}
              {contact.github && (
                <>
                  <Dot />
                  <li>
                    <a
                      href={`https://github.com/${contact.github}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 hover:text-zinc-100"
                    >
                      <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {contact.github}
                    </a>
                  </li>
                </>
              )}
              {contact.linkedin && (
                <>
                  <Dot />
                  <li>
                    <a
                      href={`https://linkedin.com/in/${contact.linkedin}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 hover:text-zinc-100"
                    >
                      <Linkedin className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {contact.linkedin}
                    </a>
                  </li>
                </>
              )}
              {contact.twitter && (
                <>
                  <Dot />
                  <li>
                    <a
                      href={`https://twitter.com/${contact.twitter}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 hover:text-zinc-100"
                    >
                      <Twitter className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {contact.twitter}
                    </a>
                  </li>
                </>
              )}
            </ul>
            <p className="mt-6 text-xs text-zinc-600">
              © {new Date().getFullYear()} {data.name}
            </p>
          </footer>
        )}
      </main>
    </div>
  );
}

function Dot() {
  return (
    <li aria-hidden className="text-zinc-700 select-none">
      ·
    </li>
  );
}
