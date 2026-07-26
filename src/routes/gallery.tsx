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
  const shouldReduceMotion = useReducedMotion();

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryData.length : null));
  }, []);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : null));
  }, []);

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
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background elements */}
        <div className="absolute top-0 -left-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 shadow-sm backdrop-blur-md">
              Portfolio
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl text-white">
              Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Curations</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/50 font-light">
              A premium visual collection capturing timeless aesthetics, elegant design, and refined professional experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryData.map((item, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative w-full aspect-[4/5] rounded-[16px] overflow-hidden bg-white/[0.02] border border-white/5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-white/10"
              >
                {/* Image */}
                <Img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-left flex flex-col justify-end translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="font-display text-xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-white/70 font-light">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
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
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Left */}
            <button
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[110] flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:-translate-x-1 backdrop-blur-md"
              onClick={prevImage}
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            {/* Image Container */}
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
                  src={galleryData[selectedIndex].src}
                  alt={galleryData[selectedIndex].alt}
                  className="max-h-[85vh] w-auto max-w-full object-contain"
                />
              </div>
            </motion.div>

            {/* Navigation Right */}
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
