import { Fragment } from "react";
import type { PortfolioData } from "@/shared/types/portfolio";

const VERMILLION = "#FF3B00";

function Rule({ thick = false }: { thick?: boolean }) {
  return (
    <div
      style={{ height: thick ? 4 : 2, background: "#000", width: "100%" }}
      aria-hidden
    />
  );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex w-full items-baseline bg-black px-4 py-2 text-white">
      <span className="mr-3 font-mono text-sm md:mr-4 md:text-base" style={{ color: VERMILLION }}>
        {number}
      </span>
      <span className="text-sm font-bold tracking-wider uppercase md:text-base">
        {title}
      </span>
    </div>
  );
}

export default function BlockTemplate({ data }: { data: PortfolioData }) {
  const sections: {
    key: string;
    el: React.ReactNode;
  }[] = [];

  let sectionNumber = 0;
  const next = () => String(++sectionNumber).padStart(2, "0");

  if (data.experience.length > 0) {
    const n = next();
    sections.push({
      key: "experience",
      el: (
        <section>
          <SectionHeader number={n} title="Experience" />
          <div className="px-4 md:px-8">
            {data.experience.map((job, i) => (
              <Fragment key={i}>
                <div className="grid grid-cols-12 gap-4 py-8 md:py-10">
                  <div className="col-span-12 font-mono text-xs tracking-wider uppercase md:col-span-3 md:text-sm">
                    {job.dates}
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="text-xl leading-tight font-bold tracking-tight uppercase md:text-2xl">
                      {job.role}
                    </h3>
                    <div className="mt-1 mb-4 font-mono text-xs tracking-wider uppercase md:text-sm">
                      {job.company}
                    </div>
                    {job.bullets.length > 0 && (
                      <ul className="max-w-prose space-y-2">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="flex text-base leading-snug">
                            <span
                              className="mr-3 shrink-0 font-mono"
                              style={{ color: VERMILLION }}
                              aria-hidden
                            >
                              →
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {i < data.experience.length - 1 && <Rule />}
              </Fragment>
            ))}
          </div>
        </section>
      ),
    });
  }

  if (data.projects.length > 0) {
    const n = next();
    sections.push({
      key: "projects",
      el: (
        <section>
          <SectionHeader number={n} title="Selected Projects" />
          <div className="px-4 md:px-8">
            {data.projects.map((p, i) => (
              <Fragment key={i}>
                <div className="grid grid-cols-12 items-start gap-4 py-8 md:py-10">
                  <div className="col-span-2">
                    <div
                      className="text-4xl leading-none font-black md:text-6xl"
                      style={{ color: VERMILLION, letterSpacing: "-0.04em" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="col-span-10">
                    <h3 className="text-xl leading-tight font-bold tracking-tight uppercase md:text-2xl">
                      {p.name}
                    </h3>
                    {p.description && (
                      <p className="mt-2 max-w-prose text-base leading-snug md:mt-3">
                        {p.description}
                      </p>
                    )}
                    {(p.tech.length > 0 || p.link) && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs tracking-wider uppercase md:mt-4">
                        {p.tech.map((t, j) => (
                          <Fragment key={j}>
                            <span>{t}</span>
                            {j < p.tech.length - 1 && (
                              <span style={{ color: VERMILLION }}>{"//"}</span>
                            )}
                          </Fragment>
                        ))}
                        {p.link && (
                          <>
                            <span style={{ color: VERMILLION }} className="ml-2">
                              {"//"}
                            </span>
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all underline"
                              style={{
                                textDecorationColor: VERMILLION,
                                textUnderlineOffset: "3px",
                              }}
                            >
                              {p.link.replace(/^https?:\/\//, "")}
                            </a>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {i < data.projects.length - 1 && <Rule />}
              </Fragment>
            ))}
          </div>
        </section>
      ),
    });
  }

  if (data.skills.length > 0) {
    const n = next();
    sections.push({
      key: "skills",
      el: (
        <section>
          <SectionHeader number={n} title="Skills" />
          <div className="px-4 py-8 md:px-8 md:py-10">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span
                  key={i}
                  tabIndex={0}
                  className="cursor-default border-2 border-black px-3 py-1 text-sm font-bold tracking-wider uppercase select-none hover:bg-black hover:text-white focus:bg-black focus:text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>
      ),
    });
  }

  if (data.education.length > 0) {
    const n = next();
    sections.push({
      key: "education",
      el: (
        <section>
          <SectionHeader number={n} title="Education" />
          <div className="px-4 md:px-8">
            {data.education.map((e, i) => (
              <Fragment key={i}>
                <div className="grid grid-cols-12 gap-4 py-6 md:py-8">
                  <div className="col-span-12 font-mono text-xs tracking-wider uppercase md:col-span-3 md:text-sm">
                    {e.dates}
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="text-lg leading-tight font-bold tracking-tight uppercase md:text-xl">
                      {e.school}
                    </h3>
                    <div className="mt-1 font-mono text-xs tracking-wider uppercase md:text-sm">
                      {e.degree}
                    </div>
                  </div>
                </div>
                {i < data.education.length - 1 && <Rule />}
              </Fragment>
            ))}
          </div>
        </section>
      ),
    });
  }

  const contactItems = [
    data.contact.email && {
      label: "Email",
      value: data.contact.email,
      href: `mailto:${data.contact.email}`,
    },
    data.contact.website && {
      label: "Web",
      value: data.contact.website.replace(/^https?:\/\//, ""),
      href: data.contact.website,
    },
    data.contact.github && {
      label: "GitHub",
      value: data.contact.github,
      href: `https://github.com/${data.contact.github}`,
    },
    data.contact.linkedin && {
      label: "LinkedIn",
      value: data.contact.linkedin,
      href: `https://linkedin.com/in/${data.contact.linkedin}`,
    },
    data.contact.twitter && {
      label: "Twitter",
      value: `@${data.contact.twitter}`,
      href: `https://twitter.com/${data.contact.twitter}`,
    },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  if (contactItems.length > 0) {
    const n = next();
    sections.push({
      key: "contact",
      el: (
        <section>
          <SectionHeader number={n} title="Contact" />
          <div className="px-4 py-8 md:px-8 md:py-10">
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 font-mono text-sm uppercase md:grid-cols-2 md:text-base">
              {contactItems.map((it, i) => (
                <div key={i} className="flex items-baseline gap-4">
                  <span className="w-24 shrink-0 text-xs tracking-wider">{it.label}</span>
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all underline"
                    style={{
                      textDecorationColor: VERMILLION,
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {it.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    });
  }

  return (
    <div className="min-h-screen bg-white font-sans text-black antialiased">
      <div className="border-b-2 border-black">
        <div className="flex items-center justify-between px-4 py-2 font-mono text-xs tracking-wider uppercase md:px-8">
          <span>Portfolio</span>
          <span className="hidden md:inline">Index</span>
          <span style={{ color: VERMILLION }}>
            {new Date().getFullYear()}
          </span>
        </div>
      </div>

      <header className="px-4 pt-6 pb-6 md:px-8 md:pt-10 md:pb-10">
        <div className="mb-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs tracking-wider uppercase md:mb-10">
          <span>Portfolio / {new Date().getFullYear()}</span>
          {data.location && <span>{data.location}</span>}
          <span style={{ color: VERMILLION }}>Available for select work</span>
        </div>
        <h1
          className="font-black tracking-tight uppercase"
          style={{
            fontSize: "clamp(48px, 12vw, 160px)",
            lineHeight: 0.85,
            letterSpacing: "-0.03em",
          }}
        >
          {data.name}
        </h1>
        <p className="mt-6 max-w-4xl font-mono text-base tracking-wider uppercase md:mt-10 md:text-xl">
          {data.headline}
        </p>
      </header>

      <Rule thick />

      {data.bio && (
        <section className="px-4 py-10 md:px-8 md:py-14">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 font-mono text-xs tracking-wider uppercase md:col-span-3">
              <div className="mb-1">About</div>
              <div style={{ color: VERMILLION }}>—</div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="max-w-prose text-base leading-snug md:text-lg">{data.bio}</p>
            </div>
          </div>
        </section>
      )}

      {sections.map((s) => (
        <Fragment key={s.key}>{s.el}</Fragment>
      ))}

      <Rule thick />

      <footer className="px-4 pt-10 pb-6 md:px-8 md:pt-16 md:pb-8">
        <div
          className="font-black tracking-tight uppercase"
          style={{
            color: VERMILLION,
            fontSize: "clamp(48px, 12vw, 160px)",
            lineHeight: 0.85,
            letterSpacing: "-0.03em",
          }}
        >
          {data.name}
        </div>
        <div className="mt-6 grid grid-cols-12 gap-4 font-mono text-xs tracking-wider uppercase md:mt-10">
          <div className="col-span-12 md:col-span-3">
            © {new Date().getFullYear()} — All rights reserved
          </div>
          {data.location && <div className="col-span-6 md:col-span-3">{data.location}</div>}
          <div className="col-span-6 md:col-span-3">Set in Helvetica &amp; Mono</div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            No cookies / No trackers
          </div>
        </div>
      </footer>
    </div>
  );
}
