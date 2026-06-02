import { NextRequest, NextResponse } from "next/server";

const locales = ["th", "en"];
const defaultLocale = "th";

/**
 * Locale routing:
 *  - "/" → "/th"
 *  - legacy non-locale paths ("/services", "/services/iv-drip") → "/th/..."
 *  - paths that already start with a locale pass through unchanged.
 * API, Next internals, and static files (with a "." in the path) are skipped
 * by the matcher below.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, all Next internals, and anything with a file extension
  // (static assets, images, sitemap.xml, robots.txt, etc.).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
