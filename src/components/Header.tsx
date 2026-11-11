"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Dict, type Lang } from "@/lib/content";
import { href } from "@/lib/paths";
import { Brand } from "./ui";

const SECTIONS = ["services", "projects", "about", "contact"] as const;

export default function Header({ lang, nav }: { lang: Lang; nav: Dict["nav"] }) {
  const pathname = usePathname() || `/${lang}`;
  // "/en/services/welding" -> ["services", "welding"]
  const rest = pathname.split("/").filter(Boolean).slice(1);
  const section = rest[0] || "home";
  const swap = (l: Lang) => `/${l}${rest.length ? "/" + rest.join("/") : ""}`;

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
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
        <nav className="nav" aria-label="Main">
          {SECTIONS.map((k) => (
            <Link key={k} href={href(lang, `/${k}`)} aria-current={section === k ? "page" : undefined}>
              {nav[k]}
            </Link>
          ))}
        </nav>
        <div className="acts">
          <div className="lang" role="group" aria-label="Language">
            {LOCALES.map((l) => (
              <Link key={l} href={swap(l)} hrefLang={l} scroll={false} aria-pressed={l === lang} className="lang-btn" role="button">
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link
            className="btn btn-sm hide-sm"
            href={href(lang, "/contact")}
            style={section === "contact" ? { visibility: "hidden" } : undefined}
            aria-hidden={section === "contact" || undefined}
            tabIndex={section === "contact" ? -1 : undefined}
          >
            {nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
