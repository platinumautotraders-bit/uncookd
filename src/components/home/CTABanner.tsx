"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal, fadeInUp } from "@/hooks/useScrollReveal";

export function CTABanner() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="bg-brand-red px-4 py-20 sm:px-6">
      <motion.div
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-[1280px] text-center"
      >
        <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Start Cooking?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Browse for free. Join to order. Premium for the full experience.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/plans"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-brand-red transition-colors hover:bg-white/90"
          >
            Browse Plans
          </Link>
          <Link
            href="/builder"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10"
          >
            Build Your Own
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
