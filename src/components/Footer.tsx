import Link from "next/link";
import { EMAIL, PHONE, SERVICES, t, type Lang } from "@/lib/content";
import { href } from "@/lib/paths";

export default function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  const contact = href(lang, "/contact");
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <Link className="brand" href={href(lang)}>
              <b>MKP</b>
              <span>Technical Services</span>
            </Link>
            <p>{d.footer.tag}</p>
          </div>
          <div>
            <h2>{d.nav.services}</h2>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={href(lang, `/services/${s.slug}`)}>{s[lang].name}</Link>
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
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a></li>
              <li><Link href={contact}>{d.footer.city}</Link></li>
            </ul>
          </div>
        </div>
        <div className="fbase">
          <span>© {new Date().getFullYear()} MKP Technical Services</span>
          <span>{d.footer.base}</span>
        </div>
      </div>
    </footer>
  );
}
