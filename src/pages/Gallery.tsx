import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { RevealGroup, riseIn } from '../components/Reveal';

interface Shot {
  src: string;
  alt: string;
  cat: string;
}

const SHOTS: Shot[] = [
  { src: 'images/product-cornbread.jpg', alt: 'Golden cornbread baking in a pan', cat: 'Cornbread' },
  { src: 'images/product-banana-loaf.jpg', alt: 'Banana loaf crowned with banana slices', cat: 'Cakes & Loaves' },
  { src: 'images/product-lemon-loaf.jpg', alt: 'Lemon cake slice with glaze', cat: 'Cakes & Loaves' },
  { src: 'images/product-chocolate.jpg', alt: 'Rich chocolate bake with a dusting of cocoa', cat: 'Chocolate' },
  { src: 'images/gallery-1.jpg', alt: 'Chocolate cookies on parchment paper', cat: 'Chocolate' },
  { src: 'images/product-shawarma.jpg', alt: 'Freshly wrapped shawarma in a basket', cat: 'Savoury' },
  { src: 'images/category-baked.jpg', alt: 'Rustic artisan loaves on the counter', cat: 'Cakes & Loaves' },
  { src: 'images/gallery-3.jpg', alt: 'Close-up of a golden bread loaf', cat: 'Cakes & Loaves' },
  { src: 'images/gallery-4.jpg', alt: 'Hands kneading dough in a flour cloud', cat: 'Behind the Scenes' },
  { src: 'images/gallery-5.jpg', alt: 'Young baker in an apron kneading dough', cat: 'Behind the Scenes' },
  { src: 'images/gallery-2.jpg', alt: 'Cake slices plated with flowers', cat: 'Cakes & Loaves' },
  { src: 'images/gallery-6.jpg', alt: 'Weekend brunch spread with pastries', cat: 'Behind the Scenes' },
  { src: 'images/gallery-7.jpg', alt: 'Chocolate cake being sliced', cat: 'Chocolate' },
  { src: 'images/gallery-8.jpg', alt: 'Cinnamon rolls close-up', cat: 'Behind the Scenes' },
];

const CATS = ['All', 'Cakes & Loaves', 'Cornbread', 'Chocolate', 'Savoury', 'Behind the Scenes'];

export default function Gallery() {
  const [cat, setCat] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shots = useMemo(() => (cat === 'All' ? SHOTS : SHOTS.filter((s) => s.cat === cat)), [cat]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? null : (i + 1) % shots.length));
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? null : (i - 1 + shots.length) % shots.length));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, shots.length]);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-10 pt-32 lg:px-10">
      <SectionHeading
        as="h1"
        eyebrow="the gallery"
        title="Straight from Our Kitchen"
        sub="Bakes in progress, golden crusts and the quiet chaos of a working kitchen."
      />

      {/* Category filter */}
      <div className="mt-10 flex flex-wrap justify-center gap-2.5">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`relative rounded-full px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-[0.1em] transition ${
              cat === c ? 'text-cream' : 'bg-white text-cocoa shadow-sm hover:bg-beige'
            }`}
          >
            {cat === c && (
              <motion.span
                layoutId="gallery-tab"
                className="absolute inset-0 rounded-full bg-chocolate"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{c}</span>
          </button>
        ))}
      </div>

      {/* Masonry-style grid */}
      <RevealGroup key={cat} className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {shots.map((s, i) => (
          <motion.button
            key={s.src + i}
            variants={riseIn}
            onClick={() => setLightbox(i)}
            className="group relative block w-full overflow-hidden rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-butter"
            aria-label={`Open photo: ${s.alt}`}
          >
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-chocolate/70 to-transparent p-4 pt-10 text-left text-[0.72rem] font-semibold uppercase tracking-wide text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {s.cat}
            </span>
          </motion.button>
        ))}
      </RevealGroup>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && shots[lightbox] && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-chocolate/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            />
            <div className="fixed inset-0 z-[95] flex items-center justify-center p-5">
              <motion.figure
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-h-[86vh] max-w-4xl"
              >
                <img
                  src={shots[lightbox].src}
                  alt={shots[lightbox].alt}
                  className="max-h-[78vh] rounded-3xl object-contain shadow-2xl"
                />
                <figcaption className="mt-3 text-center text-sm text-cream/80">
                  {shots[lightbox].alt}
                </figcaption>
                <button
                  onClick={() => setLightbox(null)}
                  aria-label="Close photo"
                  className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center rounded-full bg-cream text-chocolate shadow-lg transition hover:bg-white"
                >
                  <X size={19} />
                </button>
                <button
                  onClick={() => setLightbox((i) => (i! - 1 + shots.length) % shots.length)}
                  aria-label="Previous photo"
                  className="absolute -left-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-chocolate shadow-lg transition hover:bg-cream"
                >
                  <ChevronLeft size={19} />
                </button>
                <button
                  onClick={() => setLightbox((i) => (i! + 1) % shots.length)}
                  aria-label="Next photo"
                  className="absolute -right-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-chocolate shadow-lg transition hover:bg-cream"
                >
                  <ChevronRight size={19} />
                </button>
              </motion.figure>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
