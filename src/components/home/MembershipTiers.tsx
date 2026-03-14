"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { membershipTiers } from "@/config/membership";
import { useScrollReveal, staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export function MembershipTiers() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
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
          className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3"
        >
          {membershipTiers.map((tier) => {
            const isPremium = tier.highlighted;

            return (
              <motion.div
                key={tier.tier}
                variants={fadeInUp}
                className={cn(
                  "relative flex flex-col rounded-2xl p-8",
                  isPremium
                    ? "bg-bg-dark text-white shadow-2xl shadow-black/20 ring-1 ring-white/10"
                    : "bg-bg-card ring-1 ring-border-light"
                )}
              >
                {isPremium && (
                  <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b from-brand-red/20 via-transparent to-transparent blur-sm" />
                )}

                <div>
                  <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    {tier.price === 0 ? (
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-4xl font-bold">
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-4xl font-bold">
                          ${tier.price}
                        </span>
                        <span className={cn(
                          "text-sm",
                          isPremium ? "text-text-inverse-muted" : "text-text-secondary"
                        )}>
                          /mo
                        </span>
                      </>
                    )}
                  </div>
                  <p className={cn(
                    "mt-3 text-sm",
                    isPremium ? "text-text-inverse-muted" : "text-text-secondary"
                  )}>
                    {tier.description}
                  </p>
                </div>

                <div className="mt-8 flex-1">
                  <div className="space-y-3">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-sm">
                        <span className={cn(
                          "mt-1.5 h-1 w-1 shrink-0 rounded-full",
                          isPremium ? "bg-brand-red" : "bg-foreground/30"
                        )} />
                        <span className={isPremium ? "text-white/80" : "text-text-secondary"}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/plans"
                    className={cn(
                      "flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition-all",
                      isPremium
                        ? "bg-brand-red text-white hover:bg-brand-red-hover"
                        : tier.tier === "free"
                          ? "bg-transparent text-foreground ring-1 ring-border-light hover:bg-white"
                          : "bg-foreground text-white hover:bg-foreground/90"
                    )}
                  >
                    {tier.ctaText}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
