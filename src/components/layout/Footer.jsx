import Container from "./Container";
import { site } from "../../data/site";
import { Facebook, Instagram } from "lucide-react";
import logo from "../../assets/logo.png";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="mt-20 border-t"
      style={{ borderColor: "var(--border)", background: "var(--nav)" }}
    >
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand + description */}
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt={`${site.brand} logo`}
                className="h-10 w-auto object-contain"
              />

              <div className="leading-tight">
                <div
                  className="font-semibold tracking-wide"
                  style={{ color: "var(--green)" }}
                >
                  Lanka Memo
                </div>
                <div
                  className="text-xs tracking-[0.22em] uppercase"
                  style={{ color: "var(--yellow)" }}
                >
                  Holidays
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted leading-relaxed">
              Trusted Sri Lanka tours with custom itineraries, local expertise,
              and premium travel support — crafted for unforgettable journeys
              across the island.
            </p>

            {/* Social icons */}
            <div className="mt-4 flex items-center gap-3">
              <Social href="https://wa.me/+94767462929" label="WhatsApp">
                <FaWhatsapp size={18} />
              </Social>
              <Social href="https://instagram.com/" label="Instagram">
                <Instagram size={18} />
              </Social>
              <Social href="https://facebook.com/" label="Facebook">
                <Facebook size={18} />
              </Social>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-12 text-sm">
            <div>
              <div className="font-semibold text-white">Company</div>
              <ul className="mt-3 space-y-2 text-muted">
                <li className="hover:text-white transition">About Us</li>
                <li className="hover:text-white transition">Reviews</li>
                <li className="hover:text-white transition">Gallery</li>
                <li className="hover:text-white transition">Destinations</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white">Contact</div>
              <ul className="mt-3 space-y-2 text-muted">
                <li>WhatsApp: +94 76 746 2929</li>
                <li>Email: hello@yourdomain.lk</li>
                <li>Sri Lanka</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="mt-12 flex flex-col gap-3 border-t pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </div>

          <div>
            Government registered tour operator • Premium private tours • Custom
            Sri Lanka itineraries
          </div>

          {/* Developer credit */}
          <div className="text-[11px] opacity-70">
            Designed & Developed by{" "}
            <a
              href="https://ramzyhafeel.me"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition"
              title="Mohamed Ramzy - Full Stack Developer Portfolio"
            >
              Mohamed Ramzy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="h-9 w-9 rounded-xl grid place-items-center transition hover:scale-105"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "white",
      }}
    >
      {children}
    </a>
  );
}