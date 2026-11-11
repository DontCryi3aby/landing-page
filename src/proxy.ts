import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_SETTINGS, LOCALES, isLang, type Lang } from "@/lib/content";
import { adminEnabled, isAdminAuth } from "@/lib/admin";
import { readSite } from "@/lib/site";

const COOKIE = "NEXT_LOCALE";

/** Visitor's chosen language (cookie), else the default language set in /admin/settings. */
async function preferredLang(req: NextRequest): Promise<Lang> {
  const fromCookie = req.cookies.get(COOKIE)?.value;
  if (isLang(fromCookie)) return fromCookie;
  try {
    const dl = (await readSite()).settings.defaultLang;
    if (isLang(dl)) return dl;
  } catch {}
  return DEFAULT_SETTINGS.defaultLang;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/");
  const first = parts[1];

  // Admin area: HTTP Basic Auth (user "admin", password ADMIN_PASSWORD).
  if (first === "admin") {
    if (adminEnabled() && !isAdminAuth(req.headers.get("authorization"))) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="XT admin", charset="UTF-8"' },
      });
    }
    return NextResponse.next();
  }

  // Old requests page moved into the admin area.
  if (parts[2] === "requests" && isLang(first)) {
    return NextResponse.redirect(new URL("/admin/requests", req.url));
  }

  // Unprefixed path -> redirect to the visitor's language.
  if (!LOCALES.includes(first as Lang)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${await preferredLang(req)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
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
