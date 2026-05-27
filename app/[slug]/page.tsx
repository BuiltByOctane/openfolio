import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadProfile } from "@/lib/profiles";
import { isValidSlug } from "@/types/portfolio";
import TemplateRenderer from "@/components/TemplateRenderer";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = loadProfile(slug);
  if (!profile) return { title: "Not found" };
  return {
    title: `${profile.data.name} — ${profile.data.headline}`,
    description: profile.data.bio?.slice(0, 160) || profile.data.headline,
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidSlug(slug)) notFound();
  const profile = loadProfile(slug);
  if (!profile) notFound();
  return <TemplateRenderer data={profile.data} defaultTemplateId={profile.templateId} />;
}
