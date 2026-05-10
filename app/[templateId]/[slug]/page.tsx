import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadProfile } from "@/lib/profiles";
import { TEMPLATES } from "@/components/templates";
import { isValidSlug, TemplateIdSchema } from "@/types/portfolio";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ templateId: string; slug: string }>;
}): Promise<Metadata> {
  const { templateId, slug } = await params;
  const profile = loadProfile(templateId, slug);
  if (!profile) return { title: "Not found" };
  return {
    title: `${profile.data.name} — ${profile.data.headline}`,
    description: profile.data.bio?.slice(0, 160) || profile.data.headline,
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ templateId: string; slug: string }>;
}) {
  const { templateId, slug } = await params;
  if (!isValidSlug(slug) || !TemplateIdSchema.safeParse(templateId).success) notFound();
  const profile = loadProfile(templateId, slug);
  if (!profile) notFound();
  const Tpl = TEMPLATES[profile.templateId];
  return <Tpl data={profile.data} />;
}
