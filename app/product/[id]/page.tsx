"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import {
  PRODUCTS,
  // SIZES,
  calculatePrice,
  formatNaira,
  getProduct,
  SQUARE_SIZES,
  isSquareProduct,
  // getProduct,
  type SizeId,
} from "@/lib/products";
import {
  Check,
  Clock,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { useDelivery } from "@/lib/delivery-context";

// function NotFoundProduct() {
//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-10">
//       <div className="text-center">
//         <p className="font-serif text-2xl text-foreground">Frame not found</p>
//         <Button asChild className="mt-6">
//           <Link href="/">Back to the collection</Link>
//         </Button>
//       </div>
//     </div>
//   );
// }

// ---- Batch + tier logic ----
const BATCH_KEY = "fwtw_batch_v1";
const RESERVE_KEY = "fwtw_reserve_v1";
const LEAD_KEY = "fwtw_lead_v1";
const BATCH_DURATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 days
const RESERVATION_MS = 15 * 60 * 1000;

interface BatchState {
  endsAt: number;
  claimed: Record<string, number>; // productId -> tier1 slots claimed (out of 30 total across tiers)
}

function loadBatch(): BatchState {
  if (typeof window === "undefined")
    return { endsAt: Date.now() + BATCH_DURATION_MS, claimed: {} };
  try {
    const raw = localStorage.getItem(BATCH_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as BatchState;
      if (parsed.endsAt > Date.now()) return parsed;
    }
  } catch {}
  const fresh: BatchState = {
    endsAt: Date.now() + BATCH_DURATION_MS,
    claimed: {},
  };
  try {
    localStorage.setItem(BATCH_KEY, JSON.stringify(fresh));
  } catch {}
  return fresh;
}

function saveBatch(b: BatchState) {
  try {
    localStorage.setItem(BATCH_KEY, JSON.stringify(b));
  } catch {}
}

interface Tier {
  label: string;
  discount: number; // 0.15, 0.10, 0.05, 0
  capacity: number;
  claimed: number;
}

function tiersFor(productClaimed: number): Tier[] {
  // 10 slots per tier, three discount tiers, then full price
  const capacity = 10;
  const t1c = Math.min(productClaimed, capacity);
  const t2c = Math.min(Math.max(productClaimed - capacity, 0), capacity);
  const t3c = Math.min(Math.max(productClaimed - capacity * 2, 0), capacity);
  return [
    { label: "First 10 Orders", discount: 0.15, capacity, claimed: t1c },
    { label: "Next 10 Orders", discount: 0.1, capacity, claimed: t2c },
    { label: "Next 10 Orders", discount: 0.05, capacity, claimed: t3c },
    {
      label: "Full Batch Pricing",
      discount: 0,
      capacity: Infinity,
      claimed: 0,
    },
  ];
}

function activeTier(tiers: Tier[]): Tier {
  return tiers.find((t) => t.claimed < t.capacity) ?? tiers[tiers.length - 1];
}

// ---- Countdown hook ----
function useCountdown(target: number) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, done: diff === 0, diff };
}

// const SIZE_MAP: { key: "small" | "medium" | "big" | "large"; sizeId: SizeId; label: string; dims: string }[] = [
//   { key: "small", sizeId: "8x12", label: "Small", dims: '8" × 12"' },
//   { key: "medium", sizeId: "12x16", label: "Medium", dims: '12" × 16"' },
//   { key: "big", sizeId: "16x24", label: "Big", dims: '16" × 24"' },
//   { key: "large", sizeId: "24x36", label: "Large", dims: '24" × 36"' },
// ];

interface SizeOption {
  sizeId: SizeId;
  label: string;
  dims: string;
}

const SIZE_MAP: SizeOption[] = [
  { sizeId: "8x12", label: "Small (A4)", dims: '8" × 12"' },
  { sizeId: "12x16", label: "Medium", dims: '12" × 16"' },
  { sizeId: "16x24", label: "Big", dims: '16" × 24"' },
  { sizeId: "24x36", label: "Large", dims: '24" × 36"' },
  { sizeId: "36x48", label: "Extra-large", dims: '36" × 48"' },
];

const SQUARE_SIZE_MAP: SizeOption[] = SQUARE_SIZES.map((s) => ({
  sizeId: s.id as SizeId,
  label: s.label,
  dims: "Square",
}));

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProduct(id);
  console.log("prodict id]: ", product, id);

  const router = useRouter();
  //   const navigate = useNavigate();
  // const { addItem, openCart, items } = useCart();
  const { addItem, items } = useCart();

  const [batch, setBatch] = useState<BatchState>(() => loadBatch());
  const productClaimed = batch.claimed[product?.id ?? 0] ?? 6; // seeded so first tier shows 6/10
  const tiers = tiersFor(productClaimed);
  const active = activeTier(tiers);

  const isSquare = isSquareProduct(
    product ?? {
      id: 0,
      name: "",
      key: "",
      reference: "",
      image: "",
      basePrice: 0,
      tags: "",
    },
  );
  const sizeOptions = isSquare ? SQUARE_SIZE_MAP : SIZE_MAP;
  const [sizeId, setSizeId] = useState<SizeId>(isSquare ? "8x8" : "8x12");
  const selectedSize =
    sizeOptions.find((s) => s.sizeId === sizeId) ?? sizeOptions[0];
  const regularPrice = calculatePrice(
    product?.basePrice ?? 0,
    selectedSize.sizeId,
  );
  const yourPrice = Math.round(regularPrice * (1 - active.discount));
  const saving = regularPrice - yourPrice;
  const { updateValues } = useGoogleSheets();
  const { state: deliveryLocation } = useDelivery();
  const [isReserving, setReserving] = useState(false);

  const countdown = useCountdown(batch.endsAt);
  useEffect(() => {
    if (countdown.done) {
      const fresh: BatchState = {
        endsAt: Date.now() + BATCH_DURATION_MS,
        claimed: {},
      };
      saveBatch(fresh);
      setBatch(fresh);
    }
  }, [countdown.done]);

  // Reservation flow
  const [showReserve, setShowReserve] = useState(false);
  const [reserved, setReserved] = useState<{ endsAt: number } | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(RESERVE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.endsAt > Date.now()) return p;
      }
    } catch {}
    return null;
  });
  // eslint-disable-next-line react-hooks/purity
  const reservation = useCountdown(reserved?.endsAt ?? Date.now());

  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const submitReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setReserving(true);
    if (!form.name || !form.email || !form.whatsapp) return;

    try {
      localStorage.setItem(
        LEAD_KEY,
        JSON.stringify({ ...form, productId: product?.id, at: new Date() }),
      );
    } catch {}
    // eslint-disable-next-line react-hooks/purity
    const endsAt = Date.now() + RESERVATION_MS;

    const requestArray = [
      // eslint-disable-next-line react-hooks/purity
      new Date(Date.now()).toLocaleString(),
      form.name,
      form.email,
      form.whatsapp,
      product?.key ?? "",
      // items[0].productId,
      deliveryLocation ?? "",
    ];

    try {
      await updateValues([requestArray]);
    } catch (e) {
      console.error("error sending0<-->", e);
    }
    try {
      localStorage.setItem(
        RESERVE_KEY,
        JSON.stringify({ endsAt, productId: product?.id }),
      );
    } catch {}
    setReserved({ endsAt });

    // Claim a slot for this product and add to cart at discounted price
    const nextClaimed = {
      ...batch.claimed,
      [product?.id ?? 0]: productClaimed + 1,
    };
    const nextBatch = { ...batch, claimed: nextClaimed };
    saveBatch(nextBatch);
    setBatch(nextBatch);

    addItem({
      productId: product?.key ?? "",
      sizeId: selectedSize.sizeId,
      quantity: 1,
      discount: active.discount,
    });
    setShowReserve(false);
    setReserving(false);
    // setTimeout(() => navigate({ to: "/checkout" }), 400);
  };

  // Live purchase notifications
  const [toast, setToast] = useState<string | null>(null);
  const toastIdx = useRef(0);
  useEffect(() => {
    const cities = [
      "Abuja",
      "Lagos",
      "Port Harcourt",
      "Ibadan",
      "Kano",
      "Enugu",
    ];
    const messages = [
      (c: string) =>
        `Someone in ${c} just secured the 15% early-buyer discount.`,
      () => "One discounted slot has just been claimed.",
      (c: string) => `A customer in ${c} secured the early production price.`,
      () =>
        `Only ${Math.max(1, active.capacity - active.claimed)} discounted slots remaining.`,
    ];
    const tick = () => {
      const m = messages[toastIdx.current % messages.length];
      const c = cities[Math.floor(Math.random() * cities.length)];
      setToast(m(c));
      toastIdx.current += 1;
      setTimeout(() => setToast(null), 5500);
    };
    const first = setTimeout(tick, 3500);
    const id = setInterval(tick, 12000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [active.capacity, active.claimed]);

  const claimedThisMonth = useMemo(
    () =>
      Object.values(batch.claimed).reduce(
        (a, b) => a + b,
        productClaimed > 6 ? 0 : 6,
      ) + 42,
    [batch.claimed, productClaimed],
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="solid" />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
              <img
                src={product?.image ?? ""}
                alt={product?.name ?? ""}
                // width="0"
                //       height="0"
                //       sizes="100vw"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.25em] text-foreground backdrop-blur">
                <Sparkles className="mr-1 inline h-3 w-3 text-gold" />
                Limited Production Batch
              </div>
            </div>
            {/* <div className="mt-4 grid grid-cols-3 gap-3">
              {[product?.image, product?.image, product?.image].map(
                (src, i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden rounded border border-border bg-muted"
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover opacity-90"
                    />
                  </div>
                ),
              )}
            </div> */}
          </div>

          {/* Details */}
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">
              {product?.reference}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-medium leading-tight text-foreground md:text-4xl">
              {product?.name}
            </h1>
            <p className="mt-3 font-sans text-base italic font-light text-muted-foreground">
              {/* &quot;{product?.tags}&quot; */}
              Frame materials: High quality frames made of wood and fibre and
              acrylic glass
            </p>

            <div className="mt-6 rounded-lg border border-gold/40 bg-gold/5 p-5">
              <p className="font-serif text-lg text-foreground">
                You&apos;re Early.
              </p>
              <p className="mt-1 font-sans text-sm text-muted-foreground">
                Congratulations — you&apos;ve arrived before this month&apos;s
                production batch begins. Secure your production slot today and
                save up to{" "}
                <span className="font-medium text-foreground">15%</span> before
                production starts.
              </p>
            </div>

            {/* Size */}
            <div className="mt-8">
              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground">
                Select size
              </p>
              <div
                className={`mt-3 grid gap-2 ${isSquare ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}
              >
                {sizeOptions.map((s) => (
                  <button
                    key={s.sizeId}
                    onClick={() => setSizeId(s.sizeId)}
                    className={`rounded border px-3 py-3 text-left transition-colors ${
                      sizeId === s.sizeId
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:border-gold"
                    }`}
                  >
                    <p className="font-serif text-base">{s.label}</p>
                    <p
                      className={`mt-0.5 font-sans text-[11px] ${sizeId === s.sizeId ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      {s.dims}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Premium savings display */}
            <div className="mt-6 rounded-lg border border-border bg-cream/40 p-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
                    Regular
                  </p>
                  <p className="mt-1 font-serif text-lg text-muted-foreground line-through">
                    {formatNaira(regularPrice)}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gold">
                    Your price
                  </p>
                  <p className="mt-1 font-serif text-2xl font-medium text-foreground">
                    {formatNaira(yourPrice)}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
                    You save
                  </p>
                  <p className="mt-1 font-serif text-2xl font-medium text-gold">
                    {formatNaira(saving)}
                  </p>
                </div>
              </div>
              {active.discount > 0 && (
                <p className="mt-4 font-sans text-xs text-muted-foreground">
                  <TrendingDown className="mr-1 inline h-3.5 w-3.5 text-gold" />
                  Only {active.capacity - active.claimed} slots left at{" "}
                  {(active.discount * 100).toFixed(0)}% off. Discount decreases
                  when this tier fills.
                </p>
              )}
            </div>

            <Button
              size="lg"
              onClick={() => {
                if (form.name !== "") {
                  addItem({
                    productId: product?.key ?? "",
                    sizeId: selectedSize.sizeId,
                    quantity: 1,
                    discount: active.discount,
                  });
                } else {
                  setShowReserve(true);
                }
              }}
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Lock className="mr-2 h-4 w-4" />
              Lock My Production Slot
            </Button>
            <p className="mt-2 text-center font-sans text-[11px] uppercase tracking-widest text-muted-foreground">
              Reserves your discounted price for 15 minutes
            </p>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="border-y border-border bg-primary text-primary-foreground py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold">
            Current Production Batch
          </p>
          <h2 className="mt-3 font-serif text-2xl font-medium md:text-3xl">
            Production starts in
          </h2>
          <div className="mt-8 grid grid-cols-4 gap-3 md:gap-6">
            {[
              { v: countdown.d, l: "Days" },
              { v: countdown.h, l: "Hours" },
              { v: countdown.m, l: "Minutes" },
              { v: countdown.s, l: "Seconds" },
            ].map((t) => (
              <div
                key={t.l}
                className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 py-6"
              >
                <p className="font-serif text-3xl font-medium md:text-5xl">
                  {String(t.v).padStart(2, "0")}
                </p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-widest text-primary-foreground/70">
                  {t.l}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-sans text-sm text-primary-foreground/80">
            Orders placed before production begins qualify for exclusive
            early-buyer pricing.
          </p>
        </div>
      </section>

      {/* DISCOUNT TIERS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">
              Early-Buyer Pricing
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-foreground">
              Discount decreases as slots fill
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t, i) => {
              const isActive = t === active;
              const locked = i > tiers.indexOf(active);
              const filled =
                t.capacity === Infinity ? 0 : (t.claimed / t.capacity) * 100;
              const tierPrice = Math.round(regularPrice * (1 - t.discount));
              return (
                <div
                  key={i}
                  className={`relative rounded-lg border p-6 transition-all ${
                    isActive
                      ? "border-gold bg-gold/5 shadow-lg"
                      : "border-border bg-card"
                  } ${locked ? "opacity-60" : ""}`}
                >
                  {isActive && (
                    <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-gold-foreground">
                      Active now
                    </span>
                  )}
                  {locked && (
                    <Lock className="absolute right-4 top-4 h-4 w-4 text-muted-foreground" />
                  )}
                  <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground">
                    {t.label}
                  </p>
                  <p className="mt-2 font-serif text-3xl font-medium text-foreground">
                    {t.discount > 0
                      ? `${(t.discount * 100).toFixed(0)}% OFF`
                      : "Full Price"}
                  </p>

                  <div className="mt-4 space-y-1 font-sans text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Regular</span>
                      <span className="line-through">
                        {formatNaira(regularPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Your price</span>
                      <span className="font-medium">
                        {formatNaira(tierPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gold">
                      <span>You save</span>
                      <span className="font-medium">
                        {formatNaira(regularPrice - tierPrice)}
                      </span>
                    </div>
                  </div>

                  {t.capacity !== Infinity && (
                    <div className="mt-5">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full bg-gold transition-all duration-1000"
                          style={{ width: `${filled}%` }}
                        />
                      </div>
                      <p className="mt-2 font-sans text-[11px] text-muted-foreground">
                        {t.claimed} of {t.capacity} slots claimed
                        {isActive && ` — only ${t.capacity - t.claimed} left`}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-center font-sans text-sm italic text-muted-foreground">
            If you delay your purchase, your discount decreases automatically.
          </p>
        </div>
      </section>

      {/* SAVINGS COMPARISON */}
      <section className="border-y border-border bg-cream/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">
              The Math
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-foreground">
              Buy today vs. wait
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border-2 border-gold bg-background p-8">
              <p className="font-sans text-[11px] uppercase tracking-widest text-gold">
                Buy Today
              </p>
              <p className="mt-3 font-serif text-4xl font-medium text-foreground">
                Save {formatNaira(saving)}
              </p>
              <ul className="mt-6 space-y-3 font-sans text-sm text-foreground">
                {[
                  `${(active.discount * 100).toFixed(0)}% early-buyer discount locked in`,
                  "Guaranteed placement in current production batch",
                  "Production begins this week",
                  "Reserved production slot",
                ].map((v) => (
                  <li key={v} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-8">
              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground">
                Wait Until Later
              </p>
              <p className="mt-3 font-serif text-4xl font-medium text-muted-foreground">
                Pay {formatNaira(saving)} more
              </p>
              <ul className="mt-6 space-y-3 font-sans text-sm text-muted-foreground">
                {[
                  "Lose your early-buyer savings",
                  "Move to the next production batch",
                  "Miss this discount tier entirely",
                  "Pay up to full price on reorder",
                ].map((v) => (
                  <li key={v} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Users,
                v: `${claimedThisMonth}+`,
                l: "Frames reserved this batch",
              },
              {
                icon: ShieldCheck,
                v: `${productClaimed}`,
                l: `Slots claimed for ${product?.name}`,
              },
              { icon: Sparkles, v: "4.9 / 5", l: "From verified customers" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-lg border border-border bg-card p-8 text-center"
              >
                <s.icon className="mx-auto h-6 w-6 text-gold" />
                <p className="mt-4 font-serif text-3xl font-medium text-foreground">
                  {s.v}
                </p>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center font-serif text-xl italic text-muted-foreground">
            &quot;Join hundreds of families filling their homes with God&apos;s
            Word.&quot;
          </p>
        </div>
      </section>

      {/* WHY BATCHES */}
      <section className="border-t border-border bg-primary/5 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">
            Why We Do This
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-foreground">
            Production batches, not mass production
          </h2>
          <p className="mt-6 font-sans text-base font-light leading-relaxed text-muted-foreground">
            Every FramedWithTheWord piece is produced in carefully planned
            production batches to ensure exceptional quality, attention to
            detail, and timely delivery. Early-buyer pricing rewards customers
            who reserve their production slots before production begins. The
            earlier you order, the more you save.
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">
            Also from the collection
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {PRODUCTS.filter((p) => p.id !== product?.id)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.key}`}
                  className="group block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-4/5 overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-serif text-sm text-foreground">
                      {p.name}
                    </p>
                    <p className="mt-0.5 font-sans text-[10px] uppercase tracking-widest text-gold">
                      {p.reference}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <CartDrawer />

      {/* STICKY PURCHASE BAR */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-4">
            <div className="hidden h-12 w-12 overflow-hidden rounded md:block">
              <img
                src={product?.image ?? ""}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-gold">
                Save {formatNaira(saving)} ·{" "}
                {active.capacity === Infinity
                  ? "Full price"
                  : `${active.capacity - active.claimed} slots left`}
              </p>
              <p className="font-serif text-sm text-foreground">
                <span className="text-muted-foreground line-through mr-2">
                  {formatNaira(regularPrice)}
                </span>
                {formatNaira(yourPrice)} <span className="text-gold font-sans text-[12px] uppercase">(for {sizeId} inches)</span>
                <p>Scroll down to select a different size</p>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 font-mono text-sm text-foreground sm:flex">
              <Clock className="mr-1 h-3.5 w-3.5 text-gold" />
              {String(countdown.d).padStart(2, "0")}:
              {String(countdown.h).padStart(2, "0")}:
              {String(countdown.m).padStart(2, "0")}:
              {String(countdown.s).padStart(2, "0")}
            </div>
            <Button
              onClick={() => setShowReserve(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Lock className="mr-2 h-4 w-4" />
              Lock My Slot
            </Button>
          </div>
        </div>
      </div>

      {/* Live purchase toast */}
      {/* {toast && (
        <div className="fixed bottom-24 left-4 z-40 max-w-xs animate-fade-in rounded-lg border border-border bg-background/95 p-4 shadow-lg backdrop-blur">
          <p className="font-sans text-[10px] uppercase tracking-widest text-gold">
            Live activity
          </p>
          <p className="mt-1 font-sans text-sm text-foreground">{toast}</p>
        </div>
      )} */}

      {/* Reservation modal */}
      {showReserve && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowReserve(false)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-background p-8 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">
              Reserve Your Discount
            </p>
            <h3 className="mt-2 font-serif text-2xl font-medium text-foreground">
              Lock your production slot
            </h3>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              We&apos;ll hold your {(active.discount * 100).toFixed(0)}%
              discount and {selectedSize.label} slot for 15 minutes while you
              complete checkout.
            </p>
            <form onSubmit={submitReserve} className="mt-6 space-y-4">
              {[
                {
                  k: "name",
                  label: "Full name",
                  type: "text",
                  placeholder: "Your name",
                },
                {
                  k: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "you@email.com",
                },
                {
                  k: "whatsapp",
                  label: "WhatsApp number",
                  type: "tel",
                  placeholder: "",
                },
              ].map((f) => (
                <div key={f.k}>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                    {f.label}
                  </label>
                  <input
                    required
                    type={f.type}
                    value={(form as any)[f.k]}
                    onChange={(e) =>
                      setForm({ ...form, [f.k]: e.target.value })
                    }
                    placeholder={f.placeholder}
                    className="w-full rounded border border-border bg-background px-3 py-2 font-sans text-sm text-foreground focus:border-gold focus:outline-none"
                  />
                </div>
              ))}
              <Button
                disabled={isReserving}
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isReserving ? "Reserving..." : "Reserve My Early-Buyer Price"}
              </Button>
              {/* <p className="text-center font-sans text-[11px] text-muted-foreground">
                Abuja delivery is payable on delivery. Outside Abuja shipping is
                added at checkout.
              </p> */}
            </form>
          </div>
        </div>
      )}

      {/* Reservation timer banner */}
      {reserved && !reservation.done && items.length !== 0 && (
        <div className="fixed top-20 right-4 z-40 rounded-lg border border-gold bg-background/95 p-4 shadow-lg backdrop-blur animate-fade-in">
          <p className="font-sans text-[10px] uppercase tracking-widest text-gold">
            Reserved for you
          </p>
          <p className="mt-1 font-mono text-lg text-foreground">
            {String(reservation.m).padStart(2, "0")}:
            {String(reservation.s).padStart(2, "0")}
          </p>
          <Button
            size="sm"
            onClick={() => {
              router.push("/checkout");
            }}
            className="mt-2 w-full"
          >
            Complete checkout
          </Button>
        </div>
      )}
    </div>
  );
}
