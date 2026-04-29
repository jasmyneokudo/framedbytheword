import Image from "next/image";

import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

const heroImg = "/frames/landing-hero.jepg"; // must be a PUBLIC path

export const metadata: Metadata = {
  title: "FramedWithTheWord — Scripture Frames for the Modern Home",
  description:
    "Premium framed scripture art, thoughtfully designed for modern homes. Choose from curated verses in three sizes or custom dimensions.",
  openGraph: {
    title: "FramedWithTheWord — Scripture Frames",
    description: "Premium framed scripture art for the modern home.",
    images: [
      {
        url: heroImg,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [heroImg],
  },
};
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-red-500 text-white text-8xl">THIS PAGE IS UNDER CONSTRUCTION</div>
      <SiteHeader variant="transparent" />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/frames/landing-hero.jpeg"
            alt="Curated gallery wall of framed scripture verses in a modern living room"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/65" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="animate-fade-up mb-5 font-sans text-xs font-medium uppercase tracking-[0.35em] text-gold">
            FramedWithTheWord
          </p>
          <h1 className="animate-fade-up-delay font-serif text-4xl font-medium leading-tight text-primary-foreground md:text-6xl">
            The Word, Beautifully Framed.
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-primary-foreground/85 md:text-lg">
            Premium scripture frames designed to bring quiet luxury and lasting
            inspiration to every room of your home.
          </p>
          <div className="animate-fade-up-delay-2 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <a href="#shop">Shop the Collection</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/packages">View Styling Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-border bg-cream/40 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
          {[
            { title: "Crafted to Last", body: "Museum-grade printing on archival paper, hand-finished frames built for generations." },
            { title: "Perfectly Sized", body: "Three considered sizes, plus custom dimensions tailored to your wall." },
            { title: "Delivered with Care", body: "Each frame is packaged and dispatched nationwide with white-glove attention." },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <div className="mx-auto h-px w-10 bg-gold/60" />
              <h3 className="mt-4 font-serif text-lg text-foreground">{f.title}</h3>
              <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shop grid */}
      <section id="shop" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">The Collection</p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-foreground md:text-4xl">
              Scripture Frames, Curated for Every Space
            </h2>
            <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted-foreground">
              Select your verse, choose a size, and we'll craft it for you. Custom dimensions available on every piece.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sizing guide */}
      <section className="border-t border-border bg-cream/30 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">Size Guide</p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-foreground">
              Find the Right Fit
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { label: '12" × 16"', desc: "Intimate accent. Perfect for nightstands, shelves, and small nooks." },
              { label: '16" × 24"', desc: "Refined statement. Ideal above consoles, desks, and reading chairs." },
              { label: '24" × 36"', desc: "Centerpiece presence. Designed to anchor a sofa or bedhead." },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-background p-6 text-center">
                <p className="font-serif text-2xl text-foreground">{s.label}</p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-sans text-sm italic text-muted-foreground">
            Need something different? Choose <span className="text-foreground">Custom Size</span> on any frame.
          </p>
        </div>
      </section>

      <SiteFooter />
      <CartDrawer />
    </div>
  );
}
