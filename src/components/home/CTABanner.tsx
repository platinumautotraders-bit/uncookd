"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal, fadeInUp } from "@/hooks/useScrollReveal";

export function CTABanner() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/meals/sirloin-herb-butter.png"
          alt="Premium sirloin with herb butter"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <motion.div
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto flex max-w-[1280px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32"
      >
        <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Ready to Start Cooking?
        </h2>
        <Link
          href="/plans"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-red px-10 py-4 text-base font-semibold text-white transition-all hover:bg-brand-red-hover hover:scale-[1.02]"
        >
          Explore Our Plans
        </Link>
      </motion.div>
    </section>
  );
}
