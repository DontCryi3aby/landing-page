import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";
import { ArrowIcon } from "@/components/icons";
import { Kick, SubHero, two } from "@/components/ui";
import { IMG } from "@/lib/content";
import { getSiteData } from "@/lib/site";
import { getLang } from "@/lib/page";
import { alternates } from "@/lib/paths";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const { d } = await getSiteData(lang);
  return { title: d.nav.contact, description: d.contact.lead, alternates: alternates(lang, "/contact") };
}

export default async function ContactPage({ params }: Props) {
  const lang = await getLang(params);
  const site = await getSiteData(lang);
  const { d, settings, waUrl } = site;
  const EMAIL = settings.email;
  const PHONE = settings.phone;
  const c = d.contact;
  const options: [string, string][] = [
    ...site.services.map((s): [string, string] => [s.slug, s.t.name]),
    ["mech", c.mech],
    ["other", c.other],
  ];

  return (
    <>
      <SubHero site={site} img={IMG.offshore} crumbs={[[d.nav.contact]]} kicker={d.nav.contact} title={c.title} lead={c.lead} />

      <section className="sec">
        <div className="wrap contact">
          <div style={{ display: "flex", flexDirection: "column", gap: 48, minWidth: 0 }}>
            <dl className="dl">
              <div>
                <dt className="label">Email</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`} style={{ textDecoration: "none" }}>
                    {EMAIL}
                  </a>
                </dd>
                <div>
                  <CopyButton text={EMAIL} label={c.copy} done={c.copied} />
                </div>
              </div>
              <div>
                <dt className="label">{c.phone}</dt>
                <dd>
                  <a href={`tel:${PHONE.replace(/\s/g, "")}`} style={{ textDecoration: "none" }}>
                    {PHONE}
                  </a>
                </dd>
                <div style={{ display: "flex", gap: 24 }}>
                  <CopyButton text={PHONE} label={c.copy} done={c.copied} />
                  <a className="more" style={{ fontSize: 15 }} href={waUrl} target="_blank" rel="noopener">
                    WhatsApp <ArrowIcon />
                  </a>
                </div>
              </div>
              <div>
                <dt className="label">{c.person}</dt>
                <dd>{lang === "vi" ? settings.personVi : settings.person}</dd>
              </div>
              <div>
                <dt className="label">{c.office}</dt>
                <dd className="dd-sm">{lang === "vi" ? settings.addressVi : settings.address}</dd>
              </div>
            </dl>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Kick>{c.nextKicker}</Kick>
              <ol className="next">
                {c.next.map((s, i) => (
                  <li key={s[0]}>
                    <i>{two(i)}</i>
                    <div>
                      <b>{s[0]}</b>
                      <span>{s[1]}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ContactForm lang={lang} c={c} options={options} />
        </div>
      </section>
    </>
  );
}
