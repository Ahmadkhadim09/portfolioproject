import { createFileRoute } from "@tanstack/react-router";
import BadgeCheck from "@/components/icons/BadgeCheck";
import { Img } from "@/components/Img";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certifications — Owais Ahmad Khan" },
      { name: "description", content: "Professional certifications and credentials earned by Owais Ahmad Khan." },
      { property: "og:title", content: "Certifications — Owais Ahmad Khan" },
      { property: "og:description", content: "Certifications and professional credentials." },
    ],
  }),
  component: Certificates,
});

function Certificates() {
  // New certificates to prepend (recently added)
  const newStart = [
    "/images/certificates/13.png",
    "/images/certificates/14.png",
    "/images/certificates/15.png",
  ];

  // Use the actual files from public/images/certificates (existing uploads)
  const certificateSources = [
    "/images/certificates/0.png",
    "/images/certificates/1.png",
    "/images/certificates/2.png",
    "/images/certificates/3.png",
    "/images/certificates/4.png",
    "/images/certificates/5.png",
    "/images/certificates/7.png",
    "/images/certificates/8.png",
    "/images/certificates/9.png",
    "/images/certificates/10.png",
    "/images/certificates/11.png",
    "/images/certificates/12.png",
  ];

  // Prepend newStart items while avoiding duplicates
  const displayedSources = [
    ...newStart,
    ...certificateSources.filter((s) => !newStart.includes(s)),
  ];

  const certificateImages = displayedSources.map((src, index) => ({
    src,
    alt: `Certificate ${index + 1}`,
    title: `Certificate ${index + 1}`,
    subtitle: "Professional credential",
  }));

  return (
    <>
      <section className="relative flex min-h-[55vh] items-center overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-0">
          <Img
            src="/images/gallery/00000078-PHOTO-2026-07-25-18-05-03.jpg"
            alt="CEO's Symposium"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0714] via-[#0D0714]/75 to-[#0D0714]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0714] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            Professional Credentials
          </span>
          <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-sky-500/20 text-cyan-200 shadow-lg shadow-cyan-500/20">
            <BadgeCheck className="h-7 w-7" />
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Certified expertise.
          </h1>
        </div>
      </section>

      <section className="pb-16">
        <div className="awards-container">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/25 to-sky-500/20 text-cyan-200">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Certifications</h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {certificateImages.map((certificate) => (
              <a
                key={certificate.src}
                href={certificate.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-lg shadow-black/20 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-transform duration-200">
                  <div className="bg-black/20 p-3">
                    <Img
                      src={certificate.src}
                      alt={certificate.alt}
                      className="h-[320px] w-full rounded-2xl object-contain"
                      placeholderLabel={certificate.title}
                    />
                  </div>
                  <div className="space-y-2 p-5 text-left">
                    <h3 className="font-display text-xl font-semibold text-white">{certificate.title}</h3>
                    <p className="text-sm text-white/70">{certificate.subtitle}</p>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
