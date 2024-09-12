import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "./i18n";

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
