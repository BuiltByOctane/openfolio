import { ImageResponse } from "next/og";
import { loadProfile } from "@/shared/lib/profiles";
import { isValidSlug } from "@/shared/types/portfolio";

export const runtime = "nodejs";
export const alt = "openfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PortfolioOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  let name = "openfolio";
  let headline = "Build a portfolio from your GitHub or résumé.";

  if (isValidSlug(slug)) {
    const profile = loadProfile(slug);
    if (profile) {
      name = profile.data.name;
      headline = profile.data.headline;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#a3a3a3",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          openfolio · /{slug}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#fafafa",
              fontSize: 96,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            {name}
          </div>
          <div
            style={{
              color: "#a3a3a3",
              fontSize: 36,
              lineHeight: 1.3,
              maxWidth: 980,
              display: "flex",
            }}
          >
            {headline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
