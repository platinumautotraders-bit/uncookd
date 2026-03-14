# Uncookd — Project CLAUDE.md

> Monthly membership meal platform. Premium halal-certified raw ingredients (beef, chicken, lamb) with fresh vegetables, carbs, sauces/marinades, and breakfast options. Zero prep — customer only cooks. Portioned, sealed, recipe-included. Local delivery within 50km. Fitness-focused and family-friendly meal plans with premium AI-powered macro calculator. Web + Mobile App.

---

## Brand & Identity

- **Name:** Uncookd
- **Tagline:** "Prepped. Portioned. Ready to Cook."
- **Halal Certified:** Everything is halal certified. This is a core brand pillar, not an afterthought.
- **Market:** Australia. Launch from Underwood QLD (50km radius), second market Sydney NSW.
- **Currency:** AUD
- **Positioning:** Premium halal-certified butcher-quality raw ingredients + fitness-oriented meal plans. Not pre-cooked. Not HelloFresh. Raw, honest, from-the-butcher food with real recipes. Zero prep — you only cook. Sauces and marinades included pre-made. All sugar-free, natural, healthy.
- **Proteins:** Beef, Chicken, Lamb only. No pork. No seafood (for now). Kofta available in Middle Eastern / Global Flavour plans only.
- **Includes:** Fresh vegetables, carbs (potatoes, rice, pasta, sweet potato, couscous, noodles), breakfast items (oats, protein pancake batter, eggs, turkey mince), sauces and marinades (10-12 core sauces, pre-made, sugar-free, natural ingredients, in sealed pouches, reused across multiple meals).
- **Dietary Options:** Standard, Gluten-Free, Dairy-Free, Lactose-Free (stackable filters). Organic-only toggle for Premium members.
- **Differentiator:** Halal certified + zero prep + butcher-quality portioned raw ingredients + macro-optimized meal plans + AI macro wizard + monthly global flavour focus + health app sync + cooking method filters.

## Business Model

- **Monthly membership** (NOT per-meal subscription). Meals purchased on top of membership.
- **Free/Guest:** Browse only. Cannot order. Pushed to app/signup.
- **Standard Member — $9.99/month AUD:** Full ordering, cooking guides, favourites, macro tracking, health app sync, dietary filters, cooking method filters.
- **Premium Member — $29.99/month AUD:** Everything Standard + AI Macro Wizard (includes appliance selection), custom portioning, Smart Swap, organic toggle, priority delivery, Global Flavour included free, 10% meal discount, free delivery, early access to new meals.
- **Revenue:** Memberships + meal orders + add-ons + gift boxes + corporate plans.

## Cooking & Meals

- **Cooking methods:** Air Fryer, Oven, Pan/Stovetop (primary). Some meals support multiple methods (e.g. oven OR air fryer). Some require multi-appliance.
- **Cook times:** Focus on 15-20 min. Some 30 min options. Some slow cook options.
- **Filters (available to all):** Cooking method, dietary (GF/DF/LF), protein type, cook time, calories.
- **Wizard (Premium only):** Includes appliance selection, goal-based macro calc, activity level, dietary prefs. Generates personalised plan.
- **Sauces:** 10-12 core sauces/marinades. Sugar-free, natural, healthy ingredients. Reused across multiple meals. Ingredients and allergens shown to customer. Internal recipes kept in backend.
- **Flavour balance:** No cuisine bias. Balanced spread across all styles — light/fresh and bold/punchy across plans.
- **Kofta:** Available only in Middle Eastern / Global Flavour plans.
- **Curries:** Included in rotation (coconut-based, tomato-based). Not overweighted.

## Platforms

- **Website (Next.js):** Marketing, SEO, browsing, ordering, admin backend.
- **Mobile App (React Native):** Primary subscriber platform. Step-by-step cooking guides with images, health app sync, push notifications, offline recipe cache.
- **Shared backend:** Same Supabase DB, same Stripe, same user accounts across both.

---

## Design System

### Visual Direction
Hybrid of clean/fresh and bold/modern. High contrast. Red for meat/protein. Green for health/freshness. White and dark sections for contrast.

### Colors (Tailwind CSS Custom)
```
--color-bg-primary: #FFFFFF          (white — main background)
--color-bg-dark: #0A0A0A             (near-black — contrast sections)
--color-bg-card: #F8F8F8             (light gray — card backgrounds)
--color-bg-card-dark: #141414        (dark card on dark sections)
--color-accent-red: #DC2626          (meat/protein — CTAs, highlights)
--color-accent-red-hover: #B91C1C    (red hover state)
--color-accent-green: #16A34A        (health/fresh — badges, nutrition)
--color-accent-green-hover: #15803D  (green hover state)
--color-text-primary: #0A0A0A        (dark text on light bg)
--color-text-secondary: #525252      (muted text)
--color-text-inverse: #FFFFFF        (white text on dark bg)
--color-text-inverse-muted: #A3A3A3  (muted text on dark bg)
--color-border: #E5E5E5              (light borders)
--color-border-dark: #262626         (dark borders)
```

### Typography
- **Headings:** "Sora" (Google Fonts) — geometric, modern, bold
- **Body:** "DM Sans" (Google Fonts) — clean, readable, professional
- **Mono/Data:** "JetBrains Mono" — macro numbers, pricing, nutrition data

### Spacing & Layout
- Max content width: 1280px
- Section padding: 96px vertical (desktop), 64px (mobile)
- Card border-radius: 12px
- Button border-radius: 8px
- Grid gap: 24px standard, 32px on plan cards

### Animation
- Framer Motion for all transitions
- Page transitions: fade + slight Y translate (20px)
- Card hover: subtle scale(1.02) + shadow lift
- Scroll reveals: stagger children with 0.1s delay
- No bouncy/playful animations — smooth easing only (easeOut, easeInOut)

### Photography Style
- Photorealistic food photography generated via Gemini (Nano Banana Pro for hero/featured, Nano Banana 2 for thumbnails)
- Style: overhead shots, dark slate/wood surfaces, dramatic lighting, visible texture on meat
- Every plan and meal MUST have a real generated image. No placeholders ever.

---

## Architecture

### Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui components
- **Animations:** Framer Motion
- **State:** Zustand
- **Payments:** Stripe (Checkout mode, test by default)
- **Database (Phase 2):** Supabase (PostgreSQL)
- **Auth (Phase 2):** Supabase Auth
- **Hosting:** Vercel
- **Images:** Cloudflare R2 (production), local public/ (development)
- **Email (Phase 2):** Resend
- **AI (Premium Macro Wizard):** Anthropic Claude API (claude-sonnet-4-6)

### File Structure
```
D:/Uncookd/
  src/
    app/
      layout.tsx              — Root layout, fonts, metadata
      page.tsx                — Home page
      plans/
        page.tsx              — All plans listing with filters
      plan/
        [slug]/
          page.tsx            — Individual plan detail page
      builder/
        page.tsx              — Custom meal plan builder
      how-it-works/
        page.tsx              — How it works + FAQ
      about/
        page.tsx              — Brand story, sourcing, values
      cart/
        page.tsx              — Shopping cart
      checkout/
        page.tsx              — Stripe checkout redirect
      macro-wizard/
        page.tsx              — Premium AI macro calculator (teaser for non-premium, full for premium)
      api/
        checkout/
          route.ts            — Stripe checkout session creation
        webhooks/
          stripe/
            route.ts          — Stripe webhook handler
        pricing/
          route.ts            — Admin pricing calculator API
        macro-wizard/
          route.ts            — AI macro calculation endpoint
    components/
      layout/
        Header.tsx            — Site header + navigation
        Footer.tsx            — Site footer
        MobileNav.tsx         — Mobile navigation drawer
      home/
        Hero.tsx              — Hero section with CTA
        HowItWorksPreview.tsx — 3-step preview
        FeaturedPlans.tsx     — Top 3 plans showcase
        GlobalFlavor.tsx      — Monthly country flavor spotlight
        MacroWizardTeaser.tsx — Premium macro wizard preview
        Testimonials.tsx      — Social proof section
        CTABanner.tsx         — Final conversion section
      plans/
        PlanCard.tsx          — Plan card component
        PlanFilter.tsx        — Filter bar (goal, protein, duration)
        PlanGrid.tsx          — Filterable grid of plans
      plan/
        PlanHero.tsx          — Plan detail hero
        MealBreakdown.tsx     — Daily meal cards with nutrition
        NutritionSummary.tsx  — Full macro/calorie breakdown
        PricingOptions.tsx    — Duration + serving size selector
        AddToCart.tsx         — Add to cart with options
      builder/
        ProteinSelector.tsx   — Choose proteins and cuts
        VegSelector.tsx       — Choose vegetables
        CarbSelector.tsx      — Choose carbs
        BreakfastSelector.tsx — Choose breakfast items
        MacroTargetInput.tsx  — Set calorie/macro targets
        MealPreview.tsx       — Preview generated meals
        BuilderSummary.tsx    — Total cost + nutrition summary
      shared/
        Button.tsx            — Styled button variants
        Badge.tsx             — Category/tag badges
        NutritionLabel.tsx    — Full nutrition breakdown component
        MacroBar.tsx          — Visual macro progress bar
        PriceDisplay.tsx      — Price with period/serving info
        ImagePlaceholder.tsx  — Loading state for images (NOT a placeholder — loading skeleton)
        QuantitySelector.tsx  — +/- quantity control
        AllergenTags.tsx      — Allergen warning badges
        DifficultyBadge.tsx   — Beginner/Intermediate/Advanced
      admin/
        PricingCalculator.tsx — Full admin pricing interface
        IngredientCostEditor.tsx — Per-ingredient cost management
        MarginControl.tsx     — Category margin sliders
    lib/
      utils.ts                — Shared utilities
      cn.ts                   — Tailwind class merge utility
      formatters.ts           — Price, weight, macro formatters
      nutrition.ts            — Macro/calorie calculation helpers
      pricing.ts              — Price calculation from cost + margin
    services/
      stripe.ts               — Stripe client + helpers
    stores/
      cartStore.ts            — Shopping cart state
      planFilterStore.ts      — Plan filtering state
      builderStore.ts         — Custom builder state
      pricingStore.ts         — Admin pricing state
    types/
      index.ts                — All shared types (re-exports)
      meal.ts                 — Meal, MealPlan, DayPlan types
      ingredient.ts           — Ingredient, Protein, Vegetable, Carb types
      nutrition.ts            — NutritionInfo, MacroTarget types
      pricing.ts              — PricingConfig, MarginConfig, IngredientCost types
      cart.ts                 — CartItem, Cart types
      plan.ts                 — Plan, PlanCategory, PlanDuration types
      subscription.ts         — Subscription tier types
      order.ts                — Order types (Phase 2 prep)
      delivery.ts             — Delivery zone, driver types (Phase 2 prep)
    hooks/
      useCart.ts              — Cart operations hook
      useNutrition.ts         — Nutrition calculation hook
      usePricing.ts           — Price calculation hook
      useScrollReveal.ts      — Framer Motion scroll reveal hook
    config/
      site.ts                 — Site metadata, nav links, social links
      plans.ts                — All pre-set meal plan definitions
      meals.ts                — Individual meal definitions
      ingredients.ts          — Ingredient catalog with nutrition data
      pricing.ts              — Default pricing config + margins
      delivery.ts             — Delivery zones, fees, thresholds
      globalFlavors.ts        — Monthly country/continent flavor rotations
  public/
    images/                   — Generated food photography
  .env.example
  .env.local                  — (gitignored)
  CLAUDE.md                   — This file
  README.md
  next.config.ts
  tailwind.config.ts
  tsconfig.json
  package.json
  .gitignore
```

---

## Meal Plans — Full Definitions

### Pre-Set Plans (10 total)

1. **The Lean Machine**
   - Goal: Fat loss / cutting
   - Proteins: Chicken breast, extra-lean beef mince (5%), lamb leg steaks
   - Veg: Broccoli, spinach, green beans, asparagus, mixed salad
   - Carbs: Sweet potato (small portion), brown rice (small)
   - Calories: ~1,800/day
   - Macro split: 40P / 35C / 25F
   - Difficulty: Beginner

2. **The Bulk Up**
   - Goal: Mass gain / bulking
   - Proteins: Chicken thighs, beef ribeye, lamb shoulder, beef mince (15%)
   - Veg: Broccoli, corn, peas, carrots, sweet peppers
   - Carbs: White rice, sweet potato, pasta, white potato
   - Breakfast: Protein pancake batter, oats with honey
   - Calories: ~3,200/day
   - Macro split: 30P / 50C / 20F
   - Difficulty: Intermediate

3. **Pure Protein**
   - Goal: Maximum protein per meal
   - Proteins: Double portion — chicken breast, beef fillet, lamb chops
   - Veg: Spinach, broccoli, kale, green beans
   - Carbs: Minimal — small sweet potato only
   - Calories: ~2,400/day
   - Macro split: 50P / 25C / 25F
   - Difficulty: Beginner

4. **Chicken Only**
   - Goal: Poultry lovers / budget-conscious protein
   - Proteins: Breast, thigh, drumstick, wings, mince
   - Veg: Mixed — changes daily based on cuisine theme
   - Carbs: Rice, potato, couscous rotation
   - Calories: ~2,200/day
   - Macro split: 40P / 40C / 20F
   - Difficulty: Beginner

5. **The Classic**
   - Goal: Balanced family meals
   - Proteins: Mixed rotation — beef, chicken, lamb
   - Veg: Seasonal mix
   - Carbs: Potato, rice, pasta rotation
   - Breakfast: Oats
   - Calories: ~2,200/day
   - Macro split: 30P / 45C / 25F
   - Difficulty: Beginner

6. **Steak Night**
   - Goal: Premium beef experience
   - Proteins: Ribeye, sirloin, rump, fillet, T-bone rotation
   - Veg: Roasted Mediterranean veg, mushrooms, asparagus
   - Carbs: Baby potatoes, sweet potato wedges
   - Calories: ~2,600/day
   - Macro split: 35P / 35C / 30F
   - Difficulty: Intermediate

7. **The Mediterranean**
   - Goal: Lamb-forward, Mediterranean-inspired
   - Proteins: Lamb cutlets, lamb mince, lamb leg, chicken thigh
   - Veg: Roasted peppers, zucchini, eggplant, tomatoes, olives
   - Carbs: Couscous, baby potatoes, flatbread
   - Calories: ~2,300/day
   - Macro split: 30P / 40C / 30F
   - Difficulty: Intermediate

8. **The Athlete**
   - Goal: Training-optimized with carb cycling
   - Proteins: Chicken breast (training days), beef fillet (rest days), lamb chops
   - Veg: Broccoli, spinach, sweet peppers, green beans
   - Carbs: High on training days (rice, sweet potato, oats), low on rest days
   - Breakfast: Protein pancake batter + oats
   - Calories: ~2,800 training / ~2,200 rest
   - Macro split: Varies by training day
   - Difficulty: Advanced

9. **The Breakfast Club**
   - Goal: Full-day coverage including premium breakfasts
   - Proteins: Mixed
   - Includes: Protein pancake batter, overnight oats base, egg pack, turkey mince for egg cups
   - Veg + Carbs: Full daily coverage
   - Calories: ~2,400/day
   - Difficulty: Beginner

10. **Monthly Global Flavor** (Rotating)
    - Changes monthly: Mediterranean, Middle Eastern, Asian-Inspired, Latin-Inspired, African, Caribbean
    - Uses allowed proteins only (beef, chicken, lamb)
    - Unique spice packs and marinades included
    - Always includes a signature dish from the region
    - Available as add-on to any plan OR standalone

### Duration Options
- 3-day: Mon/Wed/Fri meals
- 5-day: Mon-Fri meals
- 7-day: Full week

### Serving Sizes
- 1 person
- 2 people
- Family (4 people)

### Meals Per Day (depends on plan)
- Standard plans: Lunch + Dinner
- Breakfast-inclusive plans: Breakfast + Lunch + Dinner
- Can add breakfast to any plan for extra cost

---

## Subscription Tiers

### Standard
- Access to all pre-set plans
- Choose duration (3/5/7 day)
- Choose serving size
- Recipe cards included (QR code to digital version)
- Standard delivery window

### Premium
- Everything in Standard
- **AI Macro Wizard** — personalized macro calculation based on weight, height, age, activity level, goal (bulk/cut/maintain). Uses Claude API.
- **Custom Portioning** — enter exact macros per meal, we portion to match
- **Smart Swap** — swap any ingredient in any plan
- **Priority Delivery** — choose exact delivery window
- **Monthly Global Flavor** — included free (add-on cost for Standard)
- 10% discount on all orders
- Free delivery on all orders

---

## Premium AI Macro Wizard — Specification

### Wizard Flow (Step-by-step)
1. **Basic Info:** Age, gender, height, weight
2. **Activity Level:** Sedentary / Lightly Active / Moderately Active / Very Active / Extremely Active
3. **Goal:** Lose Fat / Maintain / Build Muscle / Lean Bulk / Aggressive Cut
4. **Timeline:** How many weeks to reach goal weight (if applicable)
5. **Dietary Preferences:** Which proteins (beef/chicken/lamb), any veg dislikes
6. **Meal Schedule:** How many meals per day, include breakfast?
7. **AI Calculation:** Claude API calculates TDEE, target macros, per-meal breakdown
8. **Results:** Daily macro targets, per-meal portion sizes, suggested plan or custom build
9. **One-Click Order:** Generated plan goes straight to cart

### On Website (Teaser)
- Show the wizard UI with first 2 steps interactive
- Step 3 onward: blurred/locked with "Unlock with Premium" overlay
- Show a sample result with example macros to demonstrate value

---

## Pricing System — Backend Calculator

### How It Works
1. Every ingredient has a **cost per unit** (cost per kg for meat, cost per kg for veg, cost per kg for carbs)
2. Every ingredient category has a **target margin percentage**
3. Retail price = `cost / (1 - margin)`
4. A meal's price = sum of all ingredient retail prices in that meal
5. A plan's price = sum of all meal prices across all days
6. Delivery fee added on top (or free above threshold)

### Suggested Margins
- Chicken: 50-55%
- Beef: 45-50%
- Lamb: 50-55%
- Vegetables: 55-60%
- Carbs (potato, rice, pasta): 55-60%
- Breakfast items (oats, pancake batter): 60-65%
- Spice packs / marinades: 70-75%
- Delivery: Flat fee (suggest $8-12) or free above $80-100 order value

### Admin Interface (Phase 1 — /admin/pricing, password protected)
- Table of all ingredients with: name, category, unit (kg/g/each), cost per unit, last updated date
- Category margin sliders with live price preview
- Delivery fee configuration
- Free delivery threshold setting
- "Preview Pricing" button that shows all plan prices with current settings
- Export pricing to CSV

---

## Delivery System (Phase 2+ Prep)

### Phase 1 Preparation
- Delivery zones defined in config (50km radius from HQ)
- Postcode/suburb lookup for zone validation
- Delivery fee structure in config
- Order data model includes delivery address, preferred window, zone
- All order types include delivery metadata

### Phase 2+ (App)
- Driver assignment
- Route optimization
- Real-time tracking
- Delivery confirmation with photo
- Customer SMS/push notifications

---

## Key Technical Decisions

- **No SSR for plan data in Phase 1** — all plan/meal data is static config files. No database needed yet. This keeps Phase 1 pure frontend + Stripe.
- **Stripe Checkout (not Elements)** — redirect to Stripe-hosted checkout. Simpler, PCI compliant, faster to ship.
- **Admin pricing calculator is client-side in Phase 1** — no database. Uses localStorage for saved configs. Phase 2 moves to Supabase.
- **Images generated via Gemini API** — Nano Banana Pro for hero/featured images, Nano Banana 2 for meal thumbnails. All saved to public/images/ in dev, Cloudflare R2 in production.
- **Recipes are NOT shown on website** — only visible after purchase (Phase 2: customer portal with order-linked recipe access).

---

## SEO & Metadata

- Every page has unique title, description, OG image
- Schema.org Product markup on plan pages
- Schema.org Organization on about page
- Sitemap.xml auto-generated
- robots.txt configured

---

## Phase Roadmap

### Phase 1 (Current) — Planning & Architecture
- Master phase plan document
- Type definitions, config files, stores, utilities
- Root layout, header, footer, shared components
- All foundational code ready for Phase 3 build

### Phase 2 — Meal Design (Dedicated)
- Full 7-day meal definitions for all 10 plans
- Dietary variant flags, cooking method tags
- Sauce/marinade definitions (ingredients + allergens public, recipe internal)
- Global Flavour meals for 6 months
- Meal builder combination matrix
- Image prompt list for generation

### Phase 3 — Website Build [CURRENT — BUILD THIS]
- Full marketing website (all pages)
- Membership signup flow
- Stripe checkout for orders
- Admin pricing calculator
- Generated food photography
- Deployed on Vercel

#### Phase 3 — Build Instructions for Claude Code

**Read these files first:**
- `CLAUDE.md` (this file) — project brain, design system, architecture
- `MASTER-PLAN.md` — full business model, features, requirements
- `MEALS.md` — all 10 plans, meal data, builder matrix, ordering model
- `SAUCES.md` — all sauces, side sauces, salad add-ons

**What already exists (DO NOT rebuild):**
- `src/types/` — all TypeScript types
- `src/config/` — site, ingredients, plans, pricing, delivery, globalFlavors
- `src/stores/` — cart, planFilter, builder, pricing stores
- `src/lib/` — cn, formatters, nutrition, pricing, utils
- `src/services/stripe.ts` — Stripe client
- `src/hooks/useScrollReveal.ts` — scroll animation hook
- `src/app/layout.tsx` — root layout with fonts
- `src/app/globals.css` — global styles + Tailwind
- `src/components/layout/Header.tsx` — site header
- `src/components/layout/Footer.tsx` — site footer
- `src/components/shared/Button.tsx` — button component
- `package.json`, `tailwind.config.ts`, `tsconfig.json`, `next.config.ts`, `.env.example`, `.gitignore`

**What needs to be built (in this order):**

1. **Install dependencies** — `npm install` then `npx shadcn@latest init`

2. **Home page** (`src/app/page.tsx`) — Sections in order:
   - Hero: bold headline, tagline, CTA to /plans, hero food image
   - Halal certified badge prominently displayed
   - "How It Works" 3-step preview (Order > Receive > Cook)
   - Featured Plans (top 3 from config)
   - Monthly Global Flavour spotlight (current month)
   - Macro Wizard teaser (interactive first 2 steps, rest blurred with Premium upsell)
   - Membership tiers comparison (Free vs Standard vs Premium)
   - Testimonials / social proof section
   - Final CTA banner

3. **Plans page** (`src/app/plans/page.tsx`) — All 10 plans in a filterable grid:
   - Filter bar: goal, protein type, includes breakfast, dietary
   - Plan cards: image, name, tagline, badges, target calories, macro split, price from $X
   - Links to individual plan detail pages

4. **Plan detail page** (`src/app/plan/[slug]/page.tsx`) — Dynamic route per plan:
   - Hero with plan image, name, tagline, badges
   - Daily meal breakdown (expandable per day) with meal cards
   - Each meal shows: name, image placeholder, nutrition, cooking method, cook time, difficulty, sauce, allergens, dietary flags
   - Weekly nutrition summary table
   - Pricing options: duration selector (3/5/7), serving size (1/2/4), frequency
   - Price display (calculated live using pricing engine)
   - Add to cart CTA

5. **Meal builder page** (`src/app/builder/page.tsx`) — Multi-step interactive builder:
   - Step 1: Choose cooking method (air fryer / oven / pan / slow cooker)
   - Step 2: Choose meal type (stir-fry / roast / steak plate / bowl / tray bake / curry)
   - Step 3: Choose protein (beef / chicken / lamb + specific cut)
   - Step 4: Choose carb (or no carb)
   - Step 5: Choose 2-4 vegetables
   - Step 6: Choose sauce/marinade (or no sauce) + optional side sauce + optional salad
   - Review: full nutrition, allergens, cook time, price
   - Portion selector (1/2/4 person)
   - Quantity selector (how many of this meal)
   - Add to cart
   - Uses builder combination matrix from MEALS.md to validate combinations

6. **How It Works page** (`src/app/how-it-works/page.tsx`):
   - Visual step-by-step walkthrough
   - Delivery info (50km radius from Underwood QLD + Sydney)
   - Packaging explanation (individual vs bulk)
   - Freshness guarantee
   - FAQ accordion

7. **About page** (`src/app/about/page.tsx`):
   - Brand story
   - Halal certification prominently featured
   - Sourcing and quality
   - Zero prep philosophy
   - Contact section

8. **Cart page** (`src/app/cart/page.tsx`):
   - List cart items with quantity controls
   - Per-item: meal name, duration, serving size, price
   - Side sauce and salad add-on upsells
   - Subtotal, delivery fee, discount, total
   - Free delivery threshold progress bar
   - Checkout CTA

9. **Checkout** (`src/app/checkout/page.tsx` + `src/app/api/checkout/route.ts`):
   - Stripe Checkout redirect (not embedded form)
   - API route creates Stripe checkout session from cart items
   - Success and cancel return pages

10. **Admin pricing calculator** (`src/app/admin/pricing/page.tsx`):
    - Password protected (simple client-side auth)
    - Ingredient cost table (editable per ingredient, cost per kg)
    - Category margin sliders with live preview
    - Organic surcharge percentage
    - Delivery fee + free delivery threshold config
    - "Preview All Plan Prices" button showing calculated prices for every plan at every duration/size
    - Save to localStorage (Phase 4 moves to database)
    - Reset to defaults button

11. **Stripe webhook** (`src/app/api/webhooks/stripe/route.ts`):
    - Handle: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted, invoice.payment_failed
    - Log all events (Phase 4 wires to Supabase)

12. **Image generation** — Use Gemini API (Nano Banana Pro) to generate:
    - 10 plan hero images
    - At least 1 meal image per plan (10 minimum, more if time allows)
    - Save to `public/images/`

**Design rules (from Design System section above):**
- Red (#DC2626) for meat/protein/CTAs
- Green (#16A34A) for health/fresh/badges
- Dark sections (#0A0A0A) alternating with white (#FFFFFF)
- Sora font for headings, DM Sans for body, JetBrains Mono for data/macros
- Framer Motion animations: fade up on scroll, stagger children, subtle card hover
- Mobile-first responsive
- No emojis anywhere
- Halal certified badge visible on every plan and meal card
- Clean, minimal, high contrast
- Every element earns its place

### Phase 4 — Backend & Database
- Supabase: users, memberships, orders, meals, favourites
- Supabase Auth
- Stripe subscriptions + one-time payments
- Order management API
- Customer portal
- Admin dashboard
- Email integration (Resend)

### Phase 5 — Mobile App
- React Native (Expo)
- Step-by-step cooking guides with images + timers
- Health app integration (Apple Health, Samsung Health, Google Fit)
- "I ate this" meal logging
- Favourites, meal builder, push notifications
- Premium tools (AI Wizard, Smart Swap, Meal Planner Calendar, Progress Tracker)
- Offline recipe caching

### Phase 6 — Delivery System
- Driver app (React Native)
- Route optimization, GPS tracking
- Delivery confirmation with photo
- Customer tracking (web + app)

### Phase 7 — Growth & Optimisation
- Loyalty points, referrals, gift boxes
- Corporate plans
- Ratings/reviews
- Analytics, A/B testing, retention automation

---

### Changelog
- 2026-03-15: Project initialized. Architecture defined. Phase 1 scope locked.
- 2026-03-15: Phase 2 complete. All 10 meal plans, 12 sauces, 3 side sauces, 2 salads, builder matrix, image prompts.
- 2026-03-15: Phase 3 build instructions added. Ready for Claude Code.
