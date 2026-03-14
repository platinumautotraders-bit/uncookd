"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useScrollReveal, staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Brisbane, QLD",
    plan: "The Lean Machine",
    quote:
      "Finally a halal meal delivery that actually has quality meat. The portions are perfect and I love that I only need to cook — no chopping, no measuring, nothing.",
  },
  {
    name: "Ahmed K.",
    location: "Logan, QLD",
    plan: "The Bulk Up",
    quote:
      "Been using Uncookd for 3 months now. The macros are spot on and the variety keeps it interesting. My wife uses the Classic plan and the kids actually eat everything.",
  },
  {
    name: "Priya R.",
    location: "Sydney, NSW",
    plan: "The Athlete",
    quote:
      "The carb cycling plan is exactly what I needed. Training days have the fuel and rest days keep it lean. Premium macro wizard is worth it alone.",
  },
  {
    name: "James T.",
    location: "Ipswich, QLD",
    plan: "Steak Night",
    quote:
      "Restaurant-quality steaks at home every night. The cuts are incredible and the garlic herb butter is dangerous. My air fryer has never worked harder.",
  },
];

export function Testimonials() {
  const { ref, isInView } = useScrollReveal();

  return (
    <SectionWrapper dark>
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
          What Our Members Say
        </h2>
        <p className="mt-3 text-text-inverse-muted">
          Real feedback from real kitchens.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-12 grid gap-6 sm:grid-cols-2"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeInUp}
            className="rounded-xl border border-border-dark bg-bg-card-dark p-6"
          >
            <p className="text-sm leading-relaxed text-text-inverse-muted">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">
                  {t.name}
                </div>
                <div className="text-xs text-text-inverse-muted">
                  {t.location}
                </div>
              </div>
              <span className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-medium text-brand-red">
                {t.plan}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
