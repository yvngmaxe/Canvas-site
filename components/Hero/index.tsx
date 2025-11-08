"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const HERO_HEADLINE = "自分の人生に確信を持つ。";

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
          className="inline-block text-sm uppercase tracking-[0.4em] bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--accent) 0%, #ff6f3c 45%, #ff9b4a 100%)",
          }}
        >
          株式会社CANVAS
        </p>
        <h1 className="mt-6 text-[1.85rem] font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          <span className="block whitespace-nowrap sm:whitespace-normal transform translate-x-[0.45rem] sm:translate-x-0">
            {HERO_HEADLINE}
          </span>
        </h1>
        <p className="mt-6 text-base text-slate-100 md:text-lg">
          見つける、選ぶ、信じる力へ。
          <br />
          偶然を、必然の選択に変えるキャリア教育
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="#lpservice-title"
            className="rounded-full bg-gradient-to-r from-[color:var(--accent)] via-[#ff6f3c] to-[#ff9b4a] px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_18px_40px_rgba(242,9,0,0.28)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, #ff6f3c 45%, #ff9b4a 100%)",
            }}
          >
            事業内容を見る
          </Link>
        </div>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20"
        aria-hidden
      >
        <svg
          className="h-24 w-full text-white"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path fill="currentColor" d="M0 0h1440v120H0z" opacity="0" />
          <path
            fill="currentColor"
            d="M0 32l40 8c40 8 120 24 200 32s160 8 240-8 160-48 240-53.3C800 5 880 27 960 45.3 1040 64 1120 80 1200 80s160-16 200-24l40-8v72H0z"
          />
        </svg>
      </div>
    </section>
  );
}
