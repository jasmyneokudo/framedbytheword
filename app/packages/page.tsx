import Link from "next/link";
import { Check, Sparkles, Crown, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interior Styling Packages — FramedWithTheWord",
  description:
    "Three curated Scripture Frame interior styling packages — Essence, Signature and Prestige — for a refined, spiritually intentional home.",
  openGraph: {
    title: "Interior Styling Packages — FramedWithTheWord",
    description:
      "Essence, Signature and Prestige — discover scripture-led interior styling crafted for elite homes.",
  },
};

type Pkg = {
  id: string;
  name: string;
  tagline: string;
  ideal: string;
  price: string;
  totalFrames: string;
  icon: typeof Leaf;
  highlights: string[];
  inclusions: string[];
  installation: string;
  valueAdds: string[];
  featured?: boolean;
};

const PACKAGES: Pkg[] = [
  {
    id: "essence",
    name: "Essence",
    tagline: "Foundational Experience",
    ideal:
      "Clients who want a clean, spiritually uplifting touch across key areas of the home, with a flexible and guided setup approach.",
    price: "₦1,300,000 – ₦1,900,000",
    totalFrames: "7–12 premium frames",
    icon: Leaf,
    highlights: [
      "Pre-curated scripture catalog",
      "Medium to large sizes, 16\"x24\" to 24\"x36\"",
      "Virtual design consultation",
    ],
    inclusions: [
      "Living room — 1 statement piece",
      "Dining area — 1 piece",
      "Master bedroom — 1 statement piece or 2 medium pieces",
      "4 other bedrooms — 1 - 2 frames per room",
    //   "Step-by-step installation guide (PDF + video)",
      "Frame placement layout guide",
    ],
    installation:
      "On-site installation",
    valueAdds: [
      "Clear placement guidance for a polished outcome",
      "Clean, minimal aesthetic finish",
      "Seamless coordination from design to delivery",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    tagline: "Elevated Living Experience",
    ideal:
      "Clients who want a more intentional, cohesive and personalized spiritual atmosphere.",
    price: "₦2,000,000 – ₦3,200,000",
    totalFrames: "13–16 frames",
    icon: Sparkles,
    featured: true,
    highlights: [
      "Custom scripture curation",
      "Medium to very large sizing, 16\"x24\", 24\"x36\", 36\"x42\"",
      "On-site consultation & measurements",
      "Mood board presentation",
    ],
    inclusions: [
      "Living room — 2–3 piece arrangement",
      "Dining — 1 piece",
      "All 5 bedrooms — 1–2 per room",
      "Entrance / passage — 1 - 2 feature piece",
      "Custom curation based on family values & lifestyle",
      "Color palette tailored per room",
    ],
    installation:
      "Professional installation included.",
    valueAdds: [
      "Cohesive storytelling across the home",
      "Balanced visual flow from room to room",
    //   "Enhanced depth with layered arrangements",
    //   "Priority production timeline",
    ],
  },
  {
    id: "prestige",
    name: "Prestige",
    tagline: "Full Luxury Transformation",
    ideal:
      "Clients who want a deeply intentional, statement-level and immersive spiritual environment.",
    price: "₦3,300,000 – ₦5,500,000+",
    totalFrames: "18–25+ frames",
    icon: Crown,
    highlights: [
      "Personalized per room & family member",
      "Custom curation based on family values & lifestyle",
            "Personalized scripture frames using family names or photographs",

      "Advanced mockups & presentation",
      "Soft, elegant color coordination",
      "On-site consultation & measurements",
    ],
    inclusions: [
      "Living room — luxury gallery wall (6–9 pieces or 1 large statement piece)",
      "Dining — 1 large statement piece or 6–9 pieces gallery-style arrangement",
      "All 5 bedrooms — 2–3 curated pieces per room",
      "Entrance — 1–2 premium statement frames",
      "Passageways / stairways — 2–4 complementary frames",
      "Thematic flow: peace, prosperity, protection, legacy",
      "Medium to very large sizing and custom sizing",
      "On-site consultation & measurements",
    ],
    installation:
      "Professional installation included.",
    valueAdds: [
      "Strong visual impact in transitional spaces",
      "Luxury, gallery-style finishing",
      "Highly personalized spiritual storytelling",
    ],
  },
];

const TIMELINE = [
  { days: "Day 1–3", title: "Discovery & Direction", body: "Client onboarding, style & scripture preference mapping, space assessment." },
  { days: "Day 4–7", title: "Concept Development", body: "Mood boards (Signature & Prestige), layout planning, scripture approval." },
  { days: "Day 8–14", title: "Production", body: "Frame creation & finishing, quality checks." },
  { days: "Day 15–18", title: "Coordination", body: "Delivery scheduling and installation planning." },
  { days: "Day 18–21", title: "Completion", body: "Delivery or on-site installation, styling adjustments, final walkthrough." },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-32 md:py-40">
        <SiteHeader />
        <div className="absolute inset-0 opacity-[0.07]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 40%), radial-gradient(circle at 80% 80%, var(--gold) 0, transparent 40%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="animate-fade-up mb-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Scripture Frame Styling
          </p>
          <h1 className="animate-fade-up-delay font-serif text-4xl font-medium leading-tight text-primary-foreground md:text-6xl">
            Interior Styling Packages
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-primary-foreground/75 md:text-lg">
            Three curated experiences crafted for a 5-bedroom one-storey duplex —
            each one designed to bring quiet luxury and intentional storytelling
            into every room.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <article
                key={pkg.id}
                className={`group relative flex flex-col rounded-2xl border bg-card p-8 transition-all duration-500 hover:shadow-xl md:p-10 ${
                  pkg.featured
                    ? "border-gold/40 shadow-lg lg:-translate-y-4"
                    : "border-border"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold-foreground">
                    Most Loved
                  </span>
                )}

                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      pkg.featured ? "bg-gold/15 text-gold" : "bg-muted text-foreground/70"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {pkg.tagline}
                  </p>
                </div>

                <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
                  {pkg.name}
                </h2>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                  {pkg.ideal}
                </p>

                <div className="my-7 h-px w-full bg-border" />

                <div className="space-y-1">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Investment Range
                  </p>
                  <p className="font-serif text-2xl text-foreground">{pkg.price}</p>
                  <p className="font-sans text-xs italic text-muted-foreground">
                    {pkg.totalFrames}
                  </p>
                </div>

                <div className="mt-7">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Highlights
                  </p>
                  <ul className="mt-3 space-y-2">
                    {pkg.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 font-sans text-sm text-foreground/80"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    What&apos;s Included
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {pkg.inclusions.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 font-sans text-sm leading-relaxed text-foreground/85"
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            pkg.featured ? "text-gold" : "text-foreground/40"
                          }`}
                          strokeWidth={2}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 rounded-lg bg-muted/60 p-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Installation
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-foreground/80">
                    {pkg.installation}
                  </p>
                </div>

                <div className="mt-auto pt-8">
                  <Button
                    asChild
                    className={`w-full ${
                      pkg.featured
                        ? "bg-gold text-gold-foreground hover:bg-gold/90"
                        : ""
                    }`}
                    variant={pkg.featured ? "default" : "outline"}
                    size="lg"
                  >
                    <a href="mailto:hello@framedwiththeword.com?subject=Enquiry%20—%20{pkg.name}%20Package">
                      Enquire about {pkg.name}
                    </a>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Payment Structure */}
      <section className="bg-cream/60 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
              Payment Structure
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-foreground md:text-4xl">
              A clear, milestone-based process
            </h2>
            <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted-foreground">
              Every payment is tied to a defined project milestone — designed
              for transparency, trust and a calm client experience.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                step: "01",
                title: "Design Consultation & Project Commitment",
                amount: "₦100,000 – ₦200,000",
                amountLabel: "Non-refundable consultation fee",
                body: "Required to proceed after package selection. Covers project planning, space assessment, and design direction & layout strategy.",
                note: "Fully deducted from the final project cost upon confirmation.",
              },
              {
                step: "02",
                title: "Final Project Quotation",
                amount: "Tailored",
                amountLabel: "Confirmed at this stage",
                body: "A precise project cost is presented based on frame sizes & quantities, level of customization, and spatial layout & finishing requirements.",
                note: "Package ranges serve as a guide; final investment is confirmed here.",
              },
              {
                step: "03",
                title: "Project Commencement",
                amount: "70%",
                amountLabel: "Deposit of final project cost",
                body: "Required to begin production. Your consultation fee is credited toward this amount.",
                note: "Project timelines begin once the 70% deposit is completed.",
              },
              {
                step: "04",
                title: "Balance Payment",
                amount: "30%",
                amountLabel: "Final balance",
                body: "Due before installation (Signature & Prestige) or before final dispatch (Essence).",
                note: "Settled at the closing milestone of your project.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-lg md:p-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-xs tracking-[0.3em] text-gold">
                    STEP {item.step}
                  </span>
                  <span className="font-serif text-2xl text-foreground md:text-3xl">
                    {item.amount}
                  </span>
                </div>
                <p className="mt-1 text-right font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.amountLabel}
                </p>
                <h3 className="mt-5 font-serif text-xl text-foreground md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/80">
                  {item.body}
                </p>
                <p className="mt-4 border-t border-border pt-4 font-sans text-xs italic leading-relaxed text-muted-foreground">
                  {item.note}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-gold/30 bg-card p-7 md:p-8">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold">
              Additional Notes
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Consultation scheduling is confirmed only after payment is received.",
                "Project timelines begin after the 70% deposit is completed.",
                "All payments are tied to clearly defined project milestones for transparency and trust.",
              ].map((n) => (
                <li
                  key={n}
                  className="flex items-start gap-3 font-sans text-sm leading-relaxed text-foreground/85"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
              Project Timeline
            </p>
              <h2 className="mt-3 font-serif text-3xl font-medium text-foreground md:text-4xl">
                Approximately 21 days
              </h2>
              <ol className="mt-8 space-y-4">
                {TIMELINE.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-card font-sans text-xs text-gold">
                        {i + 1}
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div className="mt-2 h-full w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {step.days}
                      </p>
                      <p className="mt-1 font-serif text-lg text-foreground">
                        {step.title}
                      </p>
                      <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
      </section>

      {/* Notes / CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
          A Note from the Studio
        </p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-foreground md:text-4xl">
          Crafted with precision, discretion and premium attention to detail
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-muted-foreground">
          Every package includes end-to-end project coordination for a smooth,
          considered experience. Installation level varies by package to provide
          flexibility for your home and lifestyle.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="mailto:hello@framedwiththeword.com?subject=Package%20Enquiry">
              Begin Your Project
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">View Design Presentation</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
