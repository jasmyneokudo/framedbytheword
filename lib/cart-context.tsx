"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { calculatePrice, getProduct, type SizeId } from "./products";

export interface CartItem {
  id: string; // unique per line: productId-sizeId-customW-customH
  productId: string;
  sizeId: SizeId;
  customWidth?: number;
  customHeight?: number;
  quantity: number;
  unitPrice: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (input: Omit<CartItem, "id" | "unitPrice">) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  totalCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "fwtw_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (input) => {
    const product = getProduct(input.productId);
    if (!product) return;
    const unitPrice = calculatePrice(product.basePrice, input.sizeId, input.customWidth, input.customHeight);
    const lineId = `${input.productId}-${input.sizeId}-${input.customWidth ?? 0}x${input.customHeight ?? 0}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === lineId);
      if (existing) {
        return prev.map((i) => (i.id === lineId ? { ...i, quantity: i.quantity + input.quantity } : i));
      }
      return [...prev, { ...input, id: lineId, unitPrice }];
    });
    setIsOpen(true);
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const { subtotal, totalCount } = useMemo(() => {
    let s = 0;
    let c = 0;
    for (const i of items) {
      s += i.unitPrice * i.quantity;
      c += i.quantity;
    }
    return { subtotal: s, totalCount: c };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQty,
        removeItem,
        clear,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        subtotal,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
