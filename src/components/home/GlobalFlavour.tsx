"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCurrentGlobalFlavour } from "@/config/globalFlavors";
import { useScrollReveal, fadeInUp } from "@/hooks/useScrollReveal";

const monthNames = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export function GlobalFlavour() {
  const { ref, isInView } = useScrollReveal();
  const current = getCurrentGlobalFlavour();
  const monthName = monthNames[current.month - 1] || monthNames[new Date().getMonth()];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/plans/global-flavour.png"
          alt={current.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <motion.div
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto flex max-w-[1280px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-32"
      >
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-widest text-white/50">
          {monthName} Global Flavour
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-sora)] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {current.name}
        </h2>
        <p className="mt-4 max-w-lg text-base text-white/60 sm:text-lg">
          {current.description.split(".")[0]}.
        </p>
        <Link
          href="/plan/global-flavour"
          className="mt-8 inline-flex items-center justify-center rounded-lg border-2 border-white/20 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
        >
          Explore This Month
        </Link>
      </motion.div>
    </section>
  );
}
