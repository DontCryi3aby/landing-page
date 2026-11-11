"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { saveSiteContent } from "@/app/(admin)/admin/actions";
import type { SiteContent } from "@/lib/site";

/** Local draft of the site overrides with dirty tracking, save / discard and a toast. */
export function useSiteDraft(initial: SiteContent) {
  const router = useRouter();
  const [draft, setDraft] = useState<SiteContent>(() => structuredClone(initial));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const update = (fn: (d: SiteContent) => void) => {
    setDraft((d) => {
      const n = structuredClone(d);
      fn(n);
      return n;
    });
    setDirty(true);
  };

  const save = async () => {
    if (!dirty || saving) return;
    setSaving(true);
    try {
      const res = await saveSiteContent(draft);
      if (res.ok) {
        setDirty(false);
        setToast("Đã lưu. Website đã cập nhật.");
        router.refresh();
      } else setToast(res.error);
    } catch {
      setToast("Chưa lưu được. Kiểm tra kết nối rồi bấm Lưu thay đổi lần nữa.");
    } finally {
      setSaving(false);
    }
  };

  const discard = () => {
    setDraft(structuredClone(initial));
    setDirty(false);
  };

  const actions = (
    <div className="adm-save">
      {dirty ? <span className="adm-dirty">Có thay đổi chưa lưu</span> : null}
      {dirty ? (
        <button type="button" className="btn btn-ghost btn-sm" onClick={discard}>
          Hủy thay đổi
        </button>
      ) : null}
      <button type="button" className="btn btn-sm" onClick={save} disabled={!dirty || saving}>
        {saving ? "Đang lưu…" : "Lưu thay đổi"}
      </button>
    </div>
  );

  return { draft, update, dirty, toast, actions };
}
