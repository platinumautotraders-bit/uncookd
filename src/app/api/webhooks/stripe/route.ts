import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    console.error("[Stripe Webhook] Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed":
        console.log("[Stripe Webhook] Checkout session completed:", event.data.object.id);
        // Phase 4: Create order in Supabase
        break;

      case "customer.subscription.updated":
        console.log("[Stripe Webhook] Subscription updated:", event.data.object.id);
        // Phase 4: Update membership in Supabase
        break;

      case "customer.subscription.deleted":
        console.log("[Stripe Webhook] Subscription deleted:", event.data.object.id);
        // Phase 4: Downgrade membership in Supabase
        break;

      case "invoice.payment_failed":
        console.log("[Stripe Webhook] Payment failed:", event.data.object.id);
        // Phase 4: Notify customer via Resend
        break;

      default:
        console.log("[Stripe Webhook] Unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[Stripe Webhook] Verification failed:", err);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }
}
