"use client";

import { DEFAULT_SETTINGS, type Settings } from "@/lib/content";
import type { SiteContent } from "@/lib/site";
import AdminTop from "./AdminTop";
import { useSiteDraft } from "./useSiteDraft";

type Key = Exclude<keyof Settings, "defaultLang">;

export default function SettingsEditor({ site }: { site: SiteContent }) {
  const { draft, update, toast, actions } = useSiteDraft({ ...site, settings: { ...DEFAULT_SETTINGS, ...site.settings } });
  const s = draft.settings;

  const inp = (k: Key, label: string, type = "text", hint?: string) => (
    <div className="adm-field">
      <label className="adm-flabel" htmlFor={`st-${k}`}>
        {label}
      </label>
      <input
        className="input"
        id={`st-${k}`}
        type={type}
        value={s[k] ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          update((d) => {
            d.settings[k] = v;
          });
        }}
      />
      {hint ? <span className="small">{hint}</span> : null}
    </div>
  );

  return (
    <>
      <AdminTop path="/admin/settings" actions={actions} toast={toast} />
      <div className="adm-body">
        <div className="adm-stack">
          <section className="adm-card">
            <div className="adm-card-h">
              <h2>Thông tin liên hệ trên website</h2>
            </div>
            <div className="adm-pad adm-g2">
              {inp("email", "Email công khai", "email")}
              {inp("phone", "Số điện thoại hiển thị", "tel")}
              {inp("wa", "Số WhatsApp", "tel", "Chỉ gồm số, kèm mã quốc gia, ví dụ 84768337402")}
              <div />
              {inp("person", "Người liên hệ (English)")}
              {inp("personVi", "Người liên hệ (Tiếng Việt)")}
              {inp("address", "Địa chỉ đầy đủ (English)")}
              {inp("addressVi", "Địa chỉ đầy đủ (Tiếng Việt)")}
              {inp("cityEn", "Địa chỉ ngắn ở chân trang (English)")}
              {inp("cityVi", "Địa chỉ ngắn ở chân trang (Tiếng Việt)")}
            </div>
          </section>
          <section className="adm-card">
            <div className="adm-card-h">
              <h2>Ngôn ngữ mặc định</h2>
            </div>
            <div className="adm-pad">
              <p className="small" style={{ marginBottom: 14 }}>
                Ngôn ngữ hiển thị khi khách mở website lần đầu. Khách vẫn đổi được bằng nút EN / VI.
              </p>
              <div className="adm-chips">
                {(
                  [
                    ["en", "English"],
                    ["vi", "Tiếng Việt"],
                  ] as const
                ).map(([l, label]) => (
                  <button
                    key={l}
                    type="button"
                    aria-pressed={s.defaultLang === l}
                    onClick={() =>
                      update((d) => {
                        d.settings.defaultLang = l;
                      })
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
