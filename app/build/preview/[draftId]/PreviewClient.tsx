"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { PortfolioData, TemplateId } from "@/types/portfolio";
import TemplatePicker from "@/components/TemplatePicker";

type Props = {
  draftId: string;
  data: PortfolioData;
  githubHandle: string;
};

export default function PreviewClient({ draftId, data, githubHandle }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function publish(templateId: TemplateId) {
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId, templateId }),
      });
      const json: { slug?: string; error?: string } = await res.json();
      if (!res.ok || !json.slug) {
        setError(json.error ?? "Couldn't publish.");
        return;
      }
      router.push(`/${json.slug}`);
    });
  }

  return (
    <>
      <TemplatePicker
        data={data}
        initialTemplate="beam"
        publishing={pending}
        publishLabel={`Publish as /${githubHandle}`}
        onPublish={publish}
      />

      {error && (
        <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700 shadow">
          {error}
        </div>
      )}
    </>
  );
}
