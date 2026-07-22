import { Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Terminal className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">Owais Ahmad Khan</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            CEO &amp; Founder of Zai Systems. Visionary leader, innovative tech entrepreneur, and empowering IT coach.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/podcast" className="hover:text-foreground">Podcast</Link></li>
            <li><Link to="/awards" className="hover:text-foreground">Awards</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground">Connect</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/broadcast" className="hover:text-foreground">Broadcast channels</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Owais Ahmad Khan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
