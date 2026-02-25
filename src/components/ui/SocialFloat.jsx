import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, Facebook, X } from "lucide-react";
import { site } from "../../data/site";
import { FaWhatsapp } from "react-icons/fa";


function useOutsideClick(ref, onOutside) {
  useEffect(() => {
    function handle(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [ref, onOutside]);
}

export default function SocialFloat({
  whatsappMessage = "Hi! I’d like to plan a Sri Lanka trip.",
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useOutsideClick(wrapRef, () => setOpen(false));

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const socialLinks = [
    {
      name: "WhatsApp",
      url: waHref,
      icon: <FaWhatsapp size={20} />,
      style: {
        background: "#25D366",
        color: "white",
      },
    },
    {
      name: "Instagram",
      url: site.instagramUrl,
      icon: <Instagram size={20} />,
      style: {
        background:
          "linear-gradient(135deg, #833AB4 0%, #FD1D1D 45%, #F77737 100%)",
        color: "white",
      },
    },
    {
      name: "Facebook",
      url: site.facebookUrl,
      icon: <Facebook size={20} />,
      style: {
        background: "#1877F2",
        color: "white",
      },
    },
  ];

  return (
    <div ref={wrapRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Links panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3 mb-3"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.name}
                title={link.name}
                initial={{ opacity: 0, y: 18, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.6 }}
                transition={{
                  duration: 0.28,
                  delay: (socialLinks.length - 1 - index) * 0.08,
                }}
                whileHover={{ scale: 1.12 }}
                className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow duration-300"
                style={link.style}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button + pulse ring */}
      <div className="relative">
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
            animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        )}

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 w-14 h-14 rounded-full shadow-xl flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            background: "var(--accent)",
            color: "white",
          }}
          aria-label={open ? "Close social menu" : "Open social menu"}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                <MessageCircle size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}