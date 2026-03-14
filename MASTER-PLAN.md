# Uncookd — Master Phase Plan

> Last updated: 2026-03-15
> Status: Phase 1 — Planning

---

## Business Model (Revised)

**All products are halal certified. This is a core brand pillar displayed prominently across website and app.**

The subscription is NOT per-meal. It is a **monthly membership** that unlocks access to the ordering platform and premium tools. Meals are purchased individually or as meal plan bundles on top of the membership.

### Membership Tiers

**Free / Guest**
- Browse website, view plans and meals
- Cannot order
- Pushed to download app or sign up
- Cooking method and dietary filters available

**Standard Member — $9.99/month AUD**
- Access to full ordering platform (web + app)
- Browse all meals and plans
- Order individual meals or plan bundles (3/5/7 day)
- Step-by-step cooking guides with images (app)
- Favourites system
- Allergen and dietary filtering
- Macro tracking per meal with health app sync
- Cooking method filters (air fryer, oven, pan, BBQ)

**Premium Member — $29.99/month AUD**
- Everything in Standard
- AI Macro Wizard (personalised macro calculator with Claude API)
- Custom portioning to exact macros (we portion to their numbers)
- Smart Swap (swap any ingredient in any meal)
- Priority delivery window selection
- Monthly Global Flavour box included free
- Organic-only option toggle
- 10% discount on all meal orders
- Free delivery on all orders
- Exclusive seasonal/limited-edition meals early access

### Revenue Streams
1. Monthly membership fees
2. Individual meal / plan bundle purchases
3. Add-ons: extra protein, breakfast packs, spice packs, marinades
4. Premium upsell features
5. Gift boxes (one-time purchase, no membership needed)
6. Corporate/office bulk plans

---

## Platforms

**Website (Next.js)**
- Marketing, SEO, brand presence
- Full browsing of meals and plans
- Membership signup and management
- Ordering for web users
- Admin backend (pricing calculator, order management)

**Mobile App (React Native)**
- Primary ordering platform for subscribers
- Step-by-step cooking guides with images
- Health app integrations (Apple Health, Samsung Health, Google Fit)
- Push notifications (delivery updates, new meals, reorder reminders)
- Favourites, order history, meal ratings
- Offline recipe access (cached after purchase)

**Both platforms share:**
- Same Supabase backend
- Same Stripe payment processing
- Same meal/plan data
- Same user accounts (sign in on either)

---

## Meal System — Core Rules

**All ingredients and products are halal certified. Halal certification badge displayed on every meal, plan, and product page.**

### Proteins (No Pork — Halal Certified)
- Chicken: breast, thigh, drumstick, wings, mince
- Beef: ribeye, sirloin, fillet, rump, T-bone, mince (lean + regular)
- Lamb: cutlets, leg steak, shoulder, mince, chops
- Kofta (beef or lamb): Middle Eastern / Global Flavour plans only

### Carbs
- White potato, sweet potato, baby potatoes
- White rice, brown rice
- Pasta (regular + gluten-free option)
- Couscous
- Noodles

### Vegetables
- Broccoli, spinach, green beans, asparagus, sweet peppers, zucchini, mushrooms, carrots, corn, mixed salad, eggplant, kale, cherry tomatoes, onions

### Breakfast Items
- Protein pancake batter (regular + GF + lactose-free)
- Rolled oats (regular + GF)
- Free-range eggs
- Turkey mince (for egg cups)

### Sauces & Marinades (10-12 core, reused across meals, recipes internal only)
All sauces are sugar-free, made from natural healthy ingredients. Kept to 10-12 core sauces that are versatile enough to work across many meals.

- Garlic herb butter (GF, LF)
- Lemon herb dressing (GF, DF, LF)
- Smoky BBQ marinade (GF, DF)
- Chimichurri (GF, DF)
- Peri-peri marinade (GF, DF)
- Teriyaki-style glaze (GF option available, DF)
- Coconut curry sauce (GF, DF, LF option)
- Tomato-based curry sauce (GF, DF)
- Middle Eastern shawarma blend (GF, DF)
- Korean-inspired gochujang marinade (GF option available, DF)
- Mediterranean herb marinade (GF, DF)
- Simple salt, pepper and olive oil seasoning (GF, DF)

(Each has: full ingredients list, allergens, nutrition per serve — shown to customer. Recipe stays internal backend only.)

### Dietary Options
- **Standard**: Default, may contain gluten/dairy/lactose
- **Gluten-Free (GF)**: No gluten in any component including sauces
- **Dairy-Free (DF)**: No dairy products
- **Lactose-Free (LF)**: Dairy allowed but lactose-free alternatives (e.g. lactose-free cream)
- Filters stack: user can select GF + LF together

### Organic Option
- Premium members can toggle "Organic Only" — all ingredients sourced organic
- Organic adds a surcharge (configurable in admin, suggest 20-30% markup)
- Organic availability flag per ingredient in database

### Cooking Methods (user filters — available to ALL users including free/guest browsing)
- Air Fryer (primary — many meals designed for this)
- Oven (primary)
- Pan / Stovetop (primary)
- BBQ / Grill
- Slow Cooker
- Multi-method (e.g. pan-sear then oven finish — meal specifies both)
- Either/or (e.g. "Oven OR Air Fryer" — meal has instructions for both methods)

### Cook Time Targets
- Primary focus: 15-20 minutes (majority of meals)
- Secondary: 30 minute options
- Occasional: Slow cook options (45+ min, hands-off)

### Appliance Selection (Premium Wizard)
- Wizard asks what appliances the user owns
- Filters meal suggestions to only show meals they can cook
- Available to Premium members only as part of the macro wizard flow
- Regular filters (cooking method) available to everyone

### Zero Prep Rule
- Customer does ZERO preparation
- All ingredients come pre-portioned, pre-cut, pre-marinated where applicable
- Sauces come pre-made in sealed pouches
- Customer only cooks
- Recipe cards / app guides only cover cooking steps, not prep

### Portion System
- Base portions: 1 person
- Scales to: 2 people, 4 people (family)
- Macros adjust proportionally with portion size
- Premium members: custom gram-level portioning per macro target

### Favourites
- Users can favourite any meal
- Favourites persist across web and app
- "Reorder favourites" quick action
- "Build plan from favourites" feature

---

## Meal Builder (Custom Orders)

Users build their own meals step by step:

1. **Choose cooking method**: Air fryer / Oven / Pan / BBQ / Slow cooker
2. **Choose meal type**: Stir fry / Roast / Steak plate / Bowl / Tray bake / Curry-style / Salad
3. **Choose protein**: Beef / Chicken / Lamb + specific cut
4. **Choose carb**: Rice / Potato / Pasta / None
5. **Choose vegetables**: Pick 2-4 from available list
6. **Choose sauce/marinade**: From available list (filtered by dietary prefs)
7. **Review**: See full nutrition, allergens, cooking time, price
8. **Add to cart**

Each combination auto-generates:
- Cooking instructions (for the selected method)
- Nutrition breakdown
- Allergen list
- Price (from ingredient costs + margins)

---

## Health App Integration

### Supported Platforms
- Apple Health (HealthKit) — iOS app
- Samsung Health — Android app
- Google Fit — Android app

### How It Works
1. User eats a meal from their order
2. In the app, they tap "I ate this" on the meal
3. App logs to their connected health platform:
   - Calories
   - Protein (g)
   - Carbs (g)
   - Fat (g)
   - Fiber (g)
   - Meal type (breakfast/lunch/dinner)
   - Timestamp
4. Data appears in their health app automatically

### Implementation
- React Native: use `react-native-health` (iOS) and `react-native-google-fit` (Android)
- Samsung Health: via Google Fit bridge or Samsung Health SDK
- Permission request on first connect
- Toggle per-platform in app settings

---

## Premium Tools (App Subscribers)

1. **AI Macro Wizard** — personalised TDEE + macro calculation via Claude API wizard
2. **Custom Portioning** — enter exact macros, we portion to match
3. **Smart Swap** — swap any ingredient in any meal, see nutrition update live
4. **Organic Toggle** — switch all orders to organic ingredients
5. **Meal Planner Calendar** — drag meals onto a weekly calendar, see daily/weekly totals
6. **Shopping Mode** — if they want to buy ingredients separately, generates a shopping list from their plan
7. **Progress Tracker** — log weight weekly, see trend vs. goal (syncs with health apps)
8. **Recipe Vault** — access to full cooking guides with step-by-step images even after subscription ends for meals already purchased
9. **Priority Delivery** — choose exact 1-hour delivery window
10. **Early Access** — new meals and seasonal drops available 48hrs before standard members

---

## Step-by-Step Cooking Guides (App Feature)

Each meal has a cooking guide with:
- Total cook time and difficulty rating
- Equipment needed (pan, oven tray, air fryer basket, etc.)
- Step-by-step instructions (5-10 steps per meal)
- Each step has: text instruction + generated image showing that step
- Timer integration (tap to start timer for each step)
- "Mark as complete" per step
- Final plating suggestion with image

Image requirements:
- Generated via Gemini API (Nano Banana Pro for quality)
- Must look photorealistic — real food on real surfaces
- Not generic stock food — specific to the actual meal and step
- Dark wood/slate surface aesthetic, dramatic lighting
- Each meal needs: 1 hero image + 3-5 step images + 1 plated final image

---

## Pre-Set Meal Plans

### Plans (10 core + monthly rotating)

1. **The Lean Machine** — Fat loss. High protein, controlled carbs, green veg heavy.
2. **The Bulk Up** — Mass gain. High carb, generous protein, includes breakfast.
3. **Pure Protein** — Maximum protein per meal. Double portions. Minimal carbs.
4. **Chicken Only** — All chicken cuts. Different cuisine style each day.
5. **The Classic** — Balanced family meals. Mixed proteins. Includes breakfast.
6. **Steak Night** — Premium beef cuts every night. Ribeye, sirloin, fillet, T-bone, rump.
7. **The Mediterranean** — Lamb-forward. Couscous, roasted veg, warm spices.
8. **The Athlete** — Carb cycling. High carb training days, low carb rest days. Includes breakfast.
9. **The Breakfast Club** — Full 3-meal coverage. Premium breakfasts.
10. **Monthly Global Flavour** — Rotating: Middle Eastern, Mediterranean, Asian, Latin, African, Caribbean.

### Duration Options
- 3-day (Mon/Wed/Fri)
- 5-day (Mon-Fri)
- 7-day (full week)

### Each Plan Contains
- 2 meals/day (lunch + dinner) or 3 meals/day (breakfast + lunch + dinner)
- Full nutrition per meal and daily totals
- Allergen tags per meal
- Cooking method per meal
- Difficulty rating
- Cook time
- Sauce/marinade included where applicable

**Meal plans will be fully built out in Phase 2 (Meal Design) as a dedicated stage.**

---

## Admin Backend

### Pricing Calculator
- Per-ingredient cost management (cost per kg)
- Category margin sliders with live preview
- Organic surcharge percentage
- Delivery fee configuration
- Free delivery threshold
- Subscription pricing management
- "Preview all plan prices" with current settings
- Export to CSV

### Order Management (Phase 4)
- Order queue with status tracking
- Packing lists auto-generated per order
- Internal recipe/sauce quantities calculated from orders
- Customer communication (email/push)

### Delivery Management (Phase 5)
- Driver assignment
- Route optimization
- Real-time tracking dashboard
- Delivery confirmation with photo proof

---

## Phases

### PHASE 1 — Planning & Architecture [CURRENT]
**Status:** In progress
**Goal:** Lock down every detail before writing code

Deliverables:
- [x] Master phase plan (this document)
- [x] Project CLAUDE.md
- [x] Type definitions
- [x] Config files (site, pricing, delivery, ingredients)
- [x] Zustand stores
- [x] Utility libraries
- [x] Root layout, header, footer
- [ ] Update CLAUDE.md with all revised requirements
- [ ] Finalise this document with sign-off

---

### PHASE 2 — Meal Design [COMPLETE]
**Status:** Complete
**Goal:** Build out comprehensive, detailed meal definitions for all 10 plans. Dedicated stage — meals only.

**All meals output to a single dedicated file: `MEALS.md`** — separate from all other project docs.

Deliverables:
- [ ] **MEALS.md** — Master meals document containing:
  - Full 7-day meal definitions for all 10 plans (lunch + dinner for standard plans, breakfast + lunch + dinner for breakfast-inclusive plans)
  - Each meal: name, description, full ingredient list with gram quantities, nutrition calculated, allergens, cooking method(s), difficulty, cook time, which sauce/marinade is included
  - Dietary variant flags per meal (GF, DF, LF available or not)
  - Cooking method tags per meal (air fryer / oven / pan / either-or / multi-method)
  - Either/or cooking instructions noted where applicable
- [ ] **SAUCES.md** — Dedicated sauces/marinades document:
  - All 10-12 core sauces with full ingredient lists
  - Allergen tags per sauce
  - Dietary flags (GF, DF, LF)
  - Nutrition per serve
  - Which meals each sauce is used in (cross-reference)
  - Internal recipe (for backend, marked as INTERNAL)
- [ ] Global Flavour meals for first 6 months (6 rotations) — included in MEALS.md
- [ ] Meal builder combination matrix — which proteins work with which carbs/veg/sauces for each cooking method
- [ ] Meal image prompt list (for generation in Phase 3)

---

### PHASE 3 — Website Build [NEXT]
**Status:** Not started
**Goal:** Full marketing website + ordering flow

Deliverables:
- [ ] Home page (hero, how it works, featured plans, global flavour spotlight, macro wizard teaser, testimonials, CTA)
- [ ] Plans listing page with filters (goal, protein, duration, cooking method, dietary)
- [ ] Individual plan detail pages (daily breakdown, nutrition, pricing, add to cart)
- [ ] Meal builder page (interactive step-by-step)
- [ ] How It Works page + FAQ
- [ ] About page (brand story, sourcing)
- [ ] Cart page
- [ ] Checkout (Stripe integration)
- [ ] Membership signup flow
- [ ] Admin pricing calculator (protected route)
- [ ] Generated food photography (Gemini API)
- [ ] SEO, metadata, OG images
- [ ] Mobile responsive
- [ ] Framer Motion animations
- [ ] Deploy to Vercel

---

### PHASE 4 — Backend & Database
**Status:** Not started
**Goal:** Production backend for orders, users, subscriptions

Deliverables:
- [ ] Supabase project setup
- [ ] Database schema: users, memberships, orders, meals, plans, favourites, ratings
- [ ] Supabase Auth (email/password + Google OAuth)
- [ ] Stripe subscription billing for memberships
- [ ] Stripe one-time payments for meal orders
- [ ] Webhook handlers (Stripe events)
- [ ] Order management API routes
- [ ] Customer portal: account, subscription, order history, favourites
- [ ] Admin dashboard: orders, customers, pricing, inventory
- [ ] Resend email integration (welcome, order confirmation, delivery updates)
- [ ] Pricing calculator moved to database-backed

---

### PHASE 5 — Mobile App
**Status:** Not started
**Goal:** React Native app for iOS and Android

Deliverables:
- [ ] React Native project setup (Expo or bare)
- [ ] Shared API layer with website
- [ ] Authentication (same Supabase Auth)
- [ ] Meal browsing and ordering
- [ ] Step-by-step cooking guides with images and timers
- [ ] Favourites system
- [ ] Meal builder (custom orders)
- [ ] Health app integration (Apple Health, Samsung Health, Google Fit)
- [ ] "I ate this" meal logging
- [ ] Push notifications (delivery updates, new meals, reorder reminders)
- [ ] Offline recipe caching
- [ ] Premium tools: AI Macro Wizard, Smart Swap, Meal Planner Calendar, Progress Tracker

---

### PHASE 6 — Delivery System
**Status:** Not started
**Goal:** Driver app + delivery tracking

Deliverables:
- [ ] Driver mobile app (React Native)
- [ ] Route optimization
- [ ] Real-time GPS tracking
- [ ] Delivery photo confirmation
- [ ] Customer delivery tracking (web + app)
- [ ] SMS/push notifications for delivery status
- [ ] Delivery zone management in admin

---

### PHASE 7 — Growth & Optimisation
**Status:** Not started
**Goal:** Retention, analytics, scaling

Deliverables:
- [ ] Loyalty points system
- [ ] Refer-a-friend program
- [ ] Gift box purchases
- [ ] Corporate/office plans
- [ ] Seasonal limited-edition plans
- [ ] Meal rating and review system
- [ ] Analytics dashboard
- [ ] A/B testing framework
- [ ] Automated retention emails
- [ ] Recipe Vault (post-subscription access to purchased meals)
- [ ] Shopping Mode (generate ingredient lists)

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Website | Next.js 14+ (App Router), TypeScript, Tailwind, shadcn/ui, Framer Motion |
| Mobile App | React Native (Expo), TypeScript |
| State | Zustand (web), Zustand or Jotai (app) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Payments | Stripe (Checkout + Subscriptions) |
| Email | Resend |
| AI | Anthropic Claude API (claude-sonnet-4-6) |
| Image Gen | Google Gemini API (Nano Banana Pro / Nano Banana 2) |
| Hosting (Web) | Vercel |
| Hosting (Workers) | Railway (if needed for persistent jobs) |
| Storage | Cloudflare R2 |
| DNS | Cloudflare |
| Health Sync | Apple HealthKit, Google Fit, Samsung Health |
| Push Notifications | Expo Push / Firebase Cloud Messaging |
| Monitoring | Sentry + Vercel Analytics |

---

## Confirmed Details

| Question | Answer |
|---|---|
| Brand name | **Uncookd** |
| Market | Australia — Underwood QLD (HQ, 50km radius) + Sydney NSW (second market) |
| Currency | AUD |
| Halal | Everything halal certified. Core brand pillar. |
| Standard membership | $9.99/month AUD |
| Premium membership | $29.99/month AUD |
| Meals per day | Mix — some plans 2 (lunch + dinner), some plans 3 (breakfast + lunch + dinner) |
| Cooking methods | Air Fryer, Oven, Pan/Stovetop (primary). Some meals multi-method or either/or. |
| Cook times | Focus 15-20 min. Some 30 min. Some slow cook. |
| Sauces | 10-12 core sauces. Sugar-free, natural, healthy. Reused across meals. |
| Flavour direction | No cuisine bias. Balanced mix of light/fresh and bold across all plans. |
| Kofta | Only in Middle Eastern / Global Flavour plans. |
| Filters | Available to all users (cooking method, dietary, protein, cook time). |
| Wizard | Premium only. Includes appliance selection + goal-based macro calc. |

## Remaining Open Questions

1. Gift boxes — define contents and pricing strategy
2. Corporate plans — separate tier or custom quotes?
