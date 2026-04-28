"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface SiteHeaderProps {
  variant?: "transparent" | "solid";
}

export function SiteHeader({ variant = "transparent" }: SiteHeaderProps) {
  const { totalCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isTransparent = variant === "transparent";
  const wrapperBase = isTransparent
    ? "absolute left-0 right-0 top-0 z-30"
    : "sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur";
  const linkBase = isTransparent ? "text-primary-foreground/80" : "text-foreground/70";
  const brandColor = isTransparent ? "text-primary-foreground/95" : "text-foreground";
  const iconColor = isTransparent ? "text-primary-foreground" : "text-foreground";

  return (
    <header className={wrapperBase}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className={`font-serif text-sm font-medium tracking-[0.2em] hover:text-gold transition-colors ${brandColor}`}
        >
          FRAMED<span className="text-gold">·</span>WITH<span className="text-gold">·</span>THE<span className="text-gold">·</span>WORD
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`font-sans text-xs uppercase tracking-[0.2em] hover:text-gold active:text-golf transition-colors ${linkBase}`}
            // activeOptions={{ exact: true }}
            // activeProps={{ className: "text-gold" }}
          >
            Shop
          </Link>
          <Link
            href="/packages"
            className={`font-sans text-xs uppercase tracking-[0.2em] hover:text-gold active:text-gold transition-colors ${linkBase}`}
            // activeProps={{ className: "text-gold" }}
          >
            Packages
          </Link>
          <Link
            href="/clients/okudo"
            className={`font-sans text-xs uppercase tracking-[0.2em] hover:text-gold active:text-gold transition-colors ${linkBase}`}
            // activeProps={{ className: "text-gold" }}
          >
            Client Suite
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${totalCount} items`}
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:text-gold transition-colors ${iconColor}`}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 font-sans text-[10px] font-semibold text-gold-foreground">
                {totalCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:text-gold transition-colors ${iconColor}`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-6 py-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="py-3 font-sans text-sm uppercase tracking-[0.2em] text-foreground">Shop</Link>
            <Link href="/packages" onClick={() => setMobileOpen(false)} className="py-3 font-sans text-sm uppercase tracking-[0.2em] text-foreground">Packages</Link>
            <Link href="/clients/okudo" onClick={() => setMobileOpen(false)} className="py-3 font-sans text-sm uppercase tracking-[0.2em] text-foreground">Client Suite</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
