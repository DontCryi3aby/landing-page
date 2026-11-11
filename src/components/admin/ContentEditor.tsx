"use client";

import { useState } from "react";
import { EDIT } from "@/lib/admin-fields";
import { DICT, SERVICES, type Lang } from "@/lib/content";
import type { SiteContent } from "@/lib/site";
import AdminTop from "./AdminTop";
import { useSiteDraft } from "./useSiteDraft";

// Client-side copy of lib/site defaultText (that module pulls in server-only fs code).
function defText(path: string, lang: Lang): string {
  if (path.startsWith("svc.")) {
    const [, slug, field] = path.split(".");
    const s = SERVICES.find((x) => x.slug === slug);
    return s ? String((s[lang] as unknown as Record<string, unknown>)[field] ?? "") : "";
  }
  const v = path.split(".").reduce<unknown>((a, k) => (a == null ? undefined : (a as Record<string, unknown>)[k]), DICT[lang]);
  return typeof v === "string" ? v : "";
}

export default function ContentEditor({ site }: { site: SiteContent }) {
  const { draft, update, toast, actions } = useSiteDraft(site);
  const [secKey, setSecKey] = useState(EDIT[0].key);
  const sec = EDIT.find((e) => e.key === secKey) ?? EDIT[0];
  const on = (k: string) => !draft.hidden[k];

  const cur = (path: string, l: Lang) => {
    const v = draft.text[path]?.[l];
    return typeof v === "string" && v.trim() ? v : defText(path, l);
  };
  const setText = (path: string, l: Lang, v: string) =>
    update((d) => {
      const c = { ...(d.text[path] || {}) };
      if (!v.trim() || v === defText(path, l)) delete c[l];
      else c[l] = v;
      if (Object.keys(c).length) d.text[path] = c;
      else delete d.text[path];
    });
  const toggle = (k: string) =>
    update((d) => {
      if (d.hidden[k]) delete d.hidden[k];
      else d.hidden[k] = true;
    });

  return (
    <>
      <AdminTop path="/admin/content" actions={actions} toast={toast} />
      <div className="adm-body">
        <div className="adm-split adm-split-c">
          <section className="adm-card">
            {EDIT.map((e) => (
              <div key={e.key} className={`adm-sec${e.key === sec.key ? " on" : ""}${on(e.key) ? "" : " off"}`}>
                <button type="button" className="adm-sec-name" onClick={() => setSecKey(e.key)}>
                  {e.name}
                  {on(e.key) ? null : <small>Đang ẩn</small>}
                </button>
                {e.toggle ? (
                  <button
                    type="button"
                    className="adm-switch"
                    role="switch"
                    aria-checked={on(e.key)}
                    aria-label={`Hiện phần ${e.name}`}
                    onClick={() => {
                      toggle(e.key);
                      setSecKey(e.key);
                    }}
                  >
                    <i />
                  </button>
                ) : null}
              </div>
            ))}
          </section>
          <section className="adm-card">
            <div className="adm-card-h">
              <h2>{sec.name}</h2>
              {sec.toggle ? (
                <span className={`pill ${on(sec.key) ? "p-closed" : "p-off"}`}>{on(sec.key) ? "Đang hiện trên website" : "Đang ẩn khỏi website"}</span>
              ) : null}
            </div>
            <div className="adm-pad">
              {sec.note ? (
                <p className="small" style={{ marginBottom: 16 }}>
                  {sec.note}
                </p>
              ) : null}
              {sec.fields.map((f, i) => (
                <fieldset className="adm-fs" key={f.path}>
                  <legend>
                    {f.label}
                    {draft.text[f.path] ? (
                      <button
                        type="button"
                        className="adm-reset"
                        onClick={() =>
                          update((d) => {
                            delete d.text[f.path];
                          })
                        }
                      >
                        Khôi phục mặc định
                      </button>
                    ) : null}
                  </legend>
                  <div className="adm-g2">
                    {(["en", "vi"] as const).map((l) => {
                      const id = `cf-${sec.key}-${i}-${l}`;
                      return (
                        <div className="adm-field" key={l}>
                          <label className="adm-sub" htmlFor={id}>
                            {l === "en" ? "English" : "Tiếng Việt"}
                          </label>
                          {f.multi ? (
                            <textarea className="input" rows={4} id={id} value={cur(f.path, l)} onChange={(e) => setText(f.path, l, e.target.value)} />
                          ) : (
                            <input className="input" id={id} value={cur(f.path, l)} onChange={(e) => setText(f.path, l, e.target.value)} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
