import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Banknote, Smartphone, CreditCard, ArrowLeft, ShieldCheck } from 'lucide-react';
import type { CustomerDetails, Fulfilment, Order } from '../types';
import { deliveryFeeFor, useCart } from '../context/CartContext';
import { formatPrice, SITE } from '../data/site';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

const ORDERS_KEY = 'fresh-batch-orders-v1';

const genRef = () => {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `FB-${s}`;
};

type Errors = Partial<Record<keyof CustomerDetails, string>>;

export default function Checkout() {
  const { lines, subtotal, count, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Fulfilment>('delivery');
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    fulfilment: 'delivery',
    address: '',
    area: SITE.deliveryAreas[0] ?? '',
    directions: '',
    deliveryNotes: '',
    paymentMethod: 'momo',
    paymentStatus: 'unpaid',
  });

  const deliveryFee = useMemo(() => deliveryFeeFor(form.fulfilment), [form.fulfilment]);
  const total = subtotal + deliveryFee;

  const set = <K extends keyof CustomerDetails>(k: K, v: CustomerDetails[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const errs: Errors = {};
    if (!form.fullName.trim()) errs.fullName = 'Required.';
    if (!/^[0-9+\s()-]{9,15}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (form.fulfilment === 'delivery' && !form.address.trim()) errs.address = 'Delivery needs an address.';
    if (form.fulfilment === 'delivery' && !form.area.trim()) errs.area = 'Tell us your area.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0 || !validate()) return;

    // Payment note: no gateway is configured yet. The order is recorded as
    // UNPAID and payment is settled directly with the bakery (MoMo details
    // sent with the confirmation) — never faked as paid.
    const order: Order = {
      reference: genRef(),
      placedAt: new Date().toISOString(),
      lines,
      subtotal,
      deliveryFee,
      total,
      customer: { ...form, fulfilment: step, paymentStatus: 'unpaid' },
    };
    try {
      const prev = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]') as Order[];
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...prev].slice(0, 25)));
    } catch { /* non-fatal */ }
    sessionStorage.setItem('fresh-batch-last-order', JSON.stringify(order));
    clearCart();
    navigate('/order-confirmed');
  };

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-10 pt-40 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-beige">
          <ShoppingBag size={30} className="text-cocoa" />
        </div>
        <h1 className="font-display mt-6 text-3xl font-bold text-chocolate">Nothing to check out yet</h1>
        <p className="mt-3 text-cocoa/70">Your basket is empty — the oven is not. Go pick something delicious.</p>
        <Link to="/menu" className="btn btn-primary mt-8">Back to the Menu</Link>
      </div>
    );
  }

  const payOptions = [
    { id: 'momo' as const, icon: Smartphone, label: 'Mobile Money', note: 'Details confirmed with your order' },
    { id: 'cash-on-delivery' as const, icon: Banknote, label: 'Cash', note: 'Pay on collection or delivery' },
    { id: 'card' as const, icon: CreditCard, label: 'Card', note: 'Available once a gateway is connected' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 pb-10 pt-32 lg:px-10">
      <SectionHeading
        as="h1"
        eyebrow="almost there"
        title="Checkout"
        sub="A few details and your treats are one step closer to your table."
      />

      <form onSubmit={placeOrder} noValidate className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: details */}
        <div className="flex flex-col gap-8">
          {/* Fulfilment */}
          <Reveal>
            <section className="rounded-[1.6rem] bg-shell p-7 shadow-[var(--shadow-card)] sm:p-8">
              <h2 className="font-display text-lg font-bold text-chocolate">1 · Collection or Delivery?</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {(['delivery', 'pickup'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => { setStep(f); set('fulfilment', f); }}
                    className={`rounded-2xl border-2 p-4 text-left transition ${
                      step === f ? 'border-chocolate bg-cream' : 'border-cocoa/15 bg-white hover:border-cocoa/40'
                    }`}
                  >
                    <span className="block font-bold text-chocolate">{f === 'delivery' ? 'Deliver to me' : 'I’ll pick it up'}</span>
                    <span className="mt-1 block text-xs text-cocoa/65">
                      {f === 'delivery'
                        ? SITE.deliveryFee > 0 ? `Flat ${formatPrice(SITE.deliveryFee)} fee` : 'Delivery available'
                        : 'Ready at the counter'}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Customer info */}
          <Reveal>
            <section className="rounded-[1.6rem] bg-shell p-7 shadow-[var(--shadow-card)] sm:p-8">
              <h2 className="font-display text-lg font-bold text-chocolate">2 · Your Details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="k-name" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cocoa/60">Full name *</label>
                  <input id="k-name" className="field" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Ama Mensah" />
                  {errors.fullName && <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="k-phone" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cocoa/60">Phone *</label>
                  <input id="k-phone" type="tel" className="field" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="0XX XXX XXXX" />
                  {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="k-email" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cocoa/60">Email *</label>
                  <input id="k-email" type="email" className="field" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" />
                  {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                </div>
              </div>
            </section>
          </Reveal>

          {/* Delivery info */}
          {step === 'delivery' && (
            <Reveal>
              <section className="rounded-[1.6rem] bg-shell p-7 shadow-[var(--shadow-card)] sm:p-8">
                <h2 className="font-display text-lg font-bold text-chocolate">3 · Where Should We Bring It?</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="k-addr" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cocoa/60">Street / house address *</label>
                    <input id="k-addr" className="field" value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="12 Palm Street, apartment 4" />
                    {errors.address && <p className="mt-1 text-xs text-rose-600">{errors.address}</p>}
                  </div>
                  <div>
                    <label htmlFor="k-area" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cocoa/60">Area *</label>
                    <input id="k-area" list="areas" className="field" value={form.area} onChange={(e) => set('area', e.target.value)} placeholder="e.g. East Legon" />
                    <datalist id="areas">{SITE.deliveryAreas.map((a) => <option key={a} value={a} />)}</datalist>
                    {errors.area && <p className="mt-1 text-xs text-rose-600">{errors.area}</p>}
                  </div>
                  <div>
                    <label htmlFor="k-dir" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cocoa/60">Directions for the rider</label>
                    <input id="k-dir" className="field" value={form.directions} onChange={(e) => set('directions', e.target.value)} placeholder="Blue gate, 2nd left after the junction" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="k-notes" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cocoa/60">Delivery notes</label>
                    <input id="k-notes" className="field" value={form.deliveryNotes} onChange={(e) => set('deliveryNotes', e.target.value)} placeholder="Call when you arrive" />
                  </div>
                </div>
              </section>
            </Reveal>
          )}

          {/* Payment */}
          <Reveal>
            <section className="rounded-[1.6rem] bg-shell p-7 shadow-[var(--shadow-card)] sm:p-8">
              <h2 className="font-display text-lg font-bold text-chocolate">
                {step === 'delivery' ? '4' : '3'} · How Would You Like to Pay?
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {payOptions.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => set('paymentMethod', o.id)}
                    className={`rounded-2xl border-2 p-4 text-left transition ${
                      form.paymentMethod === o.id ? 'border-chocolate bg-cream' : 'border-cocoa/15 bg-white hover:border-cocoa/40'
                    }`}
                  >
                    <o.icon size={20} className="text-cocoa" />
                    <span className="mt-2 block text-sm font-bold text-chocolate">{o.label}</span>
                    <span className="mt-0.5 block text-[0.7rem] leading-snug text-cocoa/60">{o.note}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-beige/60 p-3.5 text-[0.78rem] leading-relaxed text-cocoa/75">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-cocoa" />
                Your order is confirmed as <strong>pending payment</strong>. We’ll send Mobile
                Money details with your order confirmation — payment is settled with the
                bakery before delivery. Card checkout arrives once a payment gateway is connected.
              </p>
            </section>
          </Reveal>
        </div>

        {/* Right: summary */}
        <Reveal delay={0.08}>
          <aside className="h-fit rounded-[1.6rem] bg-beige/70 p-7 lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-bold text-chocolate">Order Summary</h2>
            <ul className="mt-5 space-y-4">
              {lines.map((l) => (
                <li key={`${l.productId}-${l.variationId}-${l.addOnIds.join()}`} className="flex items-center gap-3">
                  <img src={l.product.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-chocolate">{l.product.name}</p>
                    <p className="text-xs text-cocoa/60">× {l.qty}{l.variationId && l.product.variations ? ` · ${l.product.variations.find(v => v.id === l.variationId)?.label}` : ''}</p>
                  </div>
                  <span className="text-sm font-bold text-chocolate">{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 border-t border-cocoa/15 pt-4 text-sm">
              <div className="flex justify-between text-cocoa/75"><span>Subtotal ({count} items)</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-cocoa/75">
                <span>{step === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-bold text-chocolate">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary mt-6 w-full !py-4"
            >
              Place Order — {formatPrice(total)}
            </motion.button>
            <Link to="/menu" className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-cocoa/60 underline-offset-2 hover:underline">
              <ArrowLeft size={13} /> Keep shopping
            </Link>
          </aside>
        </Reveal>
      </form>
    </div>
  );
}
