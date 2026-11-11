import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, SITE } from '../data/site';

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, subtotal, count, updateQty, removeLine } = useCart();

  return (
    <>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-chocolate/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-cream shadow-[var(--shadow-drawer)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-cocoa/10 px-7 py-5">
              <h2 className="font-display text-2xl font-bold text-chocolate">
                Your Basket{' '}
                <span className="font-body align-middle text-sm font-semibold text-cocoa/60">
                  ({count})
                </span>
              </h2>
              <button onClick={closeDrawer} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full hover:bg-beige">
                <X size={20} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-beige">
                  <ShoppingBag size={30} className="text-cocoa" />
                </div>
                <p className="font-display text-xl font-semibold text-chocolate">Your basket is empty</p>
                <p className="text-sm text-cocoa/60">Something fresh is waiting for you on the menu.</p>
                <Link to="/menu" onClick={closeDrawer} className="btn btn-primary mt-2">
                  Browse the Menu
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-cocoa/8 overflow-auto px-7">
                  <>
                    {lines.map((line) => (
                      <motion.li
                        key={`${line.productId}-${line.variationId ?? ''}-${line.addOnIds.join(',')}-${line.notes}`}
                        layout
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        className="flex gap-4 py-5"
                      >
                        <img
                          src={line.product.image}
                          alt={line.product.imageAlt}
                          className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-[0.95rem] font-semibold text-chocolate">{line.product.name}</h3>
                            <button
                              onClick={() => removeLine(line)}
                              aria-label={`Remove ${line.product.name}`}
                              className="text-cocoa/40 transition hover:text-rose-soft"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          {line.product.variations && (
                            <p className="text-xs text-cocoa/60">
                              {line.product.variations.find((v) => v.id === line.variationId)?.label}
                            </p>
                          )}
                          {line.addOnIds.length > 0 && (
                            <p className="text-xs text-cocoa/60">
                              +{' '}
                              {line.product.addOns
                                ?.filter((a) => line.addOnIds.includes(a.id))
                                .map((a) => a.label)
                                .join(', ')}
                            </p>
                          )}
                          {line.notes && <p className="text-xs italic text-cocoa/50">“{line.notes}”</p>}
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <button className="qty-btn" onClick={() => updateQty(line, -1)} aria-label="Decrease quantity">
                                <Minus size={13} />
                              </button>
                              <span className="w-5 text-center text-sm font-semibold">{line.qty}</span>
                              <button className="qty-btn" onClick={() => updateQty(line, 1)} aria-label="Increase quantity">
                                <Plus size={13} />
                              </button>
                            </div>
                            <p className="text-sm font-bold text-chocolate">{formatPrice(line.lineTotal)}</p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </>
                </ul>

                <div className="border-t border-cocoa/10 bg-beige/60 px-7 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cocoa/70">Subtotal</span>
                    <span className="font-bold text-chocolate">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-cocoa/55">
                    {SITE.deliveryFee > 0
                      ? `Delivery calculated at checkout (flat ${formatPrice(SITE.deliveryFee)}).`
                      : 'Pickup available. Delivery fees set at checkout.'}
                  </p>
                  <Link to="/checkout" onClick={closeDrawer} className="btn btn-primary mt-4 w-full">
                    Checkout <ArrowRight size={15} />
                  </Link>
                  <p className="mt-2 text-center text-xs text-cocoa/50">
                    or <Link to="/menu" onClick={closeDrawer} className="font-semibold underline underline-offset-2 hover:text-chocolate">add more treats</Link>
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </>
  );
}
