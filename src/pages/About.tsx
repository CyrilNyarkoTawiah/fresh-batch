import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { Reveal, RevealGroup } from '../components/Reveal';
import { SITE } from '../data/site';

const VALUES = [
  {
    title: 'Baked fresh, every day',
    text: 'Nothing sits over from yesterday. When a batch runs out, it runs out — and we start the next one.',
  },
  {
    title: 'Recipes with roots',
    text: 'Our loaves and treats come from family recipes we’ve adapted, tested and made our own over years of weekend baking.',
  },
  {
    title: 'People first',
    text: 'We bake for birthdays, office runs, Sunday brunches and “just because” Tuesdays. You’re never just an order number here.',
  },
];

export default function About() {
  return (
    <div className="pt-32">
      {/* Intro hero */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          as="h1"
          eyebrow="our story"
          title="More Than Just a Bakery. It’s a Fresh Batch of Happiness."
          sub={SITE.tagline}
        />
      </div>

      {/* Story split */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="blob -right-10 -top-10 h-44 w-44 bg-butter/60 floaty" />
              <img
                src="images/story.jpg"
                alt="Hands working fresh dough at the Fresh Batch counter"
                className="relative z-10 aspect-[4/3.1] w-full rounded-[2rem] object-cover shadow-[var(--shadow-card-hover)]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">how it started</span>
            <h2 className="font-display mt-1 text-3xl font-bold text-chocolate">
              From a Home Kitchen to Your Table
            </h2>
            <div className="dotline mt-5 w-24" />
            <p className="mt-6 leading-relaxed text-cocoa/80">
              Fresh Batch began with a simple frustration: it was nearly impossible to find
              a cornbread worth craving or a loaf cake that tasted homemade — not
              factory-made. So we rolled up our sleeves, fired up the oven, and started
              baking the versions we wished existed.
            </p>
            <p className="mt-4 leading-relaxed text-cocoa/80">
              Friends asked for whole trays. Friends of friends asked for delivery. Somewhere
              between the third request and the fifth recipe tweak, Fresh Batch stopped
              being a hobby and became a bakery.
            </p>
            <p className="font-hand mt-8 text-3xl text-cocoa">
              Every batch still leaves the oven with the same promise —
              <span className="text-chocolate"> freshly baked, made with love.</span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Philosophy band */}
      <div className="bg-beige/70 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading eyebrow="what we believe" title="The Fresh Batch Way" />
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <Reveal key={v.title}>
                <div className="h-full rounded-[1.6rem] bg-shell p-8 shadow-[var(--shadow-card)]">
                  <span className="font-display text-4xl font-bold text-butter">0{VALUES.indexOf(v) + 1}</span>
                  <h3 className="font-display mt-3 text-xl font-bold text-chocolate">{v.title}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-cocoa/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </div>

      {/* Photo collage */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <RevealGroup className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] md:grid-cols-4">
          <Reveal className="col-span-2 row-span-2"><img src="images/gallery-3.jpg" alt="Golden artisan loaf fresh from the oven" loading="lazy" className="h-full w-full rounded-3xl object-cover" /></Reveal>
          <Reveal><img src="images/gallery-4.jpg" alt="Hands kneading dough in a flour cloud" loading="lazy" className="h-full w-full rounded-3xl object-cover" /></Reveal>
          <Reveal><img src="images/gallery-1.jpg" alt="Chocolate cookies on parchment" loading="lazy" className="h-full w-full rounded-3xl object-cover" /></Reveal>
          <Reveal><img src="images/coming-soon-cinnamon.jpg" alt="Cinnamon rolls in a baking dish" loading="lazy" className="h-full w-full rounded-3xl object-cover" /></Reveal>
          <Reveal><img src="images/gallery-6.jpg" alt="Brunch spread with Fresh Batch bakes" loading="lazy" className="h-full w-full rounded-3xl object-cover" /></Reveal>
        </RevealGroup>
        <Reveal className="mt-10 text-center">
          <p className="font-hand text-3xl text-cocoa">Hungry yet?</p>
          <Link to="/menu" className="btn btn-primary mt-5">
            Taste for Yourself <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
