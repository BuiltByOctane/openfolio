import { Mail, MapPin, Globe, Github, Linkedin, Twitter } from "lucide-react";
import type { PortfolioData } from "@/shared/types/portfolio";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] tracking-[0.22em] text-stone-500 uppercase">
      {children}
    </p>
  );
}

function InkLink({
  href,
  children,
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-baseline gap-1 text-stone-900 transition-colors duration-200 hover:text-[#9A7B3F]"
    >
      <span className="border-b border-transparent group-hover:border-[#9A7B3F]">
        {children}
      </span>
    </a>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-10 md:col-start-2">
        <div className="flex items-baseline gap-6">
          <Eyebrow>{kicker}</Eyebrow>
          <div className="h-px flex-1 bg-stone-300/70" />
          <span className="font-serif text-stone-400 italic">{title}</span>
        </div>
      </div>
    </div>
  );
}

export default function EditorialTemplate({ data }: { data: PortfolioData }) {
  const { contact } = data;
  const skills = data.skills.slice();
  const lastSkill = skills.pop();
  const skillSentence =
    skills.length > 0 ? `${skills.join(", ")}, and ${lastSkill}` : lastSkill;

  const contactItems: {
    label: string;
    href: string;
    text: string;
    Icon: React.ComponentType<{ className?: string }>;
    external?: boolean;
  }[] = [];
  if (contact.email)
    contactItems.push({
      label: "Email",
      href: `mailto:${contact.email}`,
      text: contact.email,
      Icon: Mail,
      external: false,
    });
  if (contact.website)
    contactItems.push({
      label: "Web",
      href: contact.website,
      text: contact.website.replace(/^https?:\/\//, ""),
      Icon: Globe,
    });
  if (contact.github)
    contactItems.push({
      label: "GitHub",
      href: `https://github.com/${contact.github}`,
      text: contact.github,
      Icon: Github,
    });
  if (contact.linkedin)
    contactItems.push({
      label: "LinkedIn",
      href: `https://linkedin.com/in/${contact.linkedin}`,
      text: contact.linkedin,
      Icon: Linkedin,
    });
  if (contact.twitter)
    contactItems.push({
      label: "Twitter",
      href: `https://twitter.com/${contact.twitter}`,
      text: `@${contact.twitter}`,
      Icon: Twitter,
    });

  return (
    <main className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased selection:bg-[#9A7B3F]/20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Hero */}
        <header className="pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <Eyebrow>Portfolio — {new Date().getFullYear()}</Eyebrow>
              <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-stone-900 italic sm:text-6xl md:text-7xl">
                {data.name}
              </h1>
              <p className="mt-8 max-w-2xl font-sans text-[11px] tracking-[0.22em] text-stone-600 uppercase">
                {data.headline}
              </p>
              <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-6 md:max-w-3xl md:grid-cols-2">
                {data.bio && (
                  <p className="font-sans text-[15px] leading-[1.75] text-stone-700">
                    {data.bio}
                  </p>
                )}
                <div className="space-y-2 font-sans text-[15px] leading-[1.75] text-stone-700">
                  {data.location && (
                    <p className="flex items-center gap-2 text-stone-600">
                      <MapPin className="h-3.5 w-3.5 text-stone-400" />
                      <span>{data.location}</span>
                    </p>
                  )}
                  {contact.email && (
                    <p>
                      Reach me at{" "}
                      <InkLink href={`mailto:${contact.email}`} external={false}>
                        {contact.email}
                      </InkLink>
                      .
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {data.experience.length > 0 && (
          <section className="pb-24 md:pb-32">
            <SectionHeading kicker="I. Selected experience" title="years of work" />
            <div className="mt-12 grid grid-cols-12 gap-6">
              <ol className="col-span-12 md:col-span-10 md:col-start-2">
                {data.experience.map((item, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-12 gap-6 border-t border-stone-300/70 py-8 md:py-10"
                  >
                    <div className="col-span-12 md:col-span-2">
                      <p className="font-sans text-xs tracking-widest text-stone-500 uppercase">
                        {item.dates}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <h3 className="font-serif text-2xl leading-tight text-stone-900 italic">
                        {item.role}
                      </h3>
                      <p className="mt-1 font-sans text-sm text-stone-600">
                        {item.company}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      {item.bullets.length > 0 && (
                        <ul className="space-y-3 font-sans text-[15px] leading-[1.7] text-stone-700">
                          {item.bullets.map((b, j) => (
                            <li key={j} className="flex gap-3">
                              <span className="mt-[0.6rem] block h-px w-3 flex-none bg-stone-400" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="pb-24 md:pb-32">
            <SectionHeading kicker="II. Selected projects" title="things I made" />
            <div className="mt-12 grid grid-cols-12 gap-6">
              <div className="col-span-12 space-y-20 md:col-span-10 md:col-start-2 md:space-y-28">
                {data.projects.map((p, i) => {
                  const flip = i % 2 === 1;
                  const title = p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#9A7B3F]"
                    >
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  );
                  return (
                    <article
                      key={i}
                      className="grid grid-cols-12 items-start gap-6"
                    >
                      <div
                        className={`col-span-12 md:col-span-2 ${flip ? "md:order-2 md:text-right" : ""}`}
                      >
                        <p className="font-serif text-3xl text-stone-400 italic">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                      </div>
                      <div
                        className={`col-span-12 md:col-span-10 ${flip ? "md:order-1" : ""}`}
                      >
                        <h3 className="font-serif text-3xl leading-tight text-stone-900 italic md:text-4xl">
                          {title}
                        </h3>
                        {p.description && (
                          <p className="mt-5 max-w-2xl font-sans text-[15px] leading-[1.75] text-stone-700">
                            {p.description}
                          </p>
                        )}
                        {p.tech.length > 0 && (
                          <p className="mt-6 max-w-2xl font-sans text-[13px] text-stone-500">
                            <span className="mr-2 tracking-widest text-stone-400 uppercase">
                              Built with
                            </span>
                            {p.tech.join(", ")}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="pb-24 md:pb-32">
            <SectionHeading
              kicker="III. A short inventory"
              title="what I'm comfortable with"
            />
            <div className="mt-12 grid grid-cols-12 gap-6">
              <p className="col-span-12 font-serif text-2xl leading-[1.55] text-stone-800 md:col-span-8 md:col-start-2">
                Comfortable with{" "}
                <span className="text-stone-900 italic">{skillSentence}</span>.
              </p>
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="pb-16 md:pb-20">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-10 md:col-start-2">
                <div className="h-px w-full bg-stone-300/70" />
                <div className="grid grid-cols-12 gap-6 pt-6">
                  <div className="col-span-12 md:col-span-2">
                    <Eyebrow>Education</Eyebrow>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <ul className="space-y-3 font-sans text-[15px] text-stone-700">
                      {data.education.map((e, i) => (
                        <li
                          key={i}
                          className="flex flex-col md:flex-row md:items-baseline md:gap-6"
                        >
                          <span className="font-serif text-lg text-stone-900 italic">
                            {e.school}
                          </span>
                          <span className="text-stone-600">{e.degree}</span>
                          <span className="font-sans text-xs tracking-widest text-stone-500 uppercase md:ml-auto">
                            {e.dates}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {contactItems.length > 0 && (
          <footer className="pb-28 md:pb-40">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-10 md:col-start-2">
                <p className="max-w-2xl font-serif text-3xl leading-tight text-stone-900 italic md:text-4xl">
                  If any of this is interesting to you, write me a letter.
                </p>
                <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-3 font-sans text-[15px] sm:grid-cols-2 md:grid-cols-3">
                  {contactItems.map(({ label, href, text, Icon, external }) => (
                    <li key={label} className="flex items-baseline gap-3">
                      <Icon className="h-3.5 w-3.5 translate-y-[2px] text-stone-400" />
                      <span className="w-16 font-sans text-xs tracking-widest text-stone-500 uppercase">
                        {label}
                      </span>
                      <InkLink href={href} external={external !== false}>
                        {text}
                      </InkLink>
                    </li>
                  ))}
                </ul>
                <div className="mt-20 flex items-center justify-between font-sans text-xs tracking-widest text-stone-500 uppercase">
                  <span>
                    © {new Date().getFullYear()} {data.name}
                  </span>
                  <span>Set in Instrument Serif &amp; Inter</span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </main>
  );
}
