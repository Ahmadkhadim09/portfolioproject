import { useEffect, useMemo, useState, FormEvent, useRef } from "react";
import { Music, Pause } from "lucide-react";

const ambientTrack = "/images/Ek Dil Ek Jaan Padmaavat 320 Kbps.mp3";

/* ------------------------------------------------------------------ */
/*  Content — edit these to change names, dates and event details      */
/* ------------------------------------------------------------------ */

const COUPLE_INITIALS = "O & M";
const COUPLE_NAMES = ["Owais", "Minahil"];
const WEDDING_DATE = "2026-11-01T19:00:00+05:00"; // Walima date/time
const WEDDING_CITY = "Lahore";
const WEDDING_HEADLINE_DATE = "01 November 2026 · Lahore";
const RSVP_DEADLINE = "Please reply by 20 January 2027";

const EVENTS = [
  {
    name: "Walima",
    date: "01st November 2026",
    place: "Sheranwala Farmhouse, 70-B Executive Lodges, Sector B, Bahria Town, Lahore",
    note: "",
  },
];

const WALIMA_MAP = "https://www.google.com/maps/search/?api=1&query=Sheranwala+Farmhouse%2C+70-B+Executive+Lodges%2C+Sector+B%2C+Bahria+Town%2C+Lahore";
const WALIMA_CONTACTS = [
  { name: "Abdul Rafay Ahmad Khan", phone: "03224244120" },
  { name: "Owais Ahmad Khan", phone: "03224221287" },
];

/* ------------------------------------------------------------------ */
/*  Global styles — Mughal palette + custom utility classes            */
/* ------------------------------------------------------------------ */

function RoyalStyles() {
  return (
    <style>{`
      .royal-root {
        --ivory: #f7f1e3;
        --gold: #cba135;
        --gold-soft: #e4d3a0;
        --maroon: #5a2a27;
        --emerald-deep: #1f3d33;

        --background: #122019;
        --foreground: #f3ecda;
        --card: #1b2e25;
        --primary: #cba135;
        --primary-foreground: #122019;
        --secondary: #5a2a27;
        --secondary-foreground: #f3ecda;
        --muted: #1e332a;
        --muted-foreground: #c9c2a8;
        --accent: #5a2a27;
        --border: rgba(203,161,53,0.35);

        font-family: "Karla", "Segoe UI", system-ui, sans-serif;
        background: transparent;
        color: var(--foreground);
        min-height: 100vh;
        position: relative;
        overflow-x: hidden;
      }

      .royal-root h1, .royal-root h2, .royal-root h3, .royal-root h4 {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-weight: 300;
      }

      .text-gold-gradient {
        background: linear-gradient(100deg, #b5842a, #ecd9a0, #c48a3e);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .panel-royal {
        background-color: var(--card);
        border: 1px solid var(--border);
        box-shadow: 0 24px 60px -20px rgba(0,0,0,0.6);
        position: relative;
      }

      .jali {
        background-image:
          radial-gradient(circle at 50% 0%, var(--gold) 0.5px, transparent 0.6px),
          radial-gradient(circle at 0% 50%, var(--gold) 0.5px, transparent 0.6px);
        background-size: 18px 18px;
        opacity: 0.12;
      }

      .arch-top {
        border-top-left-radius: 50% 22%;
        border-top-right-radius: 50% 22%;
      }

      @keyframes shimmer {
        0%, 100% { opacity: 0.55; }
        50% { opacity: 1; }
      }
      .shimmer { animation: shimmer 4s ease-in-out infinite; }

      .text-primary { color: var(--primary); }
      .text-primary-70 { color: rgba(203,161,53,0.7); }
      .text-primary-foreground { color: var(--primary-foreground); }
      .text-foreground { color: var(--foreground); }
      .text-foreground-90 { color: rgba(243,236,218,0.9); }
      .text-muted-foreground { color: var(--muted-foreground); }
      .text-muted-foreground-60 { color: rgba(201,194,168,0.6); }

      .bg-primary { background-color: var(--primary); }
      .bg-primary-40 { background-color: rgba(203,161,53,0.4); }
      .bg-background-45 { background-color: rgba(18,32,25,0.45); }
      .bg-background-50 { background-color: rgba(18,32,25,0.5); }

      .border-border { border-color: var(--border); }
      .border-primary { border-color: var(--primary); }
      .border-primary-60:hover { border-color: rgba(203,161,53,0.6); }

      /* ---------- Entry curtain ---------- */
      .curtain-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 50.5%;
        background-image: repeating-linear-gradient(
          90deg,
          #3a1310 0px,
          #5c231d 26px,
          #421a15 52px,
          #2a0f0c 72px
        );
        box-shadow: inset 0 0 140px rgba(0,0,0,0.7), 0 24px 60px -20px rgba(0,0,0,0.6);
        transition: transform 1.9s cubic-bezier(0.76, 0, 0.24, 1);
        will-change: transform;
      }
      .curtain-left { left: 0; border-right: 2px solid var(--gold); }
      .curtain-right { right: 0; border-left: 2px solid var(--gold); }
      .curtain-left.is-open { transform: translateX(-101%); }
      .curtain-right.is-open { transform: translateX(101%); }

      .crest-ring {
        border: 1px solid var(--gold);
        box-shadow: 0 0 40px -8px rgba(203,161,53,0.45), inset 0 0 30px rgba(203,161,53,0.2);
        background: radial-gradient(circle, #1b2e25 0%, #29110d 100%);
        transition: transform 0.4s ease, box-shadow 0.4s ease;
      }
      .crest-group:hover .crest-ring { transform: scale(1.05); }

      @keyframes reveal-up {
        from { opacity: 0; transform: translateY(28px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .reveal { opacity: 0; }
      .revealed .reveal {
        animation: reveal-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      .revealed .reveal-1 { animation-delay: 0.5s; }
      .revealed .reveal-2 { animation-delay: 0.75s; }
      .revealed .reveal-3 { animation-delay: 1s; }
      .revealed .reveal-4 { animation-delay: 1.25s; }
      .revealed .reveal-5 { animation-delay: 1.5s; }

      @keyframes float-star {
        0% { transform: translateY(0) scale(0.8); opacity: 0; }
        20% { opacity: 0.8; }
        80% { opacity: 0.8; }
        100% { transform: translateY(-100px) scale(1.2); opacity: 0; }
      }
      .moving-star {
        position: absolute;
        background-color: #ecd9a0;
        border-radius: 50%;
        animation: float-star 8s linear infinite;
        box-shadow: 0 0 10px rgba(236,217,160,0.75);
      }
      .starfield {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }
      @media (prefers-reduced-motion: reduce) {
        .curtain-panel { transition-duration: 0.2s; }
        .reveal { opacity: 1; }
        .revealed .reveal { animation: none; }
        .moving-star { animation: none; opacity: 0.5; }
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative hero + arch art, drawn directly in SVG                  */
/* ------------------------------------------------------------------ */

function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
        opacity: 0.35 + Math.random() * 0.65,
      })),
    []
  );

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="moving-star"
          style={{
            top: star.top,
            left: star.left,
            width: star.width,
            height: star.height,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}

function WalimaHeroBG() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('/images/walima-hero.jpg')] bg-cover bg-center bg-no-repeat bg-fixed scale-105"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,15,0.88),rgba(8,25,20,0.82),rgba(5,18,15,0.92))]" />
    </div>
  );
}

function ArchDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="archGoldLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b5842a" />
          <stop offset="50%" stopColor="#ecd9a0" />
          <stop offset="100%" stopColor="#c48a3e" />
        </linearGradient>
      </defs>
      <path
        d="M 40 190 L 40 100 Q 40 30 100 30 Q 160 30 160 100 L 160 190"
        fill="none"
        stroke="url(#archGoldLine)"
        strokeWidth="2.5"
      />
      <path
        d="M 55 190 L 55 102 Q 55 48 100 48 Q 145 48 145 102 L 145 190"
        fill="none"
        stroke="url(#archGoldLine)"
        strokeWidth="1"
        opacity="0.6"
      />
      <circle cx="100" cy="95" r="10" fill="none" stroke="url(#archGoldLine)" strokeWidth="1" />
      <path d="M 100 60 L 100 130" stroke="url(#archGoldLine)" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Countdown                                                           */
/* ------------------------------------------------------------------ */

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [time, setTime] = useState(() => diff(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="panel-royal arch-top flex flex-col items-center px-4 py-6 sm:py-8 !bg-[rgba(15,20,18,0.12)] backdrop-blur-[10px] border border-[rgba(212,175,55,0.12)] hover:shadow-[0_8px_30px_rgba(203,161,53,0.06)]"
        >
          <span className="jali pointer-events-none absolute inset-0" aria-hidden="true" />
          <span className="font-display text-gold-gradient text-4xl leading-none sm:text-5xl">
            {mounted ? String(time[key as keyof typeof time]).padStart(2, "0") : "--"}
          </span>
          <span className="text-muted-foreground mt-3 text-[0.65rem] uppercase tracking-[0.35em]">
            {label}
          </span>
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
    grad.addColorStop(0, "#cba135");
    grad.addColorStop(0.4, "#e4d3a0");
    grad.addColorStop(0.6, "#f3ecda");
    grad.addColorStop(1, "#b5842a");
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
    <div className="relative mx-auto max-w-2xl select-none mt-12 mb-8 px-4">
      <div className="panel-royal rounded-sm px-6 py-14 text-center !bg-[rgba(15,20,18,0.12)] backdrop-blur-[10px] border border-[rgba(212,175,55,0.12)] overflow-visible">
        <p className="label-caps text-[0.6rem] text-muted-foreground uppercase tracking-[0.2em]">The Big Day</p>
        <p className="mt-4 font-display text-4xl leading-tight text-gold-gradient sm:text-5xl break-words whitespace-normal" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
          01 November
        </p>
        <p className="mt-2 text-2xl sm:text-3xl tracking-[0.3em] text-primary" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>2026</p>
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

/* ------------------------------------------------------------------ */
/*  Curtain intro                                                       */
/* ------------------------------------------------------------------ */

function CurtainIntro({ initials, onOpened }: { initials: string; onOpened?: () => void }) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!opening) return;
    const t = setTimeout(() => setGone(true), 2200);
    return () => clearTimeout(t);
  }, [opening]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ pointerEvents: opening ? "none" : "auto" }}
      aria-hidden={opening}
    >
      <div className={`curtain-panel curtain-left ${opening ? "is-open" : ""}`} />
      <div className={`curtain-panel curtain-right ${opening ? "is-open" : ""}`} />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500"
        style={{ opacity: opening ? 0 : 1 }}
      >
        <button
          type="button"
          onClick={() => {
            onOpened?.();
            setOpening(true);
          }}
          className="crest-group flex flex-col items-center focus:outline-none"
          aria-label="Open the invitation"
        >
          <span className="crest-ring flex h-32 w-32 items-center justify-center rounded-full sm:h-40 sm:w-40">
            <span className="text-gold-gradient text-4xl sm:text-5xl" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
              {initials}
            </span>
          </span>
          <span className="text-primary shimmer mt-8 text-[0.6rem] uppercase tracking-[0.5em] sm:text-xs">
            Tap to open
          </span>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RSVP form (self-contained — no backend required)                    */
/* ------------------------------------------------------------------ */

function RsvpForm() {
  const [attending, setAttending] = useState(true);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    if (!name) {
      setError("Please share your name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setPending(true);
    // No backend is connected in this preview — the response is recorded locally.
    setTimeout(() => {
      setPending(false);
      setDone(true);
    }, 600);
  }

  if (done) {
    return (
      <div className="panel-royal arch-top px-8 py-14 text-center !bg-[rgba(15,20,18,0.12)] backdrop-blur-[10px] border border-[rgba(212,175,55,0.12)]">
        <span className="jali pointer-events-none absolute inset-0" aria-hidden="true" />
        <p className="text-gold-gradient text-3xl" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
          Shukriya
        </p>
        <p className="text-muted-foreground mt-4 text-sm">
          Your response has been inscribed in the royal register.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-sm border border-border bg-background-50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary";
  const labelClass = "text-muted-foreground mb-2 block text-[0.65rem] uppercase tracking-[0.3em]";

  return (
    <form onSubmit={onSubmit} className="panel-royal arch-top px-6 py-10 sm:px-10 !bg-[rgba(15,20,18,0.12)] backdrop-blur-[10px] border border-[rgba(212,175,55,0.12)]">
      <span className="jali pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative space-y-6">
        <div>
          <label className={labelClass} htmlFor="name">Your name</label>
          <input id="name" name="name" maxLength={100} required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" maxLength={255} required className={fieldClass} />
        </div>

        <div>
          <span className={labelClass}>Will you join us?</span>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: true, label: "Joyfully accept" },
              { value: false, label: "Regretfully decline" },
            ].map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => setAttending(option.value)}
                className={`rounded-sm border px-4 py-3 text-xs uppercase tracking-[0.2em] transition ${attending === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground border-primary-60"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {attending && (
          <div>
            <label className={labelClass} htmlFor="guests">Number in your party</label>
            <input id="guests" name="guests" type="number" min={1} max={10} defaultValue={1} className={fieldClass} />
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor="message">A note for the couple</label>
          <textarea id="message" name="message" rows={3} maxLength={1000} className={fieldClass} />
        </div>

        {error && <p className="text-sm" style={{ color: "#e08a7a" }}>{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-primary-foreground w-full rounded-sm px-6 py-4 text-xs uppercase tracking-[0.35em] transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send RSVP"}
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared ornament divider                                             */
/* ------------------------------------------------------------------ */

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden="true">
      <span className="bg-primary-40 h-px w-16 sm:w-28" />
      <span className="text-primary shimmer">✦</span>
      <span className="bg-primary-40 h-px w-16 sm:w-28" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main invitation                                                      */
/* ------------------------------------------------------------------ */

export default function RoyalWeddingInvite() {
  const [revealed, setRevealed] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) {
      const newAudio = new Audio(ambientTrack);
      newAudio.loop = true;
      newAudio.volume = 0.45;
      audioRef.current = newAudio;
      void newAudio.play().catch(() => setMusicPlaying(false));
      setMusicPlaying(true);
      return;
    }

    if (audio.paused) {
      void audio.play().catch(() => setMusicPlaying(false));
      setMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) {
      const newAudio = new Audio(ambientTrack);
      newAudio.loop = true;
      newAudio.volume = 0.45;
      audioRef.current = newAudio;
      void newAudio.play().catch(() => setMusicPlaying(false));
      setMusicPlaying(true);
      return;
    }

    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      void audio.play().catch(() => setMusicPlaying(false));
      setMusicPlaying(true);
    }
  };

  return (
    <div className={`royal-root ${revealed ? "revealed" : ""}`}>
      <RoyalStyles />
      <div className="fixed inset-0 -z-10">
        <img
          src="/images/walimabgmain.png"
          alt="Wedding background"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center bg-fixed"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,15,0.88),rgba(8,25,20,0.82),rgba(5,18,15,0.92))]" aria-hidden="true" />
      </div>
      <CurtainIntro
        initials={COUPLE_INITIALS}
        onOpened={() => {
          setRevealed(true);
          startMusic();
        }}
      />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={musicPlaying ? "Pause music" : "Play music"}
        className="fixed top-1/2 right-4 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(203,161,53,0.4)] bg-[rgba(18,32,25,0.9)] text-primary shadow-[0_8px_20px_rgba(203,161,53,0.2)] backdrop-blur transition hover:opacity-90"
      >
        {musicPlaying ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
      </button>

      <main className="mx-auto max-w-5xl px-5 pb-24 sm:px-8 italic">
        <Starfield />
        <section className="reveal reveal-1 relative pt-10 text-center sm:pt-16">
          <div
            className="panel-royal arch-top overflow-hidden relative !bg-[rgba(15,20,18,0.35)] border border-[rgba(212,175,55,0.45)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]"
            style={{ minHeight: "50vh" }}
          >
            <WalimaHeroBG />
            <div className="absolute inset-0 z-10" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
              <p className="text-primary text-[0.6rem] uppercase tracking-[0.45em] sm:text-xs">
                Bismillah · Together with our families
              </p>
              <h1 className="text-gold-gradient mt-5 text-5xl leading-none sm:text-7xl">
                {COUPLE_NAMES[0]} <span className="text-primary-70">&</span> {COUPLE_NAMES[1]}
              </h1>
              <Ornament />
              <p className="text-foreground-90 max-w-md text-sm sm:text-base">
                "Indeed, with every blessing comes gratitude."
              </p>
              <p className="text-primary mt-4 text-xl sm:text-2xl">
                {WEDDING_HEADLINE_DATE}
              </p>
            </div>
          </div>
        </section>

        <section className="reveal reveal-2 pt-20" aria-labelledby="countdown-heading">
          <h2 id="countdown-heading" className="text-gold-gradient text-center text-4xl">
            Scratch to Reveal
          </h2>
          <ScratchReveal />
          <h2 className="text-muted-foreground text-center text-[0.65rem] uppercase tracking-[0.45em] mt-8">
            The darbar opens in
          </h2>
          <div className="mt-8">
            <Countdown date={WEDDING_DATE} />
          </div>
        </section>

        <section className="reveal reveal-3 pt-24" aria-labelledby="events-heading">
          <h2 id="events-heading" className="text-gold-gradient text-center text-4xl">
            The Walima
          </h2>
          <Ornament />
          <div className="mx-auto mt-8 grid max-w-md gap-5">
            {EVENTS.map((event) => (
              <article
                key={event.name}
                className="panel-royal arch-top px-7 py-8 !bg-[rgba(15,20,18,0.12)] backdrop-blur-[10px] border border-[rgba(212,175,55,0.12)] hover:shadow-[0_8px_30px_rgba(203,161,53,0.06)]"
              >
                <span className="jali pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <h3 className="text-primary text-3xl">{event.name}</h3>
                  <p className="text-muted-foreground mt-3 text-xs uppercase tracking-[0.25em]">
                    {event.date}
                  </p>
                  <p className="text-foreground-90 mt-2 text-sm">{event.place}</p>
                  <p className="text-muted-foreground mt-4 text-sm italic">{event.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal reveal-4 pt-24" aria-labelledby="rsvp-heading" id="rsvp">
          <ArchDivider className="mx-auto mb-6 w-40 opacity-60 sm:w-52" />
          <h2 id="rsvp-heading" className="text-gold-gradient text-center text-4xl">
            Kindly Respond
          </h2>
          <p className="text-muted-foreground mt-3 text-center text-sm">
            {RSVP_DEADLINE}
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <RsvpForm />
          </div>
        </section>

        <section className="reveal reveal-5 pt-12" aria-labelledby="walima-details">
          <h2 id="walima-details" className="text-gold-gradient text-center text-4xl">Walima Details</h2>
          <div className="mx-auto mt-6 max-w-3xl">
            <div className="panel-royal arch-top px-6 py-8 !bg-[rgba(15,20,18,0.12)] backdrop-blur-[10px] border border-[rgba(212,175,55,0.12)]">
                  <p className="text-muted-foreground text-sm">{EVENTS[0].date}</p>
                  <p className="mt-2 font-display text-lg break-words">{EVENTS[0].place}</p>
                  <a href={WALIMA_MAP} target="_blank" rel="noreferrer" className="mt-4 inline-block text-primary underline">Open map</a>

                  <div className="mt-6 space-y-3">
                    {WALIMA_CONTACTS.map((c) => (
                      <div key={c.phone} className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center">
                        <div className="text-foreground whitespace-nowrap">{c.name}</div>
                        <a href={`tel:${c.phone}`} className="text-primary ml-0 sm:ml-4">{c.phone}</a>
                      </div>
                    ))}
                  </div>
                </div>

              <div className="mx-auto mt-8 max-w-3xl">
                <div className="overflow-hidden rounded-[0.5rem] border border-[rgba(212,175,55,0.12)]">
                  <iframe
                    title="Walima location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(EVENTS[0].place)}&output=embed`}
                    loading="lazy"
                    className="w-full h-72 border-0"
                  />
                </div>
              </div>
          </div>
        </section>

        <footer className="reveal pt-12 text-center">
          <Ornament />
          <p className="text-primary text-2xl">{COUPLE_NAMES[0]} & {COUPLE_NAMES[1]}</p>
          <p className="text-muted-foreground mt-2 text-xs uppercase tracking-[0.3em]">
            {WEDDING_HEADLINE_DATE}
          </p>
        </footer>
      </main>
    </div>
  );
}
