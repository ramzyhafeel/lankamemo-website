import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../../utils/cn";
import Container from "./Container";
import Logo from "../../assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Packages", to: "/packages" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // show at top
        if (currentY <= 60) {
          setVisible(true);
        } else if (currentY > lastScrollY.current + 4) {
          // scrolling down => hide
          setVisible(false);
          setMobileOpen(false);
        } else if (currentY < lastScrollY.current - 4) {
          // scrolling up => show
          setVisible(true);
        }

        lastScrollY.current = currentY;

        // background fade in after small scroll
        setIsScrolled(currentY > 20);

        ticking.current = false;
      });
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.header
      className={cn("fixed left-0 right-0 top-0 z-50")}
      animate={{ y: visible ? 0 : "-110%" }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Navbar bar */}
      <div
        className={cn(
          "transition-all duration-300",
          // top: transparent
          !isScrolled && "bg-transparent",
          // scrolled: fade in background + blur + border
          isScrolled && "backdrop-blur-lg"
        )}
        style={
          isScrolled
            ? {
                background: "color-mix(in srgb, var(--nav) 88%, transparent)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
              }
            : {
                background: "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.00)",
              }
        }
      >
        <Container className="h-16 md:h-20 flex items-center justify-between">
          {/* Brand */}
          <NavLink to="/" className="flex items-center" onClick={closeMobile}>
            <img src={Logo} 
              alt="Lanka Memo Holidays Logo" 
              className="h-14 w-auto object-contain"
              />

            <div className="leading-tight">
              <div className="text-white font-semibold tracking-wide">
                Lanka Memo
              </div>
              <div
                className="text-xs tracking-[0.22em] uppercase"
                style={{ color: "rgba(255,255,255,0.60)" }}
              >
                Holidays
              </div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 text-sm font-medium transition",
                    "rounded-full",
                    isActive ? "text-white" : "text-white/75 hover:text-white"
                  )
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        background: "rgba(15,118,110,0.35)",
                        border: "1px solid rgba(255,255,255,0.16)",
                      }
                    : { border: "1px solid rgba(255,255,255,0.00)" }
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile right corner */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                "inline-flex items-center justify-center",
                "h-10 w-10 rounded-xl",
                "transition"
              )}
              style={{
                background: isScrolled
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "white",
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden"
              style={{
                background: "var(--nav)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Container className="py-3">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      onClick={closeMobile}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-xl px-4 py-3 text-sm font-semibold transition",
                          isActive ? "text-white" : "text-white/80 hover:text-white"
                        )
                      }
                      style={({ isActive }) =>
                        isActive
                          ? {
                              background: "rgba(15,118,110,0.35)",
                              border: "1px solid rgba(255,255,255,0.16)",
                            }
                          : {
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}