"use client";

import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { QuantitySelector } from "@/components/shared/QuantitySelector";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatters";
import { defaultPricingConfig } from "@/config/pricing";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, deliveryFee, total, isEmpty } = useCart();

  if (isEmpty) {
    return (
      <SectionWrapper>
        <div className="py-20 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <h1 className="mt-4 font-[family-name:var(--font-sora)] text-2xl font-bold">
            Your cart is empty
          </h1>
          <p className="mt-2 text-text-secondary">
            Browse our plans or build your own meal to get started.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/plans" className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-hover">
              Browse Plans
            </Link>
            <Link href="/builder" className="rounded-lg border border-border-light px-6 py-2.5 text-sm font-semibold hover:bg-gray-50">
              Build Your Own
            </Link>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  const freeDeliveryThreshold = defaultPricingConfig.delivery.freeThreshold;
  const progressToFree = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);
  const amountToFree = Math.max(freeDeliveryThreshold - subtotal, 0);

  return (
    <SectionWrapper>
      <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight">
        Your Cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-xl border border-border-light p-4">
              <div className="flex-1">
                <h3 className="font-semibold">
                  {item.type === "plan" ? item.planName : item.type === "builder-meal" ? item.mealName : item.name}
                </h3>
                {item.type === "plan" && (
                  <p className="text-xs text-text-secondary">
                    {item.duration}-day / {item.servingSize} person{item.servingSize > 1 ? "s" : ""}
                    {item.organic ? " / Organic" : ""}
                  </p>
                )}
                <div className="mt-1 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold">
                  {formatPrice(item.unitPrice)}
                </div>
              </div>
              <QuantitySelector
                value={item.quantity}
                onChange={(qty) => updateQuantity(item.id, qty)}
              />
              <button
                onClick={() => removeItem(item.id)}
                className="text-text-secondary transition-colors hover:text-brand-red"
                aria-label="Remove item"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border-light p-6">
          <h2 className="font-[family-name:var(--font-sora)] text-lg font-bold">
            Order Summary
          </h2>

          {deliveryFee > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Free delivery progress</span>
                <span>{formatPrice(amountToFree)} to go</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-brand-green transition-all"
                  style={{ width: `${progressToFree}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-6 space-y-3 border-t border-border-light pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Delivery</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold">
                {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between border-t border-border-light pt-3 text-base font-bold">
              <span>Total</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)]">{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-lg bg-brand-red px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-red-hover"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
