"use client";

import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, dark = false, className, id }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 py-16 sm:px-6 md:py-24",
        dark ? "bg-bg-dark text-white" : "bg-white text-foreground",
        className
      )}
    >
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}
