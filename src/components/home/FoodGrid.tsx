"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";

const meals = [
  { name: "Teriyaki Beef Bowl", image: "/images/meals/teriyaki-beef-bowl.png", large: true },
  { name: "Peri Peri Chicken", image: "/images/meals/peri-peri-chicken.png", large: false },
  { name: "Lamb Cutlets", image: "/images/meals/lamb-cutlets-med.png", large: false },
  { name: "Coconut Curry", image: "/images/meals/coconut-curry.png", large: false },
  { name: "Korean Bulgogi", image: "/images/meals/korean-bulgogi.png", large: false },
  { name: "Sirloin with Herb Butter", image: "/images/meals/sirloin-herb-butter.png", large: true },
];

export function FoodGrid() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          What&apos;s Cooking
        </motion.h2>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2"
        >
          {meals.map((meal, i) => (
            <motion.div
              key={meal.name}
              variants={fadeInUp}
              className={`group relative overflow-hidden rounded-2xl ${
                meal.large
                  ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                  : "aspect-square"
              }`}
            >
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={meal.large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/50" />
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <span className="font-[family-name:var(--font-sora)] text-sm font-semibold text-white sm:text-base">
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
