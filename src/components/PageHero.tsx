export interface Crumb {
  label: string;
  href?: string;
}

/**
 * PageHero banner has been retired per user request to eliminate
 * the bulky top banner and breadcrumbs navigation across all screens.
 */
export default function PageHero(_props: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  image?: string;
  crumbs?: Crumb[];
}) {
  return null;
}

