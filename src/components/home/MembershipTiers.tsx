"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useScrollReveal, staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";
import { membershipTiers } from "@/config/membership";
import { cn } from "@/lib/utils";

export function MembershipTiers() {
  const { ref, isInView } = useScrollReveal();

  return (
    <SectionWrapper>
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
          Choose Your Membership
        </h2>
        <p className="mt-3 text-text-secondary">
          Free to browse. Join to order. Premium for the full experience.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3"
      >
        {membershipTiers.map((tier) => (
          <motion.div
            key={tier.tier}
            variants={fadeInUp}
            className={cn(
              "relative rounded-xl border p-6",
              tier.highlighted
                ? "border-brand-red bg-brand-red/5 shadow-lg shadow-brand-red/10"
                : "border-border-light bg-white"
            )}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-red px-3 py-0.5 text-xs font-semibold text-white">
                Most Popular
              </div>
            )}

            <div className="text-center">
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold">
                {tier.name}
              </h3>
              <div className="mt-3">
                {tier.price === 0 ? (
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-3xl font-bold">
                    Free
                  </span>
                ) : (
                  <>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-3xl font-bold">
                      ${tier.price}
                    </span>
                    <span className="text-sm text-text-secondary">/mo</span>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs text-text-secondary">
                {tier.description}
              </p>
            </div>

            <ul className="mt-6 space-y-2.5">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <svg
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      tier.highlighted ? "text-brand-red" : "text-brand-green"
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                href={tier.tier === "free" ? "/plans" : "/plans"}
                className={cn(
                  "flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                  tier.highlighted
                    ? "bg-brand-red text-white hover:bg-brand-red-hover"
                    : tier.tier === "free"
                    ? "border border-border-light text-foreground hover:bg-gray-50"
                    : "bg-foreground text-white hover:bg-foreground/90"
                )}
              >
                {tier.ctaText}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
