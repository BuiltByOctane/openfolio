import { z } from "zod";

export const TEMPLATE_IDS = [
  "beam",
  "editorial",
  "marquee",
  "notebook",
  "terminal",
  "hearth",
  "block",
  "glass",
  "ink",
  "dusk",
  "card",
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const TemplateIdSchema = z.enum(TEMPLATE_IDS);

// Contact handles: github/linkedin/twitter store just the handle ("alexmorgan"),
// not a full URL. Each template constructs the URL it needs from the handle.
// website is the only field that holds a full URL.
export const PortfolioDataSchema = z.object({
  name: z.string().min(1),
  headline: z.string().min(1),
  bio: z.string().default(""),
  avatar: z.string().url().optional(),
  location: z.string().optional(),
  contact: z
    .object({
      email: z.string().email().optional(),
      website: z.string().url().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
    })
    .default({}),
  experience: z
    .array(
      z.object({
        role: z.string(),
        company: z.string(),
        dates: z.string(),
        bullets: z.array(z.string()).default([]),
      }),
    )
    .default([]),
  education: z
    .array(
      z.object({
        school: z.string(),
        degree: z.string(),
        dates: z.string(),
      }),
    )
    .default([]),
  skills: z.array(z.string()).default([]),
  projects: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().default(""),
        link: z.string().url().optional(),
        tech: z.array(z.string()).default([]),
      }),
    )
    .default([]),
});

export type PortfolioData = z.infer<typeof PortfolioDataSchema>;

export const RESERVED_SLUGS = new Set([
  "build",
  "claim",
  "api",
  "dev",
  "_next",
  "favicon.ico",
  "sitemap.xml",
  "robots.txt",
  "opengraph-image",
  "og",
  "admin",
  "login",
  "signin",
  "signup",
  "logout",
  "settings",
  "account",
  "profile",
  "public",
  "static",
  "assets",
  "about",
  "terms",
  "privacy",
  "404",
  "500",
]);

// 3–30 chars, lowercase alphanumeric + dash, no leading/trailing dash.
export const SLUG_REGEX = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])$/;

export function isValidSlug(slug: string): boolean {
  if (slug.length < 3 || slug.length > 30) return false;
  if (RESERVED_SLUGS.has(slug)) return false;
  return SLUG_REGEX.test(slug);
}
