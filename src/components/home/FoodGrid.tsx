"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";

const meals = [
  { name: "Teriyaki Beef Bowl", image: "/images/meals/teriyaki-beef-bowl.png" },
  { name: "Peri-Peri Chicken", image: "/images/meals/peri-peri-chicken.png" },
  { name: "Herb-Crusted Lamb", image: "/images/meals/lamb-cutlets-med.png" },
  { name: "Coconut Curry", image: "/images/meals/coconut-curry.png" },
  { name: "Korean Bulgogi", image: "/images/meals/korean-bulgogi.png" },
  { name: "BBQ Drumsticks", image: "/images/meals/bbq-drumsticks.png" },
];

export function FoodGrid() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="bg-bg-dark px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            What&apos;s <span className="bg-gradient-to-r from-brand-red to-red-400 bg-clip-text text-transparent">Cooking</span>
          </h2>
          <p className="mt-3 max-w-md text-base text-text-inverse-muted sm:text-lg">
            Every meal photographed is one you can order. Real food, real portions, real flavour.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:auto-rows-[280px]"
        >
          {meals.map((meal, i) => (
            <motion.div
              key={meal.name}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/50" />
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <span className="font-[family-name:var(--font-sora)] text-sm font-bold text-white sm:text-base">
                  {meal.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
