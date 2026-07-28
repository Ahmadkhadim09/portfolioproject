import { Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06]">
      {/* Gradient top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-4">
        <RevealOnScroll className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-btn text-white shadow-lg shadow-purple-500/20 overflow-hidden">
              <img src="/images/mainlogo.png" alt="Owais Ahmad Khan Logo" className="h-full w-full object-contain" />
            </span>
            <span className="font-display text-lg font-bold text-white">Owais Ahmad Khan</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
            CTO of Zai Systems. Visionary leader, innovative tech entrepreneur, and empowering IT coach.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h4 className="font-display text-sm font-semibold text-white/80">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/40">
            <li><Link to="/about" className="transition-colors hover:text-white">About</Link></li>
            <li><Link to="/gallery" className="transition-colors hover:text-white">Gallery</Link></li>
            <li><Link to="/podcast" className="transition-colors hover:text-white">Podcast</Link></li>
            <li><Link to="/awards" className="transition-colors hover:text-white">Awards</Link></li>
          </ul>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <h4 className="font-display text-sm font-semibold text-white/80">Connect</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/40">
            <li><Link to="/services" className="transition-colors hover:text-white">Services</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-white">Contact</Link></li>
          </ul>
        </RevealOnScroll>
      </div>
      <div className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Owais Ahmad Khan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
