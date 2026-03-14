"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    label: "Choose",
    description: "Pick a plan or build your own",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    label: "Delivered",
    description: "Fresh to your door, portioned and sealed",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: "Cook",
    description: "15-20 min, follow the recipe",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
];

export function HowItWorksPreview() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="bg-bg-dark px-4 py-6 sm:px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-[1280px] items-center justify-center"
      >
        <div className="flex w-full items-center justify-center gap-4 sm:gap-6 md:gap-10">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4 sm:gap-6 md:gap-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60">
                  {step.icon}
                </div>
                <div>
                  <div className="font-[family-name:var(--font-sora)] text-sm font-semibold text-white">
                    {step.label}
                  </div>
                  <div className="hidden text-xs text-text-inverse-muted sm:block">
                    {step.description}
                  </div>
                </div>
              </div>

              {i < steps.length - 1 && (
                <div className="flex items-center">
                  <div className="h-px w-8 bg-white/15 sm:w-12 md:w-16" />
                  <svg className="h-3 w-3 shrink-0 text-white/15" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
