import type { Category, Product, SiteConfig } from '../types';

// ══════════════════════════════════════════════════════════════════════════
// SITE CONFIG — the owner edits this block only. No code changes needed.
// Placeholders marked ⚠ must be replaced with real business details
// before launch. Nothing here is invented as fact.
// ══════════════════════════════════════════════════════════════════════════

export const SITE: SiteConfig = {
  tagline: 'Freshly Baked. Made with Love.',
  phone: '⚠ +233 XX XXX XXXX',
  whatsapp: '233000000000', // ⚠ replace with real number (digits only)
  email: 'hello@freshbatch.example', // ⚠ replace
  address: '⚠ Accra, Ghana', // ⚠ replace
  hours: [
    { days: 'Monday – Friday', time: '8:00 am – 7:00 pm' }, // ⚠ replace
    { days: 'Saturday', time: '9:00 am – 7:00 pm' },
    { days: 'Sunday', time: 'Closed' },
  ],
  socials: [
    { label: 'Instagram', url: 'https://instagram.com/' }, // ⚠ replace handles
    { label: 'Facebook', url: 'https://facebook.com/' },
    { label: 'TikTok', url: 'https://tiktok.com/' },
  ],
  deliveryFee: 20, // ⚠ flat fee in GHS — set 0 to disable delivery charges
  deliveryAreas: ['Osu', 'East Legon', 'Airport Residential', 'Cantonments', 'Adabraka'], // ⚠ replace
  currency: 'GH₵',
};

// ══════════════════════════════════════════════════════════════════════════
// CATEGORIES
// ══════════════════════════════════════════════════════════════════════════

export const CATEGORIES: Category[] = [
  {
    id: 'baked-goods',
    name: 'Baked Goods',
    shortName: 'Baked Goods',
    description: 'Loaves, pound cakes and cornbread — pulled warm from the oven.',
    image: 'images/category-baked.jpg',
    imageAlt: 'Freshly baked loaves and cornbread on a bakery table',
  },
  {
    id: 'savoury',
    name: 'Savoury Favourites',
    shortName: 'Savoury',
    description: 'Feel-good favourites with real flavour. Meet our shawarma.',
    image: 'images/category-savoury.jpg',
    imageAlt: 'A wrapped shawarma with fresh fillings',
  },
];

// ══════════════════════════════════════════════════════════════════════════
// PRODUCTS
// ⚠ All prices are editable placeholders — replace with real pricing before
//   launch. Images under /images/ are replaceable sample photography.
// To add a product: copy a block, give it a new id, fill the fields.
// Set comingSoon: true and it appears ONLY on Coming Soon surfaces.
// ══════════════════════════════════════════════════════════════════════════

export const PRODUCTS: Product[] = [
  {
    id: 'P0001',
    name: 'Golden Cornbread',
    category: 'baked-goods',
    tagline: 'Buttery, golden squares with a soft centre.',
    description:
      'Our signature cornbread bakes golden on the outside and stays tender inside — buttery, gently sweet and impossible to eat just one square of. Lovely warm with a smear of butter.',
    price: 35, // ⚠ placeholder price
    image: 'images/product-cornbread.jpg',
    imageAlt: 'Golden cornbread squares stacked on parchment paper',
    variations: [
      { id: 'whole', label: 'Whole tray (8 squares)', priceDelta: 0 },
      { id: 'half', label: 'Half tray (4 squares)', priceDelta: -12 },
    ],
    addOns: [{ id: 'butter', label: 'Whipped honey butter', price: 8 }],
    available: true,
    featured: true,
    bestseller: true,
    recommendations: ['P0003', 'P0006'],
  },
  {
    id: 'P0002',
    name: 'Chocolate Dream',
    category: 'baked-goods',
    tagline: 'Rich, deep cocoa comfort in every bite.',
    description:
      'Deep, fudgy and unapologetically chocolatey — our chocolate bake is the treat you reach for when only chocolate will do. (Format configurable: cake, loaf or bars — owner sets the final name and photo.)',
    price: 45, // ⚠ placeholder price
    image: 'images/product-chocolate.jpg',
    imageAlt: 'Rich chocolate bake with a fudgy crumb',
    variations: [
      { id: 'whole', label: 'Whole', priceDelta: 0 },
      { id: 'half', label: 'Half', priceDelta: -15 },
    ],
    available: true,
    featured: true,
    recommendations: ['P0001', 'P0004'],
  },
  {
    id: 'P0003',
    name: 'Lemon Pound Cake',
    category: 'baked-goods',
    tagline: 'Bright citrus, dense buttery crumb.',
    description:
      'A classic loaf with a sunny lift — real lemon zest folded through a dense, buttery pound crumb, finished with a light citrus glaze. Slices beautifully for gifting or afternoon tea.',
    price: 55, // ⚠ placeholder price
    image: 'images/product-lemon-loaf.jpg',
    imageAlt: 'Sliced lemon pound cake loaf with glaze',
    variations: [
      { id: 'whole', label: 'Whole loaf', priceDelta: 0 },
      { id: 'half', label: 'Half loaf', priceDelta: -18 },
    ],
    available: true,
    featured: true,
    recommendations: ['P0004', 'P0001'],
  },
  {
    id: 'P0004',
    name: 'Oatmeal Carrot Cake',
    category: 'baked-goods',
    tagline: 'Wholesome oats, sweet carrot, warm spice.',
    description:
      'Hearty oats and freshly grated carrot baked into a warmly spiced loaf — comfort food that still feels good an hour later. Keeps beautifully, tastes even better the next day.',
    price: 55, // ⚠ placeholder price
    image: 'images/product-carrot-loaf.jpg',
    imageAlt: 'Oatmeal carrot cake loaf with visible carrot and oats',
    variations: [
      { id: 'whole', label: 'Whole loaf', priceDelta: 0 },
      { id: 'half', label: 'Half loaf', priceDelta: -18 },
    ],
    available: true,
    recommendations: ['P0003', 'P0005'],
  },
  {
    id: 'P0005',
    name: 'Banana Cake',
    category: 'baked-goods',
    tagline: 'Ripe bananas, soft crumb, pure comfort.',
    description:
      'The loaf that turns over-ripe bananas into gold — moist, fragrant and lightly sweet, with caramelised edges. Our most homely, most requested bake.',
    price: 50, // ⚠ placeholder price
    image: 'images/product-banana-loaf.jpg',
    imageAlt: 'Moist banana cake loaf with banana slices on top',
    variations: [
      { id: 'whole', label: 'Whole loaf', priceDelta: 0 },
      { id: 'half', label: 'Half loaf', priceDelta: -16 },
    ],
    available: true,
    featured: true,
    recommendations: ['P0004', 'P0002'],
  },
  {
    id: 'P0006',
    name: 'Fresh Batch Shawarma',
    category: 'savoury',
    tagline: 'Grilled, wrapped and packed with flavour.',
    description:
      'Our savoury headline: marinated grilled fillings, crunchy vegetables and a signature sauce, wrapped tight in warm flatbread. Made to order, generous by design.',
    price: 40, // ⚠ placeholder price
    image: 'images/product-shawarma.jpg',
    imageAlt: 'A freshly wrapped shawarma with grilled filling',
    variations: [
      { id: 'single', label: 'Single wrap', priceDelta: 0 },
      { id: 'double', label: 'Double protein', priceDelta: 15 },
    ],
    addOns: [
      { id: 'extra-sauce', label: 'Extra signature sauce', price: 5 },
      { id: 'cheese', label: 'Add melted cheese', price: 7 },
    ],
    available: true,
    featured: true,
    bestseller: true,
    recommendations: ['P0001', 'P0006'],
  },
  // ─── Coming Soon teasers (appear ONLY on Coming Soon surfaces) ───
  {
    id: 'CS0001',
    name: 'Cinnamon Swirl Buns',
    category: 'baked-goods',
    tagline: 'Soft rolls, buttery cinnamon ribbons.',
    description:
      'Slow-proofed buns swirled with cinnamon butter — we are still perfecting the glaze.',
    price: 0, // ⚠ set at launch
    image: 'images/coming-soon-cinnamon.jpg',
    imageAlt: 'Teaser photo of cinnamon buns',
    available: false,
    comingSoon: true,
    comingSoonNote: 'In the oven — testing the glaze.',
  },
  {
    id: 'CS0002',
    name: 'Weekend Brunch Box',
    category: 'savoury',
    tagline: 'A curated box of Fresh Batch favourites.',
    description:
      'One box, everything we do best — being designed for slow weekend mornings.',
    price: 0, // ⚠ set at launch
    image: 'images/coming-soon-brunch.jpg',
    imageAlt: 'Teaser photo of a brunch spread',
    available: false,
    comingSoon: true,
    comingSoonNote: 'Recipe lineup being finalised.',
  },
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);
export const byCategory = (id: Product['category']) => PRODUCTS.filter((p) => p.category === id && !p.comingSoon);
export const featuredProducts = () => PRODUCTS.filter((p) => p.featured && !p.comingSoon);
export const comingSoonProducts = () => PRODUCTS.filter((p) => p.comingSoon);

export const formatPrice = (n: number, currency = SITE.currency) =>
  n === 0 ? `${currency}—` : `${currency}${n.toFixed(2).replace(/\.00$/, '')}`;
