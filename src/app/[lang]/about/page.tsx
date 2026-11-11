import type { Metadata } from "next";
import { CheckIcon } from "@/components/icons";
import { Chapter, Cta, Kick, SubHero } from "@/components/ui";
import { IMG, t } from "@/lib/content";
import { getLang } from "@/lib/page";
import { alternates } from "@/lib/paths";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const d = t(lang);
  return { title: d.nav.about, description: d.about.p1, alternates: alternates(lang, "/about") };
}

export default async function AboutPage({ params }: Props) {
  const lang = await getLang(params);
  const d = t(lang);
  const a = d.about;

  return (
    <>
      <SubHero lang={lang} img={IMG.teamWide} crumbs={[[d.nav.about]]} kicker={a.kicker} title={a.title} />

      <Chapter n="01" kicker={a.whoKicker} title={a.whoTitle} body={a.p1} img={IMG.team} alt={a.whoTitle} extra={<p className="body">{a.p2}</p>} />

      <section className="sec alt">
        <div className="wrap g2">
          {[a.mission, a.vision].map(([label, text]) => (
            <div className="quote" key={label}>
              <span className="label">{label}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <Kick>{a.certsKicker}</Kick>
            <h2 className="h2">{a.certsTitle}</h2>
            <p className="body">{a.certsBody}</p>
          </div>
          <div className="rows">
            {a.certs.map((c) => (
              <div className="row" key={c[0]}>
                <b>{c[0]}</b>
                <span>{c[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="head">
            <Kick>{a.teamKicker}</Kick>
            <h2 className="h2">{a.teamTitle}</h2>
          </div>
          <div className="g4">
            {a.roles.map((r) => (
              <div className="role" key={r[0]}>
                <b>{r[0]}</b>
                <span>{r[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <Kick>{a.whyKicker}</Kick>
            <h2 className="h2">{a.whyTitle}</h2>
          </div>
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
        </div>
      </section>

      <Cta lang={lang} kicker={a.ctaKicker} title={a.ctaTitle} />
    </>
  );
}
