"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useScrollReveal, staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Choose Your Plan",
    description:
      "Pick from 10 pre-set meal plans or build your own. Filter by goal, protein, dietary needs, or cooking method.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We Deliver Fresh",
    description:
      "Halal-certified proteins, fresh vegetables, carbs, and pre-made sauces — all portioned and sealed. Delivered to your door.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "You Cook",
    description:
      "Follow the recipe card or in-app guide. 15-20 minutes, most meals. Air fryer, oven, or pan — your choice.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
];

export function HowItWorksPreview() {
  const { ref, isInView } = useScrollReveal();

  return (
    <SectionWrapper>
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
          How It Works
        </h2>
        <p className="mt-3 text-text-secondary">
          Three simple steps. Fresh ingredients. You cook.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-12 grid gap-8 md:grid-cols-3"
      >
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={fadeInUp}
            className="relative rounded-xl border border-border-light p-8 text-center transition-shadow hover:shadow-lg"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
              {step.icon}
            </div>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold text-brand-red">
              STEP {step.number}
            </span>
            <h3 className="mt-2 font-[family-name:var(--font-sora)] text-xl font-bold">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 text-center">
        <Link
          href="/how-it-works"
          className="text-sm font-semibold text-brand-red transition-colors hover:text-brand-red-hover"
        >
          Learn more about how it works &rarr;
        </Link>
      </div>
    </SectionWrapper>
  );
}
