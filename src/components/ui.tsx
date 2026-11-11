import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { PHONE, WA, t, type Lang } from "@/lib/content";
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
  backgroundImage: `linear-gradient(90deg,rgba(11,29,38,.85) 0%,rgba(11,29,38,.3) 70%),linear-gradient(180deg,rgba(11,29,38,.45) 0%,rgba(11,29,38,.3) 50%,rgba(11,29,38,.92) 88%,#0B1D26 100%),url(${img})`,
});

export function Crumbs({ lang, items }: { lang: Lang; items: [string, string?][] }) {
  return (
    <p className="crumb">
      <Link href={href(lang)}>{t(lang).nav.home}</Link>
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
  lang: Lang;
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
        <Crumbs lang={props.lang} items={props.crumbs} />
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

export function Cta({ lang, kicker, title, text }: { lang: Lang; kicker?: string; title?: string; text?: string }) {
  const d = t(lang);
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
            <a className="btn btn-ghost" href={WA} target="_blank" rel="noopener">
              WhatsApp {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const two = (i: number) => `0${i + 1}`;
