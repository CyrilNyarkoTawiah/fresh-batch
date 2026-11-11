import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Wheat, Heart, Timer, ShoppingBag, Mail } from 'lucide-react';
import type { Product } from '../types';
import { featuredProducts, comingSoonProducts, CATEGORIES, SITE } from '../data/site';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import SectionHeading from '../components/SectionHeading';
import { Reveal, RevealGroup, riseIn } from '../components/Reveal';

const WHY = [
  {
    icon: Timer,
    title: 'Freshly Prepared',
    text: 'Small batches through the day, so what you collect is never yesterday’s bake.',
  },
  {
    icon: Wheat,
    title: 'Quality Ingredients',
    text: 'Simple, honest ingredients — real butter, real fruit, real chocolate.',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    text: 'Every loaf and wrap is treated like it’s going to someone we know. Because it usually is.',
  },
  {
    icon: ShoppingBag,
    title: 'Convenient Ordering',
    text: 'Build your basket online, checkout in minutes, and collect or get it delivered.',
  },
];

const GALLERY_PREVIEW = [
  { src: 'images/gallery-1.jpg', alt: 'Chocolate cookies on parchment paper', cls: 'col-span-2 row-span-2' },
  { src: 'images/gallery-3.jpg', alt: 'Golden artisan loaf close-up', cls: '' },
  { src: 'images/gallery-7.jpg', alt: 'Chocolate cake being sliced', cls: '' },
  { src: 'images/gallery-4.jpg', alt: 'Hands kneading dough in a flour cloud', cls: 'col-span-2' },
];

export default function Home() {
  const [quickView, setQuickView] = useState<Product | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const featured = featuredProducts();
  const soon = comingSoonProducts();

  const scrollFeatured = (dir: 1 | -1) =>
    scroller.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <>
      {/* ─── 1. HERO ─── */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <motion.img
          src="images/hero.jpg"
          alt="Freshly baked pastries filling a bakery display counter"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/85 via-chocolate/35 to-chocolate/25" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10">
          <motion.p
            className="font-hand text-3xl text-butter sm:text-4xl hero-shade"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            Freshly Baked. Made with Love.
          </motion.p>
          <motion.h1
            className="font-display mt-3 max-w-3xl text-5xl font-extrabold leading-[1.05] text-cream sm:text-6xl lg:text-7xl hero-shade"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            Something Fresh is Baking.
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-cream/85 hero-shade"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            Discover deliciously baked treats and feel-good favourites, freshly prepared
            with love.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link to="/menu" className="btn btn-butter">
              Order Now <ArrowRight size={15} />
            </Link>
            <Link to="/menu" className="btn btn-outline-light">
              Explore Our Menu
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/80"
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ChevronDown size={26} />
        </motion.div>
      </section>

      {/* ─── 2. FEATURED FAVOURITES ─── */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          eyebrow="the favourites"
          title="Fresh from Our Kitchen"
          sub="Meet the treats made to brighten your day."
        />
        <div className="relative mt-12">
          <RevealGroup className="flex gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar snap-x">
            {featured.map((p) => (
              <motion.div key={p.id} variants={riseIn} className="w-[270px] shrink-0 snap-start sm:w-[300px]">
                <ProductCard product={p} onQuickView={setQuickView} />
              </motion.div>
            ))}
          </RevealGroup>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/menu" className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-cocoa transition hover:text-chocolate">
              View the full menu
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="hidden gap-2 sm:flex">
              <button onClick={() => scrollFeatured(-1)} aria-label="Scroll favourites left" className="qty-btn !h-11 !w-11">
                <ArrowRight size={16} className="rotate-180" />
              </button>
              <button onClick={() => scrollFeatured(1)} aria-label="Scroll favourites right" className="qty-btn !h-11 !w-11">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. OUR FRESH SELECTION ─── */}
      <section className="bg-beige/70 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="our fresh selection"
            title="Two Aisles of Happiness"
            sub="From oven-warm loaves to griddled, wrapped savoury favourites."
          />
          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.1}>
                <Link
                  to={`/menu?cat=${c.id}`}
                  className="group relative block overflow-hidden rounded-[1.8rem] shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-chocolate/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <h3 className="font-display text-2xl font-bold text-cream sm:text-3xl">{c.name}</h3>
                    <p className="mt-1.5 max-w-sm text-sm text-cream/80">{c.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-butter">
                      Browse this shelf
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. BRAND STORY ─── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="blob -left-8 -top-8 h-40 w-40 bg-rose/50" />
              <img
                src="images/story.jpg"
                alt="Hands kneading fresh dough on a floured surface"
                loading="lazy"
                className="relative z-10 aspect-[4/3.2] w-full rounded-[2rem] object-cover shadow-[var(--shadow-card-hover)]"
              />
              <div className="absolute -bottom-6 -right-4 z-20 rounded-2xl bg-butter px-6 py-4 shadow-lg sm:-right-8">
                <p className="font-hand text-2xl leading-none text-chocolate">Baked fresh,</p>
                <p className="font-hand text-2xl leading-none text-chocolate">just for you.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <span className="eyebrow">our story</span>
            <h2 className="font-display mt-1 text-3xl font-bold leading-tight text-chocolate sm:text-4xl">
              Made with Love. Baked Fresh.
            </h2>
            <div className="dotline mt-5 w-24" />
            <p className="mt-6 leading-relaxed text-cocoa/80">
              Fresh Batch started the way most good things do — in a home kitchen, with a
              few loyal tasters and recipes that refused to stay secret. What began as
              weekend loaves for family grew into a small bakery with one simple promise:
              everything we sell was made that day, by hand, with ingredients we’d serve
              our own table.
            </p>
            <p className="mt-4 leading-relaxed text-cocoa/80">
              We bake the classics you grew up on and the treats you’ll grow into — golden
              cornbread, buttery pound cakes, deep chocolate comfort and a shawarma worth
              crossing town for.
            </p>
            <Link to="/about" className="btn btn-outline mt-8">
              Get to Know Us <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── 5. COMING SOON TEASER ─── */}
      <section className="relative overflow-hidden bg-chocolate py-24 text-cream">
        <div className="blob -right-24 -top-24 h-80 w-80 bg-cocoa/60 floaty-slow" />
        <div className="blob -bottom-32 -left-16 h-72 w-72 bg-cocoa/40 floaty" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="coming soon"
            title="Something Good is Coming…"
            sub="We’re always cooking up something special. Stay close for our next delicious additions."
            light
          />
          <RevealGroup className="mt-12 grid gap-7 sm:grid-cols-2">
            {soon.map((p) => (
              <motion.div key={p.id} variants={riseIn} className="group overflow-hidden rounded-[1.6rem] bg-cocoa/40 ring-1 ring-cream/10">
                <div className="relative aspect-[16/8.5] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-butter px-3.5 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-chocolate">
                    Coming Soon
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-cream">{p.name}</h3>
                  <p className="mt-1.5 text-sm text-cream/70">{p.tagline}</p>
                  {p.comingSoonNote && (
                    <p className="font-hand mt-3 text-xl text-butter">{p.comingSoonNote}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </RevealGroup>
          <Reveal className="mt-10 text-center">
            <Link to="/coming-soon" className="btn btn-butter">
              See What’s in the Oven <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── 6. WHY FRESH BATCH ─── */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          eyebrow="why fresh batch?"
          title="Little Things We Never Compromise"
        />
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <motion.div
              key={w.title}
              variants={riseIn}
              className="rounded-[1.6rem] bg-shell p-7 shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-butter/70 text-chocolate">
                <w.icon size={22} strokeWidth={2.1} />
              </div>
              <h3 className="font-display mt-5 text-lg font-bold text-chocolate">{w.title}</h3>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-cocoa/70">{w.text}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      {/* ─── 7. GALLERY PREVIEW ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <SectionHeading
          eyebrow="from the kitchen"
          title="Life at Fresh Batch"
          sub="A peek at the bakes, the bustle and the butter."
        />
        <Reveal className="mt-12 grid auto-rows-[170px] grid-cols-2 gap-4 sm:auto-rows-[210px] md:grid-cols-4">
          {GALLERY_PREVIEW.map((g) => (
            <div key={g.src} className={`group relative overflow-hidden rounded-3xl ${g.cls}`}>
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-8 text-center">
          <Link to="/gallery" className="btn btn-outline">
            View Our Gallery <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>

      {/* ─── 8. NEWSLETTER ─── */}
      <section className="mx-auto max-w-5xl px-6 pb-4 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.2rem] bg-rose-soft px-7 py-14 text-center sm:px-12">
            <div className="blob -left-10 -top-14 h-36 w-36 bg-butter/60 floaty" />
            <div className="blob -bottom-16 -right-10 h-40 w-40 bg-cream/70 floaty-slow" />
            <span className="eyebrow">stay in the loop</span>
            <h2 className="font-display mt-1 text-3xl font-bold text-chocolate sm:text-4xl">
              A Little Freshness in Your Inbox
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[0.92rem] text-cocoa/70">
              New products, special offers and upcoming launches — straight from the oven
              to you.
            </p>
            {subscribed ? (
              <p className="font-hand mx-auto mt-7 text-2xl text-cocoa">
                Lovely — you’re on the list! 🧁
              </p>
            ) : (
              <form
                className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Degrades gracefully: opens a pre-filled email until a newsletter
                  // provider is configured (see README — Integrations).
                  const subject = encodeURIComponent('Newsletter signup — Fresh Batch');
                  const body = encodeURIComponent(`Please add me to the Fresh Batch newsletter: ${email}`);
                  window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
                  setSubscribed(true);
                }}
              >
                <div className="relative flex-1">
                  <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cocoa/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    aria-label="Email address"
                    className="field !pl-10"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Keep Me Posted
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
