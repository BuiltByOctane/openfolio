import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import CommunityBanner from "@/shared/ui/community-banner";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://openfolio.dev";
const SITE_NAME = "Openfolio";
const TITLE = "Openfolio — Instant portfolio for every developer";
const DESCRIPTION =
  "Openfolio turns your GitHub into a polished portfolio site in seconds. Built for backend, DevOps, QA, data, and every developer who'd rather ship code than design a website. Paste your username, pick a template, share the link.";
const KEYWORDS = [
  "developer portfolio",
  "github portfolio generator",
  "portfolio website for developers",
  "backend developer portfolio",
  "devops engineer portfolio",
  "qa engineer portfolio",
  "data engineer portfolio",
  "free portfolio builder",
  "no-code portfolio",
  "github profile to website",
  "open source portfolio",
  "openfolio",
];

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Openfolio",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  category: "technology",
  authors: [{ name: "Delbin George", url: "https://delb.in" }],
  creator: "Delbin George",
  publisher: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/openfolio.svg", type: "image/svg+xml" },
    ],
    shortcut: "/openfolio.svg",
    apple: "/openfolio.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/openfolio.svg",
        width: 1200,
        height: 630,
        alt: "Openfolio — instant portfolio for every developer",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/openfolio.svg"],
    creator: "@builtbyoctane",
    site: "@builtbyoctane",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": SITE_NAME,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/openfolio.svg`,
      sameAs: ["https://github.com/builtbyoctane/openfolio"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}#app`,
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      description:
        "Free portfolio builder for developers. Turns a GitHub profile into a hosted portfolio site without writing or designing one.",
      audience: {
        "@type": "Audience",
        audienceType:
          "Backend developers, DevOps engineers, QA engineers, data engineers, and any developer who can't or doesn't want to build a portfolio website",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "GitHub username to portfolio in seconds",
        "Multiple portfolio templates",
        "No editing — regenerate to update",
        "Built for backend, DevOps, QA, and non-frontend developers",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CommunityBanner />
        {children}
      </body>
    </html>
  );
}
