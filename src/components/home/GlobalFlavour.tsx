"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Badge } from "@/components/shared/Badge";
import { useScrollReveal, fadeInUp } from "@/hooks/useScrollReveal";
import { getCurrentGlobalFlavour } from "@/config/globalFlavors";

export function GlobalFlavour() {
  const { ref, isInView } = useScrollReveal();
  const current = getCurrentGlobalFlavour();

  return (
    <SectionWrapper>
      <motion.div
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="overflow-hidden rounded-2xl border border-border-light bg-gradient-to-br from-white to-bg-card"
      >
        <div className="grid md:grid-cols-2">
          <div className="p-8 sm:p-12">
            <Badge variant="premium" className="mb-4">
              Monthly Global Flavour
            </Badge>
            <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
              {current.name}
            </h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              {current.description}
            </p>

            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                Featured Meals
              </h4>
              <ul className="mt-3 space-y-2">
                {current.keyMeals.slice(0, 4).map((meal) => (
                  <li
                    key={meal}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {meal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href="/plan/global-flavour"
                className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-hover"
              >
                View This Month
              </Link>
              <span className="flex items-center text-sm text-text-secondary">
                Free for Premium members
              </span>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent" />
            <div className="flex h-full items-center justify-center bg-bg-card p-12">
              <div className="text-center">
                <div className="font-[family-name:var(--font-sora)] text-6xl font-extrabold text-brand-red/10">
                  {current.region.toUpperCase()}
                </div>
                <p className="mt-2 text-sm text-text-secondary">
                  New flavour every month
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
