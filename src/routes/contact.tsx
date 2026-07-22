import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Instagram, Globe } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Owais Ahmad Khan" },
      { name: "description", content: "Get in touch with Owais Ahmad Khan for speaking, coaching, and Zai Systems inquiries." },
      { property: "og:title", content: "Contact — Owais Ahmad Khan" },
      { property: "og:description", content: "Reach out for speaking, coaching and business inquiries." },
    ],
  }),
  component: Contact,
});

const channels = [
  { icon: Mail, label: "Email", value: "owais@zaisystems.com", href: "mailto:owais@zaisystems.com" },
  { icon: Phone, label: "Phone", value: "Available on request", href: "#" },
  { icon: Globe, label: "Website", value: "zaisystems.com", href: "https://zaisystems.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/owaisahmadkhan", href: "https://linkedin.com/in/owaisahmadkhan" },
  { icon: Instagram, label: "Instagram", value: "@owaisahmadkhan", href: "#" },
  { icon: MapPin, label: "Location", value: "Islamabad, Pakistan", href: "#" },
];

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section className="diagonal-bg mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          Contact
        </span>
        <h1 className="mt-6 font-display text-4xl font-bold leading-tight md:text-6xl">
          Let&apos;s connect and build something remarkable.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Whether it&apos;s a project at Zai Systems, a coaching engagement, or a speaking invitation — I&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ul className="space-y-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="glow-panel flex items-center gap-4 rounded-2xl p-5 transition-transform hover:scale-[1.01]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">{c.label}</span>
                    <span className="block font-medium text-foreground">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="glow-panel space-y-4 rounded-3xl p-8 lg:col-span-3">
          <h2 className="font-display text-2xl font-bold">Send a message</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Name</span>
              <input
                required
                name="name"
                className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Email</span>
              <input
                required
                type="email"
                name="email"
                className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Subject</span>
            <input
              name="subject"
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Message</span>
            <textarea
              required
              name="message"
              rows={5}
              className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            {sent ? "✓ Message queued" : "Send message"}
          </button>
          {sent && (
            <p className="text-center text-xs text-muted-foreground">
              Thanks — this demo form doesn&apos;t send yet. Please email directly for now.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
