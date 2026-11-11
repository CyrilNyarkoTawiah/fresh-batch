import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/site';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import SectionHeading from '../components/SectionHeading';
import { RevealGroup, riseIn } from '../components/Reveal';

type Filter = 'all' | 'baked-goods' | 'savoury';

export default function Menu() {
  const [params, setParams] = useSearchParams();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [filter, setFilter] = useState<Filter>(
    (params.get('cat') as Filter) === 'baked-goods' || params.get('cat') === 'savoury'
      ? (params.get('cat') as Filter)
      : 'all',
  );

  // Deep-link from search results: /menu?item=P0003 opens that quick view directly
  useEffect(() => {
    const itemId = params.get('item');
    if (itemId) {
      const p = PRODUCTS.find((x) => x.id === itemId && !x.comingSoon);
      if (p) setQuickView(p);
      params.delete('item');
      setParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = useMemo(
    () => PRODUCTS.filter((p) => !p.comingSoon && (filter === 'all' || p.category === filter)),
    [filter],
  );

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: 'Everything' },
    ...CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.name })),
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 pb-10 pt-32 lg:px-10">
      <SectionHeading
        as="h1"
        eyebrow="the bakery counter"
        title="Our Menu"
        sub="Everything here was baked or prepared today. Tap any treat to customise it, choose add-ons, and add it to your basket."
      />

      {/* Category tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-2.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`relative rounded-full px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-[0.1em] transition ${
              filter === t.id ? 'text-cream' : 'bg-white text-cocoa shadow-sm hover:bg-beige'
            }`}
          >
            {filter === t.id && (
              <motion.span
                layoutId="menu-tab"
                className="absolute inset-0 rounded-full bg-chocolate"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Product grid */}
      <RevealGroup key={filter} className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <motion.div key={p.id} variants={riseIn}>
            <ProductCard product={p} onQuickView={setQuickView} />
          </motion.div>
        ))}
      </RevealGroup>

      <p className="mt-12 text-center text-sm text-cocoa/60">
        Allergen or custom-size questions?{' '}
        <span className="font-semibold text-chocolate">Ask us before you order</span> — we love a
        special request.
      </p>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
