import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/clock"), lastModified, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/world"), lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/timer"), lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/stopwatch"), lastModified, changeFrequency: "daily", priority: 0.9 },
  ];
}
