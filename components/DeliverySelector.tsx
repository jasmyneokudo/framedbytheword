import { MapPin, ChevronDown } from "lucide-react";
import { NIGERIAN_STATES, useDelivery } from "@/lib/delivery-context";

interface DeliverySelectorProps {
  tone?: "light" | "dark";
  className?: string;
}

/** Compact delivery-state dropdown for the site header. */
export function DeliverySelector({
  tone = "dark",
  className = "",
}: DeliverySelectorProps) {
  const { state, setState, hydrated } = useDelivery();
  const textColor = tone === "light" ? "text-white" : "text-white";
    // tone === "light" ? "text-primary-foreground/80" : "text-foreground/70";

  return (
    <div className={`relative w-1/2 inline-flex items-center ${className}`}>
      <MapPin
        className={`pointer-events-none absolute left-2 h-3.5 w-3.5 ${textColor}`}
      />
      <select
        aria-label="Delivery state"
        value={state ?? ""}
        onChange={(e) => setState(e.target.value)}
        className={`appearance-none  w-full rounded-full border border-border/60 bg-transparent py-1.5 pl-7 pr-6 font-sans text-xs uppercase tracking-[0.15em] hover:text-gold transition-colors focus:outline-none ${textColor}`}
      >
        {!state && <option value="">{hydrated ? "Set location" : "…"}</option>}
        {NIGERIAN_STATES.map((s) => (
          <option key={s} value={s} className="text-foreground">
            {s}
          </option>
        ))}
      </select>
      <ChevronDown
        className={`pointer-events-none absolute right-2 h-3 w-3 ${textColor}`}
      />
    </div>
  );
}
