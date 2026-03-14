import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export default function CheckoutCancelPage() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold">
          Checkout Cancelled
        </h1>
        <p className="mt-3 text-text-secondary">
          Your checkout was cancelled. No payment has been taken. Your cart items are still saved.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/cart" className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-hover">
            Return to Cart
          </Link>
          <Link href="/plans" className="rounded-lg border border-border-light px-6 py-2.5 text-sm font-semibold hover:bg-gray-50">
            Browse Plans
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
