"use client";

import { useEffect } from "react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export default function CheckoutPage() {
  useEffect(() => {
    // In production, this would create a Stripe session and redirect
    // For now, show a placeholder
  }, []);

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-md py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10">
          <svg className="h-8 w-8 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        </div>
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold">
          Redirecting to Checkout
        </h1>
        <p className="mt-3 text-text-secondary">
          You will be redirected to our secure payment page powered by Stripe. Stripe keys required in .env.local to enable checkout.
        </p>
      </div>
    </SectionWrapper>
  );
}
