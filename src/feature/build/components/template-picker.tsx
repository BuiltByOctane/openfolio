"use client";

import { useState } from "react";
import { TEMPLATES, TEMPLATE_LABELS, TEMPLATE_DESCRIPTIONS } from "@/shared/ui/templates";
import { TEMPLATE_IDS, type PortfolioData, type TemplateId } from "@/shared/types/portfolio";
import { Check } from "lucide-react";

export default function TemplatePicker({
  data,
  initialTemplate = "beam",
  onPublish,
  publishing = false,
  publishLabel = "Publish",
  extraControls,
}: {
  data: PortfolioData;
  initialTemplate?: TemplateId;
  onPublish: (templateId: TemplateId) => void;
  publishing?: boolean;
  publishLabel?: string;
  extraControls?: React.ReactNode;
}) {
  const [selected, setSelected] = useState<TemplateId>(initialTemplate);
  const Active = TEMPLATES[selected];

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {TEMPLATE_IDS.map((id) => {
              const active = id === selected;
              return (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className={
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition " +
                    (active
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-900")
                  }
                  title={TEMPLATE_DESCRIPTIONS[id]}
                >
                  {active && <Check className="h-3 w-3" strokeWidth={2.25} />}
                  {TEMPLATE_LABELS[id]}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            {extraControls}
            <button
              onClick={() => onPublish(selected)}
              disabled={publishing}
              className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-black disabled:opacity-50"
            >
              {publishing ? "Working…" : publishLabel}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="bg-white">
          <Active data={data} />
        </div>
      </main>
    </div>
  );
}
