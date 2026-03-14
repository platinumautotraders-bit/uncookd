"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/hero-flat-lay.png"
        alt="Five premium meals arranged on dark slate"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={90}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      <div className="relative flex h-full flex-col items-center justify-end pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="px-4"
        >
          <h1 className="font-[family-name:var(--font-sora)] text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Prepped. Portioned.
            <br />
            <span className="text-gradient-red">Ready to Cook.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-md text-lg text-white/70 sm:text-xl"
          >
            Premium raw ingredients delivered. You only cook.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
            className="mt-10"
          >
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-lg bg-brand-red px-10 py-4 text-base font-semibold text-white transition-all hover:bg-brand-red-hover hover:scale-[1.02]"
            >
              Explore Our Plans
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-8"
        >
          <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/30 p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
