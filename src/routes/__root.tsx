import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { SiWhatsapp } from "react-icons/si";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full gradient-btn gradient-btn-hover px-6 py-2.5 text-sm font-medium text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full gradient-btn gradient-btn-hover px-5 py-2.5 text-sm font-medium text-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-white/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Owais Ahmad Khan — Visionary Leader & Tech Entrepreneur" },
      { name: "description", content: "Portfolio of Owais Ahmad Khan — CEO of Zai Systems, IT coach, speaker and podcast host." },
      { name: "author", content: "Owais Ahmad Khan" },
      { property: "og:title", content: "Owais Ahmad Khan — Visionary Leader & Tech Entrepreneur" },
      { property: "og:description", content: "Portfolio, podcast, awards and broadcast channels of Owais Ahmad Khan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [hoveredWhatsApp, setHoveredWhatsApp] = useState(false);

  const currentPath = router.state.location.pathname;

  const isWeddingRoute = currentPath === "/barat" || currentPath === "/walima";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        {/* Animated Background Orbs */}
        <div className="bg-orb bg-orb-1" aria-hidden="true" />
        <div className="bg-orb bg-orb-2" aria-hidden="true" />
        <div className="bg-orb bg-orb-3" aria-hidden="true" />

        {!isWeddingRoute && <SiteHeader />}
        <AnimatePresence mode="wait">
          <motion.main
            key={currentPath}
            className="relative z-10 flex-1"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        {!isWeddingRoute && <SiteFooter />}
        <a
          href="https://wa.me/03224221287"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="fixed bottom-4 right-4 z-[60] flex items-center justify-center rounded-full transition-transform duration-300 sm:bottom-6 sm:right-6"
          onMouseEnter={() => setHoveredWhatsApp(true)}
          onMouseLeave={() => setHoveredWhatsApp(false)}
          style={{
            height: 72,
            width: 72,
            background: 'rgba(37, 211, 102, 0.12)',
            boxShadow: hoveredWhatsApp ? '0 16px 40px rgba(37, 211, 102, 0.25)' : '0 8px 20px rgba(0,0,0,0.12)',
            transform: hoveredWhatsApp ? 'scale(1.08) rotate(5deg)' : undefined,
          }}
        >
          <SiWhatsapp className="h-[26px] w-[26px]" style={{ color: '#25D366' }} />
        </a>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
