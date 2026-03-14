"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useScrollReveal, fadeInUp } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Browse and Choose",
    description:
      "Pick from 10 pre-set meal plans designed for specific goals — fat loss, muscle gain, balanced family meals, and more. Or use the meal builder to create your own custom meals. Filter by cooking method, protein type, dietary needs, or calorie target.",
    image: "/images/step-browse.jpg",
  },
  {
    number: "02",
    title: "Select Your Options",
    description:
      "Choose your plan duration (3, 5, or 7 days), serving size (1, 2, or family of 4), and any add-ons like side sauces or salads. Premium members can set exact macro targets and swap ingredients.",
    image: "/images/step-options.jpg",
  },
  {
    number: "03",
    title: "We Source and Prep",
    description:
      "We source halal-certified, butcher-quality proteins and fresh seasonal vegetables. Every ingredient is portioned to your exact plan, sealed for freshness, and packed with a recipe card. Sauces and marinades come pre-made in sealed pouches.",
    image: "/images/step-prep.jpg",
  },
  {
    number: "04",
    title: "Fresh Delivery",
    description:
      "Your box is delivered fresh to your door within our 50km delivery zones — Underwood QLD and Sydney NSW. Standard delivery windows or choose your exact 1-hour slot with Premium.",
    image: "/images/step-delivery.jpg",
  },
  {
    number: "05",
    title: "You Cook",
    description:
      "Open your box, follow the recipe card or in-app cooking guide. Most meals take 15-20 minutes. Air fryer, oven, or pan — your choice. Zero prep. You only cook.",
    image: "/images/step-cook.jpg",
  },
];

const faqs = [
  {
    question: "What does halal certified mean?",
    answer:
      "All our proteins and ingredients are sourced from halal-certified suppliers. This means the meat is prepared according to Islamic dietary guidelines. Halal certification is a core pillar of our brand — every product we deliver carries this certification.",
  },
  {
    question: "How is the food packaged?",
    answer:
      "Each ingredient is individually portioned and sealed for freshness. Proteins are vacuum-sealed, vegetables are in fresh-seal bags, and sauces come in sealed pouches. Everything is labelled with the meal name, ingredients, and allergens.",
  },
  {
    question: "What if I have allergies?",
    answer:
      "Every meal clearly displays all allergens. You can filter plans and meals by dietary requirements — gluten-free, dairy-free, and lactose-free options are available. The meal builder lets you choose exactly what goes into your meals.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "We deliver within 50km of Underwood QLD (Mon/Wed/Fri) and Sydney NSW (Tue/Thu/Sat). Orders placed before 6pm are delivered on the next available delivery day. Premium members can choose their exact 1-hour delivery window.",
  },
  {
    question: "Can I skip a month?",
    answer:
      "Your membership is monthly. You can pause or cancel at any time through your account settings. Pausing keeps your preferences and favourites saved for when you return.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancel anytime. No lock-in contracts. If you cancel mid-month, you keep access until the end of your billing period. Meal orders already placed and paid for will still be delivered.",
  },
  {
    question: "Do you deliver to my area?",
    answer:
      "We currently deliver within 50km of Underwood, QLD and across the Sydney metro area in NSW. Enter your postcode at checkout to confirm coverage. We are expanding to new areas regularly.",
  },
  {
    question: "How are macros calculated?",
    answer:
      "All nutrition information is calculated from the actual ingredients in each meal, including sauces and marinades. Premium members can use our AI Macro Wizard for personalised daily targets based on their body composition and goals.",
  },
];

function StepSection({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const { ref, isInView } = useScrollReveal();
  const isEven = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
    >
      {/* Image side */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: isEven ? 40 : -40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
          },
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-neutral-100",
          isEven ? "lg:order-2" : "lg:order-1"
        )}
      >
        <div className="aspect-[4/3]">
          {/* Gradient overlay with step number */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-6 left-6">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-6xl font-bold text-white/20">
              {step.number}
            </span>
          </div>
          {/* Placeholder gradient for missing images */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-neutral-200" />
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: isEven ? -40 : 40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
          },
        }}
        className={cn(isEven ? "lg:order-1" : "lg:order-2")}
      >
        <div className="mb-3 inline-flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-white">
            {step.number}
          </span>
          <div className="h-px w-8 bg-brand-red/30" />
        </div>
        <h2 className="mb-4 font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight lg:text-4xl">
          {step.title}
        </h2>
        <p className="text-lg leading-relaxed text-text-secondary">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

function FAQItem({ faq }: { faq: (typeof faqs)[number] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-dark">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span className="text-base font-semibold text-white pr-4 transition-colors group-hover:text-brand-red">
          {faq.question}
        </span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-dark text-text-inverse-muted transition-all duration-300",
            isOpen && "rotate-45 border-brand-red bg-brand-red text-white"
          )}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-text-inverse-muted leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero header */}
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-red/10 px-4 py-1.5 text-sm font-semibold text-brand-red">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            5 simple steps
          </div>
          <h1 className="font-[family-name:var(--font-sora)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            How Uncookd Works
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Premium halal-certified ingredients, prepped and portioned. You only
            cook.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* Steps — alternating layout */}
      <div className="space-y-0">
        {steps.map((step, index) => (
          <SectionWrapper key={step.number} dark={index % 2 === 1}>
            <StepSection step={step} index={index} />
          </SectionWrapper>
        ))}
      </div>

      {/* FAQ */}
      <SectionWrapper dark>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-10 text-center">
            <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-text-inverse-muted">
              Everything you need to know about Uncookd.
            </p>
          </div>

          <div>
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </motion.div>
      </SectionWrapper>
    </>
  );
}
