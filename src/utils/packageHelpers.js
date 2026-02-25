export function packageSeo(pkg) {
  const title = `${pkg.title} | Tour Packages | Lanka Memo Holidays`;
  const description =
    pkg.highlights?.[0]
      ? `${pkg.duration} • ${pkg.price} • ${pkg.highlights[0]}`
      : `${pkg.duration} tour package with Lanka Memo Holidays.`;
  const canonical = buildCanonical(`/packages/${pkg.slug}`);
  return { title, description, canonical };
}