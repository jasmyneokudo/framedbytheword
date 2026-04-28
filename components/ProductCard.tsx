"use client";

import { useState } from "react";
import type { Product, SizeId } from "@/lib/products";
import { SIZES, calculatePrice, formatNaira } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [size, setSize] = useState<SizeId>("12x16");
  const [customW, setCustomW] = useState<string>("");
  const [customH, setCustomH] = useState<string>("");

  const cw = parseFloat(customW);
  const ch = parseFloat(customH);
  const customValid = size !== "custom" || (cw >= 6 && cw <= 96 && ch >= 6 && ch <= 96);

  const price = calculatePrice(
    product.basePrice,
    size,
    Number.isFinite(cw) ? cw : undefined,
    Number.isFinite(ch) ? ch : undefined,
  );

  const handleAdd = () => {
    if (!customValid) return;
    addItem({
      productId: product.id,
      sizeId: size,
      quantity: 1,
      customWidth: size === "custom" ? cw : undefined,
      customHeight: size === "custom" ? ch : undefined,
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={`${product.name} — scripture frame`}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div>
          <h3 className="font-serif text-lg font-medium text-foreground">{product.name}</h3>
          <p className="mt-1 font-sans text-xs uppercase tracking-widest text-gold">{product.reference}</p>
          <p className="mt-2 font-sans text-sm font-light italic text-muted-foreground line-clamp-2">
            &quot;{product.verse}&quot;
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground">
            Choose Size
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSize(s.id)}
                className={`rounded border px-2 py-2 font-sans text-xs transition-colors ${
                  size === s.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-gold"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {size === "custom" && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                  Width (in)
                </label>
                <input
                  type="number"
                  min={6}
                  max={96}
                  step={0.5}
                  value={customW}
                  onChange={(e) => setCustomW(e.target.value)}
                  placeholder="20"
                  className="w-full rounded border border-border bg-background px-2 py-1.5 font-sans text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                  Height (in)
                </label>
                <input
                  type="number"
                  min={6}
                  max={96}
                  step={0.5}
                  value={customH}
                  onChange={(e) => setCustomH(e.target.value)}
                  placeholder="30"
                  className="w-full rounded border border-border bg-background px-2 py-1.5 font-sans text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>
              {!customValid && (customW || customH) && (
                <p className="col-span-2 font-sans text-[11px] text-destructive">
                  Dimensions must be between 6&quot; and 96&quot;.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">Price</p>
            <p className="font-serif text-xl font-medium text-foreground">
              {price > 0 ? formatNaira(price) : "—"}
            </p>
          </div>
          <Button
            type="button"
            onClick={handleAdd}
            disabled={!customValid || price === 0}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
