"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { HalalBadge } from "@/components/shared/HalalBadge";
import { useScrollReveal, staggerContainer, fadeInUp } from "@/hooks/useScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    number: "01",
    title: "Browse and Choose",
    description: "Pick from 10 pre-set meal plans designed for specific goals — fat loss, muscle gain, balanced family meals, and more. Or use the meal builder to create your own custom meals. Filter by cooking method, protein type, dietary needs, or calorie target.",
  },
  {
    number: "02",
    title: "Select Your Options",
    description: "Choose your plan duration (3, 5, or 7 days), serving size (1, 2, or family of 4), and any add-ons like side sauces or salads. Premium members can set exact macro targets and swap ingredients.",
  },
  {
    number: "03",
    title: "We Source and Prep",
    description: "We source halal-certified, butcher-quality proteins and fresh seasonal vegetables. Every ingredient is portioned to your exact plan, sealed for freshness, and packed with a recipe card. Sauces and marinades come pre-made in sealed pouches.",
  },
  {
    number: "04",
    title: "Fresh Delivery",
    description: "Your box is delivered fresh to your door within our 50km delivery zones — Underwood QLD and Sydney NSW. Standard delivery windows or choose your exact 1-hour slot with Premium.",
  },
  {
    number: "05",
    title: "You Cook",
    description: "Open your box, follow the recipe card or in-app cooking guide. Most meals take 15-20 minutes. Air fryer, oven, or pan — your choice. Zero prep. You only cook.",
  },
];

const faqs = [
  {
    question: "What does halal certified mean?",
    answer: "All our proteins and ingredients are sourced from halal-certified suppliers. This means the meat is prepared according to Islamic dietary guidelines. Halal certification is a core pillar of our brand — every product we deliver carries this certification.",
  },
  {
    question: "How is the food packaged?",
    answer: "Each ingredient is individually portioned and sealed for freshness. Proteins are vacuum-sealed, vegetables are in fresh-seal bags, and sauces come in sealed pouches. Everything is labelled with the meal name, ingredients, and allergens.",
  },
  {
    question: "What if I have allergies?",
    answer: "Every meal clearly displays all allergens. You can filter plans and meals by dietary requirements — gluten-free, dairy-free, and lactose-free options are available. The meal builder lets you choose exactly what goes into your meals.",
  },
  {
    question: "How long does delivery take?",
    answer: "We deliver within 50km of Underwood QLD (Mon/Wed/Fri) and Sydney NSW (Tue/Thu/Sat). Orders placed before 6pm are delivered on the next available delivery day. Premium members can choose their exact 1-hour delivery window.",
  },
  {
    question: "Can I skip a month?",
    answer: "Your membership is monthly. You can pause or cancel at any time through your account settings. Pausing keeps your preferences and favourites saved for when you return.",
  },
  {
    question: "What is the cancellation policy?",
    answer: "Cancel anytime. No lock-in contracts. If you cancel mid-month, you keep access until the end of your billing period. Meal orders already placed and paid for will still be delivered.",
  },
  {
    question: "Do you deliver to my area?",
    answer: "We currently deliver within 50km of Underwood, QLD and across the Sydney metro area in NSW. Enter your postcode at checkout to confirm coverage. We are expanding to new areas regularly.",
  },
  {
    question: "How are macros calculated?",
    answer: "All nutrition information is calculated from the actual ingredients in each meal, including sauces and marinades. Premium members can use our AI Macro Wizard for personalised daily targets based on their body composition and goals.",
  },
];

export default function HowItWorksPage() {
  const { ref, isInView } = useScrollReveal();

  return (
    <>
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <HalalBadge size="md" className="mb-4" />
          <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
            How Uncookd Works
          </h1>
          <p className="mt-3 text-lg text-text-secondary">
            Premium halal-certified ingredients, prepped and portioned. You only cook.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mt-16 max-w-3xl space-y-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              className="flex gap-6"
            >
              <div className="flex shrink-0 flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-white">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="mt-2 h-full w-px bg-border-light" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold">
                  {step.title}
                </h3>
                <p className="mt-2 text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>

          <Accordion className="mt-10">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} className="border-border-dark">
                <AccordionTrigger className="text-left text-base font-semibold text-white hover:text-brand-red hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-inverse-muted leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionWrapper>
    </>
  );
}
