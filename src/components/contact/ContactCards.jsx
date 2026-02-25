import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { site } from "../../data/site";

export default function ContactCards() {
  const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    "Hi Lanka Memo Holidays! I’d like to plan my Sri Lanka trip."
  )}`;

  const cards = [
    {
      icon: Phone,
      title: "Phone",
      text: "+94 77 123 4567",
      hint: "Call us for quick info",
    },
    {
      icon: Mail,
      title: "Email",
      text: "hello@yourdomain.lk",
      hint: "We reply within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      text: "Sri Lanka",
      hint: "Serving travelers nationwide",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      text: "Chat instantly",
      hint: "Fast support on WhatsApp",
      href: waHref,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((c) => {
        const Icon = c.icon;
        const cardInner = (
          <div className="card p-6 transition hover:-translate-y-0.5">
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
              aria-hidden="true"
            >
              <Icon size={22} />
            </div>
            <div className="mt-4 font-semibold">{c.title}</div>
            <div className="mt-1 text-sm text-muted">{c.text}</div>
            <div className="mt-2 text-xs text-muted">{c.hint}</div>
          </div>
        );

        if (c.href) {
          return (
            <a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="block"
              aria-label={`Open ${c.title}`}
            >
              {cardInner}
            </a>
          );
        }

        return <div key={c.title}>{cardInner}</div>;
      })}
    </div>
  );
}