import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck } from "lucide-react";
import { Img } from "@/components/Img";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards & Recognition — Owais Ahmad Khan" },
      { name: "description", content: "Awards, certifications and industry recognition earned by Owais Ahmad Khan." },
      { property: "og:title", content: "Awards & Recognition — Owais Ahmad Khan" },
      { property: "og:description", content: "Awards, certifications and testimonials." },
    ],
  }),
  component: Awards,
});

const awards = [
  { id: 1, file: "corectaward" },
  { id: 2, file: "corraward2" },
  { id: 3, file: "corraward3" },
  { id: 4, file: "corraward4" },
];
const certs = [
  { id: 1, file: "cert-1" },
  { id: 2, file: "cert-2" },
  { id: 3, file: "cert-3" },
  { id: 4, file: "cert8" },
];

function Awards() {
  return (
    <>
      <section className="relative flex min-h-[55vh] items-center overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-0">
          <Img
            src="/images/awardsmainimage.jpg"
            alt="Awards"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0714] via-[#0D0714]/75 to-[#0D0714]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0714] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            Awards &amp; Recognition
          </span>
          <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/25 to-cyan-500/20 text-fuchsia-200 shadow-lg shadow-fuchsia-500/20">
            <Award className="h-7 w-7" />
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Two decades of excellence, honored.
          </h1>
        </div>
      </section>

      <section className="pb-16">
        <div className="awards-container">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/25 to-orange-500/20 text-amber-200">
              <Award className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Awards</h2>
          </div>
          <div className="awards-grid mt-8">
            {awards.map((award) => (
              <div key={award.id} className="glow-panel flex aspect-square items-center justify-center overflow-hidden rounded-2xl p-4">
                <Img
                  src={`/images/${award.file}.png`}
                  alt={`Award ${award.id}`}
                  placeholderLabel={`Award ${award.id}`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
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
                  src={`/images/${cert.file}.${cert.file.startsWith("cert8") ? "jpg" : "png"}`}
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
