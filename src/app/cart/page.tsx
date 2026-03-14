"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20 text-center"
        >
          {/* Empty cart illustration */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-neutral-100">
            <svg
              className="h-12 w-12 text-neutral-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
          <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold">
            Your cart is empty
          </h1>
          <p className="mt-3 text-lg text-text-secondary">
            Browse our plans or build your own meal to get started.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/plans"
              className="rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-red-hover hover:shadow-lg hover:shadow-brand-red/25"
            >
              Browse Plans
            </Link>
            <Link
              href="/builder"
              className="rounded-full border-2 border-neutral-200 px-7 py-3 text-sm font-semibold text-foreground transition-all hover:border-neutral-300 hover:shadow-md"
            >
              Build Your Own
            </Link>
          </div>
        </motion.div>
      </SectionWrapper>
    );
  }

  const freeDeliveryThreshold = defaultPricingConfig.delivery.freeThreshold;
  const progressToFree = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);
  const amountToFree = Math.max(freeDeliveryThreshold - subtotal, 0);
  const hasFreeDelivery = deliveryFee === 0;

  return (
    <SectionWrapper>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Your Cart
      </motion.h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold">
                    {item.type === "plan"
                      ? item.planName
                      : item.type === "builder-meal"
                        ? item.mealName
                        : item.name}
                  </h3>
                  {item.type === "plan" && (
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {item.duration}-day / {item.servingSize} person
                      {item.servingSize > 1 ? "s" : ""}
                      {item.organic ? " / Organic" : ""}
                    </p>
                  )}
                  <div className="mt-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-brand-red">
                    {formatPrice(item.unitPrice)}
                  </div>
                </div>
                <QuantitySelector
                  value={item.quantity}
                  onChange={(qty) => updateQuantity(item.id, qty)}
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 transition-all hover:bg-red-50 hover:text-brand-red"
                  aria-label="Remove item"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-24"
        >
          <h2 className="font-[family-name:var(--font-sora)] text-lg font-bold">
            Order Summary
          </h2>

          {/* Free delivery progress */}
          {!hasFreeDelivery && (
            <div className="mt-5 rounded-xl bg-brand-green/5 p-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-brand-green">
                  Free delivery progress
                </span>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold text-brand-green">
                  {formatPrice(amountToFree)} to go
                </span>
              </div>
              <div className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-brand-green/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-green/80"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToFree}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {hasFreeDelivery && (
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-brand-green/10 p-3">
              <svg
                className="h-5 w-5 text-brand-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-semibold text-brand-green">
                Free delivery unlocked
              </span>
            </div>
          )}

          <div className="mt-6 space-y-3 border-t border-neutral-100 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Delivery</span>
              <span
                className={`font-[family-name:var(--font-jetbrains-mono)] font-semibold ${hasFreeDelivery ? "text-brand-green" : ""}`}
              >
                {hasFreeDelivery ? "Free" : formatPrice(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-bold">
              <span>Total</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-lg">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand-red px-6 py-4 text-base font-semibold text-white transition-all hover:bg-brand-red-hover hover:shadow-lg hover:shadow-brand-red/25 active:scale-[0.98]"
          >
            Proceed to Checkout
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
