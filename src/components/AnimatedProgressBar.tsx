import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedProgressBarProps {
    value: number;
    className?: string;
    delay?: number;
}

export function AnimatedProgressBar({ value, className, delay = 0 }: AnimatedProgressBarProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

    return (
        <div ref={ref} className={`h-2.5 overflow-hidden rounded-full bg-white/[0.06] ${className || ""}`}>
            <motion.div
                className="h-full rounded-full"
                style={{
                    background: "linear-gradient(90deg, #7C3AED 0%, #3B82F6 50%, #22D3EE 100%)",
                    boxShadow: "0 0 12px rgba(124, 58, 237, 0.4)",
                }}
                initial={{ width: "0%" }}
                animate={isInView ? { width: `${value}%` } : { width: "0%" }}
                transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
            />
        </div>
    );
}
