import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu as MenuIcon, Search, ShoppingBag, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/site';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { count, openDrawer } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) => !p.comingSoon && `${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 6)
    : [];

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(255,248,239,0.92)' : 'rgba(255,248,239,0)',
        boxShadow: scrolled ? '0 1px 0 rgba(89,60,49,0.12), 0 10px 30px rgba(53,37,31,0.06)' : '0 0 0 rgba(0,0,0,0)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-chocolate/55 to-transparent"
        initial={false}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        aria-hidden="true"
      />
      <nav className={`relative mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 ${scrolled ? 'px-6 py-3 lg:px-10' : 'px-6 py-5 lg:px-10'}`}>
        <Link to="/" aria-label="Fresh Batch home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className="group relative text-[0.86rem] font-semibold tracking-wide text-chocolate/80 hover:text-chocolate">
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-chocolate' : ''}>{item.label}</span>
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-butter-deep transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full text-chocolate/80 transition hover:bg-beige hover:text-chocolate"
              aria-label="Search products"
            >
              <Search size={19} strokeWidth={2.2} />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.22 }}
                  className="absolute right-0 top-12 w-80 rounded-2xl border border-cocoa/10 bg-white p-3 shadow-[0_20px_50px_rgba(53,37,31,0.18)]"
                >
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search the menu…"
                    className="field !py-2.5"
                    aria-label="Search the menu"
                  />
                  <ul className="mt-2 max-h-64 overflow-auto">
                    {results.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => {
                            navigate(`/menu?item=${p.id}`);
                            setQuery('');
                            setSearchOpen(false);
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-cream"
                        >
                          <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                          <span>
                            <span className="block text-sm font-semibold text-chocolate">{p.name}</span>
                            <span className="block text-xs text-cocoa/60">{p.tagline}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                    {query.trim() && results.length === 0 && (
                      <li className="px-2 py-3 text-sm text-cocoa/60">Nothing matches “{query}” yet.</li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <button
            onClick={openDrawer}
            className="relative grid h-10 w-10 place-items-center rounded-full text-chocolate/80 transition hover:bg-beige hover:text-chocolate"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag size={19} strokeWidth={2.2} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                  className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-rose px-1 text-[0.62rem] font-bold text-chocolate"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link to="/menu" className="btn btn-primary !hidden !px-6 !py-2.5 md:!inline-flex">
            Order Now <ArrowRight size={14} />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full text-chocolate lg:hidden"
            aria-label="Open navigation"
          >
            <MenuIcon size={21} strokeWidth={2.2} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-chocolate/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col bg-cream px-8 py-6 shadow-[var(--shadow-drawer)]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button onClick={() => setMobileOpen(false)} aria-label="Close navigation" className="grid h-10 w-10 place-items-center rounded-full hover:bg-beige">
                  <X size={20} />
                </button>
              </div>
              <ul className="mt-10 flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `block rounded-2xl px-4 py-3.5 font-display text-2xl font-semibold transition ${
                          isActive ? 'bg-beige text-chocolate' : 'text-cocoa hover:bg-beige/60'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <Link to="/menu" className="btn btn-primary mt-8">
                Order Now
              </Link>
              <p className="font-hand mt-auto pb-4 text-center text-2xl text-cocoa/70">Freshly Baked. Made with Love.</p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
