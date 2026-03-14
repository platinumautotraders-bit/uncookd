"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useScrollReveal, fadeInUp } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Brisbane, QLD",
    plan: "The Lean Machine",
    quote:
      "Finally a halal meal delivery that actually has quality meat. The portions are perfect and I love that I only need to cook -- no chopping, no measuring, nothing.",
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="bg-bg-dark px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className="min-w-0 flex-[0_0_100%] px-4"
                >
                  <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    <svg className="h-8 w-8 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                    <p className="mt-6 font-[family-name:var(--font-sora)] text-xl font-medium italic leading-relaxed text-white sm:text-2xl md:text-3xl">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-8">
                      <div className="text-sm font-semibold text-white">
                        {t.name}
                      </div>
                      <div className="mt-1 text-xs text-text-inverse-muted">
                        {t.location} / {t.plan}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-6 bg-brand-red"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
