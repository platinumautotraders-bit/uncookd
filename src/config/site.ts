export const siteConfig = {
  name: "Uncookd",
  tagline: "Prepped. Portioned. Ready to Cook.",
  description:
    "Premium halal-certified raw ingredients, prepped and portioned with recipes included. Zero prep — you only cook. Delivered fresh in Australia.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  currency: "AUD" as const,
  locale: "en-AU",
  hq: "Underwood, QLD",
  deliveryRadius: "50km",
  markets: ["Underwood QLD", "Sydney NSW"],
  contact: {
    email: "hello@uncookd.com.au",
    location: "Underwood, Queensland, Australia",
  },
  social: {
    instagram: "https://instagram.com/uncookd",
    facebook: "https://facebook.com/uncookd",
    tiktok: "https://tiktok.com/@uncookd",
  },
  nav: [
    { label: "Plans", href: "/plans" },
    { label: "Build Your Own", href: "/builder" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
  ],
  footerNav: {
    quickLinks: [
      { label: "All Plans", href: "/plans" },
      { label: "Build Your Own", href: "/builder" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About Us", href: "/about" },
      { label: "Macro Wizard", href: "/macro-wizard" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refunds" },
    ],
  },
};
