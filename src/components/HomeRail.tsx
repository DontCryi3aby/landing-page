"use client";

import { useEffect, useState } from "react";

/** Right-hand section rail on the home hero, highlighting the section in view. */
export default function HomeRail({ ids }: { ids: string[] }) {
  const all = ["top", ...ids];
  const [active, setActive] = useState(0);
  const key = all.join(",");

  useEffect(() => {
    const list = key.split(",");
    const els = list.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(list.indexOf(e.target.id))),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);

  return (
    <nav className="rail-r" aria-label="Sections">
      <ol>
        {all.map((id, i) => (
          <li key={id}>
            <a href={`#${id}`} className={i === active ? "on" : undefined} aria-current={i === active ? "true" : undefined}>
              {i === 0 ? "Start" : `0${i}`}
            </a>
          </li>
        ))}
      </ol>
      <div className="track">
        <i style={{ top: `${(active / all.length) * 100}%`, height: `${100 / all.length}%` }} />
      </div>
    </nav>
  );
}
