"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { IngredientCostEditor } from "@/components/admin/IngredientCostEditor";
import { MarginControl } from "@/components/admin/MarginControl";
import { PricingPreview } from "@/components/admin/PricingPreview";

export default function AdminPricingPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "uncookd-admin-2026";
    if (password === adminPassword) {
      setAuthenticated(true);
      sessionStorage.setItem("admin-auth", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!authenticated && typeof window !== "undefined" && sessionStorage.getItem("admin-auth") === "true") {
    setAuthenticated(true);
  }

  if (!authenticated) {
    return (
      <SectionWrapper>
        <div className="mx-auto max-w-sm py-20">
          <h1 className="text-center font-[family-name:var(--font-sora)] text-2xl font-bold">
            Admin Access
          </h1>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border-light px-4 py-2.5 text-sm focus:border-brand-red focus:outline-none"
                placeholder="Enter admin password"
              />
              {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-brand-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-hover"
            >
              Login
            </button>
          </form>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight">
            Pricing Calculator
          </h1>
          <p className="mt-1 text-text-secondary">
            Manage ingredient costs, margins, and delivery settings.
          </p>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("admin-auth");
            setAuthenticated(false);
          }}
          className="text-sm text-text-secondary hover:text-brand-red"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-8">
          <IngredientCostEditor />
          <MarginControl />
        </div>
        <div>
          <PricingPreview />
        </div>
      </div>
    </SectionWrapper>
  );
}
