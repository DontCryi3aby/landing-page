import type { Metadata } from "next";
import { headers } from "next/headers";
import { toggleRequest } from "@/app/actions";
import { Kick } from "@/components/ui";
import { t } from "@/lib/content";
import { adminEnabled, isAdminAuth } from "@/lib/admin";
import { getLang } from "@/lib/page";
import { listRequests } from "@/lib/requests-store";

type Props = { params: Promise<{ lang: string }> };

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function RequestsPage({ params }: Props) {
  const lang = await getLang(params);
  const d = t(lang);
  const r = d.requests;
  const authed = adminEnabled() && isAdminAuth((await headers()).get("authorization"));
  const items = authed ? await listRequests() : [];
  const fmt = new Intl.DateTimeFormat(lang === "vi" ? "vi-VN" : "en-GB", { dateStyle: "medium", timeStyle: "short" });

  let body: React.ReactNode;
  if (!authed) body = <p className="body">{r.noAccess}</p>;
  else if (!items.length) body = <p className="body">{r.empty}</p>;
  else
    body = (
      <div>
        {items.map((q) => {
          const st = q.status === "done" ? "done" : "new";
          const line = [q.company, q.discipline, q.location, q.headcount ? `${q.headcount} ${r.headcount}` : "", q.start ? `${r.start}: ${q.start}` : ""]
            .filter(Boolean)
            .join(" · ");
          let when = q.createdAt;
          try {
            when = fmt.format(new Date(q.createdAt));
          } catch {}
          return (
            <article className="req" key={q.id}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                <h3>{q.name}</h3>
                <p>{line}</p>
                <p>
                  <a href={`mailto:${q.email}`}>{q.email}</a>
                  {q.phone ? ` · ${q.phone}` : ""} · {when}
                </p>
              </div>
              <form action={toggleRequest} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
                <span className={`pill ${st}`}>{r.st[st]}</span>
                <input type="hidden" name="id" value={q.id} />
                <button type="submit" className="btn btn-ghost btn-sm">
                  {st === "done" ? r.markNew : r.markDone}
                </button>
              </form>
              <p className="msg">{q.message}</p>
            </article>
          );
        })}
      </div>
    );

  return (
    <section className="sec" style={{ paddingTop: 200 }}>
      <div className="wrap">
        <div className="head">
          <Kick>{r.kicker}</Kick>
          <h1 className="h2">{r.title}</h1>
        </div>
        {body}
      </div>
    </section>
  );
}
