import { createFileRoute } from "@tanstack/react-router";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Img } from "@/components/Img";
import { galleryData } from "@/data/galleryData";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Owais Ahmad Khan" },
      { name: "description", content: "A curated gallery of visuals from the Owais Ahmad Khan brand experience." },
      { property: "og:title", content: "Gallery — Owais Ahmad Khan" },
      { property: "og:description", content: "A curated gallery of visuals from the Owais Ahmad Khan brand experience." },
    ],
  }),
  component: ImagesPage,
});

function ImagesPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [brokenImageIndices, setBrokenImageIndices] = useState<Set<number>>(new Set());
  const shouldReduceMotion = useReducedMotion();

  const displayedGalleryData = [...galleryData];
  const gallerySwaps = [
    [0, 18],
    [12, 19],
  ];

  gallerySwaps.forEach(([a, b]) => {
    if (displayedGalleryData.length > b) {
      [displayedGalleryData[a], displayedGalleryData[b]] = [displayedGalleryData[b], displayedGalleryData[a]];
    }
  });

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % displayedGalleryData.length : null));
  }, [displayedGalleryData.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + displayedGalleryData.length) % displayedGalleryData.length : null));
  }, [displayedGalleryData.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, nextImage, prevImage]);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="relative min-h-[70vh] w-full sm:min-h-[78vh] lg:min-h-[88vh]">
          <img
            src="/images/Maingalleyimage.jpg"
            alt="Main gallery image"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out scale-[1.04] sm:scale-[1.08] lg:scale-[1.12]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.2)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(167,139,250,0.2),transparent_45%)]" />
          <div className="absolute top-0 -left-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 py-24 sm:px-8 lg:px-10">
            <div className="max-w-2xl text-left">
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 shadow-sm backdrop-blur-md">
                Portfolio
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Curations</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
                A premium visual collection capturing timeless aesthetics, elegant design, and refined professional experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-12 md:py-20">
        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayedGalleryData.map((item, index) => {
              if (brokenImageIndices.has(index)) return null;

              const layoutClass = (() => {
                switch (index % 6) {
                  case 0:
                    return "col-span-2 row-span-2 aspect-[3/4]";
                  default:
                    return "col-span-1 aspect-[4/5]";
                }
              })();

              return (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className={`group relative w-full rounded-[16px] overflow-hidden bg-white/[0.02] border border-white/5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-white/10 ${layoutClass}`}
                >
                  <Img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    onBroken={() => setBrokenImageIndices((current) => new Set(current).add(index))}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 w-full p-6 text-left flex justify-start translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-flex w-fit rounded-full border border-black/20 bg-black px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-sm backdrop-blur-sm">
                      {item.location}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[110] flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:-translate-x-1 backdrop-blur-md"
              onClick={prevImage}
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-[20px] overflow-hidden shadow-2xl">
                <Img
                  src={displayedGalleryData[selectedIndex].src}
                  alt={displayedGalleryData[selectedIndex].alt}
                  className="max-h-[85vh] w-auto max-w-full object-contain"
                />
              </div>
            </motion.div>

            <button
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[110] flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:translate-x-1 backdrop-blur-md"
              onClick={nextImage}
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
