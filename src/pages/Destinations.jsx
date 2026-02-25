import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import PageHero from "../components/ui/PageHero";
import Chip from "../components/ui/Chip";
import { Search, ArrowRight } from "lucide-react";
import { destinationCategories, destinations } from "../data/destinations";

export default function Destinations() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((d) => {
      const matchCategory = category === "All" ? true : d.category === category;
      const matchQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [query, category]);

  return (
    <Layout whatsappMessage="Hi Lanka Memo Holidays! I want to explore destinations in Sri Lanka.">
      <PageHero
        title="Destinations"
        subtitle="Discover Sri Lanka’s best places — beaches, culture, hill country, and wildlife hotspots."
        image="/images/hero.jpg"
      />

      <Container className="py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Explore by interest</h2>
            <p className="mt-2 text-muted">
              Search destinations and filter by category.
            </p>
          </div>

          <div className="w-full md:w-105">
            <label className="sr-only" htmlFor="destinations-search">
              Search destinations
            </label>
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                borderRadius: 999,
                border: "1px solid var(--border)",
                background: "white",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <Search size={18} style={{ color: "var(--muted)" }} />
              <input
                id="destinations-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {destinationCategories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <article key={d.slug} className="card overflow-hidden transition hover:-translate-y-0.5">
              <div className="relative h-48 w-full bg-slate-100">
                <img
                  src={d.heroImage}
                  alt={`${d.title} destination in Sri Lanka`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div
                  className="absolute left-4 top-4 px-3 py-1.5 text-xs font-medium"
                  style={{
                    borderRadius: 999,
                    background: "rgba(0,0,0,0.55)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {d.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{d.summary}</p>

                <button
                  type="button"
                  onClick={() => nav(`/destinations/${d.slug}`)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium transition"
                  style={{ color: "var(--accent-2)" }}
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 text-sm text-muted">
            No destinations found. Try a different search or category.
          </div>
        ) : null}
      </Container>
    </Layout>
  );
}