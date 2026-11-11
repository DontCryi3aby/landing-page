import Link from "next/link";
import type { Metadata } from "next";
import { Chapter, Crumbs, Cta, Kick, More, ScrollLink, Ticks, heroBg, two } from "@/components/ui";
import { IMG, SERVICES, qualsOf, t } from "@/lib/content";
import { getLang } from "@/lib/page";
import { alternates, href } from "@/lib/paths";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const d = t(lang);
  return { title: d.nav.services, description: d.servicesPage.lead, alternates: alternates(lang, "/services") };
}

const CERTS = ["CSWIP 3.1 · 3.2.2", "ASNT Level III", "AINDT Level III", "FROSIO Level III", "NACE / AMPP"];

export default async function ServicesPage({ params }: Props) {
  const lang = await getLang(params);
  const d = t(lang);
  const p = d.servicesPage;

  return (
    <>
      <section className="hero" style={heroBg(IMG.yard)}>
        <div className="wrap hero-in" style={{ paddingBottom: 110 }}>
          <Crumbs lang={lang} items={[[d.nav.services]]} />
          <Kick>{p.kicker}</Kick>
          <h1 className="h1">{p.title}</h1>
          <p className="lead">{p.lead}</p>
          <div className="hero-acts">
            <Link className="btn" href={href(lang, "/contact")}>
              {d.nav.cta}
            </Link>
            <ScrollLink to="s-welding">{d.scroll}</ScrollLink>
          </div>
        </div>
        <div className="certs">
          <div className="wrap certs-in">
            <span>{p.certs}</span>
            {CERTS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {SERVICES.map((s, i) => {
        const sd = s[lang];
        const q = qualsOf(s, lang);
        return (
          <Chapter
            key={s.slug}
            id={`s-${s.slug}`}
            n={two(i)}
            rev={i % 2 === 1}
            kicker={sd.name}
            title={sd.title}
            body={sd.lead}
            img={s.img}
            alt={sd.alt}
            extra={
              <>
                <Ticks items={sd.ticks} />
                <div className="meta">
                  <div>
                    <span className="label">{d.qual}</span>
                    {q.q}
                  </div>
                  <div>
                    <span className="label">{d.std}</span>
                    {q.s}
                  </div>
                </div>
                <More to={href(lang, `/services/${s.slug}`)}>{d.more}</More>
              </>
            }
          />
        );
      })}

      <section className="sec alt">
        <div className="wrap g2" style={{ alignItems: "end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Kick>05</Kick>
            <h2 className="h2">{p.mech}</h2>
          </div>
          <p className="body">{p.mechText}</p>
        </div>
      </section>

      <Cta lang={lang} />
    </>
  );
}
