import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import PageHero from "../components/ui/PageHero";
import { whyChooseUs } from "../data/whyChooseUs";
import { team } from "../data/team";

function InitialAvatar({ name }) {
  const initial = (name || "?").trim()[0]?.toUpperCase() || "?";
  return (
    <div
      className="grid place-items-center font-semibold"
      style={{
        width: 54,
        height: 54,
        borderRadius: 999,
        background: "rgba(15,118,110,0.12)",
        border: "1px solid rgba(15,118,110,0.18)",
        color: "var(--accent-2)",
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

function TeamAvatar({ name, image }) {
  if (!image) return <InitialAvatar name={name} />;

  return (
    <img
      src={image}
      alt={name}
      width={54}
      height={54}
      className="rounded-full object-cover"
      style={{
        width: 54,
        height: 54,
        border: "1px solid rgba(15,118,110,0.18)",
        background: "rgba(15,118,110,0.06)",
      }}
      loading="lazy"
    />
  );
}

export default function About() {
  return (
    <Layout whatsappMessage="Hi Lanka Memo Holidays! I’d like to know more about your company and services.">
      <PageHero
        title="About Us"
        subtitle="Your trusted partner in Sri Lanka tourism."
        image="/images/hero.jpg"
      />

      <Container className="py-14">
        {/* Our Story */}
        <section>
          <div className="h-gold text-sm font-semibold tracking-[0.22em] uppercase">
            Our Story
          </div>
          <h2 className="mt-3 text-3xl font-semibold">
            Built on trust, comfort, and unforgettable journeys
          </h2>

          <div className="mt-4 max-w-3xl space-y-4 text-sm text-muted leading-relaxed">
            <p>
              Lanka Memo Holidays is a Sri Lankan travel company focused on premium service and
              reliable trip planning. We help travelers explore Sri Lanka with comfort, safety,
              and confidence.
            </p>
            <p>
              From cultural heritage sites to hill country escapes and wildlife safaris, our tours
              are designed with flexible itineraries and thoughtful support. We work with trusted
              partners to ensure a smooth experience from airport pickup to the final day.
            </p>
            <p>
              Whether you’re visiting as a couple, family, or a small group — we’ll tailor the trip
              to your pace and interests.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-14">
          <div className="h-gold text-sm font-semibold tracking-[0.22em] uppercase">
            Why Choose Us
          </div>
          <h2 className="mt-3 text-3xl font-semibold">Premium, reliable, and flexible</h2>
          <p className="mt-2 text-muted max-w-2xl">
            We focus on trust and quality — from planning and transport to local guidance.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((c) => (
              <article key={c.title} className="card p-6 transition hover:-translate-y-0.5">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{c.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Our Team */}
        <section className="mt-14">
          <div className="h-gold text-sm font-semibold tracking-[0.22em] uppercase">
            Our Team
          </div>
          <h2 className="mt-3 text-3xl font-semibold">People behind your journey</h2>
          <p className="mt-2 text-muted max-w-2xl">
            A small, dedicated team focused on guest care, comfort, and professional service.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <article key={m.name} className="card p-6">
                <TeamAvatar name={m.name} image={m.image} />
                <div className="mt-4 font-semibold">{m.name}</div>
                <div className="text-sm text-muted">{m.role}</div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </Layout>
  );
}