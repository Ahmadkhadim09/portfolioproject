import { useState } from "react";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  /** Text shown inside the colored placeholder if the image is missing. */
  placeholderLabel?: string;
  /** Called when the image fails to load. */
  onBroken?: () => void;
};

/**
 * Local-first image. Point `src` at a file in /public (e.g. "/images/hero.jpg").
 * If the file doesn't exist yet, we render a colored placeholder in the same box,
 * so you can drop the real images into public/ later without touching any code.
 */
export function Img({ src, alt, placeholderLabel, className, ...rest }: ImgProps) {
  const [broken, setBroken] = useState(false);

  // Deterministic color from the src string so each slot gets its own tint.
  const hue = Array.from(src).reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 0);
  const bg = `hsl(${hue} 45% 22%)`;
  const fg = `hsl(${hue} 70% 55%)`;

  if (broken) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={className}
        style={{
          background: `linear-gradient(135deg, ${bg}, hsl(${(hue + 40) % 360} 40% 14%))`,
          color: fg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "0.75rem",
          textAlign: "center",
          padding: "0.5rem",
          letterSpacing: "0.02em",
        }}
      >
        {placeholderLabel ?? alt ?? "Image"}
      </div>
    );
  }

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        setBroken(true);
        onBroken?.();
      }}
    />
  );
}
