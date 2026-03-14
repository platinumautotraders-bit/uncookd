"use client";

import { Hero } from "@/components/home/Hero";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { FeaturedPlans } from "@/components/home/FeaturedPlans";
import { GlobalFlavour } from "@/components/home/GlobalFlavour";
import { MacroWizardTeaser } from "@/components/home/MacroWizardTeaser";
import { MembershipTiers } from "@/components/home/MembershipTiers";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";
import { allPlans } from "@/config/plans";

const featured = allPlans.filter((p) => p.featured);
const fallbackFeatured = featured.length >= 3
  ? featured
  : allPlans.slice(0, 3);

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorksPreview />
      <FeaturedPlans plans={fallbackFeatured} />
      <GlobalFlavour />
      <MacroWizardTeaser />
      <MembershipTiers />
      <Testimonials />
      <CTABanner />
    </>
  );
}
