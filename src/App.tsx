import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Loader from './components/Loader';
import RouteLoader from './components/RouteLoader';
import FloatingIcons from './components/FloatingIcons';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ComingSoon from './pages/ComingSoon';
import Checkout from './pages/Checkout';
import OrderConfirmed from './pages/OrderConfirmed';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
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
    </AnimatePresence>
  );
}

const PAGE_FADE = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
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
            <motion.main {...PAGE_FADE}>
              <AnimatedRoutes />
            </motion.main>
            <Footer />
            <CartDrawer />
          </HashRouter>
        )}
      </div>
    </CartProvider>
  );
}
