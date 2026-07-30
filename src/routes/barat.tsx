import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

const heroPalace = "/images/hero-palace.jpg";
const baraImage2 = "/images/baratimage2.png";
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

      [146.83, 220.0].forEach((freq, i) => {
        const osc = ctx!.createOscillator();
        const gain = ctx!.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.value = i === 0 ? 0.09 : 0.05;
        osc.connect(gain).connect(master);
        osc.start();
      });
    }

    void ctx.resume();
    const master = masterRef.current!;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.35, ctx.currentTime, 0.8);

    const scale = [293.66, 329.63, 349.23, 440.0, 493.88, 587.33, 659.25, 698.46];
    const pluck = () => {
      const c = ctxRef.current;
      const m = masterRef.current;
      if (!c || !m) return;
      const idx = [0, 2, 4, 3, 5, 4, 2, 1, 3, 6, 5, 4][stepRef.current % 12];
      stepRef.current += 1;
      const note = scale[idx];
      const now = c.currentTime;

      [1, 2.02].forEach((mult, i) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = i === 0 ? "triangle" : "sine";
        osc.frequency.value = note * mult;
        const peak = i === 0 ? 0.22 : 0.07;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(peak, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);
        osc.connect(gain).connect(m);
        osc.start(now);
        osc.stop(now + 2.8);
      });
    };

    pluck();
    timerRef.current = window.setInterval(pluck, 1400);
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
    <div className="flex justify-center py-12">
      <img
        src={divider}
        alt=""
        loading="lazy"
        width={1200}
        height={512}
        className="h-16 w-auto max-w-[80vw] object-contain opacity-80"
      />
    </div>
  );
}

function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed top-1/2 right-6 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(139,92,246,0.35)] backdrop-blur transition-colors hover:bg-primary/90"
    >
      {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5 animate-shimmer" />}
    </button>
  );
}

function CurtainIntro({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-700 ${open ? "pointer-events-none opacity-0 delay-[1600ms]" : "opacity-100"
        }`}
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
    <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
      {cells.map(([label, value]) => (
        <div key={label} className="rounded-[1.5rem] border border-yellow-400/60 bg-gradient-to-br from-yellow-200 via-amber-100 to-yellow-400 px-4 py-6 text-center text-red-950 shadow-[0_20px_60px_rgba(127,29,29,0.2)]">
          <div className="font-display text-4xl sm:text-5xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="label-caps mt-2 text-[0.6rem] text-red-800/80">{label}</div>
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
    grad.addColorStop(0, "#7c5a1e");
    grad.addColorStop(0.4, "#d4a03c");
    grad.addColorStop(0.6, "#f2d68a");
    grad.addColorStop(1, "#8a641f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(40,10,16,0.6)";
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
      <div className="rounded-[1.75rem] border border-yellow-400/60 bg-gradient-to-br from-yellow-200 via-amber-100 to-yellow-400 px-6 py-14 text-center text-red-950 shadow-[0_20px_70px_rgba(127,29,29,0.2)]">
        <p className="label-caps text-[0.6rem] text-red-800/80">The Big Day</p>
        <p className="mt-4 font-display text-5xl leading-tight sm:text-6xl">
          31 October
        </p>
        <p className="mt-2 font-display text-3xl tracking-[0.3em] text-red-900">2026</p>
      </div>

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full cursor-crosshair rounded-sm transition-opacity duration-700 ${revealed ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
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

      <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,78,78,0.18),_transparent_45%),linear-gradient(135deg,_#2d0404_0%,_#110202_100%)] text-red-50 italic">
        {/* HERO */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
          <img
            src={heroPalace}
            alt="Golden Mughal palace hall with ornate arches and warm chandelier light"
            width={1536}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(17,2,2,0.6)_90%)]" />
          <div className="absolute inset-0 bg-[#130202]/35" />

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

          <div className="animate-rise relative mt-40 flex flex-col items-center sm:mt-52">
            <p className="label-caps text-red-200">Save the Date</p>
            <h1 className="mt-6 font-display text-6xl leading-[0.95] bg-gradient-to-r from-red-200 via-yellow-200 to-red-100 bg-clip-text text-transparent sm:text-8xl">
              Owais
              <span className="mx-3 block text-3xl italic text-red-100 sm:inline sm:text-4xl">
                &amp;
              </span>
              Minahil
            </h1>
            <p className="mt-6 font-display text-2xl tracking-[0.3em] text-red-100">
              31 · 10 · 2026
            </p>
          </div>
        </section>

        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${baraImage2})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,2,2,0.55),rgba(9,3,3,0.65))]" />

          <section className="relative mx-auto -mt-8 w-full max-w-6xl px-4 sm:px-6 sm:-mt-12">
            <div className="relative overflow-hidden rounded-[2rem] border border-red-400/30 bg-[rgba(17,3,3,0.75)] shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.65))]" />
              <div className="relative px-6 py-12 sm:px-10 sm:py-14">
                <section className="mx-auto max-w-3xl text-center">
                  <p className="font-display text-2xl text-red-100">
                    بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </p>
                  <p className="label-caps mt-8 leading-loose text-red-200/90">
                    Together with the blessings of our families
                    <br />
                    we joyfully invite you to celebrate the wedding of
                  </p>

                  <div className="mt-10 flex flex-col items-center justify-center gap-8 text-center sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                    <div className="w-full">
                      <h2 className="font-display text-5xl bg-gradient-to-r from-red-200 via-yellow-100 to-red-100 bg-clip-text text-transparent">Owais</h2>
                      <p className="mt-3 text-sm text-red-200/80">Owais Ahmad Khan<br/>Son of Abdul Atique Khan (Late) &amp; Shumyla Khan</p>
                    </div>
                    <span className="font-display text-3xl italic text-red-100">&amp;</span>
                    <div className="w-full">
                      <h2 className="font-display text-5xl bg-gradient-to-r from-red-200 via-yellow-100 to-red-100 bg-clip-text text-transparent">Minahil</h2>
                      <p className="mt-3 text-sm text-red-200/80">
                        Daughter of Kashif Shuja
                        <br />&amp; Rabia Kashif
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>

          <Divider />
        </div>

        {/* SCRATCH REVEAL */}
        <section className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl text-red-100">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="label-caps mt-8 leading-loose text-red-200/90">
            Together with the blessings of our families
            <br />
            we joyfully invite you to celebrate the wedding of
          </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-8 text-center sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="w-full">
              <h2 className="font-display text-5xl bg-gradient-to-r from-red-200 via-yellow-100 to-red-100 bg-clip-text text-transparent">Owais</h2>
              <p className="mt-3 text-sm text-red-200/80">Owais Ahmad Khan<br/>Son of Abdul Atique Khan (Late) &amp; Shumyla Khan</p>
            </div>
            <span className="font-display text-3xl italic text-red-100">&amp;</span>
            <div className="w-full">
              <h2 className="font-display text-5xl bg-gradient-to-r from-red-200 via-yellow-100 to-red-100 bg-clip-text text-transparent">Minahil</h2>
              <p className="mt-3 text-sm text-red-200/80">
                Daughter of Kashif Shuja
                <br />&amp; Rabia Kashif
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* SCRATCH REVEAL */}
        <section className="mx-auto max-w-3xl px-6 text-center">
          <p className="label-caps text-red-200">✦ A Little Secret ✦</p>
          <h2 className="mt-3 mb-10 font-display text-4xl bg-gradient-to-r from-red-200 via-yellow-100 to-red-100 bg-clip-text text-transparent sm:text-5xl">
            Scratch to Reveal
          </h2>
          <ScratchReveal />
        </section>

        <Divider />

        {/* EVENTS */}
        <section className="mx-auto max-w-5xl px-6 text-center">
          <div className="text-center">
            <p className="label-caps text-red-200">✦ The Royal Celebrations ✦</p>
            <h2 className="mt-3 font-display text-4xl bg-gradient-to-r from-red-200 via-yellow-100 to-red-100 bg-clip-text text-transparent sm:text-5xl">
              Wedding Events
            </h2>
          </div>

          <ul className="mt-12 grid place-items-center gap-6">
            {EVENTS.map((ev) => (
              <li key={ev.n} className="w-full max-w-xl rounded-[2rem] border border-yellow-400/50 bg-gradient-to-br from-yellow-200 via-amber-100 to-yellow-300 p-8 text-center text-red-950 shadow-[0_20px_70px_rgba(251,191,36,0.2)]">
                <p className="label-caps text-[0.6rem] text-red-800/80">✦ Event {ev.n} ✦</p>
                <h3 className="mt-4 font-display text-4xl text-red-900">{ev.name}</h3>
                <p className="mt-3 text-sm text-red-900/80">
                  {ev.date} · {ev.time}
                </p>
                <p className="label-caps mt-3 text-[0.6rem] text-red-800/80">{ev.venue}</p>
                <p className="mt-4 font-display text-lg italic text-red-900/80">{ev.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* COUNTDOWN */}
        <section className="mx-auto max-w-5xl px-6 text-center">
          <p className="label-caps text-red-200">✦ The Wait Begins ✦</p>
          <h2 className="mt-3 mb-10 font-display text-4xl bg-gradient-to-r from-red-200 via-yellow-100 to-red-100 bg-clip-text text-transparent sm:text-5xl">
            Counting Down
          </h2>
          <Countdown />
          <p className="mt-6 text-sm text-red-200/90">Until 31st October 2026 · The Baraat</p>
        </section>

        <Divider />

        {/* RSVP */}
        <section className="mx-auto max-w-xl px-6 text-center">
          <p className="label-caps text-red-200">✦ Kindly Confirm ✦</p>
          <h2 className="mt-3 font-display text-4xl bg-gradient-to-r from-red-400 via-red-300 to-yellow-100 bg-clip-text text-transparent sm:text-5xl">R.S.V.P</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 sm:items-stretch">
            {RSVP_CONTACTS.map((c) => (
              <li key={c.phone} className="w-full">
                <a
                  href={`https://wa.me/92${c.phone.replace(/-/g, "").replace(/^0/, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between rounded-[2rem] border border-red-500/40 bg-[rgba(17,3,3,0.82)] p-8 text-center text-red-100 shadow-[0_24px_90px_-24px_rgba(255,50,50,0.35)] transition duration-300 hover:-translate-y-1 hover:border-red-400/70 hover:bg-[rgba(24,4,5,0.95)]"
                >
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-red-300/90">WhatsApp RSVP</p>
                    <h3 className="mt-4 font-display text-3xl font-semibold text-red-100">{c.name}</h3>
                    <p className="mt-3 text-sm text-red-200/80">Message this number to confirm attendance</p>
                  </div>
                  <span className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 text-sm font-semibold text-red-50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                    {c.phone}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* VENUES */}
        <section className="mx-auto max-w-5xl px-6 text-center">
          <div className="text-center">
            <p className="label-caps text-red-200">✦ Find Your Way ✦</p>
            <h2 className="mt-3 font-display text-4xl bg-gradient-to-r from-red-200 via-yellow-100 to-red-100 bg-clip-text text-transparent sm:text-5xl">Venues</h2>
          </div>
            <ul className="mt-12 grid gap-6">
            {EVENTS.map((ev) => (
              <li key={ev.n} className="rounded-[2rem] border border-red-400/30 bg-red-950/30 p-8 text-center text-red-50 shadow-[0_20px_70px_rgba(0,0,0,0.2)]">
                <p className="label-caps text-[0.6rem] text-red-800/80">✦ {ev.name} ✦</p>
                <h3 className="mt-3 font-display text-3xl text-red-900">{ev.venue}</h3>
                <p className="mt-2 text-sm text-red-900/80">
                  {ev.date} · {ev.time}
                </p>
                <div className="mt-8 overflow-hidden rounded-sm border border-red-400/40">
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
                  className="label-caps mt-6 inline-block border-b border-red-700/50 pb-1 text-[0.6rem] text-red-800 hover:text-red-950"
                >
                  Open in Google Maps
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        <footer className="px-6 pb-24 text-center">
          <p className="font-display text-3xl text-red-100">✦</p>
          <p className="mx-auto mt-4 max-w-xl font-display text-xl italic text-red-200/90">
            We cannot wait to celebrate this beautiful occasion with your presence, love, and
            blessings.
          </p>
        </footer>
      </main>
    </>
  );
}
