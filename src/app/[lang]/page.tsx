import Link from "next/link";
import type { Metadata } from "next";
import HomeRail from "@/components/HomeRail";
import { ArrowIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { Chapter, Cta, Kick, More, ScrollLink, heroBg, two } from "@/components/ui";
import { EMAIL, IMG, PROJECTS, SERVICES, SITE_NAME, WA, t } from "@/lib/content";
import { getLang } from "@/lib/page";
import { alternates, href } from "@/lib/paths";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  return { title: { absolute: `${SITE_NAME} – ${t(lang).home.title}` }, alternates: alternates(lang) };
}

export default async function HomePage({ params }: Props) {
  const lang = await getLang(params);
  const d = t(lang);
  const h = d.home;

  return (
    <>
      <section className="hero" id="top" style={heroBg(IMG.offshore)}>
        <div className="rail-l">
          <span>{d.rail}</span>
          <a href={`mailto:${EMAIL}`} aria-label="Email">
            <MailIcon />
          </a>
          <a href={WA} target="_blank" rel="noopener" aria-label="WhatsApp">
            <PhoneIcon />
          </a>
        </div>
        <HomeRail />
        <div className="wrap hero-in">
          <Kick>{h.kicker}</Kick>
          <h1 className="h1">{h.title}</h1>
          <div>
            <ScrollLink to="ch1">{d.scroll}</ScrollLink>
          </div>
        </div>
      </section>

      <Chapter
        id="ch1"
        n="01"
        kicker={h.ch1.kicker}
        title={h.ch1.title}
        body={h.ch1.body}
        img={IMG.otsm1}
        alt={SERVICES[0][lang].alt}
        extra={
          <ul className="idx">
            {SERVICES.map((s, i) => (
              <li key={s.slug}>
                <Link href={href(lang, `/services/${s.slug}`)}>
                  <i>{two(i)}</i>
                  <span>
                    <b>{s[lang].name}</b>
                    <small>{s[lang].note}</small>
                  </span>
                  <ArrowIcon />
                </Link>
              </li>
            ))}
          </ul>
        }
      />

      <Chapter
        id="ch2"
        n="02"
        rev
        kicker={h.ch2.kicker}
        title={h.ch2.title}
        body={h.ch2.body}
        img={IMG.team}
        alt={d.about.whoTitle}
        extra={
          <ol className="steps">
            {h.ch2.steps.map((s, i) => (
              <li key={s[0]}>
                <i>{two(i)}</i>
                <b>{s[0]}</b>
                <span>{s[1]}</span>
              </li>
            ))}
          </ol>
        }
      />

      <Chapter
        id="ch3"
        n="03"
        kicker={h.ch3.kicker}
        title={h.ch3.title}
        body={h.ch3.body}
        img={IMG.safhp}
        alt={PROJECTS.featured[0][lang].t}
        extra={
          <>
            <ul className="plist">
              {PROJECTS.refs[lang].map((r) => (
                <li key={r[0]}>
                  <b>{r[0]}</b>
                  <span>{r[3]}</span>
                </li>
              ))}
            </ul>
            <More to={href(lang, "/projects")}>{d.more}</More>
          </>
        }
      />

      <Cta lang={lang} />
    </>
  );
}
