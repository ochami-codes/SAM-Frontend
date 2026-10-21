"use client";

import type { ReactNode } from "react";

import {
motion,
useReducedMotion,
} from "framer-motion";

interface FadeInProps {
children: ReactNode;
className?: string;
delay?: number;
}

export default function FadeIn({
children,
className,
delay = 0,
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
y: 16,
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
duration: shouldReduceMotion ? 0 : 0.6,
delay: shouldReduceMotion ? 0 : delay,
ease: "easeOut",
}}
>
{children}
</motion.div>
);
}
