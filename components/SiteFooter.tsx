import { Mail } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="font-serif text-xl font-medium text-primary-foreground tracking-wide">
            FramedWithTheWord
          </p>
          <p className="font-sans text-xs font-light text-primary-foreground/50 uppercase tracking-widest">
            Interior Design Studio
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/packages"
              className="font-sans text-sm text-primary-foreground/70 transition-colors hover:text-gold"
            >
              Packages
            </Link>
            <a
              href="mailto:hello@framedwiththeword.com"
              className="flex items-center gap-2 font-sans text-sm text-primary-foreground/70 transition-colors hover:text-gold"
            >
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </div>
          <div className="mt-4 h-px w-16 bg-gold/30" />
          <p className="font-sans text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} FramedWithTheWord. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
