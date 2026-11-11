import type { Metadata } from "next";
import { Chapter, Cta, Kick, SubHero, two } from "@/components/ui";
import { IMG, PROJECTS, t } from "@/lib/content";
import { getLang } from "@/lib/page";
import { alternates } from "@/lib/paths";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const d = t(lang);
  return { title: d.nav.projects, description: d.projects.lead, alternates: alternates(lang, "/projects") };
}

export default async function ProjectsPage({ params }: Props) {
  const lang = await getLang(params);
  const d = t(lang);
  const p = d.projects;

  return (
    <>
      <SubHero lang={lang} img={IMG.safqn} crumbs={[[d.nav.projects]]} kicker={d.nav.projects} title={p.title} lead={p.lead} />

      {PROJECTS.featured.map((f, i) => {
        const fd = f[lang];
        return (
          <Chapter
            key={fd.t}
            n={two(i)}
            rev={i % 2 === 1}
            kicker={fd.k}
            title={fd.t}
            body={fd.b}
            img={f.img}
            alt={fd.t}
            cap={fd.p}
            extra={
              <ul className="facts">
                {fd.f.map((x) => (
                  <li key={x[1]}>
                    <b>{x[0]}</b>
                    <span>{x[1]}</span>
                  </li>
                ))}
              </ul>
            }
          />
        );
      })}

      <section className="sec alt">
        <div className="wrap">
          <div className="head">
            <Kick>{p.refsKicker}</Kick>
            <h2 className="h2">{p.refsTitle}</h2>
          </div>
          <div className="tbl" role="table" aria-label={p.refsTitle}>
            <div className="tr th" role="row">
              {p.th.map((h) => (
                <div role="columnheader" key={h}>
                  {h}
                </div>
              ))}
            </div>
            {PROJECTS.refs[lang].map((r) => (
              <div className="tr" role="row" key={r[0]}>
                <div role="cell">{r[0]}</div>
                {([1, 2, 3] as const).map((k) => (
                  <div role="cell" key={k}>
                    <span className="tl">{p.th[k]}</span>
                    {r[k]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta lang={lang} title={p.ctaTitle} />
    </>
  );
}
