"use client";

import { BookingForm } from "@/components/walltalk/BookingForm";
import { Reveal } from "@/components/walltalk/Reveal";
import {
  HERO,
  SERVICES,
  GALLERY_CATEGORIES,
  WHO_FOR,
  HOW_IT_WORKS,
  QUOTATION_NOTE,
  CONSULTATION_STEPS,
  PROBLEMS,
  PROBLEM_QUESTIONS,
  CAPABILITIES,
  WHY_WALLTALK,
  PORTFOLIO,
  BEFORE_AFTER_TRANSFORMATIONS,
  FAQS,
  WT_CONFIG,
} from "@/lib/walltalk";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import beforeImg from "../../public/walltalk/before.jpg";
import afterImg from "../../public/walltalk/after.jpg";
import Image from "next/image";
import { WalltalkFooter, WalltalkHeader } from "@/components/walltalk/WalltalkChrome";

const eyebrow =
  "font-wt-sans text-[11px] uppercase tracking-[0.28em] text-wt-olive";
const h2 = "font-wt-serif text-4xl leading-[1.08] text-wt-ink md:text-5xl";
const btnPrimary =
  "inline-flex items-center gap-2 bg-wt-olive px-7 py-4 font-wt-sans text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-wt-olive-deep";
const btnGhost =
  "inline-flex items-center gap-2 border-b border-current pb-1 font-wt-sans text-xs uppercase tracking-[0.2em] transition-colors hover:text-wt-olive";

export default function WalltalkHome() {
  const featured = GALLERY_CATEGORIES.filter((c) => c.featured);
  return (
    <>
      <WalltalkHeader />
      <main className="bg-wt-paper text-wt-ink">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-12 md:grid-cols-12 md:pt-20">
          <div className="flex flex-col justify-center md:col-span-5">
            <p className={eyebrow}>Storytelling for walls · Abuja</p>
            <h1 className="mt-6 font-wt-serif text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
              {HERO.headline[0]}{" "}
              <em className="text-wt-olive">{HERO.headline[1]}</em>
            </h1>
            <p className="mt-6 font-wt-sans text-base text-wt-ink-soft">
              {HERO.sub}
            </p>
            <p className="mt-3 font-wt-sans text-sm leading-relaxed text-wt-ink-soft">
              {HERO.body}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a href="#book" className={btnPrimary}>
                {HERO.primaryCta}
              </a>
              <a href="#categories" className={btnGhost}>
                {HERO.secondaryCta}
              </a>
            </div>
          </div>
          <div className="md:col-span-7">
            <Image
              src={HERO.image}
              alt="Living room with a curated gallery wall"
              width={1920}
              height={1280}
              className="aspect-4/3 w-full object-cover md:aspect-5/4"
            />
            {/* <img src={HERO.image}  width={1920} height={1280} className="aspect-[4/3] w-full object-cover md:aspect-[5/4]" /> */}
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-wt-line bg-wt-cream">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
            <Reveal>
              <p className={eyebrow}>The problem</p>
              <h2 className={`${h2} mt-4`}>Your walls have more potential.</h2>
              <p className="mt-6 max-w-md font-wt-sans text-sm leading-relaxed text-wt-ink-soft">
                Many homes have walls that feel unfinished. The hard part isn't
                buying frames — it's knowing:
              </p>
              <ul className="mt-6 space-y-2 font-wt-serif text-xl italic text-wt-ink">
                {PROBLEM_QUESTIONS.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <ul className="divide-y divide-wt-line border-y border-wt-line">
                {PROBLEMS.map((p, i) => (
                  <li
                    key={p}
                    className="flex gap-6 py-5 font-wt-sans text-sm text-wt-ink"
                  >
                    <span className="font-wt-serif text-wt-olive">
                      0{i + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* What we do */}
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Image
              src={afterImg}
              alt="Styled gallery wall"
              loading="lazy"
              // width={1920}
              // height={1280}
              className="aspect-4/5 w-full object-cover"
            />
            {/* <img src={afterImg}  loading="lazy" className="aspect-[4/5] w-full object-cover" /> */}
          </Reveal>
          <Reveal
            className="md:col-span-6 md:col-start-7 md:self-center"
            delay={100}
          >
            <p className={eyebrow}>What we do</p>
            <h2 className={`${h2} mt-4`}>
              We turn empty walls into meaningful spaces.
            </h2>
            <p className="mt-6 font-wt-serif text-xl italic text-wt-ink-soft">
              We elevate your space without forcing you to change the overall
              aesthetic of your home.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3">
              {CAPABILITIES.map((c) => (
                <p
                  key={c}
                  className="border-b border-wt-line pb-3 font-wt-sans text-sm"
                >
                  {c}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Who for */}
        <section className="bg-wt-ink text-wt-paper">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <Reveal>
              <p className="font-wt-sans text-[11px] uppercase tracking-[0.28em] text-wt-paper/50">
                Who this is for
              </p>
              <h2 className="mt-4 max-w-2xl font-wt-serif text-4xl leading-tight md:text-5xl">
                For anyone with a story worth displaying.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-px bg-wt-paper/15 sm:grid-cols-2 lg:grid-cols-4">
              {WHO_FOR.map((w) => (
                <div
                  key={w.title}
                  className="bg-wt-ink p-7 transition-colors hover:bg-wt-olive-deep"
                >
                  <h3 className="font-wt-serif text-xl">{w.title}</h3>
                  <p className="mt-3 font-wt-sans text-sm leading-relaxed text-wt-paper/60">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24"
        >
          <Reveal>
            <p className={eyebrow}>Services</p>
            <h2 className={`${h2} mt-4`}>Two ways to tell your story.</h2>
          </Reveal>
          <div className="mt-16 space-y-24">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.id}
                className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  // width={1920}
                  // height={1280}
                  className="aspect-5/4 w-full object-cover"
                />
                <div>
                  <p className="font-wt-serif text-wt-olive">0{i + 1}</p>
                  <h3 className="mt-2 font-wt-serif text-3xl md:text-4xl">
                    {s.name}
                  </h3>
                  <p className="mt-5 font-wt-sans text-sm leading-relaxed text-wt-ink-soft">
                    {s.description}
                  </p>
                  <p className="mt-6 font-wt-sans text-[11px] uppercase tracking-[0.18em] text-wt-ink-soft">
                    Suited for
                  </p>
                  <p className="mt-2 font-wt-sans text-sm">
                    {s.suited.join(" · ")}
                  </p>
                  <a href="#book" className={`${btnPrimary} mt-8`}>
                    {s.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Featured categories */}
        <section
          id="categories"
          className="scroll-mt-20 border-t border-wt-line bg-wt-cream"
        >
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <Reveal>
                <p className={eyebrow}>Gallery wall styles</p>
                <h2 className={`${h2} mt-4`}>
                  Featured gallery wall categories.
                </h2>
              </Reveal>
              <Link href="/walltalk/ideas" className={btnGhost}>
                See All Gallery Wall Categories{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {featured.map((c, i) => (
                <Reveal
                  key={c.id}
                  delay={i * 70}
                  className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}
                >
                  <Link href="/walltalk/ideas" className="group block">
                    <div className="overflow-hidden">
                      <Image
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        // width={1920}
                        // height={1280}
                        className={`${i < 2 ? "aspect-4/3" : "aspect-4/5"} w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]`}
                      />
                      {/* <img src={c.image} alt={c.name} loading="lazy"  /> */}
                    </div>
                    <h3 className="mt-4 font-wt-serif text-2xl">{c.name}</h3>
                    <p className="mt-1 font-wt-sans text-sm text-wt-ink-soft">
                      {c.description}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
          <Reveal>
            <p className={eyebrow}>How it works</p>
            <h2 className={`${h2} mt-4`}>
              A considered process, from first call to final frame.
            </h2>
          </Reveal>
          <ol className="mt-14 border-t border-wt-line">
            {HOW_IT_WORKS.map((s) => (
              <Reveal key={s.step}>
                <li className="grid gap-4 border-b border-wt-line py-8 md:grid-cols-12">
                  <span className="font-wt-serif text-5xl text-wt-olive md:col-span-2">
                    0{s.step}
                  </span>
                  <h3 className="font-wt-serif text-2xl md:col-span-4">
                    {s.title}
                  </h3>
                  <p className="font-wt-sans text-sm leading-relaxed text-wt-ink-soft md:col-span-6">
                    {s.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl border-l-2 border-wt-olive pl-5 font-wt-sans text-sm leading-relaxed text-wt-ink-soft">
            {QUOTATION_NOTE}
          </p>
        </section>

        {/* Consultation explanation */}
        <section className="bg-wt-sand/50">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className={eyebrow}>Your consultation</p>
              <h2 className={`${h2} mt-4`}>
                What happens during your consultation?
              </h2>
            </Reveal>
            <div className="md:col-span-8">
              <div className="grid gap-px bg-wt-line sm:grid-cols-2">
                {CONSULTATION_STEPS.map((c) => (
                  <div key={c.n} className="bg-wt-paper p-6">
                    <p className="font-wt-sans text-xs text-wt-olive">
                      Step {c.n}
                    </p>
                    <h3 className="mt-2 font-wt-serif text-xl">{c.title}</h3>
                    <p className="mt-2 font-wt-sans text-sm text-wt-ink-soft">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-wt-sans text-sm leading-relaxed text-wt-ink">
                {WT_CONFIG.creditPolicy}
              </p>
            </div>
          </div>
        </section>

        {/* Book */}
        <section id="book" className="scroll-mt-20 bg-wt-cream">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className={eyebrow}>Book a consultation</p>
                <h2 className={`${h2} mt-4`}>Let's transform your walls.</h2>
                <p className="mt-6 font-wt-sans text-sm leading-relaxed text-wt-ink-soft">
                  Tell us about your space and the vision you have for it. We'll
                  take it from there.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <BookingForm />
            </div>
          </div>
        </section>

        {/* After consultation */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className={eyebrow}>Project payment</p>
            <h2 className={`${h2} mt-4`}>
              What happens after your consultation?
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              [
                "Separate from project cost",
                "The consultation fee covers consultation and assessment. Your project is quoted separately in your design proposal.",
              ],
              [
                `${WT_CONFIG.depositPercent}% deposit`,
                `Once you approve your proposal, a ${WT_CONFIG.depositPercent}% deposit is required before production begins. The balance follows the agreed project terms.`,
              ],
              [
                `${WT_CONFIG.quotationValidityDays}-day quotation validity`,
                `Quotations are valid for ${WT_CONFIG.quotationValidityDays} days from issuance. Pricing may be reviewed if a quotation is accepted after this period.`,
              ],
            ].map(([t, b]) => (
              <div key={t} className="border-t border-wt-ink pt-6">
                <h3 className="font-wt-serif text-2xl">{t}</h3>
                <p className="mt-3 font-wt-sans text-sm leading-relaxed text-wt-ink-soft">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Portfolio />

        {/* Before / after */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <Reveal>
            <p className={eyebrow}>Before & after</p>
            <h2 className={`${h2} mt-4`}>The same wall, a different story.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <figure className="relative">
              <Image
                src={beforeImg}
                alt="Blank wall before styling"
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
              {/* <img
                src={beforeImg}
                alt="Blank wall before styling"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              /> */}
              <figcaption className="absolute left-4 top-4 bg-wt-paper px-3 py-1 font-wt-sans text-[11px] uppercase tracking-[0.2em]">
                Before
              </figcaption>
            </figure>
            <figure className="relative">
              <Image
                src={afterImg}
                alt="Same wall after gallery styling"
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
              {/* <img
                src={afterImg}
                alt="Same wall after gallery styling"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              /> */}
              <figcaption className="absolute left-4 top-4 bg-wt-olive px-3 py-1 font-wt-sans text-[11px] uppercase tracking-[0.2em] text-white">
                After
              </figcaption>
            </figure>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
            {BEFORE_AFTER_TRANSFORMATIONS.map((t) => (
              <p
                key={t}
                className="font-wt-serif text-lg italic text-wt-ink-soft"
              >
                {t}
              </p>
            ))}
          </div>
        </section>

        {/* Why */}
        <section className="border-y border-wt-line bg-wt-cream">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <Reveal>
              <p className={eyebrow}>Why Walltalk</p>
              <h2 className={`${h2} mt-4 max-w-3xl`}>
                More than frames. A considered approach to your walls.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
              {WHY_WALLTALK.map((w) => (
                <div key={w.title}>
                  <h3 className="font-wt-serif text-2xl italic text-wt-olive">
                    {w.title}
                  </h3>
                  <p className="mt-3 font-wt-sans text-sm leading-relaxed text-wt-ink-soft">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-6 py-24 md:grid-cols-12"
        >
          <div className="md:col-span-4">
            <p className={eyebrow}>FAQ</p>
            <h2 className={`${h2} mt-4`}>Questions, answered.</h2>
          </div>
          <Accordion type="single" collapsible className="md:col-span-8">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`q${i}`}
                className="border-wt-line"
              >
                <AccordionTrigger className="text-left font-wt-serif text-lg text-wt-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-wt-sans text-sm leading-relaxed text-wt-ink-soft">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="relative">
          <Image
            src={HERO.image}
            alt="Finished gallery wall"
            loading="lazy"
            className="h-[70vh] w-full object-cover"
          />

          {/* <img
            src={HERO.image}
            alt="Finished gallery wall"
            loading="lazy"
            className="h-[70vh] w-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-wt-ink/55" />
          <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-6 text-wt-paper">
            <h2 className="max-w-2xl font-wt-serif text-5xl leading-tight md:text-6xl">
              Your walls have a story to tell.
            </h2>
            <p className="mt-4 font-wt-serif text-xl italic text-wt-paper/80">
              Let&apos;s create something that feels like you.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a href="#book" className={btnPrimary}>
                Book Your Consultation
              </a>
              <Link
                href="/walltalk/ideas"
                className={`${btnGhost} text-wt-paper`}
              >
                Explore Gallery Wall Ideas
              </Link>
            </div>
          </div>
        </section>
      </main>
      <WalltalkFooter />
    </>
  );
}

function Portfolio() {
  const labels = ["All", ...Array.from(new Set(PORTFOLIO.map((p) => p.label)))];
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = PORTFOLIO.filter((p) => filter === "All" || p.label === filter);
  const move = (d: number) =>
    setOpen((o) => (o === null ? o : (o + d + items.length) % items.length));
  return (
    <section className="bg-wt-ink text-wt-paper">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-wt-sans text-[11px] uppercase tracking-[0.28em] text-wt-paper/50">
          Portfolio
        </p>
        <h2 className="mt-4 font-wt-serif text-4xl md:text-5xl">
          Walls we've designed.
        </h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {labels.map((l) => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className={`border px-4 py-2 font-wt-sans text-xs uppercase tracking-[0.16em] ${filter === l ? "border-wt-paper bg-wt-paper text-wt-ink" : "border-wt-paper/25 text-wt-paper/70 hover:border-wt-paper"}`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((p, i) => (
            <button
              key={p.caption}
              onClick={() => setOpen(i)}
              className="group relative mb-4 block w-full overflow-hidden text-left"
            >
              <Image
                src={p.image}
                alt={p.caption}
                loading="lazy"
                className={`${i % 3 === 1 ? "aspect-3/4" : "aspect-4/3"} w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]`}
              />
              {/* <img
                src={p.image}
                alt={p.caption}
                loading="lazy"
                className={`${i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"} w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]`}
              /> */}
              <span className="absolute inset-x-0 bottom-0 bg-wt-ink/70 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="block font-wt-sans text-[10px] uppercase tracking-[0.2em] text-wt-paper/60">
                  {p.label}
                </span>
                <span className="font-wt-serif text-lg">{p.caption}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      {open !== null && items[open] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-wt-ink/95 p-6"
          onClick={() => setOpen(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-6 top-6 text-wt-paper"
            onClick={() => setOpen(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <button
            aria-label="Previous"
            className="absolute left-4 text-wt-paper"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
             <Image
               src={items[open].image}
              alt={items[open].caption}
                // loading="lazy"
                className="max-h-[80vh] w-auto object-contain"
              />
            {/* <img
              src={items[open].image}
              alt={items[open].caption}
              className="max-h-[80vh] w-auto object-contain"
            /> */}
            <figcaption className="mt-4 font-wt-serif text-lg text-wt-paper">
              {items[open].caption}
            </figcaption>
          </figure>
          <button
            aria-label="Next"
            className="absolute right-4 text-wt-paper"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </section>
  );
}
