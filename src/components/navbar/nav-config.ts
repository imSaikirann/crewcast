export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Product",      href: "/#features"     },
  { label: "Domains",      href: "/domains"       },
  { label: "Open roles",   href: "/jobs"          },
];

/** Routes where the navbar should be completely hidden */
export const hiddenNavbarRoutes = ["/form", "/dashboard", "/admin"];

/** Routes where the navbar is hidden only on an exact match */
export const exactHiddenNavbarRoutes = ["/"];

export const isNavbarHidden = (pathname: string) =>
  exactHiddenNavbarRoutes.includes(pathname) ||
  hiddenNavbarRoutes.some((p) => pathname.startsWith(p));