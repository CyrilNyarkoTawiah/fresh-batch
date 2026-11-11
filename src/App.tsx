import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Loader from './components/Loader';
import RouteLoader from './components/RouteLoader';
import FloatingIcons from './components/FloatingIcons';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmed = lazy(() => import('./pages/OrderConfirmed'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }), [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <motion.div key={location.pathname} {...PAGE_FADE}>
      <Suspense fallback={null}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="*" element={<Home />} />
      </Routes>
      </Suspense>
    </motion.div>
  );
}

const PAGE_FADE = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const seen = sessionStorage.getItem('fb-seen');
    const t = setTimeout(() => setLoading(false), seen ? 500 : 1400);
    sessionStorage.setItem('fb-seen', '1');
    return () => clearTimeout(t);
  }, []);

  return (
    <CartProvider>
      <div className="grain relative min-h-screen">
        {loading ? (
          <Loader done={loading} />
        ) : (
          <HashRouter>
            <ScrollToTop />
            <RouteLoader />
            <FloatingIcons />
            <Header />
            <AnimatedRoutes />
            <Footer />
            <CartDrawer />
          </HashRouter>
        )}
      </div>
    </CartProvider>
  );
}
