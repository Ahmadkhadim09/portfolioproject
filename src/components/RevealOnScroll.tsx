import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "left" | "right" | "none";
}

export function RevealOnScroll({ children, delay = 0, direction = "up", className, ...props }: RevealOnScrollProps) {
    const shouldReduceMotion = useReducedMotion();

    let initialOffet = { x: 0, y: 0 };
    if (direction === "up") initialOffet.y = 60;
    if (direction === "left") initialOffet.x = -60;
    if (direction === "right") initialOffet.x = 60;

    const initial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, ...initialOffet, scale: 0.96 };
    const whileInView = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1 };

    return (
        <motion.div
            className={className}
            initial={initial}
            whileInView={whileInView}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

