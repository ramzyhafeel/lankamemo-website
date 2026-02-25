import Container from "../layout/Container";
import { useNavigate } from "react-router-dom";
import { gallery } from "../../data/gallery";

export default function GalleryPreview() {
  const nav = useNavigate();

  return (
    <section className="py-16" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}>
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="h-gold text-sm font-semibold tracking-[0.22em] uppercase">
              Gallery
            </div>
            <h2 className="mt-3 text-3xl font-semibold">Traveler Moments</h2>
            <p className="mt-2 text-muted">
              Real experiences across Sri Lanka — beaches, tea hills, culture, and wildlife.
            </p>
          </div>

          <button
            type="button"
            onClick={() => nav("/gallery")}
            className="btn px-6 py-3 text-sm"
            style={{ background: "var(--accent)", color: "white" }}
          >
            View Gallery
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.slice(0, 6).map((g, idx) => (
            <figure key={idx} className="card overflow-hidden">
              <div className="h-56 w-full bg-slate-100">
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

        <div className="mt-4 text-xs text-muted">
          Tip: Add images <span className="font-medium">public/images/gal-1.jpg</span> … <span className="font-medium">gal-6.jpg</span>
        </div>
      </Container>
    </section>
  );
}