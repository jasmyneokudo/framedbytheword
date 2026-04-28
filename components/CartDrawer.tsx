"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getProduct, formatNaira, SIZES } from "@/lib/products";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, totalCount } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-serif text-xl font-medium tracking-wide">
            Your Cart {totalCount > 0 && <span className="text-muted-foreground">({totalCount})</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
            <p className="font-serif text-lg text-foreground">Your cart is empty</p>
            <p className="font-sans text-sm text-muted-foreground">Add a frame to begin your gallery.</p>
            <Button onClick={closeCart} variant="outline" className="mt-2">Continue browsing</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-border">
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  const sizeMeta = SIZES.find((s) => s.id === item.sizeId);
                  const sizeLabel =
                    item.sizeId === "custom"
                      ? `Custom ${item.customWidth}" × ${item.customHeight}"`
                      : sizeMeta?.label;
                  return (
                    <li key={item.id} className="flex gap-3 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-20 rounded object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-serif text-sm font-medium text-foreground">{product.name}</p>
                            <p className="mt-0.5 font-sans text-xs text-muted-foreground">{sizeLabel}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 rounded-full border border-border">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="inline-flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-6 text-center font-sans text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="inline-flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="font-serif text-sm text-foreground">
                            {formatNaira(item.unitPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-5 space-y-4 bg-cream/40">
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Subtotal</span>
                <span className="font-serif text-xl text-foreground">{formatNaira(subtotal)}</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground">Shipping calculated after order confirmation.</p>
              <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/checkout" onClick={closeCart}>Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

