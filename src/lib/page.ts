import { notFound } from "next/navigation";
import { isLang, type Lang } from "./content";

/** Resolve and validate the [lang] param for a page. */
export async function getLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return lang;
}
