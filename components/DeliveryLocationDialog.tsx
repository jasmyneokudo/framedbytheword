"use client"
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { NIGERIAN_STATES, useDelivery } from "@/lib/delivery-context";

export function DeliveryLocationDialog() {
  const { state, isPickerOpen, closePicker, setState } = useDelivery();
  const [query, setQuery] = useState("");

  const filtered = NIGERIAN_STATES.filter((s) =>
    s.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const select = (next: string) => {
    setState(next);
    closePicker();
  };

  return (
    <Dialog
      open={isPickerOpen}
      onOpenChange={(open) => {
        if (!open) {
          if (!state) return; // must choose on first visit
          closePicker();
        }
      }}
    >
      <DialogContent className={`sm:max-w-lg ${state ? "" : "[&>button]:hidden"}`}>
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-medium text-foreground">
            Where should we deliver?
          </DialogTitle>
          <DialogDescription className="font-sans text-sm text-muted-foreground">
            Select your state so we can tailor delivery timelines and logistics for your order.
          </DialogDescription>
        </DialogHeader>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search states…"
          aria-label="Search Nigerian states"
          className="w-full rounded border border-border bg-background px-3 py-2.5 font-sans text-sm text-foreground focus:border-gold focus:outline-none"
        />

        <div className="max-h-64 overflow-y-auto rounded border border-border">
          <ul className="divide-y divide-border">
            {filtered.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => select(s)}
                  className={`flex w-full items-center gap-2 px-4 py-2.5 text-left font-sans text-sm transition-colors ${
                    state === s
                      ? "bg-gold/15 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <MapPin className={`h-3.5 w-3.5 ${state === s ? "text-gold" : "opacity-50"}`} />
                  {s}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-3 font-sans text-sm text-muted-foreground">No matching state.</li>
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

