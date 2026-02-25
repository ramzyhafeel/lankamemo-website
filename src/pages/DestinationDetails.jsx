import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import PageHero from "../components/ui/PageHero";
import { destinations } from "../data/destinations";
import { site } from "../data/site";
import Seo from "../components/seo/Seo";
import { destinationSeo } from "../utils/seoHelpers";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function DestinationDetails() {
  const { slug } = useParams();
  const nav = useNavigate();

  const destination = useMemo(
    () => destinations.find((d) => d.slug === slug),
    [slug]
  );

  if (!destination) {
    return (
      <Layout whatsappMessage="Hi Lanka Memo Holidays! I want to ask about destinations.">
        <Container className="py-16">
          <p className="text-muted">Destination not found.</p>
          <button
            className="mt-4 btn px-6 py-3 text-sm"
            style={{ background: "var(--accent)", color: "white" }}
            onClick={() => nav("/destinations")}
          >
            Back to Destinations
          </button>
        </Container>
      </Layout>
    );
  }

  const seoOverride = destinationSeo(destination);
  const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hi Lanka Memo Holidays! I’m interested in visiting ${destination.title}. Can you suggest a tour/package?`
  )}`;

  return (
    <>
      {/* Dynamic SEO for this destination */}
      <Seo path="/destinations" override={seoOverride} />

      <Layout whatsappMessage={`Hi Lanka Memo Holidays! I’m interested in ${destination.title}.`}>
        <PageHero
          title={destination.title}
          subtitle={destination.summary}
          image={destination.heroImage}
        />

        <Container className="py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--accent-2)" }}
              >
                <ArrowLeft size={16} /> Back to Destinations
              </Link>

              <div className="mt-4 inline-flex items-center gap-2">
                {/* <span
                  className="px-3 py-1.5 text-xs font-medium"
                  style={{
                    borderRadius: 999,
                    background: "rgba(15,118,110,0.10)",
                    border: "1px solid rgba(15,118,110,0.18)",
                    color: "var(--accent-2)",
                  }}
                >
                  {destination.category}
                </span> */}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => nav("/packages")}
                className="btn px-6 py-3 text-sm"
                style={{ background: "var(--accent)", color: "white" }}
              >
                Explore Packages
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="btn px-6 py-3 text-sm"
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-soft)",
                  color: "var(--text)",
                }}
              >
                WhatsApp about this Destination
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold">About {destination.title}</h2>

              <div className="mt-4 space-y-4 text-sm text-muted leading-relaxed">
                {destination.description.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <aside className="card p-6 h-fit">
              <h3 className="text-lg font-semibold">Highlights</h3>
              <ul className="mt-4 space-y-3">
                {destination.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={18} style={{ color: "var(--accent)" }} />
                    <span className="text-muted">{h}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Layout>
    </>
  );
}