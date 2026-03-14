"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { HalalBadge } from "@/components/shared/HalalBadge";
import { useScrollReveal, staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";

const values = [
  {
    title: "Halal Certified",
    description:
      "Every single ingredient we deliver is halal certified. This is not an afterthought — it is a founding principle. We partner exclusively with halal-certified suppliers and maintain full traceability.",
  },
  {
    title: "Butcher Quality",
    description:
      "We source our proteins from premium Australian suppliers. The same cuts you would choose at a quality butcher — ribeye, fillet, lamb cutlets, chicken breast — portioned and sealed for you.",
  },
  {
    title: "Zero Prep",
    description:
      "You do zero preparation. Every ingredient arrives pre-cut, pre-portioned, and pre-measured. Sauces and marinades come pre-made in sealed pouches. You only cook.",
  },
  {
    title: "Macro Optimised",
    description:
      "Every meal is designed with precise macronutrient targets. Whether you are cutting, bulking, or maintaining — the numbers are calculated and the portions are exact.",
  },
  {
    title: "Fresh, Not Frozen",
    description:
      "We deliver fresh, never frozen. Our proteins are vacuum-sealed for maximum freshness, vegetables are packed on delivery day, and sauces are made in small batches.",
  },
  {
    title: "Sugar Free Sauces",
    description:
      "All 12 of our core sauces and marinades are sugar-free, made from natural, healthy ingredients. No artificial sweeteners, no hidden sugars. Just real flavour.",
  },
];

export default function AboutPage() {
  const { ref, isInView } = useScrollReveal();

  return (
    <>
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <HalalBadge size="lg" className="mb-6" />
          <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The Uncookd Story
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">
            We started Uncookd because we could not find what we were looking for: premium, halal-certified raw ingredients delivered with the convenience of a meal kit and the quality of a local butcher. No pre-cooked, reheated meals. No flavourless diet food. Real ingredients, real recipes, real cooking — without the prep.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            Every box from Uncookd contains butcher-quality proteins, fresh seasonal vegetables, perfectly portioned carbs, and our signature sugar-free sauces. All halal certified. All you need to do is cook.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper dark>
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight">
            What We Stand For
          </h2>
          <p className="mt-3 text-text-inverse-muted">
            Six principles that guide everything we do.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              className="rounded-xl border border-border-dark bg-bg-card-dark p-6"
            >
              <h3 className="font-[family-name:var(--font-sora)] text-lg font-bold text-white">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-inverse-muted">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight">
            Where We Deliver
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            We currently deliver within 50km of our headquarters in Underwood, Queensland and across the Sydney metro area in New South Wales. Expanding to new markets soon.
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <div className="font-[family-name:var(--font-sora)] text-xl font-bold">
                Underwood, QLD
              </div>
              <div className="text-sm text-text-secondary">
                Mon / Wed / Fri
              </div>
            </div>
            <div className="h-12 w-px bg-border-light" />
            <div className="text-center">
              <div className="font-[family-name:var(--font-sora)] text-xl font-bold">
                Sydney, NSW
              </div>
              <div className="text-sm text-text-secondary">
                Tue / Thu / Sat
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper dark>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-4 text-text-inverse-muted">
            Questions, feedback, or partnership enquiries — we would love to hear from you.
          </p>
          <div className="mt-6 space-y-2 text-text-inverse-muted">
            <p>hello@uncookd.com.au</p>
            <p>Underwood, Queensland, Australia</p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
