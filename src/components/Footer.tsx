import Link from "next/link";
import { LEGAL_NAME } from "@/lib/content";
import { href } from "@/lib/paths";
import type { SiteData } from "@/lib/site";
import { Brand } from "./ui";

export default function Footer({ site }: { site: SiteData }) {
  const { d, lang, settings, services } = site;
  const contact = href(lang, "/contact");
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <Brand
              to={href(lang)}
              label={
                <>
                  Technical
                  <br />
                  Services
                </>
              }
            />
            <p>{d.footer.tag}</p>
          </div>
          <div>
            <h2>{d.nav.services}</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={href(lang, `/services/${s.slug}`)}>{s.t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{d.footer.company}</h2>
            <ul>
              <li><Link href={href(lang, "/about")}>{d.nav.about}</Link></li>
              <li><Link href={href(lang, "/projects")}>{d.nav.projects}</Link></li>
              <li><Link href={contact}>{d.nav.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h2>{d.nav.contact}</h2>
            <ul>
              <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
              <li><a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a></li>
              <li><Link href={contact}>{d.footer.city}</Link></li>
            </ul>
          </div>
        </div>
        <div className="fbase">
          <span>
            © {new Date().getFullYear()} XT Technical Services · {LEGAL_NAME[lang]}
          </span>
          <span>{d.footer.base}</span>
        </div>
      </div>
    </footer>
  );
}
