import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Send, Youtube, Linkedin, Instagram, Radio, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/broadcast")({
  head: () => ({
    meta: [
      { title: "Broadcast Channels — Owais Ahmad Khan" },
      { name: "description", content: "Follow Owais Ahmad Khan on WhatsApp, Telegram, YouTube, LinkedIn, Instagram and more." },
      { property: "og:title", content: "Broadcast Channels — Owais Ahmad Khan" },
      { property: "og:description", content: "All broadcast channels in one place." },
    ],
  }),
  component: Broadcast,
});

const channels = [
  {
    icon: MessageCircle,
    name: "WhatsApp Channel",
    desc: "Daily insights on leadership, tech and personal growth.",
    href: "#",
    tint: "bg-primary/15 text-primary",
  },
  {
    icon: Send,
    name: "Telegram",
    desc: "Long-form thoughts, resources and community discussions.",
    href: "#",
    tint: "bg-primary/15 text-primary",
  },
  {
    icon: Youtube,
    name: "YouTube",
    desc: "Podcast episodes, talks, and video interviews.",
    href: "#",
    tint: "bg-primary/15 text-primary",
  },
  {
    icon: Linkedin,
    name: "LinkedIn Newsletter",
    desc: "Weekly deep dives on entrepreneurship and IT leadership.",
    href: "#",
    tint: "bg-primary/15 text-primary",
  },
  {
    icon: Instagram,
    name: "Instagram Broadcast",
    desc: "Behind-the-scenes moments and speaking updates.",
    href: "#",
    tint: "bg-primary/15 text-primary",
  },
  {
    icon: Radio,
    name: "Spotify Podcast",
    desc: "Listen to the podcast on the go.",
    href: "#",
    tint: "bg-primary/15 text-primary",
  },
];

function Broadcast() {
  return (
    <>
      <section className="diagonal-bg mx-auto max-w-7xl px-6 py-20">
        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          Broadcast
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          Follow the conversation, wherever you are.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Join thousands of professionals tuning in for daily insights, podcast drops and behind-the-scenes updates.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="glow-panel group flex flex-col rounded-2xl p-7 transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.tint}`}>
                  <c.icon className="h-6 w-6" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <div className="mt-5 font-display text-xl font-bold">{c.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-6 inline-flex items-center text-xs font-medium text-primary">
                Join channel →
              </div>
            </a>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-muted-foreground">
          Channel links will be activated soon. Meanwhile, reach out via the contact page for direct invites.
        </p>
      </section>
    </>
  );
}
