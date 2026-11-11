# Fresh Batch — Bakery Website

**Freshly Baked. Made with Love.** 🥖

A premium, fully responsive multi-page bakery e-commerce website for **FRESH BATCH** —
with a working shopping cart, checkout, quick-view product customisation, Coming Soon
teasers and a gallery.

**Live site:** https://cyrilnyarkotawiah.github.io/fresh-batch/

---

## Tech stack

- **React 19 + TypeScript + Vite 7** — app framework
- **Tailwind CSS 4** — design tokens via `@theme` (warm cream/cocoa/butter palette)
- **Framer Motion** — page transitions, scroll reveals, cart & modal animations
- **Lucide Icons** — icon set
- **GitHub Pages** — static hosting (deploys via GitHub Actions, base path `/fresh-batch/`)
- Routing is hash-based (`#/menu`) so every deep link works on static hosting.

## Quick start

```bash
npm install
npm run dev            # local dev server
npm run build:ghpages  # production build with /fresh-batch/ base path
npm run preview        # serve the production build locally
```

## Project structure

```
src/
  types.ts               # shared contract: Product, CartLine, Order, SiteConfig
  data/site.ts           # ⭐ OWNER CONFIG: business info + full product catalogue
  context/CartContext.tsx# cart state, localStorage persistence, totals
  components/            # Header, Footer, CartDrawer, ProductCard, QuickViewModal…
  pages/                 # Home, Menu, ComingSoon, About, Gallery, Contact,
                         # Checkout, OrderConfirmed
public/images/           # replaceable sample photography
```

## How the owner manages the site (no code redeploys for content changes are NOT
possible on a static site, but everything lives in ONE file)

**`src/data/site.ts` is the single source of truth:**

- Business details — phone, email, WhatsApp, address, hours, social links, delivery
  fee, delivery areas (marked `⚠` where placeholders must be replaced with real info).
- Products — add/edit/remove product blocks. Fields: name, category, tagline,
  description, price, image, variations (sizes), add-ons, availability, featured,
  bestseller, `comingSoon`, recommendations.
- **Coming Soon:** set `comingSoon: true` on any product and it appears *only* on
  Coming Soon surfaces (never in the shop grid). Flip to `available: true` +
  `comingSoon: false` at launch.
- ⚠ All prices are **editable placeholders** — replace with real pricing before launch.
- Photography in `public/images/` is licensed sample imagery (Unsplash) — drop in
  real Fresh Batch photos using the same filenames and the whole site updates.

After editing: commit + push → GitHub Actions rebuilds and reploys (~1 min).

## Features

| Area | Status |
|---|---|
| Multi-page navigation (Home, Menu, About, Gallery, Contact, Coming Soon) | ✅ working |
| Product quick-view modal (variations, add-ons, quantity, notes, recommendations) | ✅ working |
| Shopping cart drawer (add, qty ±, remove, subtotal, persistence across refresh) | ✅ working |
| Checkout (validation, delivery/pickup, address, payment choice) | ✅ working |
| Order confirmation with unique reference + WhatsApp order handoff | ✅ working |
| Product search in header | ✅ working |
| Gallery category filter + keyboard lightbox | ✅ working |
| Contact form with validation | ✅ degrades to pre-filled email (no backend yet) |
| Newsletter / Notify-me | ✅ degrades to pre-filled email |
| Product search / category deep-links (`/menu?cat=…`, `/menu?item=…`) | ✅ working |
| SEO: per-page meta, Open Graph, JSON-LD Bakery schema | ✅ |
| Admin dashboard | ⏳ needs a backend (see below) |

## Honest limitations (what needs business credentials)

1. **Payments** — no gateway is wired yet. Orders are recorded as **UNPAID / pending**;
   nothing is ever faked as paid. To go live with MoMo/card, connect a Ghana-capable
   gateway (Paystack / Hubtel / Flutterwave). Server-side price recalculation and
   callback validation come with that integration.
2. **Order storage** — orders currently persist in the customer's browser
   (localStorage) and are handed to the bakery via WhatsApp/email. A real backend
   (Supabase / any hosted DB) is required before launch to store orders server-side,
   prevent duplicates and notify the owner.
3. **Newsletter & notify-me** — degrade to pre-filled emails until a provider
   (e.g. Brevo / Mailchimp) is configured.
4. **Placeholder data** — phone numbers, address, hours, socials, prices and delivery
   areas are marked `⚠` in `src/data/site.ts` and must be replaced with real values.
5. **Admin dashboard** — a password-protected owner dashboard (products, orders,
   status) requires the backend in #2. The single-config-file approach above covers
   content management until then.

## Deployment

On push to `main`, GitHub Actions builds and deploys to GitHub Pages. To publish a
content change: edit `src/data/site.ts` (or swap photos), commit, push. Done.
