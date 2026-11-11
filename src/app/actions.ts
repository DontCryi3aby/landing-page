"use server";

import { revalidatePath } from "next/cache";
import { isLang, type Lang } from "@/lib/content";
import { addRequest } from "@/lib/requests-store";
import { getSiteData } from "@/lib/site";

export type FormValues = Record<string, string>;
export type FormState =
  | { status: "idle"; n: number; values?: FormValues }
  | { status: "error"; n: number; error: "missing" | "badEmail" | "failed"; invalid: string[]; values: FormValues }
  | { status: "sent"; n: number; id: string };

const FIELDS = ["name", "company", "email", "phone", "discipline", "headcount", "location", "start", "message"] as const;
const REQUIRED = ["name", "company", "email", "discipline", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function disciplineLabel(key: string, lang: Lang) {
  const site = await getSiteData(lang);
  const s = site.services.find((x) => x.slug === key);
  if (s) return s.t.name;
  if (key === "mech") return site.d.contact.mech;
  if (key === "other") return site.d.contact.other;
  return key;
}

export async function submitRequest(prev: FormState, formData: FormData): Promise<FormState> {
  const n = prev.n + 1;
  const lang: Lang = isLang(formData.get("lang")) ? (formData.get("lang") as Lang) : "en";
  const values: FormValues = {};
  for (const k of FIELDS) values[k] = String(formData.get(k) ?? "").trim().slice(0, k === "message" ? 5000 : 300);

  // Honeypot: bots fill hidden fields. Pretend success, store nothing.
  if (String(formData.get("website") ?? "")) return { status: "sent", n, id: String(Date.now()) };

  const missing = REQUIRED.filter((k) => !values[k]);
  if (missing.length) return { status: "error", n, error: "missing", invalid: missing, values };
  if (!EMAIL_RE.test(values.email)) return { status: "error", n, error: "badEmail", invalid: ["email"], values };

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  try {
    await addRequest({
      id,
      createdAt: new Date().toISOString(),
      lang,
      status: "new",
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      disciplineKey: values.discipline,
      discipline: await disciplineLabel(values.discipline, lang),
      headcount: values.headcount,
      location: values.location,
      start: values.start,
      message: values.message,
    });
  } catch (err) {
    console.error("[contact] failed to store request", err);
    return { status: "error", n, error: "failed", invalid: [], values };
  }
  revalidatePath("/admin", "layout");
  return { status: "sent", n, id };
}
