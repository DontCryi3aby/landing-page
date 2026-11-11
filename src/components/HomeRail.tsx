"use client";

import { useEffect, useState } from "react";

const IDS = ["top", "ch1", "ch2", "ch3"];
const LABELS = ["Start", "01", "02", "03"];

/** Right-hand section rail on the home hero, highlighting the section in view. */
export default function HomeRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = IDS.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(IDS.indexOf(e.target.id));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="rail-r" aria-label="Sections">
      <ol>
        {IDS.map((id, i) => (
          <li key={id}>
            <a href={`#${id}`} className={i === active ? "on" : undefined} aria-current={i === active ? "true" : undefined}>
              {LABELS[i]}
            </a>
          </li>
        ))}
      </ol>
      <div className="track">
        <i style={{ top: `${active * 25}%` }} />
      </div>
    </nav>
  );
}
