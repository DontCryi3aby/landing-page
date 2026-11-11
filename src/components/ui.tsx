import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CLIENTS, type Lang } from "@/lib/content";
import type { SiteData } from "@/lib/site";
import { href } from "@/lib/paths";
import { ArrowIcon, CheckIcon, DownIcon } from "./icons";

export const Kick = ({ children }: { children: ReactNode }) => <p className="kick">{children}</p>;

export const More = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link className="more" href={to}>
    {children} <ArrowIcon />
  </Link>
);

export const ScrollLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <a className="scroll" href={`#${to}`}>
    {children} <DownIcon />
  </a>
);

export const Ticks = ({ items }: { items: string[] }) => (
  <ul className="ticks">
    {items.map((x) => (
      <li key={x}>
        <CheckIcon />
        <span>{x}</span>
      </li>
    ))}
  </ul>
);

export const heroBg = (img: string): CSSProperties => ({
  backgroundImage: `linear-gradient(90deg,rgba(16,43,70,.85) 0%,rgba(16,43,70,.3) 70%),linear-gradient(180deg,rgba(16,43,70,.45) 0%,rgba(16,43,70,.3) 50%,rgba(16,43,70,.92) 88%,#102B46 100%),url(${img})`,
});

export function Crumbs({ lang, home, items }: { lang: Lang; home: string; items: [string, string?][] }) {
  return (
    <p className="crumb">
      <Link href={href(lang)}>{home}</Link>
      {items.map(([label, to]) => (
        <span key={label} style={{ display: "contents" }}>
          <span aria-hidden="true">/</span>
          {to ? <Link href={to}>{label}</Link> : <span>{label}</span>}
        </span>
      ))}
    </p>
  );
}

export function SubHero(props: {
  site: SiteData;
  img: string;
  crumbs: [string, string?][];
  kicker: string;
  title: string;
  lead?: string;
  extra?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="hero hero-sm" style={heroBg(props.img)}>
      {props.extra}
      <div className="wrap hero-in">
        <Crumbs lang={props.site.lang} home={props.site.d.nav.home} items={props.crumbs} />
        <Kick>{props.kicker}</Kick>
        <h1 className="h1">{props.title}</h1>
        {props.lead ? <p className="lead">{props.lead}</p> : null}
        {props.actions}
      </div>
    </section>
  );
}

export function Chapter(o: {
  id?: string;
  n: string;
  rev?: boolean;
  kicker: string;
  title: string;
  body?: string;
  extra?: ReactNode;
  img: string;
  alt?: string;
  cap?: string;
}) {
  return (
    <section className="chap" id={o.id}>
      <div className={`wrap ch${o.rev ? " rev" : ""}`}>
        <div className="ch-text">
          <span className="num" aria-hidden="true">
            {o.n}
          </span>
          <Kick>{o.kicker}</Kick>
          <h2 className="h2">{o.title}</h2>
          {o.body ? <p className="body">{o.body}</p> : null}
          {o.extra}
        </div>
        <figure className="ch-media">
          <Image src={o.img} alt={o.alt || o.title} width={900} height={1125} sizes="(max-width: 980px) 100vw, 560px" />
          {o.cap ? <figcaption>{o.cap}</figcaption> : null}
        </figure>
      </div>
    </section>
  );
}

export function Cta({ site, kicker, title, text }: { site: SiteData; kicker?: string; title?: string; text?: string }) {
  const { d, lang, settings, waUrl } = site;
  return (
    <section className="cta">
      <div className="wrap">
        <div className="cta-in">
          <Kick>{kicker || d.cta.kicker}</Kick>
          <h2 className="h2">{title || d.cta.title}</h2>
          <p className="lead">{text || d.cta.text}</p>
          <div className="hero-acts">
            <Link className="btn" href={href(lang, "/contact")}>
              {d.nav.cta}
            </Link>
            <a className="btn btn-ghost" href={waUrl} target="_blank" rel="noopener">
              WhatsApp {settings.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Client list (home + projects); hidden via admin key "home.clients". */
export function Clients({ site, alt }: { site: SiteData; alt?: boolean }) {
  if (site.hid("home.clients")) return null;
  const a = site.d.about;
  return (
    <section className={`sec${alt ? " alt" : ""}`}>
      <div className="wrap">
        <div className="head">
          <Kick>{a.clientsKicker}</Kick>
          <h2 className="h2">{a.clientsTitle}</h2>
        </div>
        <ul className="clients">
          {CLIENTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Brand mark used in header, footer and admin sidebar. */
export function Brand({ to, label }: { to: string; label: ReactNode }) {
  return (
    <Link className="brand" href={to}>
      <Image src="/img/xt-logo.png" alt="XT" width={54} height={46} priority />
      <span>{label}</span>
    </Link>
  );
}

export const two = (i: number) => `0${i + 1}`;
