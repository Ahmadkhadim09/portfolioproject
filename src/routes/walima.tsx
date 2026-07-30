import { createFileRoute } from "@tanstack/react-router";
import RoyalWeddingInvite from "@/components/RoyalWeddingInvite";

export const Route = createFileRoute("/walima")({
  component: RoyalWeddingInvite,
  head: () => ({
    meta: [
      { title: "Owais & Minahil — Walima | 15 February 2027" },
      { name: "description", content: "Join Owais and Minahil for their Walima celebration at Char Bagh Terrace in Lahore." },
      { property: "og:title", content: "Owais & Minahil — Walima" },
      { property: "og:description", content: "Walima celebration in Lahore on 15 February 2027." },
      { property: "og:url", content: "/walima" },
    ],
    links: [{ rel: "canonical", href: "/walima" }],
  }),
});

// Invitation component moved to src/components/RoyalWeddingInvite.tsx
