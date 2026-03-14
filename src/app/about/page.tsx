"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const values = [
  {
    title: "Halal Certified",
    description:
      "Every single ingredient we deliver is halal certified. This is not an afterthought — it is a founding principle. We partner exclusively with halal-certified suppliers and maintain full traceability.",
    accent: "brand-red",
  },
  {
    title: "Butcher Quality",
    description:
      "We source our proteins from premium Australian suppliers. The same cuts you would choose at a quality butcher — ribeye, fillet, lamb cutlets, chicken breast — portioned and sealed for you.",
    accent: "brand-red",
  },
  {
    title: "Zero Prep",
    description:
      "You do zero preparation. Every ingredient arrives pre-cut, pre-portioned, and pre-measured. Sauces and marinades come pre-made in sealed pouches. You only cook.",
    accent: "brand-green",
  },
  {
    title: "Macro Optimised",
    description:
      "Every meal is designed with precise macronutrient targets. Whether you are cutting, bulking, or maintaining — the numbers are calculated and the portions are exact.",
    accent: "brand-green",
  },
  {
    title: "Fresh, Not Frozen",
    description:
      "We deliver fresh, never frozen. Our proteins are vacuum-sealed for maximum freshness, vegetables are packed on delivery day, and sauces are made in small batches.",
    accent: "brand-red",
  },
  {
    title: "Sugar Free Sauces",
    description:
      "All 12 of our core sauces and marinades are sugar-free, made from natural, healthy ingredients. No artificial sweeteners, no hidden sugars. Just real flavour.",
    accent: "brand-green",
  },
];

function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-border-dark bg-bg-card-dark p-6 transition-all duration-300 hover:border-neutral-600 hover:shadow-2xl hover:shadow-white/5"
    >
      {/* Subtle glow on hover */}
      <div
        className={cn(
          "absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
          value.accent === "brand-red"
            ? "bg-brand-red/10"
            : "bg-brand-green/10"
        )}
      />

      {/* Accent line at top */}
      <div
        className={cn(
          "mb-5 h-1 w-10 rounded-full",
          value.accent === "brand-red" ? "bg-brand-red" : "bg-brand-green"
        )}
      />

      <h3 className="relative font-[family-name:var(--font-sora)] text-lg font-bold text-white">
        {value.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-text-inverse-muted">
        {value.description}
      </p>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero story section with dramatic opening */}
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-red/10 px-4 py-1.5 text-sm font-semibold text-brand-red">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            Our Story
          </div>
          <h1 className="font-[family-name:var(--font-sora)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The Uncookd Story
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-text-secondary">
            We started Uncookd because we could not find what we were looking
            for: premium, halal-certified raw ingredients delivered with the
            convenience of a meal kit and the quality of a local butcher. No
            pre-cooked, reheated meals. No flavourless diet food. Real
            ingredients, real recipes, real cooking — without the prep.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            Every box from Uncookd contains butcher-quality proteins, fresh
            seasonal vegetables, perfectly portioned carbs, and our signature
            sugar-free sauces. All halal certified. All you need to do is cook.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* Values section — dark with glowing cards */}
      <SectionWrapper dark>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
              What We Stand For
            </h2>
            <p className="mt-3 text-text-inverse-muted">
              Six principles that guide everything we do.
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>
      </SectionWrapper>

      {/* Delivery zones — clean with visual weight */}
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
            Where We Deliver
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            We currently deliver within 50km of our headquarters in Underwood,
            Queensland and across the Sydney metro area in New South Wales.
            Expanding to new markets soon.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border-light bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10">
                <svg
                  className="h-6 w-6 text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div className="font-[family-name:var(--font-sora)] text-xl font-bold">
                Underwood, QLD
              </div>
              <div className="mt-1 text-sm text-text-secondary">
                Mon / Wed / Fri
              </div>
              <div className="mt-2 text-xs text-text-secondary">
                50km delivery radius
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border-light bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10">
                <svg
                  className="h-6 w-6 text-brand-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div className="font-[family-name:var(--font-sora)] text-xl font-bold">
                Sydney, NSW
              </div>
              <div className="mt-1 text-sm text-text-secondary">
                Tue / Thu / Sat
              </div>
              <div className="mt-2 text-xs text-text-secondary">
                Sydney metro area
              </div>
            </motion.div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Contact — dark, minimal */}
      <SectionWrapper dark>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-text-inverse-muted">
            Questions, feedback, or partnership enquiries — we would love to hear
            from you.
          </p>
          <div className="mt-8">
            <a
              href="mailto:hello@uncookd.com.au"
              className="group inline-flex items-center gap-3 rounded-full border border-border-dark bg-white/5 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:border-brand-red hover:bg-brand-red/10 hover:text-brand-red"
            >
              <svg
                className="h-5 w-5 text-text-inverse-muted transition-colors group-hover:text-brand-red"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              hello@uncookd.com.au
            </a>
          </div>
          <p className="mt-4 text-sm text-text-inverse-muted">
            Underwood, Queensland, Australia
          </p>
        </motion.div>
      </SectionWrapper>
    </>
  );
}
