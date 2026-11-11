import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LANG, LOCALES, isLang, type Lang } from "@/lib/content";
import { adminEnabled, isAdminAuth } from "@/lib/admin";

const COOKIE = "NEXT_LOCALE";

function preferredLang(req: NextRequest): Lang {
  const fromCookie = req.cookies.get(COOKIE)?.value;
  if (isLang(fromCookie)) return fromCookie;
  const accept = req.headers.get("accept-language") || "";
  for (const part of accept.split(",")) {
    const code = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if (isLang(code)) return code;
  }
  return DEFAULT_LANG;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];

  // Unprefixed path -> redirect to the visitor's language.
  if (!LOCALES.includes(first as Lang)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${preferredLang(req)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Requests admin page: HTTP Basic Auth.
  if (pathname.split("/")[2] === "requests" && adminEnabled() && !isAdminAuth(req.headers.get("authorization"))) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="MKP requests", charset="UTF-8"' },
    });
  }

  const res = NextResponse.next();
  if (req.cookies.get(COOKIE)?.value !== first) {
    res.cookies.set(COOKIE, first, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }
  return res;
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, robots.txt, sitemap.xml…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
