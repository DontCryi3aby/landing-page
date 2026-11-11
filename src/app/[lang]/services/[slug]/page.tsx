import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/icons";
import { Chapter, Cta, Kick, ScrollLink, SubHero, Ticks, two } from "@/components/ui";
import { IMG, LOCALES, SERVICES, getService, qualsOf, t } from "@/lib/content";
import { getLang } from "@/lib/page";
import { alternates, href } from "@/lib/paths";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.flatMap((lang) => SERVICES.map((s) => ({ lang, slug: s.slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: s[lang].name,
    description: s[lang].lead,
    alternates: alternates(lang, `/services/${s.slug}`),
    openGraph: { images: [{ url: s.img }] },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const lang = await getLang(params);
  const { slug } = await params;
  const i = SERVICES.findIndex((s) => s.slug === slug);
  if (i < 0) notFound();
  const s = SERVICES[i];
  const sd = s[lang];
  const d = t(lang);
  const dt = d.detail;
  const q = qualsOf(s, lang);
  const ctaTitle = lang === "vi" ? `Cần ${sd.name.toLowerCase()} tại công trường?` : `Need ${sd.name.toLowerCase()} on site?`;

  return (
    <>
      <SubHero
        lang={lang}
        img={s.img}
        crumbs={[[d.nav.services, href(lang, "/services")], [sd.name]]}
        kicker={sd.name}
        title={sd.title}
        lead={sd.lead}
        extra={
          <span className="ghost-num" aria-hidden="true">
            {two(i)}
          </span>
        }
        actions={
          <div className="hero-acts">
            <Link className="btn" href={href(lang, "/contact")}>
              {d.nav.cta}
            </Link>
            <ScrollLink to="scope">{dt.see}</ScrollLink>
          </div>
        }
      />

      <section className="sec" id="scope">
        <div className="wrap">
          <div className="head">
            <Kick>{dt.scopeKicker}</Kick>
            <h2 className="h2">{dt.scopeTitle}</h2>
          </div>
          <ol className="g2" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {sd.tasks.map((k, j) => (
              <li className="task" key={k[0]}>
                <i>{two(j)}</i>
                <div>
                  <b>{k[0]}</b>
                  <span>{k[1]}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Chapter
        n="02"
        rev
        kicker={dt.peopleKicker}
        title={dt.peopleTitle}
        body={dt.peopleBody}
        img={IMG.yard}
        alt={dt.peopleTitle}
        extra={
          <>
            <Ticks items={sd.roles} />
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
          </>
        }
      />

      <section className="sec alt">
        <div className="wrap">
          <div className="head">
            <Kick>{dt.othersKicker}</Kick>
            <h2 className="h2">{dt.othersTitle}</h2>
          </div>
          <div className="g3">
            {SERVICES.map((o, j) =>
              o.slug === slug ? null : (
                <Link className="card" href={href(lang, `/services/${o.slug}`)} key={o.slug}>
                  <Image src={o.img} alt={o[lang].alt} width={800} height={600} sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 400px" />
                  <span className="card-k">{two(j)}</span>
                  <span className="h3">{o[lang].name}</span>
                  <p className="small">{o[lang].lead}</p>
                  <span className="more">
                    {d.more} <ArrowIcon />
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <Cta lang={lang} title={ctaTitle} />
    </>
  );
}
