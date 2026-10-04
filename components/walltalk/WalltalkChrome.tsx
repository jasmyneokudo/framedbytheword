import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { WT_CONFIG } from "@/lib/walltalk";
import Link from "next/link";
import { IconBrandInstagram } from "@tabler/icons-react";
import Image from "next/image";

/** Clearly reserved logo space — replace with the Walltalk Design Studio logo. */
export function LogoPlaceholder({ tone = "dark" }: { tone?: "dark" | "light" }) {
  // const border = tone === "dark" ? "border-wt-ink/40 text-wt-ink/60" : "border-wt-paper/40 text-wt-paper/60";
  return (
    // <span
    //   className={`inline-flex h-9 w-9 items-center justify-center rounded-sm border ${border} font-wt-sans text-[9px] uppercase tracking-[0.2em]`}
    //   aria-label="Logo placeholder"
    // >
      
        tone === "dark" ? (
           <Image
       src="/walltalk/walltalk-logo-black.png"
       alt="Walltalk Design Studio logo"
       width={60} height={60}/>): (<Image
       src="/walltalk/walltalk-logo-white.png"
       alt="Walltalk Design Studio logo"
       width={60} height={60}/>)
      
     
    // </span>
  );
}

const NAV = [
  { label: "Home", to: "/walltalk" as const },
  { label: "Gallery Wall Ideas", to: "/walltalk/ideas" as const },
  { label: "How It Works", to: "/walltalk" as const, hash: "how" },
  { label: "FAQ", to: "/walltalk" as const, hash: "faq" },
];

export function WalltalkHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-wt-line bg-wt-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/walltalk" className="flex items-center gap-3">
          <LogoPlaceholder />
          <span className="font-wt-serif text-base font-medium tracking-wide text-wt-ink">
            Walltalk Design Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.to}
            //   hash={item.hash}
              className="font-wt-sans text-xs uppercase tracking-[0.18em] text-wt-ink-soft transition-colors hover:text-wt-olive"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/walltalk#book"
            // hash="book"
            className="inline-flex items-center rounded-sm border border-wt-olive bg-wt-olive px-5 py-2.5 font-wt-sans text-xs uppercase tracking-[0.18em] text-white transition-colors hover:bg-wt-olive-deep"
          >
            Book Consultation
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center text-wt-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-wt-line bg-wt-paper px-6 py-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.to}
            //   hash={item.hash}
              onClick={() => setOpen(false)}
              className="py-2.5 font-wt-sans text-sm uppercase tracking-[0.18em] text-wt-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/walltalk"
            // hash ="book"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-sm bg-wt-olive px-5 py-3 font-wt-sans text-xs uppercase tracking-[0.18em] text-white"
          >
            Book Consultation
          </Link>
        </nav>
      )}
    </header>
  );
}

export function WalltalkFooter() {
  const waLink = `https://wa.me/${WT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hello Walltalk Design Studio, I'd like to enquire about wall styling.",
  )}`;

  return (
    <footer className="bg-wt-ink text-wt-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoPlaceholder tone="light" />
              <span className="font-wt-serif text-xl font-medium tracking-wide">Walltalk Design Studio</span>
            </div>
            <p className="mt-4 font-wt-sans text-sm leading-relaxed text-wt-paper/60">
              Storytelling for walls. Premium wall styling and gallery design for homes and spaces in Abuja, Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="font-wt-sans text-xs uppercase tracking-[0.2em] text-wt-paper/40">Explore</p>
              <ul className="mt-4 space-y-2.5">
                <li><Link href="/walltalk"  className="font-wt-sans text-sm text-wt-paper/75 transition-colors hover:text-wt-paper">Book Consultation</Link></li>
                <li><Link href="/walltalk/ideas" className="font-wt-sans text-sm text-wt-paper/75 transition-colors hover:text-wt-paper">Gallery Wall Ideas</Link></li>
                <li><Link href="/walltalk" className="font-wt-sans text-sm text-wt-paper/75 transition-colors hover:text-wt-paper">Services</Link></li>
                <li><Link href="/walltalk"  className="font-wt-sans text-sm text-wt-paper/75 transition-colors hover:text-wt-paper">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-wt-sans text-xs uppercase tracking-[0.2em] text-wt-paper/40">Legal</p>
              <ul className="mt-4 space-y-2.5">
                <li><Link href="/walltalk/privacy" className="font-wt-sans text-sm text-wt-paper/75 transition-colors hover:text-wt-paper">Privacy Policy</Link></li>
                <li><Link href="/walltalk/terms" className="font-wt-sans text-sm text-wt-paper/75 transition-colors hover:text-wt-paper">Terms &amp; Conditions</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-wt-sans text-xs uppercase tracking-[0.2em] text-wt-paper/40">Contact</p>
              <ul className="mt-4 space-y-2.5">
                <li><a href={`tel:${WT_CONFIG.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 font-wt-sans text-sm text-wt-paper/75 transition-colors hover:text-wt-paper"><Phone className="h-3.5 w-3.5" />{WT_CONFIG.phone}</a></li>
                <li><a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-wt-sans text-sm text-wt-paper/75 transition-colors hover:text-wt-paper"><Phone className="h-3.5 w-3.5" />WhatsApp</a></li>
                <li><a href={`mailto:${WT_CONFIG.email}`} className="flex items-center gap-2 font-wt-sans text-sm text-wt-paper/75 transition-colors hover:text-wt-paper"><Mail className="h-3.5 w-3.5" />{WT_CONFIG.email}</a></li>
                <li><a href={`https://instagram.com/${WT_CONFIG.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-wt-sans text-sm text-wt-paper/75 transition-colors hover:text-wt-paper">
                
                {/* <Instagram className="h-3.5 w-3.5" /> */}
                  <IconBrandInstagram className="h-4 w-4" />
                {WT_CONFIG.instagram}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-wt-paper/15 pt-8 text-center">
          <p className="font-wt-serif text-sm italic text-wt-paper/60">Storytelling for walls.</p>
          <p className="font-wt-sans text-xs text-wt-paper/40">
            © {new Date().getFullYear()} Walltalk Design Studio · Abuja, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
