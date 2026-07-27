import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
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

const certs = [
  { id: 1, file: "cert-1", ext: "png" },
  { id: 2, file: "cert-2", ext: "png" },
  { id: 3, file: "cert-3", ext: "png" },
  { id: 4, file: "cert4", ext: "png" },
  { id: 5, file: "cert5", ext: "jpg" },
  { id: 6, file: "cert6", ext: "png" },
  { id: 7, file: "cert7", ext: "jpg" },
  { id: 8, file: "cert8", ext: "jpg" },
  { id: 9, file: "cer4", ext: "png" },
  { id: 10, file: "cer14", ext: "jpg" },
  { id: 11, file: "cer15", ext: "jpg" },
  { id: 12, file: "cer16", ext: "jpg" },
  { id: 13, file: "cer17", ext: "jpg" },
];

function Certificates() {
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
          <div className="certs-grid mt-8">
            {certs.map((cert) => (
              <div key={cert.id} className="glow-panel flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl p-3">
                <Img
                  src={`/images/${cert.file}.${cert.ext}`}
                  alt={`Certification ${cert.id}`}
                  placeholderLabel={`Cert ${cert.id}`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
