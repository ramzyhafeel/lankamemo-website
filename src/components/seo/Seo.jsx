import { useEffect } from "react";
import { seo } from "../../data/seo";

function setMeta(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setPropertyMeta(property, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  if (!href) return;
  let link = document.querySelector(`link[rel="canonical"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function setJsonLd(id, json) {
  const existing = document.getElementById(id);
  if (!json || (Array.isArray(json) && json.length === 0)) {
    if (existing) existing.remove();
    return;
  }
  const script = existing || document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.text = JSON.stringify(json);
  if (!existing) document.head.appendChild(script);
}

export default function Seo({ path, override }) {
  useEffect(() => {
    const base = seo.routes[path] || seo.default;

    const title = override?.title || base.title || seo.default.title;
    const description = override?.description || base.description || seo.default.description;
    const canonical = override?.canonical || base.canonical || seo.default.canonical;

    document.title = title;
    setMeta("description", description);
    setCanonical(canonical);

    const ogImage = seo.default.ogImage;
    setPropertyMeta("og:type", "website");
    setPropertyMeta("og:title", title);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:url", canonical);
    setPropertyMeta("og:image", ogImage);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // JSON-LD:
    // - default provides Organization + WebSite
    // - dynamic pages can override with override.jsonLd
    const jsonLd = override?.jsonLd || base.jsonLd || seo.default.jsonLd;
    setJsonLd("jsonld-route", jsonLd);
  }, [
    path,
    override?.title,
    override?.description,
    override?.canonical,
    override?.jsonLd,
  ]);

  return null;
}