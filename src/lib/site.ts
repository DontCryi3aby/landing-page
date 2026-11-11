import { cache } from "react";
import {
  DEFAULT_SETTINGS,
  DICT,
  PROJECTS,
  SERVICES,
  type Dict,
  type Lang,
  type RefRow,
  type Service,
  type ServiceText,
  type Settings,
} from "./content";
import { locked, readJson, writeJson } from "./json-store";

/** Overrides saved by admins (data/site-content.json). Empty = site shows defaults from content.ts. */
export interface SiteContent {
  text: Record<string, { en?: string; vi?: string }>;
  hidden: Record<string, boolean>;
  refs: { en: RefRow; vi: RefRow; hidden?: boolean }[] | null;
  settings: Partial<Settings>;
  updatedAt: string | null;
}

const FILE = "site-content.json";
export const EMPTY_SITE: SiteContent = { text: {}, hidden: {}, refs: null, settings: {}, updatedAt: null };

export async function readSite(): Promise<SiteContent> {
  const raw = await readJson<Partial<SiteContent>>(FILE, {});
  return {
    text: raw.text && typeof raw.text === "object" ? raw.text : {},
    hidden: raw.hidden && typeof raw.hidden === "object" ? raw.hidden : {},
    refs: Array.isArray(raw.refs) ? raw.refs : null,
    settings: raw.settings && typeof raw.settings === "object" ? raw.settings : {},
    updatedAt: raw.updatedAt ?? null,
  };
}

export const writeSite = (body: SiteContent) => locked(() => writeJson(FILE, body));

/* ---------------------------------------------------------------- path helpers */
export const getPath = (o: unknown, p: string): unknown =>
  p.split(".").reduce<unknown>((a, k) => (a == null ? undefined : (a as Record<string, unknown>)[k]), o);

function setPath(o: unknown, p: string, v: unknown) {
  const k = p.split(".");
  let cur = o as Record<string, unknown>;
  for (let i = 0; i < k.length - 1; i++) {
    if (cur[k[i]] == null) return;
    cur = cur[k[i]] as Record<string, unknown>;
  }
  cur[k[k.length - 1]] = v;
}

/** Default (un-overridden) text for an editable path, e.g. "home.title" or "svc.welding.name". */
export function defaultText(path: string, lang: Lang): string {
  if (path.startsWith("svc.")) {
    const [, slug, field] = path.split(".");
    const s = SERVICES.find((x) => x.slug === slug);
    return s ? String((s[lang] as unknown as Record<string, unknown>)[field] ?? "") : "";
  }
  const v = getPath(DICT[lang], path);
  return typeof v === "string" ? v : "";
}

export const settingsOf = (site: SiteContent): Settings => ({ ...DEFAULT_SETTINGS, ...site.settings });

export const defaultRefs = () =>
  PROJECTS.refs.en.map((r, i) => ({ en: [...r] as RefRow, vi: [...PROJECTS.refs.vi[i]] as RefRow, hidden: false }));

/* ---------------------------------------------------------------- resolved view for pages */
export interface ResolvedService extends Service {
  t: ServiceText;
}
export interface SiteData {
  lang: Lang;
  d: Dict;
  services: ResolvedService[];
  refs: RefRow[];
  settings: Settings;
  waUrl: string;
  hid: (key: string) => boolean;
  /** Service name/title/lead with admin overrides, for any service. */
  svc: (s: Service) => ServiceText;
}

const override = (site: SiteContent, path: string, lang: Lang) => {
  const v = site.text[path]?.[lang];
  return typeof v === "string" && v.trim() ? v : undefined;
};

export function resolve(site: SiteContent, lang: Lang): SiteData {
  const d: Dict = structuredClone(DICT[lang]);
  for (const p of Object.keys(site.text)) {
    if (p.startsWith("svc.")) continue;
    const v = override(site, p, lang);
    if (v !== undefined) setPath(d, p, v);
  }
  const settings = settingsOf(site);
  d.footer.city = lang === "vi" ? settings.cityVi : settings.cityEn;
  d.contact.failed = d.contact.failed.replace("{email}", settings.email);

  const svc = (s: Service): ServiceText => {
    const t = { ...s[lang] };
    for (const f of ["name", "title", "lead"] as const) {
      const v = override(site, `svc.${s.slug}.${f}`, lang);
      if (v !== undefined) t[f] = v;
    }
    return t;
  };

  const refs = site.refs ? site.refs.filter((r) => !r.hidden).map((r) => r[lang] || r.en) : PROJECTS.refs[lang];

  return {
    lang,
    d,
    services: SERVICES.map((s) => ({ ...s, t: svc(s) })),
    refs,
    settings,
    waUrl: `https://wa.me/${String(settings.wa || "").replace(/\D/g, "")}`,
    hid: (k) => !!site.hidden[k],
    svc,
  };
}

/** Per-request cached site data for a language. */
export const getSiteData = cache(async (lang: Lang) => resolve(await readSite(), lang));

export const qualsOf = (s: ResolvedService) => ({ q: s.quals || s.t.qualsT || "", s: s.stds || s.t.stdsT || "" });
