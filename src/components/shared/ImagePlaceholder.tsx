"use client";

import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  aspectRatio?: "16:9" | "4:3" | "1:1" | "3:4";
  className?: string;
}

const aspectStyles = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "3:4": "aspect-[3/4]",
};

export function ImagePlaceholder({
  aspectRatio = "16:9",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gray-200",
        aspectStyles[aspectRatio],
        className
      )}
    >
      <div className="flex h-full items-center justify-center">
        <svg
          className="h-10 w-10 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  );
}
