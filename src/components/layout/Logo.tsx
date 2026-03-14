"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-tight",
        variant === "dark" ? "text-foreground" : "text-white",
        className
      )}
    >
      Uncookd
    </Link>
  );
}
