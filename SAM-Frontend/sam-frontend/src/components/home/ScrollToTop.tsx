"use client";

import { useEffect, useState } from "react";

import {
AnimatePresence,
motion,
useReducedMotion,
} from "framer-motion";

export default function ScrollToTop() {
const [showScrollTop, setShowScrollTop] = useState(false);
const shouldReduceMotion = useReducedMotion();

useEffect(() => {
const handleScroll = () => {
setShowScrollTop(window.scrollY > 100);
};

handleScroll();

window.addEventListener("scroll", handleScroll, {
  passive: true,
});

return () => {
  window.removeEventListener("scroll", handleScroll);
};

}, []);

function scrollToTop() {
window.scrollTo({
top: 0,
behavior: shouldReduceMotion ? "auto" : "smooth",
});
}

return ( <AnimatePresence>
{showScrollTop && (
<motion.button
type="button"
onClick={scrollToTop}
aria-label="Back to top"
initial={
shouldReduceMotion
? false
: { opacity: 0, y: 12 }
}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: 12 }}
transition={{
duration: shouldReduceMotion ? 0 : 0.25,
ease: "easeOut",
}}
className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-red-900 text-xl text-white shadow-lg transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sam-deep-blue"
>
↑
</motion.button>
)} </AnimatePresence>
);
}
