"use client";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import {
  getProduct,
  formatNaira,
  sizeLabel as getSizeLabel,
} from "@/lib/products";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { NIGERIAN_STATES, useDelivery } from "@/lib/delivery-context";

const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }, // This ensures the component is only loaded on the client-side
);

// const checkoutSchema = z.object({
//   fullName: z.string().trim().min(2, "Please enter your full name").max(120),
//   email: z.string().trim().email("Please enter a valid email").max(255),
//   phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
//   address: z
//     .string()
//     .trim()
//     .min(8, "Please enter your delivery address")
//     .max(300),
//   city: z.string().trim().min(2, "Please enter your city").max(80),
//   state: z.string().trim().min(2, "Please enter your state").max(80),
//   notes: z.string().trim().max(500).optional().or(z.literal("")),
// });

// type FormErrors = Partial<Record<keyof z.infer<typeof checkoutSchema>, string>>;

const FCT = "Abuja";
const LEAD_KEY = "fwtw_lead_v1";

function deliveryFeeFor(state: string | null, itemsTotal: number) {
  if (!state || state === FCT) return 0;
  if (itemsTotal <= 20000) return 10000;
  if (itemsTotal <= 60000) return 13000;
  if (itemsTotal <= 100000) return 18000;
  if (itemsTotal <= 150000) return 20000;
  if (itemsTotal <= 200000) return 25000;
  return 30000;
}

// Paystack Nigeria: 1.5% + ₦100 (₦100 waived under ₦2,500), fee capped at ₦2,000.
// The fee is passed to the customer, so we gross up the amount we must receive.
const PAYSTACK_RATE = 0.015;
const PAYSTACK_FLAT = 100;
const PAYSTACK_FLAT_WAIVER = 2500;
const PAYSTACK_FEE_CAP = 2000;

function paystackFee(amountToReceive: number): number {
  if (amountToReceive <= 0) return 0;
  const flat = amountToReceive >= PAYSTACK_FLAT_WAIVER ? PAYSTACK_FLAT : 0;
  // charge = (amount + flat) / (1 - rate)  →  fee = charge - amount
  const grossed = (amountToReceive + flat) / (1 - PAYSTACK_RATE);
  const fee = Math.ceil(grossed - amountToReceive);
  return Math.min(fee, PAYSTACK_FEE_CAP);
}

export default function Home() {
  const { items, subtotal, listSubtotal, savings, clear } = useCart();
  const [submitted, setSubmitted] = useState<null | {
    orderId: string;
    name: string;
  }>(null);
  // const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const [lead, setLead] = useState<{
    name?: string;
    email?: string;
    whatsapp?: string;
  } | null>(null);
  const { state: deliveryState, setState: setDeliveryState } = useDelivery();

  const deliveryFee = deliveryFeeFor(deliveryState, subtotal);
  const orderAmount = subtotal + deliveryFee;
  const gatewayFee = paystackFee(orderAmount);
  const total = orderAmount + gatewayFee;

  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: lead?.name ?? "",
    email: lead?.email ?? "",
    phone: lead?.whatsapp ?? "",
    address: "",
    city: "",
    state: deliveryState ?? "",
    notes: "",
  });

  console.log("nale---->", deliveryState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LEAD_KEY);
      const leadUser = raw ? JSON.parse(raw) : null;
      if (raw) setLead(leadUser);
      console.log("lead.name", lead?.name, deliveryState);

      setFormData({
        fullName: leadUser?.name ?? "",
        email: leadUser?.email ?? "",
        phone: leadUser?.whatsapp ?? "",
        address: "",
        city: "",
        state: deliveryState ?? "",
        notes: "",
      });
    } catch {
      // ignore
    }
  }, []);

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setErrors({});
  //     console.log("curr", e.currentTarget);
  //     console.log(e.target);
  //     const formData = new FormData(e.currentTarget);
  //     const raw = Object.fromEntries(formData.entries());
  //     const parsed = checkoutSchema.safeParse(raw);
  //     if (!parsed.success) {
  //       const next: FormErrors = {};
  //       for (const issue of parsed.error.issues) {
  //         const key = issue.path[0] as keyof FormErrors;
  //         if (!next[key]) next[key] = issue.message;
  //       }
  //       setErrors(next);
  //       return;
  //     }
  //     setSubmitting(true);
  //     // Simulate order placement (no backend)
  //     const orderId = `FWTW-${Date.now().toString(36).toUpperCase()}`;
  //     setTimeout(() => {
  //       setSubmitted({ orderId, name: parsed.data.fullName });
  //       clear();
  //       setSubmitting(false);
  //     }, 600);
  //   };
  console.log("Items", items);
  const componentProps = {
    email: formData.email,
    amount: subtotal * 100,
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Info",
          variable_name: "Customer Info",
          value: `name: ${formData.fullName}, address: ${formData.address}, city: ${formData.city}, state: ${formData.state}, phone: ${formData.phone}, notes: ${formData.notes}`,
        },
        {
          display_name: "Order Details",
          variable_name: "Order_details",
          value: items
            .map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              const sizeLabel = getSizeLabel(
                item.sizeId,
                item.customWidth,
                item.customHeight,
              );
              // const sizeLabel = sizeMeta?.label;
              return `${product.name} (${sizeLabel}) × ${item.quantity}`;
            })
            .filter(Boolean)
            .join(", "),
        },
      ],
    },
    publicKey,
    text: ` ${
      submitting ? "Placing Order…" : `Place Order — ${formatNaira(total)}`
    }`,
    onSuccess: async () => {
      setSubmitting(true);
      alert(
        "Your request has been successfully dispatched and our team will reach out to you via WhatsApp shortly.",
      );
      setSubmitting(false);
      const orderId = `FWTW-${new Date().toString().toUpperCase()}`;
      setSubmitted({ orderId, name: formData.fullName });
      clear();
    },
    onClose: () => alert("Are you sure?"),
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader variant="solid" />
        <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
          <CheckCircle2 className="h-14 w-14 text-gold" />
          <h1 className="mt-6 font-serif text-3xl font-medium text-foreground md:text-4xl">
            Thank you, {submitted.name}.
          </h1>
          <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted-foreground">
            Your order{" "}
            <span className="text-foreground">{submitted.orderId}</span> has
            been received. Our team will reach out shortly to confirm your
            delivery details and arrange payment.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-10 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/">Return to Shop</Link>
          </Button>
        </section>
        <SiteFooter />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader variant="solid" />
        <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
          <h1 className="font-serif text-3xl font-medium text-foreground">
            Your cart is empty
          </h1>
          <p className="mt-3 font-sans text-sm text-muted-foreground">
            Add a frame before proceeding to checkout.
          </p>
          <Button
            onClick={() => router.push("/")}
            size="lg"
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Browse the Collection
          </Button>
        </section>
        <SiteFooter />
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="solid" />

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Continue Shopping
        </Link>

        <h1 className="mt-6 font-serif text-3xl font-medium text-foreground md:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Provide your details and we&apos;ll confirm your order with payment
          instructions.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <form className="space-y-8">
            <fieldset className="space-y-5">
              <legend className="font-serif text-lg text-foreground">
                Contact
              </legend>

              <Field
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                label="Full Name"
                // error={errors.fullName}
                required
              />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  label="Email"
                  type="email"
                  // error={errors.email}
                  required
                />
                <Field
                  name="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel"
                  // error={errors.phone}
                  required
                />
              </div>
            </fieldset>

            <fieldset className="space-y-5">
              <legend className="font-serif text-lg text-foreground">
                Delivery
              </legend>
              <Field
                name="address"
                label="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                // error={errors.address}
                required
              />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  // error={errors.city}
                  required
                />
                {/* <Field
                  name="state"
                  label="State"
                  value={formData.state ?? ""}
                  onChange={handleInputChange}
                  // error={errors.state}
                  required
                /> */}

                <div>
                  <label
                    htmlFor="state"
                    className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2"
                  >
                    State<span className="text-gold"> *</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    required
                    value={deliveryState ?? ""}
                    onChange={(e) => setDeliveryState(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2.5 font-sans text-sm text-foreground focus:border-gold focus:outline-none"
                  >
                    <option value="">Select your state</option>
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {/* {errors.state && <p className="mt-1 font-sans text-xs text-destructive">{errors.state}</p>} */}
                </div>
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2"
                >
                  Order Notes (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  maxLength={500}
                  className="w-full rounded border border-border bg-background px-3 py-2.5 font-sans text-sm text-foreground focus:border-gold focus:outline-none"
                />
              </div>
            </fieldset>

            {deliveryState === FCT && (
              <p className="font-sans text-xs text-muted-foreground">
                {/* By placing your order you agree to be contacted by our team to
              finalize delivery. */}
                Delivery logistics will be finalized via Whatsapp. You can
                either Pickup at our pickup location in Area 1 or we can deliver
                to you via a Dispatch rider (delivery fees apply)
              </p>
            )}
          </form>

          <PaystackButton
            disabled={
              submitting ||
              formData.email === "" ||
              formData.fullName === "" ||
              formData.phone === "" ||
              formData.address === "" ||
              formData.city === "" ||
              formData.state === ""
            }
            {...componentProps}
            className="w-full h-12 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-gray-400"
          />

          {/* Summary */}
          <aside className="h-fit rounded-lg border border-border bg-cream/40 p-6 lg:sticky lg:top-24">
            <h2 className="font-serif text-lg text-foreground">
              Order Summary
            </h2>
            <ul className="mt-5 divide-y divide-border">
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                // const sizeMeta = SIZES.find((s) => s.id === item.sizeId);
                // const sizeLabel =
                //   item.sizeId === "custom"
                //     ? `Custom ${item.customWidth}" × ${item.customHeight}"`
                //     : sizeMeta?.label;
                const sizeLabel = getSizeLabel(
                  item.sizeId,
                  item.customWidth,
                  item.customHeight,
                );
                return (
                  <li key={item.id} className="flex gap-3 py-3">
                    <Image
                      width="0"
                      height="0"
                      sizes="100vw"
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <p className="font-serif text-sm text-foreground">
                        {product.name}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground">
                        {sizeLabel} · Qty {item.quantity}
                      </p>
                      {/* <p className="mt-auto font-serif text-sm text-foreground">
                        {formatNaira(item.unitPrice * item.quantity)}
                      </p> */}
                      {item.discount ? (
                        <p className="font-sans text-[10px] uppercase tracking-widest text-gold">
                          {(item.discount * 100).toFixed(0)}% off locked in
                        </p>
                      ) : null}
                      <div className="mt-auto flex items-center gap-2">
                        {item.discount ? (
                          <span className="font-sans text-xs text-muted-foreground line-through">
                            {formatNaira(item.listPrice * item.quantity)}
                          </span>
                        ) : null}
                        <span className="font-serif text-sm text-foreground">
                          {formatNaira(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 space-y-2 border-t border-border pt-5">
              <Row label="Subtotal" value={formatNaira(subtotal)} />
              {savings > 0 && (
                <Row label="Discount" value={`−${formatNaira(savings)}`} />
              )}
              {/* <Row label="Shipping" value="Calculated after order" muted /> */}
              {deliveryState !== "Abuja" && (
                <Row
                  label={
                    deliveryState ? `Delivery (${deliveryState})` : "Delivery"
                  }
                  value={
                    !deliveryState
                      ? "Select a state"
                      : deliveryFee === 0
                        ? "Free — Abuja (FCT)"
                        : formatNaira(deliveryFee)
                  }
                  muted={!deliveryState}
                />
              )}

              <Row
                label="Payment gateway fee (Paystack)"
                value={formatNaira(gatewayFee)}
              />
              <div className="flex items-center justify-between pt-2">
                <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                  Total
                </span>
                <span className="font-serif text-xl text-foreground">
                  {formatNaira(total)}
                </span>
              </div>
              {/* <p className="font-sans text-[11px] leading-relaxed text-muted-foreground">
                Paystack charges 1.5% + ₦100 per transaction (₦100 waived below ₦2,500, fee capped at ₦2,000).
              </p> */}
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2"
      >
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded border border-border bg-background px-3 py-2.5 font-sans text-sm text-foreground focus:border-gold focus:outline-none"
      />

      {error && (
        <p className="mt-1 font-sans text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between font-sans text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={muted ? "text-muted-foreground" : "text-foreground"}>
        {value}
      </span>
    </div>
  );
}
