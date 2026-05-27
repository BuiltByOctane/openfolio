"use client";

import { useEffect, useState } from "react";
import { TEMPLATES } from "@/shared/ui/templates";
import { TemplateIdSchema } from "@/shared/types/portfolio";
import type { PortfolioData, TemplateId } from "@/shared/types/portfolio";

type Props = {
  data: PortfolioData;
  defaultTemplateId: TemplateId;
};

export default function TemplateRenderer({ data, defaultTemplateId }: Props) {
  const [templateId, setTemplateId] = useState<TemplateId>(defaultTemplateId);

  useEffect(() => {
    function applyHash() {
      const hash = window.location.hash.slice(1);
      const parsed = TemplateIdSchema.safeParse(hash);
      setTemplateId(parsed.success ? parsed.data : defaultTemplateId);
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [defaultTemplateId]);

  const Tpl = TEMPLATES[templateId];
  return <Tpl data={data} />;
}
