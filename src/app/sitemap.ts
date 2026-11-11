import type { MetadataRoute } from "next";
import { LOCALES, SERVICES } from "@/lib/content";
import { SITE_URL } from "@/lib/paths";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", ...SERVICES.map((s) => `/services/${s.slug}`), "/projects", "/about", "/contact"];
  return paths.flatMap((p) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${p}`])) },
    }))
  );
}
