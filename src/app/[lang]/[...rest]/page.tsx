import { notFound } from "next/navigation";

// Any unknown path under /en or /vi renders the localized 404.
export default function CatchAll() {
  notFound();
}
