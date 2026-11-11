"use client";

import { useState } from "react";

export default function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable: the value is user-select:all, so a click selects it */
    }
  };
  return (
    <button type="button" className="more" style={{ fontSize: 15 }} onClick={onClick}>
      {copied ? done : label}
    </button>
  );
}
