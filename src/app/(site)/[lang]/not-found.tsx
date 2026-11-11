"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Kick, heroBg } from "@/components/ui";
import { DICT, IMG, isLang } from "@/lib/content";

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const lang = isLang(params?.lang) ? params.lang : "en";
  const d = DICT[lang];
  return (
    <section className="hero hero-sm" style={heroBg(IMG.yard)}>
      <div className="wrap hero-in">
        <Kick>404</Kick>
        <h1 className="h1">{d.notFound}</h1>
        <div className="hero-acts">
          <Link className="btn" href={`/${lang}`}>
            {d.nav.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
