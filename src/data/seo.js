import { site } from "./site";

const ogImage = site.domain + "/og-image.png";

export const seo = {
  default: {
    title: `${site.brand} | Sri Lanka Tours & Travel Packages`,
    description:
      "Trusted Sri Lanka tours with custom itineraries, private transport, and premium travel support.",
    canonical: site.domain + "/",
    ogImage,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.brand,
        url: site.domain,
        logo: ogImage,
        sameAs: [site.facebookUrl, site.instagramUrl].filter(Boolean),
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.brand,
        url: site.domain,
        potentialAction: {
          "@type": "SearchAction",
          target: `${site.domain}/destinations?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  },

  routes: {
    "/": {
      title: `${site.brand} | Sri Lanka Tours & Travel Packages`,
      description:
        "Explore Sri Lanka with a trusted tour operator. Private tours, custom itineraries, and premium travel experiences.",
      canonical: site.domain + "/",
    },
    "/destinations": {
      title: `Destinations in Sri Lanka | ${site.brand}`,
      description:
        "Discover Sri Lanka’s best destinations — beaches, culture, hill country, and wildlife hotspots.",
      canonical: site.domain + "/destinations",
    },
    "/packages": {
      title: `Tour Packages | ${site.brand}`,
      description:
        "Handcrafted Sri Lanka tour packages with flexible itineraries, private travel, and premium support.",
      canonical: site.domain + "/packages",
    },
    "/gallery": {
      title: `Gallery | ${site.brand}`,
      description: "Real traveler moments and highlights from tours across Sri Lanka.",
      canonical: site.domain + "/gallery",
    },
    "/reviews": {
      title: `Reviews | ${site.brand}`,
      description: "What our travelers say — real feedback from guests worldwide.",
      canonical: site.domain + "/reviews",
    },
    "/about": {
      title: `About Us | ${site.brand}`,
      description:
        "Your trusted partner in Sri Lanka tourism. Reliable planning, comfortable transport, and great local expertise.",
      canonical: site.domain + "/about",
    },
    "/contact": {
      title: `Contact Us | ${site.brand}`,
      description:
        "Contact Lanka Memo Holidays to plan your Sri Lanka trip. WhatsApp us or send a message via our contact form.",
      canonical: site.domain + "/contact",
    },
  },
};