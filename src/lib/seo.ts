import type { Metadata } from "next";

export const SITE_NAME = "Clock App";
export const SITE_URL = "https://clock.nishantkhadka.com.np";
export const DEFAULT_OG_IMAGE = "/og-clock-app.svg";

export const PRIMARY_KEYWORDS = [
  "online clock",
  "digital clock online",
  "full screen clock",
  "online timer",
  "stopwatch online",
  "world clock",
  "countdown timer",
];

export const LONG_TAIL_KEYWORDS = [
  "free online digital clock full screen",
  "online stopwatch with milliseconds",
  "world clock with map",
  "countdown timer online free",
  "live analog clock online",
  "flip clock online",
  "timezone clock comparison tool",
  "customizable online clock themes",
  "24 hour and 12 hour online clock",
];

export const FEATURE_KEYWORDS = [
  "large digital clock",
  "fullscreen online clock",
  "analog clock online",
  "flip clock",
  "time in cities",
  "multi city world time",
  "online countdown",
  "pomodoro and timer style countdown",
  "precision stopwatch",
  "clock themes",
  "custom clock",
  "PWA clock app",
  "offline clock app",
];

export const ALL_KEYWORDS = [...PRIMARY_KEYWORDS, ...LONG_TAIL_KEYWORDS, ...FEATURE_KEYWORDS];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path}`;
}

export function createPageMetadata(config: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}): Metadata {
  const canonical = absoluteUrl(config.path);
  return {
    title: config.title,
    description: config.description,
    keywords: [...config.keywords, ...PRIMARY_KEYWORDS],
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: config.title,
      description: config.description,
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: "Clock App online clock and timer tools",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
  };
}

export function createWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Clock App is a free online clock toolkit with digital, analog, flip, world clock, timer, countdown, and stopwatch tools.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Digital clock with fullscreen mode",
      "Analog clock with style controls",
      "Flip clock display",
      "World clock with city search and map",
      "Online timer and countdown",
      "Online stopwatch with milliseconds and laps",
      "Theme customization and 12h/24h toggle",
    ],
  };
}

export function createSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    softwareVersion: "1.0",
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function createFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
