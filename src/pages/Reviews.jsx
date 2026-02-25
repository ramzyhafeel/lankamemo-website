import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import PageHero from "../components/ui/PageHero";
import StarRating from "../components/ui/StarRating";
import { reviews } from "../data/reviews";
import { site } from "../data/site";

export default function Reviews() {
  return (
    <Layout whatsappMessage="Hi Lanka Memo Holidays! I’d like to check reviews and plan my trip.">
      <PageHero
        title="Reviews"
        subtitle="What our travelers say — real feedback from guests worldwide."
        image="/images/hero.jpg"
      />

      <Container className="py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="h-gold text-sm font-semibold tracking-[0.22em] uppercase">
              Traveler Feedback
            </div>
            <h2 className="mt-3 text-3xl font-semibold">Rated 4.9 ★★★★★</h2>
            <p className="mt-2 text-muted">
              Premium service, safe travel, and smooth planning — designed for trust.
            </p>

            <div className="mt-4 inline-flex items-center gap-3">
              <div className="text-2xl font-semibold">4.9</div>
              <StarRating value={5} />
              <div className="text-sm text-muted">Average rating</div>
            </div>
          </div>

          <a
            href={site.tripAdvisorUrl}
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
            View all reviews on TripAdvisor
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <article key={`${r.name}-${r.date}`} className="card p-6">
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
    </Layout>
  );
}