import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, data: null, error: { code: "EMPTY_CART", message: "Cart is empty" } },
        { status: 400 }
      );
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { success: false, data: null, error: { code: "CONFIG_ERROR", message: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local" } },
        { status: 500 }
      );
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey);

    const lineItems = items.map((item: { name: string; unitPrice: number; quantity: number }) => ({
      price_data: {
        currency: "aud",
        unit_amount: Math.round(item.unitPrice * 100),
        product_data: {
          name: item.name,
        },
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
    });

    return NextResponse.json({
      success: true,
      data: { url: session.url },
      error: null,
    });
  } catch (err) {
    console.error("[Checkout] Session creation failed:", err);
    return NextResponse.json(
      { success: false, data: null, error: { code: "CHECKOUT_ERROR", message: "Failed to create checkout session" } },
      { status: 500 }
    );
  }
}
