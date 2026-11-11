// ─── Fresh Batch contract layer ──────────────────────────────────────────────
// Every module (pages, cart, checkout) codes against these types only.

export type CategoryId = 'baked-goods' | 'savoury';

export interface ProductVariation {
  id: string;
  label: string;          // e.g. "Whole loaf", "Half loaf"
  priceDelta: number;     // added to the base price (0 = same price)
}

export interface AddOn {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;                    // permanent ID — never renumber
  name: string;
  category: CategoryId;
  tagline: string;               // one-liner shown on cards
  description: string;           // longer copy for quick view
  price: number;                 // base price in GHS
  image: string;                 // path under /images (replaceable)
  imageAlt: string;
  variations?: ProductVariation[];
  addOns?: AddOn[];
  available: boolean;
  featured?: boolean;            // shows in "Fresh from Our Kitchen"
  bestseller?: boolean;
  comingSoon?: boolean;          // appears ONLY on Coming Soon surfaces
  comingSoonNote?: string;
  recommendations?: string[];    // product ids for "You May Also Love"
}

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface CartLine {
  productId: string;
  variationId: string | null;
  addOnIds: string[];
  qty: number;
  notes: string;
}

export interface ResolvedCartLine extends CartLine {
  product: Product;
  unitPrice: number;   // base + variation delta + add-ons
  lineTotal: number;
}

export type Fulfilment = 'delivery' | 'pickup';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  fulfilment: Fulfilment;
  address: string;
  area: string;
  directions: string;
  deliveryNotes: string;
  paymentMethod: 'momo' | 'cash-on-delivery' | 'card';
  paymentStatus: 'unpaid' | 'paid';
}

export interface Order {
  reference: string;   // e.g. FB-7K2M9X
  placedAt: string;    // ISO timestamp
  lines: ResolvedCartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerDetails;
}

// ─── Site-wide editable config (owner edits this file) ───
export interface SiteConfig {
  tagline: string;
  phone: string;
  whatsapp: string;        // international format, digits only, e.g. 233...
  email: string;
  address: string;
  hours: { days: string; time: string }[];
  socials: { label: string; url: string }[];
  deliveryFee: number;     // flat fee in GHS; 0 disables
  deliveryAreas: string[];
  currency: string;
}
