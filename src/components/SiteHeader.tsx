import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/podcast", label: "Podcast" },
  { to: "/awards", label: "Awards" },
  { to: "/certificates", label: "Certificates" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[#403056] bg-transparent backdrop-blur-[20px]"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-4 group">
          <span className="flex w-[56px] h-[56px] items-center justify-center rounded-full bg-white/[0.06] border border-white/10 p-[8px] transition-transform group-hover:scale-105 overflow-hidden">
            <img src="/images/mainonelogo.webp" alt="ZAI Systems Logo" className="w-[52px] h-[52px] object-contain" />
          </span>
          <span className="font-display text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Owais Ahmad Khan</span>
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
              activeProps={{ className: "text-white bg-white/[0.06]" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          className="hidden lg:inline-flex"
        >
          <Link
            to="/contact"
            className="rounded-full gradient-btn gradient-btn-hover px-5 py-2.5 text-sm font-semibold text-white"
          >
            Book a Call
          </Link>
        </motion.div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-[#403056] lg:hidden bg-[#0D0714]/80 backdrop-blur-[20px]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <nav className="mx-auto flex max-w-7xl flex-col p-4">
              {nav.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors block"
                    activeProps={{ className: "bg-white/[0.06] text-white" }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: nav.length * 0.05, duration: 0.3 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full gradient-btn px-5 py-2.5 text-center text-sm font-semibold text-white block"
                >
                  Book a Call
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
