"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADM_TABS } from "./tabs";

export default function AdminNav({ newCount }: { newCount: number }) {
  const path = usePathname();
  return (
    <nav className="adm-nav" aria-label="Quản trị">
      {ADM_TABS.map(([to, label]) => (
        <Link key={to} href={to} aria-current={path === to ? "page" : undefined}>
          <span>{label}</span>
          {to === "/admin/requests" && newCount ? <em>{newCount}</em> : null}
        </Link>
      ))}
    </nav>
  );
}
