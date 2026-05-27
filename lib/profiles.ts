import fs from "fs";
import path from "path";
import { PortfolioDataSchema, TemplateIdSchema } from "@/types/portfolio";
import type { PortfolioData, TemplateId } from "@/types/portfolio";

export type Profile = {
  slug: string;
  templateId: TemplateId;
  data: PortfolioData;
};

const DATA_DIR = path.join(process.cwd(), "data", "profiles");

function profilePath(slug: string): string {
  return path.join(DATA_DIR, `${slug}.json`);
}

export function saveProfile(profile: Profile): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(profilePath(profile.slug), JSON.stringify(profile));
}

export function loadProfile(slug: string): Profile | null {
  try {
    const raw = fs.readFileSync(profilePath(slug), "utf-8");
    const json = JSON.parse(raw) as unknown;
    if (typeof json !== "object" || json === null) return null;
    const obj = json as Record<string, unknown>;
    const parsedData = PortfolioDataSchema.safeParse(obj.data);
    const parsedTemplate = TemplateIdSchema.safeParse(obj.templateId);
    if (!parsedData.success || !parsedTemplate.success) return null;
    return {
      slug: typeof obj.slug === "string" ? obj.slug : slug,
      templateId: parsedTemplate.data,
      data: parsedData.data,
    };
  } catch {
    return null;
  }
}
