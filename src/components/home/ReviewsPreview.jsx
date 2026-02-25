import Container from "../layout/Container";
import StarRating from "../ui/StarRating";
import { reviews } from "../../data/reviews";
import { site } from "../../data/site";
import { useNavigate } from "react-router-dom";

export default function ReviewsPreview() {
  const nav = useNavigate();

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="h-gold text-sm font-semibold tracking-[0.22em] uppercase">
              Reviews
            </div>
            <h2 className="mt-3 text-3xl font-semibold">What Our Travelers Say</h2>
            <p className="mt-2 text-muted">
              Trusted by guests worldwide — premium service, safe travel, and smooth planning.
            </p>

            <div className="mt-4 inline-flex items-center gap-3">
              <div className="text-2xl font-semibold">4.9</div>
              <StarRating value={5} />
              <div className="text-sm text-muted">Average rating</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={site.tripAdvisorUrl}
              target="_blank"
              rel="noreferrer"
              className="btn px-5 py-3 text-sm"
              style={{
                borderRadius: 999,
                background: "white",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-soft)",
                color: "var(--text)",
              }}
              aria-label="Open TripAdvisor reviews in new tab"
            >
              TripAdvisor Badge
            </a>

            <button
              type="button"
              onClick={() => nav("/reviews")}
              className="btn px-6 py-3 text-sm"
              style={{ background: "var(--accent)", color: "white" }}
            >
              View All Reviews
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <article key={r.name} className="card p-6">
              <StarRating value={r.rating} />
              <p className="mt-4 text-sm text-muted leading-relaxed">“{r.text}”</p>
              <div className="mt-5 font-semibold">{r.name}</div>
              <div className="text-sm text-muted">
                {r.country} • {r.date}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}