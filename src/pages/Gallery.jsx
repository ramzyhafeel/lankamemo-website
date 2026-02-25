import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";
import PageHero from "../components/ui/PageHero";
import { gallery } from "../data/gallery";

export default function Gallery() {
  return (
    <Layout whatsappMessage="Hi Lanka Memo Holidays! I’d like to see more traveler photos and tour highlights.">
      <PageHero
        title="Gallery"
        subtitle="Traveler moments and highlights from tours across Sri Lanka."
        image="/images/hero.jpg"
      />

      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g, idx) => (
            <figure key={idx} className="card overflow-hidden">
              <div className="h-64 w-full bg-slate-100">
                <img
                  src={g.image}
                  alt={g.caption}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <figcaption className="p-4 text-sm text-muted">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Layout>
  );
}