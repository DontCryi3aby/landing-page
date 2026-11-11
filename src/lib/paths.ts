import type { Lang } from "./content";

/** Build a localized path: href("vi", "/services") -> "/vi/services" */
export const href = (lang: Lang, path = "") => `/${lang}${path === "/" ? "" : path}`;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** hreflang alternates + canonical for a path shared by both languages */
export const alternates = (lang: Lang, path = "") => ({
  canonical: href(lang, path),
  languages: { en: href("en", path), vi: href("vi", path), "x-default": href("en", path) },
});
