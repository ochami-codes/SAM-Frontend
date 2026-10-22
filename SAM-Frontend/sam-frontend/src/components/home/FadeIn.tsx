"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
children: ReactNode;
className?: string;
delay?: number;
duration?: number;
distance?: number;
}

export default function FadeIn({
children,
className,
delay = 0,
duration = 0.6,
distance = 16,
}: FadeInProps) {
const shouldReduceMotion = useReducedMotion();

return (
<motion.div
className={className}
initial={
shouldReduceMotion
? false
: {
opacity: 0,
y: distance,
}
}
whileInView={{
opacity: 1,
y: 0,
}}
viewport={{
once: true,
amount: 0.15,
}}
transition={{
duration: shouldReduceMotion ? 0 : duration,
delay: shouldReduceMotion ? 0 : delay,
ease: "easeOut",
}}
>
{children}
</motion.div>
);
}
