import { Star } from "lucide-react";

export default function StarRating({ value = 5 }) {
  const full = Math.max(0, Math.min(5, value));
  return (
    <div className="inline-flex items-center gap-1" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          style={{ color: i < full ? "var(--gold)" : "rgba(148,163,184,0.6)" }}
          fill={i < full ? "var(--gold)" : "transparent"}
        />
      ))}
    </div>
  );
}