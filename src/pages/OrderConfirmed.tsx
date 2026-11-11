import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, Phone, MapPin, Clock3 } from 'lucide-react';
import type { Order } from '../types';
import { formatPrice, SITE } from '../data/site';
import { Reveal } from '../components/Reveal';

export default function OrderConfirmed() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('fresh-batch-last-order');
      if (raw) setOrder(JSON.parse(raw) as Order);
    } catch { /* fall through to empty state */ }
  }, []);

  if (!order) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-10 pt-40 text-center">
        <h1 className="font-display text-3xl font-bold text-chocolate">No recent order found</h1>
        <p className="mt-3 text-cocoa/70">If you just placed an order, your confirmation lives on this page — otherwise, the menu is calling.</p>
        <Link to="/menu" className="btn btn-primary mt-8">Back to the Menu</Link>
      </div>
    );
  }

  const c = order.customer;

  const whatsappText = encodeURIComponent(
    `Hello Fresh Batch! I just placed an order.\n\n` +
    `Reference: ${order.reference}\n` +
    `Name: ${c.fullName}\nPhone: ${c.phone}\n` +
    `${c.fulfilment === 'delivery' ? `Delivery to: ${c.address}, ${c.area}` : 'Collection at the counter'}\n\n` +
    order.lines.map((l) => `• ${l.qty}× ${l.product.name}${l.variationId && l.product.variations ? ` (${l.product.variations.find((v) => v.id === l.variationId)?.label})` : ''} — ${formatPrice(l.lineTotal)}`).join('\n') +
    `\n\nSubtotal: ${formatPrice(order.subtotal)}\nDelivery: ${order.deliveryFee === 0 ? 'Pickup' : formatPrice(order.deliveryFee)}\nTotal: ${formatPrice(order.total)}\nPayment: ${c.paymentMethod === 'momo' ? 'Mobile Money' : c.paymentMethod === 'card' ? 'Card' : 'Cash'}`,
  );

  return (
    <div className="mx-auto max-w-3xl px-6 pb-10 pt-32 lg:px-10">
      <Reveal>
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-butter/70"
          >
            <CheckCircle2 size={40} className="text-chocolate" />
          </motion.div>
          <p className="font-hand mt-5 text-3xl text-cocoa">Your order is in the oven!</p>
          <h1 className="font-display mt-1 text-4xl font-extrabold text-chocolate">Thank You, {c.fullName.split(' ')[0]}!</h1>
          <p className="mx-auto mt-3 max-w-md text-[0.92rem] text-cocoa/70">
            We’ve received your order and will confirm it shortly. Quote your reference any
            time you chat with us.
          </p>
          <div className="mx-auto mt-6 w-fit rounded-2xl border-2 border-dashed border-cocoa/30 bg-white px-8 py-3">
            <span className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-cocoa/55">Order reference</span>
            <p className="font-display text-2xl font-extrabold tracking-wider text-chocolate">{order.reference}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <section className="rounded-[1.6rem] bg-shell p-7 shadow-[var(--shadow-card)] sm:p-8">
          <h2 className="font-display text-lg font-bold text-chocolate">Order Summary</h2>
          <ul className="mt-4 divide-y divide-cocoa/8">
            {order.lines.map((l) => (
              <li key={`${l.productId}-${l.variationId}-${l.addOnIds.join()}`} className="flex items-center gap-3.5 py-3.5">
                <img src={l.product.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-chocolate">{l.qty}× {l.product.name}</p>
                  <p className="text-xs text-cocoa/60">
                    {l.variationId && l.product.variations ? `${l.product.variations.find((v) => v.id === l.variationId)?.label} · ` : ''}
                    {l.addOnIds.length > 0 ? `+ ${l.product.addOns?.filter((a) => l.addOnIds.includes(a.id)).map((a) => a.label).join(', ')} · ` : ''}
                    {formatPrice(l.unitPrice)} each
                  </p>
                </div>
                <span className="text-sm font-bold text-chocolate">{formatPrice(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-cocoa/15 pt-4 text-sm">
            <div className="flex justify-between text-cocoa/75"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            <div className="flex justify-between text-cocoa/75">
              <span>{c.fulfilment === 'delivery' ? 'Delivery' : 'Pickup'}</span>
              <span>{order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between pt-1 text-base font-bold text-chocolate"><span>Total</span><span>{formatPrice(order.total)}</span></div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.15} className="mt-6">
        <section className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-[1.6rem] bg-shell p-6 shadow-[var(--shadow-card)]">
            <h3 className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-cocoa/60">
              <MapPin size={14} /> {c.fulfilment === 'delivery' ? 'Delivering To' : 'Collection'}
            </h3>
            {c.fulfilment === 'delivery' ? (
              <p className="mt-3 text-sm leading-relaxed text-cocoa/80">
                {c.address}<br />{c.area}
                {c.directions && <><br /><span className="text-cocoa/60">↳ {c.directions}</span></>}
              </p>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-cocoa/80">
                Collect at the counter:<br />{SITE.address}
              </p>
            )}
            {c.deliveryNotes && (
              <p className="mt-3 flex items-start gap-2 text-xs text-cocoa/60">
                <Clock3 size={13} className="mt-0.5 shrink-0" /> {c.deliveryNotes}
              </p>
            )}
          </div>
          <div className="rounded-[1.6rem] bg-shell p-6 shadow-[var(--shadow-card)]">
            <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-cocoa/60">Payment</h3>
            <p className="mt-3 text-sm text-cocoa/80">
              <strong className="text-chocolate">
                {c.paymentMethod === 'momo' ? 'Mobile Money' : c.paymentMethod === 'card' ? 'Card' : 'Cash on hand'}
              </strong>{' '}
              — <span className="rounded-full bg-butter/60 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-chocolate">pending</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-cocoa/60">
              {c.paymentMethod === 'momo'
                ? 'We’ll send MoMo details to your phone/email to settle this order.'
                : c.paymentMethod === 'card'
                  ? 'Card checkout is coming soon — we’ll arrange payment when confirming.'
                  : 'Have the total ready at handover.'}
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.2} className="mt-8">
        <div className="rounded-[1.8rem] bg-chocolate p-7 text-center text-cream sm:p-9">
          <p className="font-display text-xl font-bold">Faster confirmation?</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-cream/70">
            Send your order straight to us on WhatsApp — it arrives pre-filled with your
            reference and everything you chose.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${SITE.whatsapp}?text=${whatsappText}`} target="_blank" rel="noreferrer" className="btn btn-butter">
              <MessageCircle size={16} /> Send on WhatsApp
            </a>
            <a href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`} className="btn btn-outline-light">
              <Phone size={15} /> Call the Bakery
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.25} className="mt-8 text-center">
        <Link to="/menu" className="font-hand text-2xl text-cocoa underline-offset-4 hover:underline">
          Back for one more treat?
        </Link>
      </Reveal>
    </div>
  );
}
