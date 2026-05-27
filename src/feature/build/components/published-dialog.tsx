"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, X } from "lucide-react";

export default function PublishedDialog({
  slug,
  onClose,
}: {
  slug: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const url = origin ? `${origin}/${slug}` : `/${slug}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio published"
      className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:bottom-8"
    >
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white/95 p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Your portfolio is live
              </p>
              <p className="text-xs text-neutral-500">
                Share the link — anyone with it can view your site.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Dismiss"
            className="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2">
          <span className="truncate font-mono text-xs text-neutral-700">
            {url}
          </span>
          <button
            onClick={copy}
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-black"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" strokeWidth={2.5} />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" strokeWidth={2.25} />
                Copy
              </>
            )}
          </button>
        </div>

        <div className="mt-3 flex items-center justify-end">
          <Link
            href={`/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-neutral-700 hover:text-neutral-900"
          >
            Open site <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
