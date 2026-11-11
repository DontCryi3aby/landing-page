import Link from "next/link";
import type { Metadata } from "next";
import HomeRail from "@/components/HomeRail";
import { ArrowIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { Chapter, Clients, Cta, Kick, More, ScrollLink, heroBg, two } from "@/components/ui";
import { IMG, PROJECTS, SITE_NAME } from "@/lib/content";
import { getLang } from "@/lib/page";
import { alternates, href } from "@/lib/paths";
import { getSiteData } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const { d } = await getSiteData(lang);
  return { title: { absolute: `${SITE_NAME} – ${d.home.title}` }, description: d.home.lead, alternates: alternates(lang) };
}

export default async function HomePage({ params }: Props) {
  const lang = await getLang(params);
  const site = await getSiteData(lang);
  const { d, services, refs, settings, waUrl } = site;
  const h = d.home;

  const chapters = [
    {
      key: "home.ch1",
      id: "ch1",
      kicker: h.ch1.kicker,
      title: h.ch1.title,
      body: h.ch1.body,
      img: IMG.otsm1,
      alt: services[0].t.alt,
      extra: (
        <ul className="idx">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Link href={href(lang, `/services/${s.slug}`)}>
                <i>{two(i)}</i>
                <span>
                  <b>{s.t.name}</b>
                  <small>{s.t.note}</small>
                </span>
                <ArrowIcon />
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "home.ch2",
      id: "ch2",
      kicker: h.ch2.kicker,
      title: h.ch2.title,
      body: h.ch2.body,
      img: IMG.team,
      alt: d.about.whoTitle,
      extra: (
        <ol className="steps">
          {h.ch2.steps.map((s, i) => (
            <li key={s[0]}>
              <i>{two(i)}</i>
              <b>{s[0]}</b>
              <span>{s[1]}</span>
            </li>
          ))}
        </ol>
      ),
    },
    {
      key: "home.ch3",
      id: "ch3",
      kicker: h.ch3.kicker,
      title: h.ch3.title,
      body: h.ch3.body,
      img: IMG.safhp,
      alt: PROJECTS.featured[0][lang].t,
      extra: (
        <>
          <ul className="plist">
            {refs.map((r, i) => (
              <li key={i}>
                <b>{r[0]}</b>
                <span>{r[3]}</span>
              </li>
            ))}
          </ul>
          <More to={href(lang, "/projects")}>{d.more}</More>
        </>
      ),
    },
  ].filter((c) => !site.hid(c.key));

  return (
    <>
      <section className="hero" id="top" style={heroBg(IMG.offshore)}>
        <div className="rail-l">
          <span>{d.rail}</span>
          <a href={`mailto:${settings.email}`} aria-label="Email">
            <MailIcon />
          </a>
          <a href={waUrl} target="_blank" rel="noopener" aria-label="WhatsApp">
            <PhoneIcon />
          </a>
        </div>
        <HomeRail ids={chapters.map((c) => c.id)} />
        <div className="wrap hero-in">
          <Kick>{h.kicker}</Kick>
          <h1 className="h1">{h.title}</h1>
          <p className="lead">{h.lead}</p>
          {chapters.length ? (
            <div>
              <ScrollLink to={chapters[0].id}>{d.scroll}</ScrollLink>
            </div>
          ) : null}
        </div>
      </section>

      {chapters.map(({ key, ...c }, i) => (
        <Chapter key={key} {...c} n={two(i)} rev={i % 2 === 1} />
      ))}

      <Clients site={site} alt />
      <Cta site={site} />
    </>
  );
}
