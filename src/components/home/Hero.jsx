import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldCheck, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../layout/Container";
import { site } from "../../data/site";

// ✅ Put these images in: /public/images/hero/
// Example:
// public/images/hero/hero1.jpg
// public/images/hero/hero2.jpg
// public/images/hero/hero3.jpg
const posters = [
  "/images/hero/hero.jpg",
  "/images/hero/hero1.jpg",
  "/images/hero/hero2.jpg",
  "/images/hero/hero3.jpg",
];

export default function Hero() {
  const nav = useNavigate();
  const [index, setIndex] = useState(0);

  const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    "Hi Lanka Memo Holidays! I’d like to plan my Sri Lanka holiday."
  )}`;

  const scrollToNext = () => {
    const el = document.getElementById("ongoing-promotions");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ Auto change background every 6 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % posters.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Rotating background with crossfade */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <motion.img
              src={posters[index]}
              alt=""
              className="h-full w-full object-cover"
              // slow premium zoom
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay (dark, premium) */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.60) 55%, rgba(0,0,0,0.72) 100%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 py-16 md:py-20">
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1
              className="text-white font-semibold leading-[0.95]"
              style={{
                fontSize: "clamp(40px, 7vw, 92px)",
                letterSpacing: "0.18em",
              }}
            >
              LANKA MEMO
              <br />
              HOLIDAYS
            </h1>

            {/* Trust badges */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 text-sm"
                style={{
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "white",
                  backdropFilter: "blur(8px)",
                }}
              >
                <ShieldCheck size={18} style={{ color: "var(--accent)" }} />
                <span className="font-medium">Government Registered</span>
              </div>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 text-sm"
                style={{
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "white",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Star size={18} style={{ color: "var(--gold)" }} />
                <span className="font-medium">TripAdvisor Rating</span>
                <span className="text-white/90">4.9 ★★★★★</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => nav("/destinations")}
                className="btn btn-primary px-7 py-3 text-sm"
                style={{ boxShadow: "0 14px 30px rgba(0,0,0,0.25)" }}
              >
                Explore Destinations
              </button>

              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline px-7 py-3 text-sm"
                style={{
                  background: "rgba(0,0,0,0.18)",
                  backdropFilter: "blur(6px)",
                }}
              >
                WhatsApp Us
              </a>
            </div>

            {/* Explore indicator */}
            <motion.button
              type="button"
              onClick={scrollToNext}
              className="mt-10 inline-flex flex-col items-center gap-2 text-white/80 hover:text-white transition"
              aria-label="Explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <span className="text-xs tracking-[0.35em] uppercase">Explore</span>

              <motion.span
                className="grid place-items-center"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(0,0,0,0.18)",
                }}
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown size={18} />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}