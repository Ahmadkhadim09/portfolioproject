import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Heart, MapPin, Music, Pause } from "lucide-react";

const heroPalace = "/images/hero-palace.jpg";
const chandelier = "/images/chandelier.png";
const curtains = "/images/curtains.jpg";
const crest = "/images/crest.png";
const divider = "/images/divider.png";

export const Route = createFileRoute("/barat")({
  component: Invitation,
  head: () => ({
    meta: [
      { title: "Owais Weds Minahil — Baraat | 31.10.2026" },
      {
        name: "description",
        content:
          "Join Owais & Minahil for the Baraat on 31st October 2026 at Bella Rose Event Complex, Bedian Road. Countdown, venue map and RSVP.",
      },
      { property: "og:title", content: "Owais Weds Minahil — 31 October 2026" },
      {
        property: "og:description",
        content: "Baraat · 31 October 2026 · Bella Rose Event Complex, Bedian Road.",
      },
      { property: "og:url", content: "/barat" },
    ],
    links: [{ rel: "canonical", href: "/barat" }],
  }),
});

/* ---------------------------------- data --------------------------------- */

const EVENTS = [
  {
    n: "01",
    name: "Baraat",
    date: "31st October 2026",
    time: "7 PM onwards",
    venue: "Bella Rose Event Complex, Bedian Road",
    note: "The grand arrival & the joining of two families",
  },
];

const RSVP_CONTACTS = [
  { name: "Muneeb Kashif", phone: "0333-4600488" },
  { name: "Moiz Kashif", phone: "0321-4414839" },
];

const TARGET = new Date("2026-10-31T19:00:00+05:00").getTime();

/* -------------------------- ambient music (hook) -------------------------- */

function useAmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    const master = masterRef.current;
    const ctx = ctxRef.current;
    if (master && ctx) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
    }
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    let ctx = ctxRef.current;
    if (!ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      ctx = new Ctor();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      masterRef.current = master;
    }

    void ctx.resume();
    const master = masterRef.current!;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.26, ctx.currentTime, 0.8);

    const melody = [329.63, 392.0, 440.0, 523.25, 493.88, 440.0, 392.0, 349.23];
    const durations = [0.95, 0.8, 0.8, 0.95, 0.85, 0.8, 0.9, 1.0];

    const playTone = (freq: number, duration: number, volume: number) => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain).connect(master);
      osc.start(now);
      osc.stop(now + duration + 0.04);
    };

    const playNext = () => {
      const note = melody[stepRef.current % melody.length];
      const duration = durations[stepRef.current % durations.length];
      playTone(note, duration, 0.12);
      stepRef.current += 1;
    };

    playNext();
    timerRef.current = window.setInterval(playNext, 900);
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => (playing ? stop() : start()), [playing, start, stop]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  return { playing, start, stop, toggle };
}

/* ------------------------------- components ------------------------------- */

function Divider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-6 py-10 sm:py-14">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-300/80 to-transparent" />
      <Heart className="h-5 w-5 text-red-500" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-300/80 to-transparent" />
    </div>
  );
}

function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-red-300/70 bg-white/90 text-red-600 shadow-[0_18px_50px_rgba(185,28,28,0.24)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
    >
      {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
    </button>
  );
}

function CurtainIntro({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-700 ${open ? "pointer-events-none opacity-0 delay-[1600ms]" : "opacity-100"}`}
      aria-hidden={open}
    >
      <div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
        style={{ animation: open ? "curtain-left 1.8s cubic-bezier(.7,0,.2,1) forwards" : undefined }}
      >
        <img
          src={curtains}
          alt=""
          width={1920}
          height={1088}
          className="absolute inset-y-0 left-0 h-full w-[200%] max-w-none object-cover"
        />
      </div>
      <div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
        style={{ animation: open ? "curtain-right 1.8s cubic-bezier(.7,0,.2,1) forwards" : undefined }}
      >
        <img
          src={curtains}
          alt="Royal burgundy velvet curtains framing the invitation"
          width={1920}
          height={1088}
          className="absolute inset-y-0 right-0 h-full w-[200%] max-w-none object-cover"
        />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-40 -translate-x-1/2 animate-shimmer bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--color-primary)_45%,transparent),transparent)] blur-md" />

      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-10 focus:outline-none"
      >
        <span className="relative flex h-[46vmin] w-[46vmin] max-h-96 max-w-96 items-center justify-center">
          <img
            src={crest}
            alt="Owais and Minahil monogram crest"
            width={1024}
            height={1024}
            className="h-full w-full animate-shimmer object-contain drop-shadow-[0_0_40px_rgba(212,160,60,0.5)]"
          />
          <span className="absolute font-display text-[9vmin] leading-none text-gold-gradient">
            OM
          </span>
        </span>
        <span className="label-caps animate-shimmer text-[0.78rem]">Tap to open</span>
      </button>
    </div>
  );
}

function countdownDiff() {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

function Countdown() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setT(countdownDiff());
    const id = window.setInterval(() => setT(countdownDiff()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const cells = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ] as const;

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
      {cells.map(([label, value]) => (
        <div
          key={label}
          className="rounded-[24px] border border-red-200/80 bg-white/90 px-4 py-6 text-center shadow-[0_16px_40px_rgba(185,28,28,0.1)]"
        >
          <div className="font-display text-4xl font-semibold text-red-700 sm:text-5xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-red-400">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#fce7e7");
    grad.addColorStop(0.5, "#ffe2c4");
    grad.addColorStop(1, "#ffd4d4");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(123, 23, 23, 0.75)";
    ctx.font = "600 13px Karla, sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "4px";
    ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 + 4);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    for (let i = 3; i < data.length; i += 40) {
      if (data[i] === 0) clear++;
    }
    if (clear / (data.length / 40) > 0.45) setRevealed(true);
  };

  return (
    <div className="relative mx-auto max-w-xl select-none">
      <div className="rounded-[32px] border border-red-200/80 bg-white/80 px-6 py-14 text-center shadow-[0_20px_60px_rgba(185,28,28,0.12)] backdrop-blur">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-red-400">The Big Day</p>
        <p className="mt-4 font-display text-5xl leading-tight text-red-700 sm:text-6xl">
          31 October
        </p>
        <p className="mt-2 font-display text-3xl tracking-[0.3em] text-amber-600">2026</p>
      </div>

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full cursor-crosshair rounded-[32px] transition-opacity duration-700 ${revealed ? "pointer-events-none opacity-0" : "opacity-100"}`}
        onPointerDown={(e) => {
          drawingRef.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          scratch(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (drawingRef.current) scratch(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          drawingRef.current = false;
        }}
        onPointerLeave={() => {
          drawingRef.current = false;
        }}
      />
    </div>
  );
}

/* --------------------------------- page ---------------------------------- */

function Invitation() {
  const [opened, setOpened] = useState(false);
  const music = useAmbientMusic();

  const handleOpen = () => {
    setOpened(true);
    music.start();
  };

  return (
    <>
      <CurtainIntro open={opened} onOpen={handleOpen} />
      {opened && <MusicToggle playing={music.playing} onToggle={music.toggle} />}

      <main className="relative min-h-screen overflow-hidden bg-[#2d0505] text-[#fff6f6]">
        {/* HERO */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
          <img
            src={heroPalace}
            alt="Golden Mughal palace hall with ornate arches and warm chandelier light"
            width={1536}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_30%),linear-gradient(120deg,rgba(67,4,4,0.92)_0%,rgba(110,8,8,0.74)_45%,rgba(28,3,3,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent_22%,transparent_78%,rgba(255,255,255,0.08))]" />

          <img
            src={chandelier}
            alt=""
            loading="lazy"
            width={700}
            height={900}
            className="animate-sway absolute -top-6 left-1/2 w-40 -translate-x-1/2 opacity-90 sm:w-64"
          />
          <img
            src={chandelier}
            alt=""
            loading="lazy"
            width={700}
            height={900}
            className="animate-sway absolute -top-4 left-4 hidden w-24 opacity-70 sm:block"
          />
          <img
            src={chandelier}
            alt=""
            loading="lazy"
            width={700}
            height={900}
            className="animate-sway absolute -top-4 right-4 hidden w-24 opacity-70 sm:block"
          />

          <div className="animate-rise relative mt-40 sm:mt-52">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.45em] text-amber-100/90">Save the Date</p>
            <h1 className="mt-6 inline-block bg-gradient-to-r from-[#fff6e3] via-[#ffd7a0] to-[#fff6e3] bg-clip-text font-display text-6xl uppercase leading-[0.95] tracking-[0.24em] text-transparent drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)] sm:text-8xl">
              Owais
              <span className="mx-3 block text-3xl font-semibold italic text-rose-200 sm:inline sm:text-4xl">
                &amp;
              </span>
              Minahil
            </h1>
            <p className="mt-6 font-display text-2xl tracking-[0.35em] text-[#ffb7b7] sm:text-3xl">
              31 · 10 · 2026
            </p>
          </div>
        </section>

        <Divider />

        {/* INVITATION */}
        <section className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-display text-2xl text-[#ffd5b0]">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-rose-200/90 sm:text-base">
            Together with the blessings of our families
            <br />
            we joyfully invite you to celebrate the wedding of
          </p>

          <div className="mt-10 rounded-[32px] border border-red-200/50 bg-white/12 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-10">
            <div className="grid gap-8 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div>
                <h2 className="font-display text-4xl uppercase tracking-[0.18em] text-[#ffe3c4] drop-shadow-[0_2px_10px_rgba(0,0,0,0.24)] sm:text-5xl">
                  Owais
                </h2>
                <p className="mt-3 text-sm text-rose-100/90">Owais A Khan</p>
              </div>
              <span className="font-display text-3xl font-semibold italic text-[#ffb7b7]">&amp;</span>
              <div>
                <h2 className="font-display text-4xl uppercase tracking-[0.18em] text-[#ffe3c4] drop-shadow-[0_2px_10px_rgba(0,0,0,0.24)] sm:text-5xl">
                  Minahil
                </h2>
                <p className="mt-3 text-sm text-rose-100/90">
                  Daughter of Kashif Shuja
                  <br />&amp; Rabia Kashif
                </p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* SCRATCH REVEAL */}
        <section className="mx-auto max-w-3xl px-6 text-center">
          <p className="label-caps">✦ A Little Secret ✦</p>
          <h2 className="mt-3 mb-10 font-display text-4xl uppercase tracking-[0.2em] text-gold-gradient drop-shadow-[0_2px_12px_rgba(0,0,0,0.26)] sm:text-5xl">
            Scratch to Reveal
          </h2>
          <ScratchReveal />
        </section>

        <Divider />

        {/* EVENTS */}
        <section className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-amber-100/80">✦ The Royal Celebrations ✦</p>
            <h2 className="mt-3 font-display text-4xl text-[#ffe3c4] sm:text-5xl">
              Wedding Events
            </h2>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {EVENTS.map((ev) => (
              <li key={ev.n} className="rounded-[28px] border border-red-200/50 bg-white/12 p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.16)] backdrop-blur-sm">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-amber-100/80">✦ Event {ev.n} ✦</p>
                <h3 className="mt-4 font-display text-4xl text-[#ffe3c4]">{ev.name}</h3>
                <p className="mt-3 text-sm text-rose-100/90">
                  {ev.date} · {ev.time}
                </p>
                <p className="mt-3 text-[0.74rem] font-semibold uppercase tracking-[0.3em] text-amber-100/80">{ev.venue}</p>
                <p className="mt-4 font-display text-lg italic text-[#ffd0b0]">{ev.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* COUNTDOWN */}
        <section className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-amber-100/80">✦ The Wait Begins ✦</p>
          <h2 className="mt-3 mb-10 font-display text-4xl text-[#ffe3c4] sm:text-5xl">
            Counting Down
          </h2>
          <Countdown />
          <p className="mt-6 text-sm font-medium text-rose-100/80">Until 31st October 2026 · The Baraat</p>
        </section>

        <Divider />

        {/* RSVP */}
        <section className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-amber-100/80">✦ Kindly Confirm ✦</p>
          <h2 className="mt-3 font-display text-4xl text-[#ffe3c4] sm:text-5xl">R.S.V.P</h2>
          <div className="mt-8 rounded-[32px] border border-red-200/50 bg-white/12 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {RSVP_CONTACTS.map((c) => (
                <a
                  key={c.phone}
                  href={`https://wa.me/92${c.phone.replace(/-/g, "").replace(/^0/, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[24px] border border-amber-200/60 bg-gradient-to-br from-[#fff6e8] via-[#ffe6d6] to-[#ffd6b2] p-6 text-left text-[#7a1f1f] shadow-[0_10px_30px_rgba(185,28,28,0.12)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-red-600/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-red-600">
                      WhatsApp
                    </span>
                    <MapPin className="h-4 w-4 text-red-500" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-[#8b1d1d]">{c.name}</h3>
                  <p className="mt-2 text-sm text-[#8f4a2e]">Tap to chat for RSVP</p>
                  <span className="mt-5 inline-flex rounded-full border border-red-200 bg-white/80 px-3 py-2 text-sm font-semibold text-red-700">
                    {c.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* VENUES */}
        <section className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-amber-100/80">✦ Find Your Way ✦</p>
            <h2 className="mt-3 font-display text-4xl text-[#ffe3c4] sm:text-5xl">Venues</h2>
          </div>
          <ul className="mt-10 grid gap-6">
            {EVENTS.map((ev) => (
              <li key={ev.n} className="rounded-[28px] border border-red-200/50 bg-white/12 p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.16)] backdrop-blur-sm">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-amber-100/80">✦ {ev.name} ✦</p>
                <h3 className="mt-3 font-display text-3xl text-[#ffe3c4]">{ev.venue}</h3>
                <p className="mt-2 text-sm text-rose-100/90">
                  {ev.date} · {ev.time}
                </p>
                <div className="mt-8 overflow-hidden rounded-[24px] border border-red-200/60">
                  <iframe
                    title={`Map to ${ev.venue}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(ev.venue + ", Lahore")}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-72 w-full border-0 grayscale-[0.2]"
                  />
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.venue + ", Lahore")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block rounded-full border border-red-200/70 bg-white/70 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-red-700 transition-colors hover:bg-white"
                >
                  Open in Google Maps
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        <footer className="px-6 pb-24 text-center">
          <p className="font-display text-3xl text-[#ffd0b0]">✦</p>
          <p className="mx-auto mt-4 max-w-xl font-display text-xl italic text-[#ffe3c4]">
            We cannot wait to celebrate this beautiful occasion with your presence, love, and
            blessings.
          </p>
        </footer>
      </main>
    </>
  );
}
