"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { allPlans } from "@/config/plans";
import { useScrollReveal, fadeInUp } from "@/hooks/useScrollReveal";

export function FoodShowcase() {
  const { ref, isInView } = useScrollReveal();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Find Your Plan
            </h2>
            <p className="mt-2 text-text-secondary">
              10 plans built for every goal and palate.
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light transition-colors hover:bg-gray-50"
              aria-label="Previous plan"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light transition-colors hover:bg-gray-50"
              aria-label="Next plan"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </motion.div>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {allPlans.map((plan) => (
              <Link
                key={plan.slug}
                href={`/plan/${plan.slug}`}
                className="group relative min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  {plan.heroImage && (
                    <Image
                      src={plan.heroImage}
                      alt={plan.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 32vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-white sm:text-xl">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">
                      {plan.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand-red"
          >
            View All Plans
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
