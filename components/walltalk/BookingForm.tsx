"use client"

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Loader2 } from "lucide-react";
import {
  WT_CONFIG, formatNaira, GALLERY_WALL_OPTIONS, GALLERY_ROOM_OPTIONS, GALLERY_CONTENT_OPTIONS,
  HOME_ROOM_OPTIONS, HOME_FLOOR_OPTIONS, HOME_SPACE_OPTIONS, HOME_STATUS_OPTIONS, HOME_CONTENT_OPTIONS,
  BUDGET_OPTIONS, HEARD_OPTIONS, THEME_OPTIONS,
} from "@/lib/walltalk";
import Link from "next/link";

const SLOTS_KEY = "wt_launch_slots_used";
export const CONCEPT_KEY = "wt_selected_concept";

type Service = "" | "Gallery Wall Design" | "Whole-Home Frame Styling";
interface FormState {
  name: string; email: string; phone: string; whatsapp: string; address: string;
  date: string; time: string; heard: string; service: Service;
  walls: string; galleryRooms: string[]; themes: string[]; galleryContent: string[];
  homeRooms: string; floors: string; spaces: string[]; homeStatus: string; homeContent: string[];
  vision: string; budget: string;
}
const EMPTY: FormState = {
  name: "", email: "", phone: "", whatsapp: "", address: "", date: "", time: "", heard: "", service: "",
  walls: "", galleryRooms: [], themes: [], galleryContent: [],
  homeRooms: "", floors: "", spaces: [], homeStatus: "", homeContent: [], vision: "", budget: "",
};

const input = "w-full border-0 border-b border-wt-line bg-transparent px-0 py-2.5 font-wt-sans text-sm text-wt-ink placeholder:text-wt-ink-soft/50 focus:border-wt-olive focus:outline-none focus:ring-0";
const label = "font-wt-sans text-[11px] uppercase tracking-[0.18em] text-wt-ink-soft";

function Field({ title, required, children }: { title: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className={label}>{title}{required && <span className="text-wt-olive"> *</span>}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Chips({ options, value, onChange, multi = true }: { options: string[]; value: string[] | string; onChange: (v: any) => void; multi?: boolean }) {
  const sel = (o: string) => (multi ? (value as string[]).includes(o) : value === o);
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          type="button" key={o} aria-pressed={sel(o)}
          onClick={() => multi
            ? onChange(sel(o) ? (value as string[]).filter((x) => x !== o) : [...(value as string[]), o])
            : onChange(o)}
          className={`border px-3.5 py-2 font-wt-sans text-xs transition-colors ${sel(o) ? "border-wt-olive bg-wt-olive text-white" : "border-wt-line bg-wt-paper text-wt-ink hover:border-wt-olive"}`}
        >{o}</button>
      ))}
    </div>
  );
}

function Group({ title, required, children }: { title: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <p className={label}>{title}{required && <span className="text-wt-olive"> *</span>}</p>
      {children}
    </div>
  );
}

export function BookingForm() {
  const [f, setF] = useState<FormState>(EMPTY);
  const [stage, setStage] = useState<"form" | "summary" | "paying" | "done">("form");
  const [error, setError] = useState("");
  const [slotsUsed, setSlotsUsed] = useState(0);
  const [bookingDiscounted, setBookingDiscounted] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    setSlotsUsed(Number(localStorage.getItem(SLOTS_KEY) || 0));
    const pick = () => {
      const c = localStorage.getItem(CONCEPT_KEY);
      if (c) {
        setF((p) => ({ ...p, service: p.service || "Gallery Wall Design", themes: p.themes.includes(c) ? p.themes : [...p.themes, c] }));
        localStorage.removeItem(CONCEPT_KEY);
      }
    };
    pick();
    window.addEventListener("wt-concept", pick);
    return () => window.removeEventListener("wt-concept", pick);
  }, []);

  useEffect(() => {
    if (stage !== "form") top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [stage]);

  const slotsLeft = Math.max(0, WT_CONFIG.launchSlots - slotsUsed);
  const offer = slotsLeft > 0;
  const fee = WT_CONFIG.consultationFee;
  const discounted = Math.round(fee * (1 - WT_CONFIG.launchDiscountPercent / 100));
  const payable = offer ? discounted : fee;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing: string[] = [];
    if (!f.name.trim()) missing.push("full name");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) missing.push("a valid email");
    if (f.phone.replace(/\D/g, "").length < 7) missing.push("phone number");
    if (!f.address.trim()) missing.push("project location");
    if (!f.service) missing.push("service type");
    if (f.service === "Gallery Wall Design") {
      if (!f.walls) missing.push("number of walls");
      if (!f.galleryRooms.length) missing.push("room / location");
    }
    if (f.service === "Whole-Home Frame Styling") {
      if (!f.homeRooms) missing.push("number of rooms");
      if (!f.floors) missing.push("number of floors");
    }
    if (missing.length) { setError(`Please add: ${missing.join(", ")}.`); return; }
    setError("");
    setStage("summary");
  };

  const pay = () => {
    setStage("paying");
    // Simulated payment — replace with a real payment provider when ready.
    setTimeout(() => {
      if (offer) {
        const used = slotsUsed + 1;
        localStorage.setItem(SLOTS_KEY, String(used));
        setSlotsUsed(used);
      }
      setBookingDiscounted(offer);
      setStage("done");
    }, 1400);
  };

  const waLink = `https://wa.me/${WT_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Walltalk Design Studio, I just booked a consultation (${f.name}).`)}`;

  if (stage === "done") {
    const rows = [
      ["Client", f.name], ["Service", f.service], ["Preferred date", f.date || "To be confirmed"],
      ["Preferred time", f.time || "To be confirmed"], ["Project location", f.address],
      ["Payment status", `Paid · ${formatNaira(bookingDiscounted ? discounted : fee)}`],
    ];
    return (
      <div ref={top} className="scroll-mt-24 border border-wt-line bg-wt-paper p-8 md:p-12">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-wt-olive text-white"><Check className="h-6 w-6" /></span>
        <h3 className="mt-6 font-wt-serif text-3xl text-wt-ink md:text-4xl">Your consultation is booked.</h3>
        <dl className="mt-8 divide-y divide-wt-line border-y border-wt-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-3 font-wt-sans text-sm">
              <dt className="text-wt-ink-soft">{k}</dt><dd className="text-right text-wt-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className={`${label} mt-8`}>What happens next</p>
        <ol className="mt-3 space-y-2 font-wt-sans text-sm text-wt-ink">
          <li>1. Our team contacts you to schedule your discovery call.</li>
          <li>2. We confirm a date for your in-person space assessment.</li>
          <li>3. You receive a tailored design proposal and project quotation.</li>
        </ol>
        <p className="mt-8 font-wt-sans text-sm leading-relaxed text-wt-ink">Thank you for choosing Walltalk Design Studio. Our team will contact you to confirm your discovery call and guide you through the next stage of your project.</p>
        <p className="mt-3 font-wt-sans text-sm leading-relaxed text-wt-ink-soft">Please keep your phone available and ensure that the project location is accessible when your physical site assessment is scheduled.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/walltalk" onClick={() => { setF(EMPTY); setStage("form"); window.scrollTo({ top: 0 }); }} className="border border-wt-ink px-6 py-3 font-wt-sans text-xs uppercase tracking-[0.18em] text-wt-ink hover:bg-wt-ink hover:text-wt-paper">Back to Home</Link>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-wt-olive px-6 py-3 font-wt-sans text-xs uppercase tracking-[0.18em] text-white hover:bg-wt-olive-deep">Contact Us on WhatsApp</a>
        </div>
      </div>
    );
  }

  if (stage === "summary" || stage === "paying") {
    return (
      <div ref={top} className="scroll-mt-24 border border-wt-line bg-wt-paper p-8 md:p-12">
        <p className={label}>Booking summary</p>
        <h3 className="mt-3 font-wt-serif text-3xl text-wt-ink">{f.service}</h3>
        <p className="mt-2 font-wt-sans text-sm text-wt-ink-soft">{f.name} · {f.address}{f.date && ` · ${f.date}`}{f.time && ` at ${f.time}`}</p>
        <div className="mt-8 divide-y divide-wt-line border-y border-wt-line font-wt-sans text-sm">
          <div className="flex justify-between py-4"><span className="text-wt-ink-soft">Consultation fee</span>
            <span className={offer ? "text-wt-ink-soft line-through" : "text-wt-ink"}>{formatNaira(fee)}</span></div>
          {offer && (
            <div className="flex items-center justify-between py-4">
              <span><span className="text-wt-olive">Launch offer · {WT_CONFIG.launchDiscountPercent}% off</span>
                <span className="block text-xs text-wt-ink-soft">For our first {WT_CONFIG.launchSlots} clients · {slotsLeft} {slotsLeft === 1 ? "slot" : "slots"} remaining</span></span>
              <span className="text-wt-olive">−{formatNaira(fee - discounted)}</span>
            </div>
          )}
          <div className="flex justify-between py-4 text-base"><span className="text-wt-ink">Total due today</span><span className="font-wt-serif text-2xl text-wt-ink">{formatNaira(payable)}</span></div>
        </div>
        <p className="mt-6 font-wt-sans text-sm text-wt-ink">Your consultation is confirmed once payment has been successfully completed.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={pay} disabled={stage === "paying"} className="inline-flex items-center gap-2 bg-wt-olive px-7 py-3.5 font-wt-sans text-xs uppercase tracking-[0.18em] text-white hover:bg-wt-olive-deep disabled:opacity-70">
            {stage === "paying" && <Loader2 className="h-4 w-4 animate-spin" />}
            {stage === "paying" ? "Processing payment…" : `Pay ${formatNaira(payable)}`}
          </button>
          <button onClick={() => setStage("form")} disabled={stage === "paying"} className="border border-wt-line px-7 py-3.5 font-wt-sans text-xs uppercase tracking-[0.18em] text-wt-ink hover:border-wt-ink">Edit details</button>
        </div>
      </div>
    );
  }

  return (
    <form ref={top as any} onSubmit={submit} noValidate className="scroll-mt-24 space-y-12 border border-wt-line bg-wt-paper p-6 md:p-12">
      <section>
        <p className="font-wt-serif text-xl text-wt-ink">01 — About you</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Field title="Full name" required><input className={input} value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></Field>
          <Field title="Email address" required><input type="email" className={input} value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></Field>
          <Field title="Phone number" required><input type="tel" className={input} value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" /></Field>
          <Field title="WhatsApp (if different)"><input type="tel" className={input} value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} /></Field>
          <div className="md:col-span-2"><Field title="Abuja address / project location" required><input className={input} value={f.address} onChange={(e) => set("address", e.target.value)} placeholder="e.g. Maitama, Abuja" /></Field></div>
          <Field title="Preferred consultation date"><input type="date" className={input} value={f.date} onChange={(e) => set("date", e.target.value)} /></Field>
          <Field title="Preferred time"><input type="time" className={input} value={f.time} onChange={(e) => set("time", e.target.value)} /></Field>
          <Field title="How did you hear about us?">
            <select className={input} value={f.heard} onChange={(e) => set("heard", e.target.value)}>
              <option value="">Select…</option>{HEARD_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>
      </section>

      <section>
        <p className="font-wt-serif text-xl text-wt-ink">02 — Your project</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(["Gallery Wall Design", "Whole-Home Frame Styling"] as const).map((s) => (
            <button type="button" key={s} onClick={() => set("service", s)} aria-pressed={f.service === s}
              className={`border p-5 text-left transition-colors ${f.service === s ? "border-wt-olive bg-wt-cream" : "border-wt-line hover:border-wt-ink"}`}>
              <span className="font-wt-serif text-lg text-wt-ink">{s}</span>
              <span className="mt-1 block font-wt-sans text-xs text-wt-ink-soft">{s === "Gallery Wall Design" ? "One wall or a few selected walls" : "A cohesive plan across your home"}</span>
            </button>
          ))}
        </div>

        {f.service === "Gallery Wall Design" && (
          <div className="mt-10 space-y-8">
            <Group title="Number of walls" required><Chips options={GALLERY_WALL_OPTIONS} value={f.walls} onChange={(v) => set("walls", v)} multi={false} /></Group>
            <Group title="Room / location" required><Chips options={GALLERY_ROOM_OPTIONS} value={f.galleryRooms} onChange={(v) => set("galleryRooms", v)} /></Group>
            <Group title="Gallery wall theme"><Chips options={THEME_OPTIONS} value={f.themes} onChange={(v) => set("themes", v)} /></Group>
            <Group title="What would you like displayed?"><Chips options={GALLERY_CONTENT_OPTIONS} value={f.galleryContent} onChange={(v) => set("galleryContent", v)} /></Group>
          </div>
        )}
        {f.service === "Whole-Home Frame Styling" && (
          <div className="mt-10 space-y-8">
            <Group title="Number of rooms" required><Chips options={HOME_ROOM_OPTIONS} value={f.homeRooms} onChange={(v) => set("homeRooms", v)} multi={false} /></Group>
            <Group title="Number of floors" required><Chips options={HOME_FLOOR_OPTIONS} value={f.floors} onChange={(v) => set("floors", v)} multi={false} /></Group>
            <Group title="Which spaces would you like styled?"><Chips options={HOME_SPACE_OPTIONS} value={f.spaces} onChange={(v) => set("spaces", v)} /></Group>
            <Group title="Home status"><Chips options={HOME_STATUS_OPTIONS} value={f.homeStatus} onChange={(v) => set("homeStatus", v)} multi={false} /></Group>
            <Group title="What would you like included?"><Chips options={HOME_CONTENT_OPTIONS} value={f.homeContent} onChange={(v) => set("homeContent", v)} /></Group>
          </div>
        )}
        {f.service && (
          <div className="mt-8">
            <Field title="Describe your vision">
              <textarea rows={5} className={`${input} resize-y border border-wt-line p-3`} value={f.vision} onChange={(e) => set("vision", e.target.value)} placeholder="Tell us about the story you'd like your walls to tell…" />
            </Field>
          </div>
        )}
      </section>

      <section>
        <p className="font-wt-serif text-xl text-wt-ink">03 — Budget <span className="font-wt-sans text-xs text-wt-ink-soft">(optional)</span></p>
        <Chips options={BUDGET_OPTIONS} value={f.budget} onChange={(v) => set("budget", v)} multi={false} />
      </section>

      {error && <p role="alert" className="border-l-2 border-wt-olive bg-wt-cream px-4 py-3 font-wt-sans text-sm text-wt-ink">{error}</p>}

      <div className="flex flex-col gap-4 border-t border-wt-line pt-8 md:flex-row md:items-center md:justify-between">
        <p className="font-wt-sans text-sm text-wt-ink-soft">
          Consultation fee: {offer ? <><span className="line-through">{formatNaira(fee)}</span> <span className="text-wt-olive">{formatNaira(discounted)} launch offer</span></> : formatNaira(fee)}
        </p>
        <button type="submit" className="bg-wt-ink px-8 py-4 font-wt-sans text-xs uppercase tracking-[0.2em] text-wt-paper hover:bg-wt-olive">Continue to Booking Summary</button>
      </div>
    </form>
  );
}