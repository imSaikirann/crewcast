export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Product",      href: "/#features"     },
  { label: "Domains",      href: "/domains"       },
  { label: "Open roles",   href: "/jobs"          },
];

/** Routes where the navbar should be completely hidden */
export const hiddenNavbarRoutes = ["/form", "/dashboard", "/admin"];

export const isNavbarHidden = (pathname: string) =>
  hiddenNavbarRoutes.some((p) => pathname.startsWith(p));