import type { Metadata } from "next";
import { Chapter, Clients, Cta, Kick, SubHero, two } from "@/components/ui";
import { IMG, PROJECTS } from "@/lib/content";
import { getSiteData } from "@/lib/site";
import { getLang } from "@/lib/page";
import { alternates } from "@/lib/paths";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const { d } = await getSiteData(lang);
  return { title: d.nav.projects, description: d.projects.lead, alternates: alternates(lang, "/projects") };
}

export default async function ProjectsPage({ params }: Props) {
  const lang = await getLang(params);
  const site = await getSiteData(lang);
  const { d, refs } = site;
  const p = d.projects;
  const showRefs = !site.hid("projects.refs") && refs.length > 0;

  return (
    <>
      <SubHero site={site} img={IMG.safqn} crumbs={[[d.nav.projects]]} kicker={d.nav.projects} title={p.title} lead={p.lead} />

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

      {showRefs ? (
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
            {refs.map((r, ri) => (
              <div className="tr" role="row" key={ri}>
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
      ) : null}

      <Clients site={site} alt={!showRefs} />
      <Cta site={site} title={p.ctaTitle} />
    </>
  );
}
