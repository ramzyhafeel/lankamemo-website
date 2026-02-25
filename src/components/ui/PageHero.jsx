import Container from "../layout/Container";

export default function PageHero({ title, subtitle, image = "/images/hero.jpg" }) {
  return (
    <section className="relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 100%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative py-16">
        <div className="max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl font-semibold">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-white/75 leading-relaxed">{subtitle}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}