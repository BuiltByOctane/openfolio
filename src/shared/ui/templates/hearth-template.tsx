import { Mail, Globe, Github, Linkedin, Twitter, MapPin } from "lucide-react";
import type { PortfolioData } from "@/shared/types/portfolio";

const SAGE = "#7A8B6E";

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-16 mb-8">
      <h2
        className="font-sans text-xs tracking-widest uppercase"
        style={{ color: SAGE }}
      >
        {children}
      </h2>
      <div className="mt-2 h-px w-full" style={{ backgroundColor: SAGE, opacity: 0.5 }} />
    </div>
  );
}

function joinWithAnd(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function ContactLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-stone-600 transition-colors hover:underline hover:decoration-1 hover:underline-offset-4"
      style={{ textDecorationColor: SAGE }}
    >
      {label}
    </a>
  );
}

type ContactItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

export default function HearthTemplate({ data }: { data: PortfolioData }) {
  const bioParagraphs = data.bio
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const primarySkills = data.skills.slice(0, 4);
  const secondarySkills = data.skills.slice(4);

  const contactItems: ContactItem[] = [];
  if (data.contact.email)
    contactItems.push({
      key: "email",
      label: data.contact.email,
      href: `mailto:${data.contact.email}`,
      icon: <Mail size={12} strokeWidth={1.5} />,
    });
  if (data.contact.website)
    contactItems.push({
      key: "website",
      label: data.contact.website.replace(/^https?:\/\//, ""),
      href: data.contact.website,
      icon: <Globe size={12} strokeWidth={1.5} />,
    });
  if (data.contact.github)
    contactItems.push({
      key: "github",
      label: data.contact.github,
      href: `https://github.com/${data.contact.github}`,
      icon: <Github size={12} strokeWidth={1.5} />,
    });
  if (data.contact.linkedin)
    contactItems.push({
      key: "linkedin",
      label: data.contact.linkedin,
      href: `https://linkedin.com/in/${data.contact.linkedin}`,
      icon: <Linkedin size={12} strokeWidth={1.5} />,
    });
  if (data.contact.twitter)
    contactItems.push({
      key: "twitter",
      label: `@${data.contact.twitter}`,
      href: `https://twitter.com/${data.contact.twitter}`,
      icon: <Twitter size={12} strokeWidth={1.5} />,
    });

  return (
    <main className="min-h-screen w-full bg-[#FBF7F0] font-sans text-stone-800 antialiased">
      <div className="mx-auto max-w-2xl px-6 py-20 leading-relaxed sm:px-8 sm:py-24">
        <header>
          {data.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.avatar}
              alt={data.name}
              className="h-20 w-20 rounded-full object-cover"
              style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}
            />
          ) : (
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full font-serif text-2xl text-stone-500"
              style={{ backgroundColor: "#EFE8DA" }}
            >
              {data.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
          )}

          <h1 className="mt-8 font-serif text-4xl font-medium tracking-tight text-stone-900">
            {data.name}
          </h1>
          <p className="mt-2 font-sans text-base text-stone-500 italic">
            {data.headline}
          </p>
          {data.location && (
            <p className="mt-1 inline-flex items-center gap-1.5 font-sans text-sm text-stone-500">
              <MapPin size={12} strokeWidth={1.5} />
              {data.location}
            </p>
          )}

          {bioParagraphs.length > 0 && (
            <div className="mt-8 space-y-5 font-sans text-[17px] text-stone-700">
              {bioParagraphs.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}
        </header>

        {data.experience.length > 0 && (
          <section>
            <SectionHeader>Work</SectionHeader>
            <div className="space-y-10">
              {data.experience.map((job, i) => (
                <article key={i}>
                  <p className="font-sans text-[17px] leading-relaxed text-stone-700">
                    <span className="font-serif text-stone-900 italic">{job.role}</span>{" "}
                    at{" "}
                    <span className="font-serif text-stone-900 italic">{job.company}</span>
                    <span className="ml-2 font-sans text-sm text-stone-500 not-italic">
                      · {job.dates}
                    </span>
                  </p>
                  {job.bullets.length > 0 && (
                    <ul className="mt-3 space-y-2 font-sans text-[17px] text-stone-700">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 leading-relaxed">
                          <span
                            className="mt-[2px] shrink-0 select-none"
                            style={{ color: SAGE }}
                            aria-hidden
                          >
                            —
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section>
            <SectionHeader>Selected projects</SectionHeader>
            <div className="space-y-8">
              {data.projects.map((p, i) => (
                <article key={i} className="border-l-2 pl-6" style={{ borderColor: SAGE }}>
                  <h3 className="font-serif text-xl font-medium text-stone-900">
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:underline hover:decoration-1 hover:underline-offset-4"
                        style={{ textDecorationColor: SAGE }}
                      >
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  {(p.description || p.tech.length > 0) && (
                    <p className="mt-2 font-sans text-[17px] leading-relaxed text-stone-700">
                      {p.description && <>{p.description} </>}
                      {p.tech.length > 0 && (
                        <span className="text-stone-500">
                          Built with {joinWithAnd(p.tech)}.
                        </span>
                      )}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <SectionHeader>Tools of the trade</SectionHeader>
            <p className="font-sans text-[17px] leading-relaxed text-stone-700">
              I&apos;m most comfortable with{" "}
              <span className="text-stone-900">{joinWithAnd(primarySkills)}</span>.
              {secondarySkills.length > 0 && (
                <>
                  {" "}
                  I&apos;ve also worked with{" "}
                  <span className="text-stone-700">{joinWithAnd(secondarySkills)}</span>.
                </>
              )}
            </p>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <SectionHeader>Education</SectionHeader>
            <div className="space-y-4">
              {data.education.map((e, i) => (
                <p key={i} className="font-sans text-[17px] leading-relaxed text-stone-700">
                  <span className="font-serif text-stone-900 italic">{e.degree}</span>,{" "}
                  {e.school}
                  <span className="ml-2 font-sans text-sm text-stone-500">· {e.dates}</span>
                </p>
              ))}
            </div>
          </section>
        )}

        {contactItems.length > 0 && (
          <section>
            <SectionHeader>Elsewhere</SectionHeader>
            <p className="font-sans text-[17px] leading-relaxed text-stone-600">
              {contactItems.map((c, i) => (
                <span key={c.key}>
                  <ContactLink href={c.href} label={c.label} />
                  {i < contactItems.length - 1 && (
                    <span className="mx-3 text-stone-400 select-none">·</span>
                  )}
                </span>
              ))}
            </p>
          </section>
        )}

        <footer className="mt-24 border-t pt-8" style={{ borderColor: "#E8DFCC" }}>
          <p className="font-sans text-xs text-stone-400">
            © {new Date().getFullYear()} {data.name}. Tended by hand.
          </p>
        </footer>
      </div>
    </main>
  );
}
