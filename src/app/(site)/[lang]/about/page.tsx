import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { Chapter, Cta, Kick, SubHero } from "@/components/ui";
import { IMG } from "@/lib/content";
import { getLang } from "@/lib/page";
import { alternates } from "@/lib/paths";
import { getSiteData } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const { d } = await getSiteData(lang);
  return { title: d.nav.about, description: d.about.p1, alternates: alternates(lang, "/about") };
}

export default async function AboutPage({ params }: Props) {
  const lang = await getLang(params);
  const site = await getSiteData(lang);
  const { d } = site;
  const a = d.about;

  const head = (kicker: string, title: string, body?: string) => (
    <div className="head">
      <Kick>{kicker}</Kick>
      <h2 className="h2">{title}</h2>
      {body ? <p className="body">{body}</p> : null}
    </div>
  );

  // Optional blocks; admins can hide each one. Backgrounds alternate over what remains.
  const blocks: [string, ReactNode][] = [
    [
      "about.letter",
      <div className="wrap">
        <figure className="letter">
          <blockquote>{a.letter}</blockquote>
          <figcaption>{a.letterBy}</figcaption>
        </figure>
      </div>,
    ],
    [
      "about.values",
      <div className="wrap">
        {head(a.valuesKicker, a.valuesTitle)}
        <div className="g3">
          {a.values.map((v) => (
            <div className="role" key={v[0]}>
              <b>{v[0]}</b>
              <span>{v[1]}</span>
            </div>
          ))}
        </div>
      </div>,
    ],
    [
      "about.mv",
      <div className="wrap g2">
        {[a.mission, a.vision].map(([label, text]) => (
          <div className="quote" key={label}>
            <span className="label">{label}</span>
            <p>{text}</p>
          </div>
        ))}
      </div>,
    ],
    [
      "about.certs",
      <div className="wrap">
        {head(a.certsKicker, a.certsTitle, a.certsBody)}
        <div className="rows">
          {a.certs.map((c) => (
            <div className="row" key={c[0]}>
              <b>{c[0]}</b>
              <span>{c[1]}</span>
            </div>
          ))}
        </div>
      </div>,
    ],
    [
      "about.team",
      <div className="wrap">
        {head(a.teamKicker, a.teamTitle)}
        <div className="g4">
          {a.roles.map((r) => (
            <div className="role" key={r[0]}>
              <b>{r[0]}</b>
              <span>{r[1]}</span>
            </div>
          ))}
        </div>
      </div>,
    ],
    [
      "about.why",
      <div className="wrap">
        {head(a.whyKicker, a.whyTitle)}
        <div className="g3">
          {a.why.map((w) => (
            <div className="why" key={w[0]}>
              <CheckIcon />
              <div>
                <b>{w[0]}</b>
                <span>{w[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>,
    ],
  ];
  const shown = blocks.filter(([k]) => !site.hid(k));

  return (
    <>
      <SubHero site={site} img={IMG.teamWide} crumbs={[[d.nav.about]]} kicker={a.kicker} title={a.title} />

      <Chapter
        n="01"
        kicker={a.whoKicker}
        title={a.whoTitle}
        body={a.p1}
        img={IMG.team}
        alt={a.whoTitle}
        extra={
          <>
            <p className="body">{a.p2}</p>
            <ul className="facts">
              {a.facts.map((f) => (
                <li key={f[1]}>
                  <b>{f[0]}</b>
                  <span>{f[1]}</span>
                </li>
              ))}
            </ul>
            <p className="small">{a.legal}</p>
          </>
        }
      />

      {shown.map(([k, node], i) => (
        <section className={`sec${i % 2 === 0 ? " alt" : ""}`} key={k}>
          {node}
        </section>
      ))}

      <Cta site={site} kicker={a.ctaKicker} title={a.ctaTitle} />
    </>
  );
}
