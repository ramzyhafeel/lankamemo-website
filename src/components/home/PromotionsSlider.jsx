import { useMemo, useRef } from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Container from "../layout/Container";
import { promotions } from "../../data/promotions";
import { site } from "../../data/site";

export default function PromotionsSlider() {
  const scrollerRef = useRef(null);

  const items = useMemo(() => promotions, []);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 16 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const waLink = (prefill) =>
    `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(prefill)}`;

  return (
    <section id="ongoing-promotions" className="py-16">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">On Going Promotions</h2>
            <p className="mt-2 text-muted">
              Limited-time offers crafted for unforgettable Sri Lanka experiences.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="grid place-items-center transition hover:-translate-y-0.5"
              aria-label="Previous promotions"
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "1px solid var(--border)",
                background: "white",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="grid place-items-center transition hover:-translate-y-0.5"
              aria-label="Next promotions"
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "1px solid var(--border)",
                background: "white",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-8 flex gap-4 overflow-x-auto pb-2"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {items.map((p) => (
            <article
              key={p.id}
              data-card
              className="card shrink-0 overflow-hidden"
              style={{
                width: "min(420px, 88vw)",
                scrollSnapAlign: "start",
              }}
            >
              <div className="relative h-56 w-full bg-slate-100">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div
                  className="absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium"
                  style={{
                    borderRadius: 999,
                    background: "rgba(0,0,0,0.55)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <Clock size={14} />
                  {p.tag}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {p.blurb}
                </p>

                <div className="mt-5">
                  {p.href ? (
                    <a
                      href={waLink(p.whatsappPrefill || `Hi! I’m interested in: ${p.title}`)}
                      className="btn px-5 py-2.5 text-sm"
                      style={{
                        background: "var(--accent)",
                        color: "white",
                      }}
                    >
                      {p.ctaLabel}
                    </a>
                  ) : (
                    <a
                      href={waLink(p.whatsappPrefill || `Hi! I’m interested in: ${p.title}`)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn px-5 py-2.5 text-sm"
                      style={{
                        background: "var(--accent)",
                        color: "white",
                      }}
                    >
                      {p.ctaLabel}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </Container>
    </section>
  );
}