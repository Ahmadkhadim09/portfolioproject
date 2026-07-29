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
  { id: 1, file: "awad7", ext: "png", title: "Professional Excellence", description: "Recognized for outstanding professional achievement" },
  { id: 2, file: "awar10", ext: "png", title: "Outstanding Achievement", description: "Excellence in performance and dedication" },
  { id: 3, file: "award12", ext: "png", title: "Industry Recognition", description: "Distinguished contribution to the industry" },
  { id: 4, file: "award4", ext: "png", title: "Distinguished Service", description: "Exceptional service and commitment" },
  { id: 5, file: "award5", ext: "png", title: "Innovation Award", description: "Pioneering innovative solutions" },
  { id: 6, file: "award6", ext: "png", title: "Leadership Recognition", description: "Outstanding leadership excellence" },
  { id: 7, file: "award8", ext: "png", title: "Excellence in Performance", description: "Exceptional performance and results" },
  { id: 8, file: "award9", ext: "png", title: "Community Impact", description: "Positive influence and community service" },
  { id: 9, file: "award13", ext: "png", title: "Dedication & Commitment", description: "Unwavering dedication to excellence" },
  { id: 10, file: "award14", ext: "png", title: "Excellence in Leadership", description: "Visionary leadership and innovation" },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {awards.map((award) => (
              <div key={award.id} className={award.file ? "award-card" : "award-card-empty"}>
                {award.file && (
                  <>
                    <Img
                      src={`/images/${award.file}.${award.ext}`}
                      alt={`Award ${award.id}`}
                      placeholderLabel={`Award ${award.id}`}
                      loading="lazy"
                      className="award-image"
                    />
                    <h3 className="award-title">{award.title}</h3>
                    <p className="award-description">{award.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
