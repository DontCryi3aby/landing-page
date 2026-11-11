"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, t, type Lang } from "@/lib/content";
import { href } from "@/lib/paths";

const SECTIONS = ["services", "projects", "about", "contact"] as const;

export default function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname() || `/${lang}`;
  const d = t(lang);
  // "/en/services/welding" -> ["services", "welding"]
  const rest = pathname.split("/").filter(Boolean).slice(1);
  const section = rest[0] || "home";
  const swap = (l: Lang) => `/${l}${rest.length ? "/" + rest.join("/") : ""}`;

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link className="brand" href={href(lang)}>
          <b>MKP</b>
          <span>Technical Services</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {SECTIONS.map((k) => (
            <Link key={k} href={href(lang, `/${k}`)} aria-current={section === k ? "page" : undefined}>
              {d.nav[k]}
            </Link>
          ))}
        </nav>
        <div className="acts">
          <div className="lang" role="group" aria-label="Language">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={swap(l)}
                hrefLang={l}
                scroll={false}
                aria-pressed={l === lang}
                className="lang-btn"
                role="button"
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          {section !== "contact" ? (
            <Link className="btn btn-sm hide-sm" href={href(lang, "/contact")}>
              {d.nav.cta}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
