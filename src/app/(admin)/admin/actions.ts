"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { isAdminAuth } from "@/lib/admin";
import { DEFAULT_SETTINGS, isLang } from "@/lib/content";
import { EDIT_PATHS, TOGGLE_KEYS } from "@/lib/admin-fields";
import { STATUS_ORDER, updateRequest, type Status } from "@/lib/requests-store";
import { writeSite, type SiteContent } from "@/lib/site";

async function assertAdmin() {
  if (!isAdminAuth((await headers()).get("authorization"))) throw new Error("Unauthorized");
}

export async function setRequestStatus(id: string, status: Status) {
  await assertAdmin();
  if (!STATUS_ORDER.includes(status)) throw new Error("Bad status");
  await updateRequest(id, { status, statusAt: new Date().toISOString() });
  revalidatePath("/admin", "layout");
}

export async function saveRequestNote(id: string, note: string) {
  await assertAdmin();
  await updateRequest(id, { note: note.slice(0, 5000), noteAt: new Date().toISOString() });
  revalidatePath("/admin", "layout");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.slice(0, max) : "");

/** Save all site overrides (text, hidden sections, project refs, settings), then rebuild public pages. */
export async function saveSiteContent(body: SiteContent): Promise<{ ok: true; updatedAt: string } | { ok: false; error: string }> {
  await assertAdmin();
  // Editors that never touched settings send none: fall back to defaults.
  const settings = { ...DEFAULT_SETTINGS, ...(body.settings || {}) };
  if (!EMAIL_RE.test(String(settings.email || ""))) return { ok: false, error: "Email công khai chưa đúng định dạng, ví dụ ten@congty.com." };

  // Whitelist what can be stored.
  const text: SiteContent["text"] = {};
  for (const [p, v] of Object.entries(body.text || {})) {
    if (!EDIT_PATHS.has(p) || !v) continue;
    const en = str(v.en).trim() ? str(v.en) : undefined;
    const vi = str(v.vi).trim() ? str(v.vi) : undefined;
    if (en || vi) text[p] = { ...(en ? { en } : {}), ...(vi ? { vi } : {}) };
  }
  const hidden: SiteContent["hidden"] = {};
  for (const [k, v] of Object.entries(body.hidden || {})) if (v && TOGGLE_KEYS.has(k)) hidden[k] = true;
  const row = (r: unknown) => [0, 1, 2, 3].map((i) => str(Array.isArray(r) ? r[i] : "", 300)) as [string, string, string, string];
  const refs = Array.isArray(body.refs) ? body.refs.slice(0, 100).map((r) => ({ en: row(r?.en), vi: row(r?.vi), hidden: !!r?.hidden })) : null;
  const keys = ["email", "phone", "wa", "cityEn", "cityVi", "address", "addressVi", "person", "personVi"] as const;
  const cleanSettings: SiteContent["settings"] = {};
  for (const k of keys) cleanSettings[k] = str(settings[k], 300).trim();
  cleanSettings.defaultLang = isLang(settings.defaultLang) ? settings.defaultLang : "en";

  const updatedAt = new Date().toISOString();
  try {
    await writeSite({ text, hidden, refs, settings: cleanSettings, updatedAt });
  } catch (e) {
    console.error("[admin] save failed", e);
    return { ok: false, error: "Chưa lưu được. Kiểm tra kết nối rồi bấm Lưu thay đổi lần nữa." };
  }
  revalidatePath("/", "layout");
  return { ok: true, updatedAt };
}
