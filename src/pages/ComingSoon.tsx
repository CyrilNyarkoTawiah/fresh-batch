import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock } from 'lucide-react';
import { comingSoonProducts, SITE } from '../data/site';
import SectionHeading from '../components/SectionHeading';
import { Reveal, RevealGroup, riseIn } from '../components/Reveal';

export default function ComingSoon() {
  const soon = comingSoonProducts();
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);

  return (
    <div className="pb-10 pt-32">
      {/* Header banner */}
      <div className="relative overflow-hidden bg-chocolate py-20 text-cream">
        <div className="blob -right-20 -top-24 h-72 w-72 bg-cocoa/50 floaty-slow" />
        <div className="blob -bottom-24 -left-14 h-64 w-64 bg-cocoa/40 floaty" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            as="h1"
        eyebrow="in the oven"
            title="Fresh Ideas Are in the Oven."
            sub="The next batch of Fresh Batch favourites is being tested, tasted and perfected. Here’s what’s rising next."
            light
          />
        </div>
      </div>

      {/* Teaser cards */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <RevealGroup className="grid gap-8 md:grid-cols-2">
          {soon.map((p) => (
            <motion.article
              key={p.id}
              variants={riseIn}
              className="group overflow-hidden rounded-[1.8rem] bg-shell shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-cream/95 px-3.5 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-chocolate shadow">
                  <Clock size={11} /> In the Oven
                </span>
              </div>
              <div className="p-7">
                <span className="eyebrow">{p.category === 'savoury' ? 'Savoury' : 'Baked Goods'}</span>
                <h2 className="font-display mt-1 text-2xl font-bold text-chocolate">{p.name}</h2>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-cocoa/70">{p.description}</p>
                {p.comingSoonNote && (
                  <p className="font-hand mt-4 text-2xl text-cocoa">{p.comingSoonNote}</p>
                )}
              </div>
            </motion.article>
          ))}
        </RevealGroup>

        {/* Notify me */}
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-butter/60 px-7 py-12 text-center sm:px-12">
            <div className="blob -left-12 -top-12 h-32 w-32 bg-rose/50 floaty" />
            <Bell size={26} className="mx-auto text-chocolate" />
            <h3 className="font-display mt-3 text-2xl font-bold text-chocolate sm:text-3xl">
              Be the First to Taste It
            </h3>
            <p className="mx-auto mt-2 max-w-md text-[0.9rem] text-cocoa/70">
              Leave your email and we’ll shout the moment these land on the counter.
            </p>
            {notified ? (
              <p className="font-hand mt-6 text-2xl text-chocolate">
                Got it — you’ll hear from us first! 🔔
              </p>
            ) : (
              <form
                className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Degrades to a pre-filled email until a backend list is configured.
                  const subject = encodeURIComponent('Notify me — Fresh Batch coming soon');
                  const body = encodeURIComponent(`Please notify me when new products launch: ${notifyEmail}`);
                  window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
                  setNotified(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="field flex-1"
                />
                <button type="submit" className="btn btn-primary">
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
