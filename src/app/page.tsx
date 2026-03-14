"use client";

import { Hero } from "@/components/home/Hero";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { FoodShowcase } from "@/components/home/FoodShowcase";
import { FoodGrid } from "@/components/home/FoodGrid";
import { GlobalFlavour } from "@/components/home/GlobalFlavour";
import { OurStandards } from "@/components/home/OurStandards";
import { MembershipTiers } from "@/components/home/MembershipTiers";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorksPreview />
      <FoodShowcase />
      <FoodGrid />
      <GlobalFlavour />
      <OurStandards />
      <MembershipTiers />
      <Testimonials />
      <CTABanner />
    </>
  );
}
