import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice, productById } from '../data/site';
import { useCart } from '../context/CartContext';

export default function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addItem, openDrawer } = useCart();
  const [variationId, setVariationId] = useState<string | null>(null);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  // Reset choices whenever a new product opens
  useEffect(() => {
    if (product) {
      setVariationId(product.variations?.[0]?.id ?? null);
      setAddOnIds([]);
      setQty(1);
      setNotes('');
      setAdded(false);
    }
  }, [product]);

  // Esc to close + scroll lock
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const v = product.variations?.find((x) => x.id === variationId);
    const extras = (product.addOns ?? []).filter((a) => addOnIds.includes(a.id));
    return product.price + (v?.priceDelta ?? 0) + extras.reduce((s, a) => s + a.price, 0);
  }, [product, variationId, addOnIds]);

  const recs = useMemo(
    () => (product?.recommendations ?? []).map(productById).filter((p): p is Product => !!p && p.available && !p.comingSoon),
    [product],
  );

  const toggleAddOn = (id: string) =>
    setAddOnIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const add = () => {
    if (!product) return;
    addItem({ productId: product.id, variationId, addOnIds, qty, notes });
    setAdded(true);
    setTimeout(() => {
      onClose();
      openDrawer();
    }, 650);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-chocolate/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="pointer-events-none fixed inset-0 z-[85] grid place-items-center p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Quick view — ${product.name}`}
              className="pointer-events-auto max-h-[92vh] w-full max-w-3xl overflow-auto rounded-[2rem] bg-cream shadow-[0_40px_90px_rgba(53,37,31,0.35)]"
              initial={{ opacity: 0, y: 44, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={onClose}
                aria-label="Close quick view"
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-chocolate shadow-md transition hover:bg-white"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative min-h-64 overflow-hidden md:min-h-full">
                  <img src={product.image} alt={product.imageAlt} className="h-full w-full object-cover md:absolute md:inset-0" />
                  {product.bestseller && (
                    <span className="absolute left-4 top-4 rounded-full bg-rose px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-chocolate">
                      Bestseller
                    </span>
                  )}
                </div>

                <div className="flex flex-col p-6 sm:p-8">
                  <span className="eyebrow">{product.category === 'savoury' ? 'Savoury Favourites' : 'Baked Goods'}</span>
                  <h2 className="font-display mt-1 text-3xl font-bold text-chocolate">{product.name}</h2>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-cocoa/75">{product.description}</p>

                  {/* Variations */}
                  {product.variations && product.variations.length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-cocoa/60">Choose your size</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.variations.map((v) => (
                          <button
                            key={v.id}
                            onClick={() => setVariationId(v.id)}
                            className={`rounded-full border px-4 py-2 text-[0.8rem] font-semibold transition ${
                              variationId === v.id
                                ? 'border-chocolate bg-chocolate text-cream'
                                : 'border-cocoa/25 bg-white text-cocoa hover:border-cocoa/60'
                            }`}
                          >
                            {v.label}
                            {v.priceDelta !== 0 && (
                              <span className="ml-1.5 text-[0.7rem] opacity-75">
                                {v.priceDelta > 0 ? '+' : '−'}
                                {formatPrice(Math.abs(v.priceDelta))}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add-ons */}
                  {product.addOns && product.addOns.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-cocoa/60">Make it extra special</h3>
                      <div className="mt-2 flex flex-col gap-1.5">
                        {product.addOns.map((a) => (
                          <button
                            key={a.id}
                            onClick={() => toggleAddOn(a.id)}
                            className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left text-[0.85rem] transition ${
                              addOnIds.includes(a.id)
                                ? 'border-butter-deep bg-butter/40'
                                : 'border-cocoa/15 bg-white hover:border-cocoa/40'
                            }`}
                          >
                            <span className="flex items-center gap-2.5 font-medium text-chocolate">
                              <span
                                className={`grid h-4.5 w-4.5 place-items-center rounded-md border ${
                                  addOnIds.includes(a.id) ? 'border-chocolate bg-chocolate text-cream' : 'border-cocoa/35'
                                }`}
                                style={{ width: 18, height: 18 }}
                              >
                                {addOnIds.includes(a.id) && <Check size={11} strokeWidth={3.5} />}
                              </span>
                              {a.label}
                            </span>
                            <span className="text-xs font-semibold text-cocoa/70">{a.price === 0 ? 'Free' : `+${formatPrice(a.price)}`}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price + qty + add */}
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-cocoa/10 pt-5">
                    <div className="flex items-center gap-3">
                      <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                        <Minus size={13} />
                      </button>
                      <span className="w-5 text-center font-semibold">{qty}</span>
                      <button className="qty-btn" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity">
                        <Plus size={13} />
                      </button>
                    </div>
                    <motion.button
                      onClick={add}
                      whileTap={{ scale: 0.95 }}
                      className={`btn btn-primary flex-1 !px-4 ${added ? '!bg-cocoa' : ''}`}
                    >
                      {added ? (
                        <>Added to Basket ✓</>
                      ) : (
                        <>
                          <ShoppingBag size={15} /> Add — {formatPrice(unitPrice * qty)}
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Recommendations */}
                  {recs.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-hand text-2xl text-cocoa">You may also love…</h3>
                      <div className="mt-2 flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                        {recs.map((r) => (
                          <div key={r.id} className="flex w-40 shrink-0 items-center gap-3 rounded-2xl bg-white p-2.5 shadow-sm">
                            <img src={r.image} alt="" className="h-11 w-11 rounded-xl object-cover" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[0.78rem] font-semibold text-chocolate">{r.name}</p>
                              <button
                                onClick={() => addItem({ productId: r.id, variationId: null, addOnIds: [], qty: 1, notes: '' })}
                                className="text-[0.68rem] font-bold uppercase tracking-wide text-cocoa underline-offset-2 hover:underline"
                              >
                                Add · {formatPrice(r.price)}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
