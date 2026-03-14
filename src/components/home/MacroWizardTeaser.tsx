"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Badge } from "@/components/shared/Badge";
import { useScrollReveal, fadeInUp } from "@/hooks/useScrollReveal";

export function MacroWizardTeaser() {
  const { ref, isInView } = useScrollReveal();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  return (
    <SectionWrapper dark>
      <motion.div
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="text-center">
          <Badge variant="premium" className="mb-4">
            Premium Feature
          </Badge>
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">
            AI Macro Wizard
          </h2>
          <p className="mt-3 text-text-inverse-muted">
            Personalised macro targets calculated by AI. Enter your details, get a custom plan.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-xl border border-border-dark bg-bg-card-dark p-6 sm:p-8">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-text-inverse-muted">
              Step 1: Basic Info
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-inverse-muted">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  className="w-full rounded-lg border border-border-dark bg-bg-dark px-4 py-2.5 text-sm text-white placeholder:text-text-inverse-muted focus:border-brand-red focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-inverse-muted">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-lg border border-border-dark bg-bg-dark px-4 py-2.5 text-sm text-white focus:border-brand-red focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-inverse-muted">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="80"
                  className="w-full rounded-lg border border-border-dark bg-bg-dark px-4 py-2.5 text-sm text-white placeholder:text-text-inverse-muted focus:border-brand-red focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-inverse-muted">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="178"
                  className="w-full rounded-lg border border-border-dark bg-bg-dark px-4 py-2.5 text-sm text-white placeholder:text-text-inverse-muted focus:border-brand-red focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="relative mt-4">
            <div className="rounded-xl border border-border-dark bg-bg-card-dark p-6 sm:p-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-inverse-muted">
                Step 2: Activity Level & Goals
              </h3>
              <div className="h-32" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-bg-dark/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="mb-3 font-[family-name:var(--font-sora)] text-lg font-bold text-white">
                  Unlock the Full Wizard
                </div>
                <p className="mb-4 text-sm text-text-inverse-muted">
                  Get personalised macro targets, custom portioning, and Smart Swap with Premium.
                </p>
                <Link
                  href="/plans"
                  className="inline-flex rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-hover"
                >
                  Join Premium — $29.99/mo
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-brand-red/20 bg-brand-red/5 p-6">
            <h4 className="text-sm font-semibold text-white">
              Sample Result (Premium)
            </h4>
            <div className="mt-3 grid grid-cols-4 gap-4">
              {[
                { label: "Calories", value: "2,400", unit: "cal" },
                { label: "Protein", value: "180", unit: "g" },
                { label: "Carbs", value: "240", unit: "g" },
                { label: "Fat", value: "80", unit: "g" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-xl font-bold text-brand-red">
                    {item.value}
                    <span className="text-xs font-normal text-text-inverse-muted">
                      {item.unit}
                    </span>
                  </div>
                  <div className="text-xs text-text-inverse-muted">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
