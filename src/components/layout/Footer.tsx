"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { HalalBadge } from "@/components/shared/HalalBadge";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed text-text-inverse-muted">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-text-inverse-muted">
              Premium halal-certified raw ingredients, prepped and portioned. Zero prep — you only cook.
            </p>
            <HalalBadge size="md" />
          </div>

          <div>
            <h3 className="mb-4 font-[family-name:var(--font-sora)] text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.footerNav.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-inverse-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-[family-name:var(--font-sora)] text-sm font-semibold uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.footerNav.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-inverse-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-[family-name:var(--font-sora)] text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-text-inverse-muted">
              <li>{siteConfig.contact.email}</li>
              <li>{siteConfig.contact.location}</li>
              <li className="pt-2">
                Delivering within {siteConfig.deliveryRadius} of{" "}
                {siteConfig.markets.join(" & ")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-dark pt-8 sm:flex-row">
          <p className="text-xs text-text-inverse-muted">
            {currentYear} Uncookd. All rights reserved.
          </p>
          <p className="text-xs text-text-inverse-muted">
            All products halal certified.
          </p>
        </div>
      </div>
    </footer>
  );
}
