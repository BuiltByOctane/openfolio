import { Mail, Globe, Github, Linkedin, Twitter, MapPin } from "lucide-react";
import type { PortfolioData } from "@/shared/types/portfolio";

function SectionTitle({ name }: { name: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-2 border-b border-neutral-200 pb-2">
      <span className="font-mono text-lg text-neutral-300 select-none">#</span>
      <h2 className="text-lg font-medium tracking-tight text-neutral-900">{name}</h2>
    </div>
  );
}

function ContactIcon({ kind }: { kind: string }) {
  const cls = "h-3.5 w-3.5 text-neutral-400";
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

type ContactEntry = { kind: string; href: string; text: string };

function buildContactEntries(contact: PortfolioData["contact"]): ContactEntry[] {
  const out: ContactEntry[] = [];
  if (contact.email)
    out.push({ kind: "email", href: `mailto:${contact.email}`, text: contact.email });
  if (contact.website)
    out.push({
      kind: "website",
      href: contact.website,
      text: contact.website.replace(/^https?:\/\//, ""),
    });
  if (contact.github)
    out.push({
      kind: "github",
      href: `https://github.com/${contact.github}`,
      text: contact.github,
    });
  if (contact.linkedin)
    out.push({
      kind: "linkedin",
      href: `https://linkedin.com/in/${contact.linkedin}`,
      text: contact.linkedin,
    });
  if (contact.twitter)
    out.push({
      kind: "twitter",
      href: `https://twitter.com/${contact.twitter}`,
      text: `@${contact.twitter}`,
    });
  return out;
}

export default function NotebookTemplate({ data }: { data: PortfolioData }) {
  const contactEntries = buildContactEntries(data.contact);
  const sections = [
    { id: "about", label: "About", show: true },
    { id: "experience", label: "Experience", show: data.experience.length > 0 },
    { id: "projects", label: "Projects", show: data.projects.length > 0 },
    { id: "skills", label: "Skills", show: data.skills.length > 0 },
    { id: "education", label: "Education", show: data.education.length > 0 },
    { id: "contact", label: "Contact", show: contactEntries.length > 0 },
  ].filter((s) => s.show);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-12 lg:gap-16">
        {/* Side nav */}
        <aside className="sticky top-12 hidden h-fit w-44 shrink-0 lg:block">
          <nav>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-baseline gap-2 text-sm text-neutral-500 hover:text-neutral-900"
                  >
                    <span className="font-mono text-xs text-neutral-300">#</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main column */}
        <main className="min-w-0 max-w-2xl flex-1">
          <section id="about" className="mb-16">
            <div className="flex items-center gap-4">
              {data.avatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.avatar}
                  alt={data.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-2xl font-medium tracking-tight text-neutral-900">
                  {data.name}
                </h1>
                <p className="text-sm text-neutral-500">{data.headline}</p>
              </div>
            </div>

            {data.location && (
              <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-neutral-500">
                <MapPin className="h-3.5 w-3.5" />
                {data.location}
              </p>
            )}

            {data.bio && (
              <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">
                {data.bio}
              </p>
            )}
          </section>

          {data.experience.length > 0 && (
            <section id="experience" className="mb-16">
              <SectionTitle name="Experience" />
              <ol className="space-y-8">
                {data.experience.map((job, i) => (
                  <li key={i}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-[15px] font-medium text-neutral-900">
                        {job.role}{" "}
                        <span className="text-neutral-500">at {job.company}</span>
                      </h3>
                      <span className="font-mono text-xs text-neutral-500 tabular-nums">
                        {job.dates}
                      </span>
                    </div>
                    {job.bullets.length > 0 && (
                      <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-neutral-700">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-[10px] h-px w-2 shrink-0 bg-neutral-300"
                            />
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

          {data.projects.length > 0 && (
            <section id="projects" className="mb-16">
              <SectionTitle name="Projects" />
              <ol className="space-y-8">
                {data.projects.map((p, i) => (
                  <li key={i}>
                    <h3 className="text-[15px] font-medium text-neutral-900">
                      {p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                        >
                          {p.name}
                        </a>
                      ) : (
                        p.name
                      )}
                    </h3>
                    {p.description && (
                      <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
                        {p.description}
                      </p>
                    )}
                    {p.tech.length > 0 && (
                      <p className="mt-2 font-mono text-xs text-neutral-500">
                        {p.tech.join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {data.skills.length > 0 && (
            <section id="skills" className="mb-16">
              <SectionTitle name="Skills" />
              <ul className="flex flex-wrap gap-1.5">
                {data.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs text-neutral-700"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.education.length > 0 && (
            <section id="education" className="mb-16">
              <SectionTitle name="Education" />
              <ul className="space-y-3">
                {data.education.map((e, i) => (
                  <li
                    key={i}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                  >
                    <span className="text-[15px] text-neutral-900">
                      <span className="font-medium">{e.school}</span>
                      <span className="text-neutral-500"> · {e.degree}</span>
                    </span>
                    <span className="font-mono text-xs text-neutral-500">
                      {e.dates}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {contactEntries.length > 0 && (
            <section id="contact" className="mb-16">
              <SectionTitle name="Contact" />
              <ul className="space-y-2">
                {contactEntries.map((c) => (
                  <li key={c.kind} className="flex items-center gap-3">
                    <ContactIcon kind={c.kind} />
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-700 hover:text-neutral-900"
                    >
                      {c.text}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-16 text-xs text-neutral-400">
            © {new Date().getFullYear()} {data.name}
          </p>
        </main>
      </div>
    </div>
  );
}
