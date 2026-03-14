"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-[family-name:var(--font-jetbrains-mono)] text-4xl font-bold text-brand-red sm:text-5xl md:text-6xl">
      {display.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 154, suffix: "", label: "Unique Meals", description: "Across 10 goal-driven plans" },
  { value: 12, suffix: "", label: "Signature Sauces", description: "Sugar-free, all-natural" },
  { value: 15, suffix: "min", label: "Average Cook Time", description: "Zero prep, you only cook" },
  { value: 100, suffix: "%", label: "Halal Certified", description: "Every single ingredient" },
];

export function ImpactStats() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Built for <span className="text-gradient-red">Results</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-text-secondary sm:text-lg">
            Every ingredient, every portion, every macro calculated to help you hit your goals without spending hours in the kitchen.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <div className="mt-2 font-[family-name:var(--font-sora)] text-sm font-semibold">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-text-secondary">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Raw ingredients showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          <div className="relative overflow-hidden rounded-2xl md:col-span-2">
            <div className="aspect-[2/1]">
              <Image
                src="/images/raw/ingredients-flat-lay.png"
                alt="Pre-portioned raw ingredients laid out"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-widest text-white/50">
                  What arrives at your door
                </span>
                <h3 className="mt-2 max-w-sm font-[family-name:var(--font-sora)] text-xl font-bold text-white sm:text-2xl">
                  Vacuum-sealed proteins. Pre-portioned veg. Sauce pouches included.
                </h3>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="aspect-[3/2]">
                <Image
                  src="/images/raw/raw-lamb-cutlets.png"
                  alt="Premium raw lamb cutlets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-sm font-semibold text-white">Butcher-quality cuts</span>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <div className="aspect-[3/2]">
                <Image
                  src="/images/raw/raw-chicken-prep.png"
                  alt="Raw chicken with pre-portioned vegetables"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-sm font-semibold text-white">Pre-portioned and sealed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
