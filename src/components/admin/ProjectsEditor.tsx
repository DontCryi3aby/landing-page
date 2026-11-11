"use client";

import { useEffect, useState } from "react";
import { PROJECTS, type RefRow } from "@/lib/content";
import type { SiteContent } from "@/lib/site";
import AdminTop from "./AdminTop";
import { useSiteDraft } from "./useSiteDraft";

const COLS = ["Dự án / khách hàng", "Chuyên ngành", "Phạm vi", "Thời gian"];
const defaults = () => PROJECTS.refs.en.map((r, i) => ({ en: [...r] as RefRow, vi: [...PROJECTS.refs.vi[i]] as RefRow, hidden: false }));

export default function ProjectsEditor({ site }: { site: SiteContent }) {
  const { draft, update, toast, actions } = useSiteDraft({ ...site, refs: site.refs ?? defaults() });
  const [confirmDel, setConfirmDel] = useState(-1);
  const [focusLast, setFocusLast] = useState(false);
  const refs = draft.refs ?? [];

  useEffect(() => {
    if (!focusLast) return;
    const ins = document.querySelectorAll<HTMLInputElement>('[data-first="1"]');
    ins[ins.length - 1]?.focus();
    setFocusLast(false);
  }, [focusLast]);

  const edit = (fn: (r: NonNullable<SiteContent["refs"]>) => void) =>
    update((d) => {
      d.refs = d.refs ?? [];
      fn(d.refs);
    });

  return (
    <>
      <AdminTop path="/admin/projects" actions={actions} toast={toast} />
      <div className="adm-body" onClick={(e) => confirmDel > -1 && !(e.target as HTMLElement).closest("[data-del]") && setConfirmDel(-1)}>
        <div className="adm-stack">
          {refs.length ? null : <p className="adm-empty">Chưa có dự án nào trong bảng.</p>}
          {refs.map((r, i) => {
            const on = !r.hidden;
            return (
              <section className={`adm-card${on ? "" : " off"}`} key={i}>
                <div className="adm-card-h">
                  <h2>{r.vi?.[0] || r.en?.[0] || "Dự án mới"}</h2>
                  <div className="adm-row-acts">
                    <span className="small">{on ? "Đang hiện" : "Đang ẩn"}</span>
                    <button type="button" className="adm-switch" role="switch" aria-checked={on} aria-label="Hiện dự án trên website" onClick={() => edit((rs) => (rs[i].hidden = !rs[i].hidden))}>
                      <i />
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      disabled={i === 0}
                      onClick={() => edit((rs) => ([rs[i - 1], rs[i]] = [rs[i], rs[i - 1]]))}
                    >
                      Đưa lên
                    </button>
                    <button
                      type="button"
                      data-del
                      className="btn btn-ghost btn-sm adm-danger"
                      onClick={() => {
                        if (confirmDel === i) {
                          edit((rs) => rs.splice(i, 1));
                          setConfirmDel(-1);
                        } else setConfirmDel(i);
                      }}
                    >
                      {confirmDel === i ? "Bấm lần nữa để xóa" : "Xóa"}
                    </button>
                  </div>
                </div>
                <div className="adm-pad adm-g2">
                  {(["en", "vi"] as const).map((l) => (
                    <div className="adm-col" style={{ gap: 0 }} key={l}>
                      <span className="adm-sub" style={{ marginBottom: 12 }}>
                        {l === "en" ? "English" : "Tiếng Việt"}
                      </span>
                      {COLS.map((c, j) => {
                        const id = `rf-${i}-${l}-${j}`;
                        return (
                          <div className="adm-field" key={j}>
                            <label className="adm-flabel" htmlFor={id}>
                              {c}
                            </label>
                            <input
                              className="input"
                              id={id}
                              data-first={l === "en" && j === 0 ? "1" : undefined}
                              value={r[l]?.[j] ?? ""}
                              onChange={(e) => {
                                const v = e.target.value;
                                edit((rs) => {
                                  rs[i][l] = [...(rs[i][l] ?? ["", "", "", ""])] as RefRow;
                                  rs[i][l][j] = v;
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
          <div className="adm-row-acts">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                edit((rs) => rs.push({ en: ["", "", "", ""], vi: ["", "", "", ""], hidden: false }));
                setFocusLast(true);
              }}
            >
              Thêm dự án
            </button>
            <span className="small">Bốn dự án có ảnh trên trang Dự án chưa sửa được ở đây.</span>
          </div>
        </div>
      </div>
    </>
  );
}
