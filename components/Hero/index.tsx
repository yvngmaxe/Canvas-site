"use client";

import Image from "next/image";
import { useRef } from "react";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// 新しいキャッチコピーは検討中のため仮置き
const HERO_HEADLINE = "----";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const shouldReduceMotion = useReducedMotion();
  const staticOpacity = useMotionValue(1);
  const staticTranslateY = useMotionValue("0%");
  const staticOverlayOpacity = useMotionValue(0.6);

  const motionOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [1, 1, 0, 0]
  );
  const motionTranslateY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    ["0%", "0%", "-16%", "-24%"]
  );
  const motionOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0]);

  // Respect prefers-reduced-motion by falling back to static values.
  const textOpacity = shouldReduceMotion ? staticOpacity : motionOpacity;
  const textTranslateY = shouldReduceMotion
    ? staticTranslateY
    : motionTranslateY;
  const overlayOpacity = shouldReduceMotion
    ? staticOverlayOpacity
    : motionOverlayOpacity;

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center bg-black text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black"
          aria-hidden
        />
      </div>

      <motion.div
        style={{ opacity: textOpacity, y: textTranslateY }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-8"
      >
        <p
          className="inline-block text-sm uppercase tracking-[0.4em] text-[color:var(--accent-sub)]"
        >
          株式会社CANVAS
        </p>
        <h1 className="mt-6 text-[1.85rem] font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          <span className="block whitespace-nowrap sm:whitespace-normal transform translate-x-[0.45rem] sm:translate-x-0">
            {HERO_HEADLINE}
          </span>
        </h1>
      </motion.div>

      <ScrollIndicator />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20"
        aria-hidden
      >
        <svg
          className="h-12 w-full text-white sm:hidden"
          viewBox="0 0 375 60"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M375 20c-50 18-125 22-188 6s-120-18-187 4v30h375z"
          />
        </svg>
        <svg
          className="hidden h-24 w-full text-white sm:block"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path fill="currentColor" d="M0 0h1440v120H0z" opacity="0" />
          <path
            fill="currentColor"
            d="M1440 40c-192 36-480 44-722 12s-461-36-718 8v60h1440z"
          />
        </svg>
      </div>
    </section>
  );
}
