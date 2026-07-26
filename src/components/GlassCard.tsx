import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    hoverGlow?: boolean;
    glowColor?: string;
}

export function GlassCard({
    children,
    className = "",
    hoverGlow = true,
    glowColor,
    ...props
}: GlassCardProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            className={`glass-card ${hoverGlow ? "glass-card-hover" : ""} ${className}`}
            whileHover={
                shouldReduceMotion
                    ? {}
                    : {
                        y: -6,
                        scale: 1.01,
                    }
            }
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
