import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import PageHero from "../components/ui/PageHero";
import Accordion from "../components/ui/Accordion";
import Seo from "../components/seo/Seo";
import { packages } from "../data/packages";
import { site } from "../data/site";
import { packageSeo } from "../utils/seoHelpers";
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";

export default function PackageDetails() {
  const { slug } = useParams();
  const nav = useNavigate();

  const pkg = useMemo(() => packages.find((p) => p.slug === slug), [slug]);

  if (!pkg) {
    return (
      <Layout whatsappMessage="Hi Lanka Memo Holidays! I want to ask about tour packages.">
        <Container className="py-16">
          <p className="text-muted">Package not found.</p>
          <button
            className="mt-4 btn px-6 py-3 text-sm"
            style={{ background: "var(--accent)", color: "white" }}
            onClick={() => nav("/packages")}
          >
            Back to Packages
          </button>
        </Container>
      </Layout>
    );
  }

  const seoOverride = packageSeo(pkg);
  const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hi Lanka Memo Holidays! I want to book the package: ${pkg.title} (${pkg.duration}). Please share availability and next steps.`
  )}`;

  const itineraryItems = pkg.itinerary.map((d) => ({
    q: `${d.day} — ${d.title}`,
    a: d.details,
  }));

  return (
    <>
      <Seo path="/packages" override={seoOverride} />

      <Layout whatsappMessage={`Hi Lanka Memo Holidays! I’m interested in the package ${pkg.title}.`}>
        <PageHero title={pkg.title} subtitle={`${pkg.duration}`} image={pkg.heroImage} />

        <Container className="py-14">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--accent-2)" }}
          >
            <ArrowLeft size={16} /> Back to Packages
          </Link>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="px-4 py-2 text-sm font-medium inline-flex items-center gap-2"
                style={{
                  borderRadius: 999,
                  background: "rgba(15,118,110,0.10)",
                  border: "1px solid rgba(15,118,110,0.18)",
                  color: "var(--accent-2)",
                }}
              >
                <Clock size={16} /> {pkg.duration}
              </span>

            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="btn px-7 py-3 text-sm"
              style={{ background: "var(--accent)", color: "white" }}
            >
              Book This Package via WhatsApp
            </a>
          </div>

          {/* Highlights */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 card p-6">
              <h2 className="text-xl font-semibold">Package Highlights</h2>
              <ul className="mt-4 space-y-3">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={18} style={{ color: "var(--accent)" }} />
                    <span className="text-muted">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold">Quick Booking</h3>
              <p className="mt-2 text-sm text-muted">
                Message us with your travel dates and number of travelers. We’ll respond quickly.
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 btn w-full px-6 py-3 text-sm"
                style={{ background: "var(--accent)", color: "white" }}
              >
                WhatsApp Now
              </a>
            </div>
          </div>

          {/* Itinerary accordion */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold">Day-by-day Itinerary</h2>
            <p className="mt-2 text-muted">
              A clear outline of the journey — we can customize this to match your pace.
            </p>
            <div className="mt-6 max-w-4xl">
              <Accordion items={itineraryItems} />
            </div>
          </div>

          {/* Included / Not included */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="card p-6">
              <h3 className="text-xl font-semibold">What’s Included</h3>
              <ul className="mt-4 space-y-3">
                {pkg.included.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={18} style={{ color: "var(--accent)" }} />
                    <span className="text-muted">{it}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold">Not Included</h3>
              <ul className="mt-4 space-y-3">
                {pkg.notIncluded.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm">
                    <XCircle size={18} style={{ color: "rgba(239,68,68,0.9)" }} />
                    <span className="text-muted">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 card p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="h-gold text-sm font-semibold tracking-[0.22em] uppercase">
                  Ready to book?
                </div>
                <div className="mt-2 text-2xl font-semibold">
                  {pkg.title} — {pkg.duration}
                </div>
                <p className="mt-2 text-muted">
                  WhatsApp us your dates and traveler count. We’ll confirm availability and finalize.
                </p>
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="btn px-7 py-3 text-sm"
                style={{ background: "var(--accent)", color: "white" }}
              >
                Book This Package via WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}