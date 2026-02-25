import Container from "../layout/Container";
import {
  Sparkles,
  PawPrint,
  Landmark,
  Mountain,
  HandHeart,
  Route,
} from "lucide-react";
import { whySriLanka } from "../../data/whySriLanka";

const iconMap = {
  sparkles: Sparkles,
  paw: PawPrint,
  landmark: Landmark,
  mountain: Mountain,
  "heart-handshake": HandHeart,
  route: Route,
};

export default function WhySriLanka() {
  return (
    <section className="py-16" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)" }}>
      <Container>
        <div className="max-w-2xl">
          <div className="h-gold text-sm font-semibold tracking-[0.22em] uppercase">
            Why Sri Lanka
          </div>
          <h2 className="mt-3 text-3xl font-semibold">
            A destination that feels like many countries in one
          </h2>
          <p className="mt-2 text-muted">
            From golden beaches to misty tea hills and iconic wildlife parks — Sri Lanka delivers
            premium experiences in a compact, comfortable journey.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whySriLanka.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <article key={item.title} className="card p-6 transition hover:-translate-y-0.5">
                <div
                  className="grid place-items-center"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: "rgba(15,118,110,0.10)",
                    border: "1px solid rgba(15,118,110,0.18)",
                    color: "var(--accent-2)",
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.text}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}