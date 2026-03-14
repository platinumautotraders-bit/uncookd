import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("[Stripe] STRIPE_SECRET_KEY is not set in environment variables");
    }
    stripeInstance = new Stripe(key);
  }
  return stripeInstance;
}

export function getStripePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    console.warn("[Stripe] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
    return "";
  }
  return key;
}
