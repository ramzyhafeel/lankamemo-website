import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import PageHero from "../components/ui/PageHero";
import { packages } from "../data/packages";
import { ArrowRight, Clock, BadgeDollarSign, Check } from "lucide-react";

export default function Packages() {
  const nav = useNavigate();

  return (
    <Layout whatsappMessage="Hi Lanka Memo Holidays! I want to explore tour packages.">
      <PageHero
        title="Packages"
        subtitle="Handcrafted Sri Lanka tour packages — flexible itineraries, private travel, premium support."
        image="/images/hero.jpg"
      />

      <Container className="py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <article key={p.slug} className="card overflow-hidden transition hover:-translate-y-0.5">
              <div className="relative h-44 w-full bg-slate-100">
                <img
                  src={p.heroImage}
                  alt={`${p.title} tour package`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span
                    className="px-3 py-1.5 text-xs font-medium inline-flex items-center gap-2"
                    style={{
                      borderRadius: 999,
                      background: "rgba(0,0,0,0.55)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.18)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <Clock size={14} /> {p.duration}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>

                <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
                  <BadgeDollarSign size={18} style={{ color: "var(--accent)" }} />
                  <span>{p.price}</span>
                </div>

                <ul className="mt-4 space-y-2">
                  {p.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-muted">
                      <Check size={16} style={{ color: "var(--accent)" }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => nav(`/packages/${p.slug}`)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition"
                  style={{ color: "var(--accent-2)" }}
                  aria-label={`View details for ${p.title}`}
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Layout>
  );
}