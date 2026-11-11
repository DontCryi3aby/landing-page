"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { submitRequest, type FormState } from "@/app/actions";
import type { Dict, Lang } from "@/lib/content";
import { OkCircleIcon } from "./icons";

type C = Dict["contact"];
const REQUIRED = ["name", "company", "email", "discipline", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ lang, c, options }: { lang: Lang; c: C; options: [string, string][] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitRequest, { status: "idle", n: 0 });
  const [dismissed, setDismissed] = useState<string | null>(null);
  // Client-side validation result (shown before any round-trip to the server).
  const [local, setLocal] = useState<{ error: "missing" | "badEmail"; invalid: string[] } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const sent = state.status === "sent" && state.id !== dismissed;
  const serverErr = state.status === "error" ? state : null;
  const error = local?.error ?? serverErr?.error;
  const invalid = local?.invalid ?? serverErr?.invalid ?? [];
  const values = state.status !== "sent" ? state.values ?? {} : {};

  useEffect(() => {
    if (state.status === "sent") cardRef.current?.scrollIntoView({ block: "start" });
    if (state.status === "error") focusFirstInvalid(formRef.current);
  }, [state]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const missing = REQUIRED.filter((k) => !get(k));
    let next: typeof local = null;
    if (missing.length) next = { error: "missing", invalid: missing };
    else if (!EMAIL_RE.test(get("email"))) next = { error: "badEmail", invalid: ["email"] };
    setLocal(next);
    if (next) {
      e.preventDefault();
      requestAnimationFrame(() => focusFirstInvalid(formRef.current));
    }
  };

  const errText = error === "missing" ? c.missing : error === "badEmail" ? c.badEmail : error === "failed" ? c.failed : "";
  const inv = (k: string) => (invalid.includes(k) ? true : undefined);

  return (
    <div className="fcard" id="fcard" ref={cardRef}>
      {sent ? (
        <div className="done" role="status">
          <span style={{ color: "var(--accent)" }}>
            <OkCircleIcon />
          </span>
          <h2 className="h3">{c.thanksTitle}</h2>
          <p className="body">{c.thanksText}</p>
          <button type="button" className="btn btn-ghost" onClick={() => state.status === "sent" && setDismissed(state.id)}>
            {c.again}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 className="h3">{c.formTitle}</h2>
            <p className="small">{c.formSub}</p>
          </div>
          {/* key remounts the form so defaultValues are re-applied after a server-side error */}
          <form key={state.n} ref={formRef} className="form" action={action} onSubmit={onSubmit} noValidate>
            <input type="hidden" name="lang" value={lang} />
            <div aria-hidden="true" style={{ position: "absolute", left: -10000, width: 1, height: 1, overflow: "hidden" }}>
              <label>
                Website <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <Field id="name" label={c.name} req>
              <input className="input" id="f-name" name="name" required autoComplete="name" defaultValue={values.name} aria-invalid={inv("name")} />
            </Field>
            <Field id="company" label={c.company} req>
              <input className="input" id="f-company" name="company" required autoComplete="organization" defaultValue={values.company} aria-invalid={inv("company")} />
            </Field>
            <Field id="email" label="Email" req>
              <input className="input" id="f-email" name="email" type="email" required autoComplete="email" defaultValue={values.email} aria-invalid={inv("email")} />
            </Field>
            <Field id="phone" label={c.phoneF}>
              <input className="input" id="f-phone" name="phone" type="tel" autoComplete="tel" defaultValue={values.phone} />
            </Field>
            <Field id="discipline" label={c.discipline} req>
              <select className="input" id="f-discipline" name="discipline" required defaultValue={values.discipline ?? ""} aria-invalid={inv("discipline")}>
                <option value="">{c.choose}</option>
                {options.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="headcount" label={c.headcount}>
              <input className="input" id="f-headcount" name="headcount" type="number" min={1} inputMode="numeric" placeholder="2" defaultValue={values.headcount} />
            </Field>
            <Field id="location" label={c.location}>
              <input className="input" id="f-location" name="location" placeholder={c.locationHint} defaultValue={values.location} />
            </Field>
            <Field id="start" label={c.start}>
              <input className="input" id="f-start" name="start" placeholder={c.startHint} defaultValue={values.start} />
            </Field>
            <Field id="message" label={c.message} req full>
              <textarea className="input" id="f-message" name="message" rows={5} required placeholder={c.messageHint} defaultValue={values.message} aria-invalid={inv("message")} />
            </Field>
            {errText ? (
              <p className="err" role="alert">
                {errText}
              </p>
            ) : null}
            <div className="ffoot">
              <span className="small">
                <span style={{ color: "var(--accent)" }}>*</span> {c.required}
              </span>
              <button type="submit" className="btn" disabled={pending}>
                {pending ? c.sending : c.submit}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ id, label, req, full, children }: { id: string; label: string; req?: boolean; full?: boolean; children: ReactNode }) {
  return (
    <div className={`field${full ? " full" : ""}`}>
      <label className="flabel" htmlFor={`f-${id}`}>
        {label}
        {req ? <i aria-hidden="true">*</i> : null}
      </label>
      {children}
    </div>
  );
}

function focusFirstInvalid(form: HTMLFormElement | null) {
  form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
}
