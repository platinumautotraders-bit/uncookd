import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export default function CheckoutSuccessPage() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-md py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
          <svg className="h-8 w-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold">
          Order Confirmed
        </h1>
        <p className="mt-3 text-text-secondary">
          Your order has been placed successfully. We will start prepping your ingredients and deliver them fresh on your next delivery day.
        </p>
        <div className="mt-8 space-y-3">
          <div className="rounded-lg bg-bg-card p-4 text-left text-sm">
            <h3 className="font-semibold">What happens next?</h3>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-text-secondary">
              <li>We source your halal-certified ingredients</li>
              <li>Everything is portioned, sealed, and packed fresh</li>
              <li>Your box is delivered on the next delivery day</li>
              <li>Open, follow the recipe, and cook</li>
            </ol>
          </div>
        </div>
        <Link
          href="/plans"
          className="mt-6 inline-flex rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-hover"
        >
          Browse More Plans
        </Link>
      </div>
    </SectionWrapper>
  );
}
