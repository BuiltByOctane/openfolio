"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MapPin, X } from "lucide-react";

const STORAGE_KEY = "openfolio:community-banner-dismissed";
const COMMUNITY_URL = "https://octane.team/community/";

const MARKETING_PREFIXES = ["/", "/build", "/dev"];

function isMarketingRoute(path: string | null): boolean {
  if (!path) return false;
  if (path === "/") return true;
  return MARKETING_PREFIXES.some(
    (p) => p !== "/" && (path === p || path.startsWith(`${p}/`)),
  );
}

export default function CommunityBanner() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // localStorage unavailable — keep banner visible
    }
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore quota / private-mode errors
    }
  }

  if (!mounted) return null;
  if (dismissed) return null;
  if (!isMarketingRoute(pathname)) return null;

  return (
    <div className="relative z-30 w-full bg-neutral-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2 text-xs sm:text-sm">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-400" strokeWidth={2} />
        <p className="truncate">
          <span className="font-medium">Developers of Kerala</span>
          <span className="text-neutral-400"> — join the community we&apos;re building.</span>
        </p>
        <a
          href={COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white transition hover:bg-white/20"
        >
          Join
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="ml-1 shrink-0 rounded-md p-1 text-neutral-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
