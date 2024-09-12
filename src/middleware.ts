import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "ja",
});

export const config = {
  // Match only internationalized pathnames
  // matcher: ["/", "/(en|ja|vi|zh|es|ru|fr|ko|it|pt|de|ne|id|tl|hi)/:path*"],
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
