import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AddOn, CartLine, Product, ProductVariation, ResolvedCartLine } from '../types';
import { productById, SITE } from '../data/site';

const STORAGE_KEY = 'fresh-batch-cart-v1';

interface CartContextValue {
  lines: ResolvedCartLine[];
  rawLines: CartLine[];
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (line: CartLine) => void;
  updateQty: (line: CartLine, delta: number) => void;
  removeLine: (line: CartLine) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const lineKey = (l: CartLine) => `${l.productId}|${l.variationId ?? ''}|${[...l.addOnIds].sort().join(',')}|${l.notes.trim()}`;

export function resolveLine(l: CartLine): ResolvedCartLine | null {
  const product = productById(l.productId);
  if (!product) return null;
  const variation: ProductVariation | undefined = product.variations?.find((v) => v.id === l.variationId);
  const addOns: AddOn[] = (product.addOns ?? []).filter((a) => l.addOnIds.includes(a.id));
  const unitPrice =
    product.price + (variation?.priceDelta ?? 0) + addOns.reduce((s, a) => s + a.price, 0);
  return { ...l, product, unitPrice, lineTotal: unitPrice * l.qty };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartLine[]) : [];
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines));
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [rawLines]);

  const addItem = useCallback((line: CartLine) => {
    setRawLines((prev) => {
      const key = lineKey(line);
      const existing = prev.find((l) => lineKey(l) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l) === key ? { ...l, qty: Math.min(99, l.qty + line.qty) } : l,
        );
      }
      return [...prev, line];
    });
  }, []);

  const updateQty = useCallback((line: CartLine, delta: number) => {
    setRawLines((prev) => {
      const key = lineKey(line);
      return prev
        .map((l) => (lineKey(l) === key ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0);
    });
  }, []);

  const removeLine = useCallback((line: CartLine) => {
    setRawLines((prev) => prev.filter((l) => lineKey(l) !== lineKey(line)));
  }, []);

  const clearCart = useCallback(() => setRawLines([]), []);

  const lines = useMemo(
    () => rawLines.map(resolveLine).filter((l): l is ResolvedCartLine => l !== null),
    [rawLines],
  );
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.lineTotal, 0), [lines]);

  const value: CartContextValue = {
    lines,
    rawLines,
    count,
    subtotal,
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    addItem,
    updateQty,
    removeLine,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

export const deliveryFeeFor = (fulfilment: 'delivery' | 'pickup') =>
  fulfilment === 'delivery' ? SITE.deliveryFee : 0;

export type { Product };
