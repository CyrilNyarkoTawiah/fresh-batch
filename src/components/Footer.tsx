import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Instagram, Facebook, Music2, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { SITE } from '../data/site';

const SHOP_LINKS = [
  { to: '/menu', label: 'Full Menu' },
  { to: '/coming-soon', label: 'Coming Soon' },
  { to: '/checkout', label: 'Checkout' },
  { to: '/gallery', label: 'Gallery' },
];

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const SOCIAL_ICONS: Record<string, ReactNode> = {
  Instagram: <Instagram size={17} />,
  Facebook: <Facebook size={17} />,
  TikTok: <Music2 size={17} />,
};

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-chocolate text-cream">
      <div className="blob -left-24 -top-24 h-72 w-72 bg-cocoa/50" />
      <div className="blob -bottom-32 right-10 h-80 w-80 bg-cocoa/40" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:px-10">
        <div>
          <Logo variant="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            A warm, modern bakery bringing people together through freshly baked goods and
            feel-good favourites — {SITE.tagline.toLowerCase()}
          </p>
          <div className="mt-6 flex gap-3">
            {SITE.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream/80 transition hover:border-butter hover:bg-butter hover:text-chocolate"
              >
                {SOCIAL_ICONS[s.label] ?? <Instagram size={17} />}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Shop">
          <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-butter">Shop</h3>
          <ul className="mt-5 space-y-3 text-sm text-cream/75">
            {SHOP_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-butter">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Fresh Batch">
          <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-butter">Fresh Batch</h3>
          <ul className="mt-5 space-y-3 text-sm text-cream/75">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-butter">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-butter">Say Hello</h3>
          <ul className="mt-5 space-y-3.5 text-sm text-cream/75">
            <li className="flex items-center gap-3">
              <Phone size={15} className="shrink-0 text-rose" />
              <span>{SITE.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} className="shrink-0 text-rose" />
              <span className="break-all">{SITE.email}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 shrink-0 text-rose" />
              <span>{SITE.address}</span>
            </li>
          </ul>
          <div className="mt-5 rounded-2xl border border-cream/15 p-4 text-xs leading-relaxed text-cream/60">
            <span className="font-semibold text-cream/85">Delivery</span> — flat {SITE.currency}
            {SITE.deliveryFee} within our delivery areas. Pickup orders welcome.
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-cream/50 sm:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} Fresh Batch. All rights reserved.</p>
          <p className="font-hand text-base text-cream/60">Good things come from fresh batches.</p>
        </div>
      </div>
    </footer>
  );
}
