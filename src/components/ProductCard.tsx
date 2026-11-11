import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, Clock } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice } from '../data/site';
import { useCart } from '../context/CartContext';

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView: (p: Product) => void;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const quickAdd = () => {
    addItem({ productId: product.id, variationId: null, addOnIds: [], qty: 1, notes: '' });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      whileHover="hover"
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-shell shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative aspect-[4/3.4] overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover"
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* quick-view pill */}
        <motion.button
          onClick={() => onQuickView(product)}
          className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-full bg-cream/95 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-chocolate shadow-lg backdrop-blur"
          variants={{ hover: { opacity: 1, y: 0 } }}
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
        >
          <Eye size={14} /> Quick View
        </motion.button>
        {product.bestseller && (
          <span className="absolute left-4 top-4 rounded-full bg-rose px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-chocolate">
            Bestseller
          </span>
        )}
        {!product.available && (
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-chocolate/85 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-cream">
            <Clock size={11} /> Sold out today
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-chocolate">{product.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-[0.85rem] leading-relaxed text-cocoa/70">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-lg font-bold text-chocolate">{formatPrice(product.price)}</span>
          <motion.button
            onClick={quickAdd}
            disabled={!product.available}
            whileTap={{ scale: 0.88 }}
            className={`flex h-11 items-center gap-2 rounded-full px-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] transition-colors ${
              added
                ? 'bg-cocoa text-cream'
                : 'bg-butter text-chocolate hover:bg-butter-deep disabled:cursor-not-allowed disabled:opacity-40'
            }`}
            aria-label={`Add ${product.name} to basket`}
          >
            {added ? 'Added ✓' : (
              <>
                <Plus size={14} strokeWidth={3} /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
