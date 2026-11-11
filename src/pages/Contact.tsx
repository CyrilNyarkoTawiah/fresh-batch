import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Check } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { SITE } from '../data/site';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) errs.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'That email doesn’t look right.';
    if (!form.message.trim()) errs.message = 'Don’t be shy — write us a note.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // No backend configured yet: opens a pre-filled email to the bakery inbox.
    const subject = encodeURIComponent(`Website enquiry — ${form.subject || 'Hello Fresh Batch'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone || '—'}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-10 pt-32 lg:px-10">
      <SectionHeading
        as="h1"
        eyebrow="say hello"
        title="We’d Love to Hear from You"
        sub="Orders, questions, custom sizes or just to tell us the cornbread made your day."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        {/* Info panel */}
        <Reveal>
          <div className="flex h-full flex-col gap-5">
            <div className="rounded-[1.6rem] bg-chocolate p-8 text-cream">
              <h3 className="font-display text-xl font-bold">Fresh Batch</h3>
              <ul className="mt-6 space-y-5 text-sm text-cream/80">
                <li className="flex items-start gap-3.5">
                  <Phone size={17} className="mt-0.5 shrink-0 text-butter" />
                  <span>{SITE.phone}</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <Mail size={17} className="mt-0.5 shrink-0 text-butter" />
                  <span className="break-all">{SITE.email}</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-butter" />
                  <span>{SITE.address}</span>
                </li>
              </ul>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-butter mt-8 w-full"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>

            <div className="rounded-[1.6rem] bg-shell p-8 shadow-[var(--shadow-card)]">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-chocolate">
                <Clock size={17} className="text-cocoa" /> Baking Hours
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-cocoa/75">
                {SITE.hours.map((h) => (
                  <li key={h.days} className="flex items-center justify-between gap-4 border-b border-cocoa/8 pb-2.5 last:border-0">
                    <span className="font-medium text-chocolate">{h.days}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-beige/70 p-4 text-[0.82rem] leading-relaxed text-cocoa/75">
                <span className="font-bold text-chocolate">Delivery — </span>
                flat {SITE.currency}{SITE.deliveryFee} across {SITE.deliveryAreas.slice(0, 3).join(', ')} and
                more. Pickup orders welcome at the counter.
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="rounded-[1.6rem] bg-shell p-8 shadow-[var(--shadow-card)] sm:p-10">
            {sent ? (
              <div className="flex flex-col items-center py-14 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-butter/70">
                  <Check size={28} className="text-chocolate" />
                </div>
                <h3 className="font-display mt-5 text-2xl font-bold text-chocolate">Message ready to fly</h3>
                <p className="mt-2 max-w-sm text-sm text-cocoa/70">
                  Your email app should be open with everything filled in — just press send.
                  We usually reply within a day.
                </p>
                <button
                  type="button"
                  onClick={() => { setSent(false); setForm(EMPTY); }}
                  className="btn btn-outline mt-7"
                >
                  Write Another
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-chocolate">Send Us a Note</h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.16em] text-cocoa/60">Name *</label>
                    <input id="c-name" className="field" value={form.name} onChange={set('name')} placeholder="Your name" />
                    {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.16em] text-cocoa/60">Email *</label>
                    <input id="c-email" type="email" className="field" value={form.email} onChange={set('email')} placeholder="you@email.com" />
                    {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-phone" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.16em] text-cocoa/60">Phone</label>
                    <input id="c-phone" type="tel" className="field" value={form.phone} onChange={set('phone')} placeholder="0XX XXX XXXX" />
                  </div>
                  <div>
                    <label htmlFor="c-subject" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.16em] text-cocoa/60">Subject</label>
                    <input id="c-subject" className="field" value={form.subject} onChange={set('subject')} placeholder="What’s this about?" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-msg" className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.16em] text-cocoa/60">Message *</label>
                    <textarea id="c-msg" rows={5} className="field resize-none" value={form.message} onChange={set('message')} placeholder="Tell us everything…" />
                    {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message}</p>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-7 w-full sm:w-auto">
                  <Send size={15} /> Send Message
                </button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </div>
  );
}
