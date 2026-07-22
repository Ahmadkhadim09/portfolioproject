
# Owais Ahmad Khan — Portfolio (Codespot-styled)

Frontend-only React portfolio inspired visually by the Codespot Blocksy template (dark background, vibrant green accent, bold display headings, glowing card panels), populated with content from owaisahmadkhan.com. TanStack Router file-based routing, Tailwind v4 tokens.

## Pages (6)

1. **Home** (`/`) — Hero ("Owais Ahmad Khan / Visionary Leader | Innovative Tech Entrepreneur | Empowering IT Coach"), Codespot-style stats cards (350+ Projects, 18+ Years, 70+ Clients, 100+ Team), highlights of expertise bars, CTA to Contact/Broadcast.
2. **About** (`/about`) — Full bio (CEO/Founder of Zai Systems), stats grid, gallery of event/speaker photos (h1–h17 from source).
3. **Podcast** (`/podcast`) — Featured podcast grid using the 7 YouTube video thumbnails (N1i5cabbZJM, sO_YCYUsXhI, KU3E895Cll4, 8CwhVYMVfeU, _iatU4wbwrA, jfB1K1bqfnY, dyX6XU0cpWI), each linking to YouTube.
4. **Awards** (`/awards`) — Awards gallery (10 award images) + Certifications strip (12 cert images) + Recommendations/testimonials carousel.
5. **Contact** (`/contact`) — Static contact card with placeholders (email / phone / LinkedIn / Instagram / website) + non-functional contact form (frontend-only, shows toast on submit). User can fill real details later.
6. **Broadcast** (`/broadcast`) — New page. Cards for broadcast channels (WhatsApp Channel, Telegram, YouTube, LinkedIn Newsletter, Instagram Broadcast) as placeholder buttons since no links were provided; each is an obviously-editable `<a href="#">` with a note that URLs can be swapped in.

## Design system (styles.css tokens)

Port Codespot vibe to oklch tokens:
- `--background`: near-black (`oklch(0.16 0.02 150)`)
- `--foreground`: near-white
- `--primary`: Codespot green (`oklch(0.72 0.19 145)`), `--primary-foreground`: black
- `--card`: elevated dark green-tinted panel with subtle border glow
- `--radius`: 1rem for large card corners like template
- Font pair: bold display (e.g. system geometric sans via Google `Space Grotesk`) for headings + `Inter` body — loaded via `<link>` in `__root.tsx` head (not `@import` in CSS).
- Reusable components: `SiteHeader` (logo "OAK" + nav + green "Get in Touch" pill), `SiteFooter`, `SectionHeading`, `StatCard`, `GlowPanel`.

## Routing / structure

```
src/routes/
  __root.tsx          (updated: fonts link, site meta, header/footer chrome)
  index.tsx           (Home — replace placeholder)
  about.tsx
  podcast.tsx
  awards.tsx
  contact.tsx
  broadcast.tsx
src/components/
  SiteHeader.tsx
  SiteFooter.tsx
  ui/          (small local UI helpers as needed)
```

Each route gets its own `head()` with unique title + description + og tags. Nav uses `<Link to="/...">` with `activeProps` for active state.

## Assets

Use remote image URLs from owaisahmadkhan.com directly (gallery, certifications, awards, testimonials, hero shot) — frontend-only project, no upload required. YouTube thumbnails via `img.youtube.com/vi/<id>/hqdefault.jpg`.

## Out of scope

- No backend, no form submission, no auth, no CMS.
- Broadcast links left as placeholders until user provides real URLs.
- Contact email/phone/socials left as placeholders.

## Technical notes

- TanStack Start file-based routing; `createFileRoute("/about")` etc.
- `<Link>` from `@tanstack/react-router` for all nav.
- Tailwind v4 semantic tokens only — no hardcoded hex in components.
- Load Google Fonts via `<link>` in `__root.tsx` head, not `@import` in `styles.css` (Lightning CSS rule).
- Each route file: own `head()` with title/description/og:title/og:description; no og:image (hosting supplies).
