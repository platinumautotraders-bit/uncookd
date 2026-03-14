"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HalalBadge } from "@/components/shared/HalalBadge";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-bg-dark">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-bg-dark/95 to-bg-dark/80" />

      <div className="relative mx-auto max-w-[1280px] px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <HalalBadge size="md" className="mb-6" />

          <h1 className="font-[family-name:var(--font-sora)] text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Prepped. Portioned.{" "}
            <span className="text-brand-red">Ready to Cook.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-inverse-muted">
            Premium halal-certified raw ingredients delivered to your door.
            Butcher-quality proteins, fresh vegetables, and pre-made sauces —
            all portioned with recipes included. Zero prep. You only cook.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-lg bg-brand-red px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-red-hover"
            >
              Browse Plans
            </Link>
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Build Your Own
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-text-inverse-muted">
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Halal Certified
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Zero Prep
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Fresh Delivery
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
