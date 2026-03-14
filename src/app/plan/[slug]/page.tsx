import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPlans, getPlanBySlug } from "@/config/plans";
import { PlanDetail } from "@/components/plan/PlanDetail";

interface PlanPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPlans.map((plan) => ({
    slug: plan.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlanPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);

  if (!plan) {
    return { title: "Plan Not Found" };
  }

  return {
    title: plan.name,
    description: plan.description,
    openGraph: {
      title: `${plan.name} | Uncookd`,
      description: plan.tagline,
      images: plan.heroImage ? [{ url: plan.heroImage }] : [],
    },
  };
}

export default async function PlanPage({ params }: PlanPageProps) {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);

  if (!plan) {
    notFound();
  }

  return <PlanDetail plan={plan} />;
}
