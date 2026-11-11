"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveRequestNote, setRequestStatus } from "@/app/(admin)/admin/actions";
import type { RequestItem } from "@/lib/requests-store";
import { STATUS_LABEL, STATUS_ORDER, statusOf, type Status } from "@/lib/status";
import AdminTop from "./AdminTop";
import { Pill } from "./Pill";
import { fmtDate } from "./format";

type Filter = "all" | Status;

export default function RequestsBoard({ items, initialSel }: { items: RequestItem[]; initialSel: string | null }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [sel, setSel] = useState<string | null>(initialSel);
  const [toast, setToast] = useState("");
  const [, startTransition] = useTransition();
  // Optimistic status changes until the server data refreshes.
  const [optimistic, setOptimistic] = useState<Record<string, Status>>({});
  const detailRef = useRef<HTMLElement>(null);

  useEffect(() => setOptimistic({}), [items]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const st = (q: RequestItem) => optimistic[q.id] ?? statusOf(q);
  const shown = items.filter((q) => filter === "all" || st(q) === filter);
  const cur = items.find((q) => q.id === sel) ?? shown[0];

  const changeStatus = (q: RequestItem, s: Status) => {
    setOptimistic((o) => ({ ...o, [q.id]: s }));
    startTransition(async () => {
      try {
        await setRequestStatus(q.id, s);
        router.refresh();
      } catch {
        setOptimistic((o) => {
          const n = { ...o };
          delete n[q.id];
          return n;
        });
        setToast("Chưa lưu được thay đổi. Thử lại sau ít phút.");
      }
    });
  };

  const pick = (id: string) => {
    setSel(id);
    if (window.innerWidth < 1100) requestAnimationFrame(() => detailRef.current?.scrollIntoView({ block: "start" }));
  };

  if (!items.length) {
    return (
      <>
        <AdminTop path="/admin/requests" />
        <div className="adm-body">
          <section className="adm-card">
            <p className="adm-empty">Chưa có yêu cầu nào. Yêu cầu gửi từ trang Liên hệ sẽ hiện ở đây ngay khi đến.</p>
          </section>
        </div>
      </>
    );
  }

  const chips: [Filter, string, number][] = [
    ["all", "Tất cả", items.length],
    ...STATUS_ORDER.map((k): [Filter, string, number] => [k, STATUS_LABEL[k], items.filter((q) => st(q) === k).length]),
  ];

  return (
    <>
      <AdminTop path="/admin/requests" toast={toast} />
      <div className="adm-body">
        <div className="adm-chips">
          {chips.map(([k, label, n]) => (
            <button
              key={k}
              type="button"
              aria-pressed={filter === k}
              onClick={() => {
                setFilter(k);
                setSel(null);
              }}
            >
              {label} <span>{n}</span>
            </button>
          ))}
        </div>
        <div className="adm-split">
          <section className="adm-card">
            {shown.length ? (
              shown.map((q) => (
                <button type="button" key={q.id} className={`adm-row${q.id === cur?.id ? " on" : ""}`} onClick={() => pick(q.id)}>
                  <span className="adm-row-main">
                    <b>{q.name}</b>
                    <small>{q.company}</small>
                  </span>
                  <span className="adm-row-meta">{q.discipline}</span>
                  <span className="adm-row-meta">{fmtDate(q.createdAt, true)}</span>
                  <Pill st={st(q)} />
                </button>
              ))
            ) : (
              <p className="adm-empty">Không có yêu cầu nào ở trạng thái này.</p>
            )}
          </section>
          <section className="adm-card adm-pad" ref={detailRef}>
            {cur ? (
              <Detail key={cur.id} q={cur} st={st(cur)} onStatus={(s) => changeStatus(cur, s)} onToast={setToast} />
            ) : (
              <p className="adm-empty" style={{ padding: 0 }}>
                Chọn một yêu cầu để xem chi tiết.
              </p>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

function Detail({ q, st, onStatus, onToast }: { q: RequestItem; st: Status; onStatus: (s: Status) => void; onToast: (m: string) => void }) {
  const router = useRouter();
  const [note, setNote] = useState(q.note ?? "");
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const rows: [string, string | undefined][] = [
    ["Email", q.email],
    ["Điện thoại", q.phone],
    ["Chuyên ngành", q.discipline],
    ["Số lượng nhân sự", q.headcount],
    ["Địa điểm", q.location],
    ["Bắt đầu", q.start],
    ["Ngôn ngữ", q.lang === "vi" ? "Tiếng Việt" : "English"],
    ["Ngày gửi", fmtDate(q.createdAt)],
  ];

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      onToast(text);
    }
  };

  const saveNote = async () => {
    setSaving(true);
    try {
      await saveRequestNote(q.id, note);
      onToast("Đã lưu ghi chú.");
      router.refresh();
    } catch {
      onToast("Chưa lưu được thay đổi. Thử lại sau ít phút.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="adm-d-h">
        <div>
          <h2>{q.name}</h2>
          <p>{q.company}</p>
        </div>
        <Pill st={st} />
      </div>
      <dl className="adm-kv">
        {rows
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>
      <div className="adm-msg">
        <span className="label">Nội dung yêu cầu</span>
        <p>{q.message}</p>
      </div>
      <div className="adm-field">
        <span className="adm-flabel">Chuyển trạng thái</span>
        <div className="adm-chips">
          {STATUS_ORDER.map((s) => (
            <button key={s} type="button" aria-pressed={st === s} onClick={() => st !== s && onStatus(s)}>
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>
      </div>
      <div className="adm-field">
        <label className="adm-flabel" htmlFor="adm-note">
          Ghi chú nội bộ
        </label>
        <textarea className="input" id="adm-note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ví dụ: đã gửi 2 CV ứng viên ngày 12/11" />
        <div className="adm-row-acts">
          <button type="button" className="btn btn-ghost btn-sm" onClick={saveNote} disabled={saving}>
            {saving ? "Đang lưu…" : "Lưu ghi chú"}
          </button>
          {q.noteAt ? <span className="small">Đã lưu lúc {fmtDate(q.noteAt)}</span> : null}
        </div>
      </div>
      <div className="adm-row-acts">
        <button type="button" className="btn btn-sm" onClick={() => copy(q.email)}>
          {copied === q.email ? "Đã chép" : "Sao chép email"}
        </button>
        {q.phone ? (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => copy(q.phone!)}>
            {copied === q.phone ? "Đã chép" : "Sao chép số điện thoại"}
          </button>
        ) : null}
      </div>
    </>
  );
}
