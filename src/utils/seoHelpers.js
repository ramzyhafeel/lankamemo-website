import { site } from "../data/site";

export function buildCanonical(path) {
  const base = (site.domain || "").replace(/\/$/, "");
  return base ? `${base}${path}` : path; // fallback in dev
}

export function destinationSeo(destination) {
  const title = `${destination.title} | Destinations | Lanka Memo Holidays`;
  const description = destination.summary || `Explore ${destination.title} with Lanka Memo Holidays.`;
  const canonical = buildCanonical(`/destinations/${destination.slug}`);

  return {
    title,
    description,
    canonical,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        name: destination.title,
        description,
        url: canonical,
      },
    ],
  };
}

export function packageSeo(pkg) {
  const title = `${pkg.title} | Tour Packages | Lanka Memo Holidays`;
  const description =
    pkg.highlights?.[0]
      ? `${pkg.duration} • ${pkg.price} • ${pkg.highlights[0]}`
      : `${pkg.duration} tour package with Lanka Memo Holidays.`;
  const canonical = buildCanonical(`/packages/${pkg.slug}`);

  return {
    title,
    description,
    canonical,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: pkg.title,
        description,
        url: canonical,
      },
    ],
  };
}