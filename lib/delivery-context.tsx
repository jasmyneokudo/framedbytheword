"use client"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const NIGERIAN_STATES = [
  "Abuja", "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara",
] as const;

export type NigerianState = (typeof NIGERIAN_STATES)[number];

interface DeliveryContextValue {
  state: string | null;
  setState: (state: string) => void;
  hydrated: boolean;
  isPickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
}

const DeliveryContext = createContext<DeliveryContextValue | undefined>(undefined);

const STORAGE_KEY = "fwtw_delivery_state_v1";

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [state, setStateValue] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isPickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    if (stored) setStateValue(stored);
    setHydrated(true);
    if (!stored) setPickerOpen(true);
  }, []);

  const setState = (next: string) => {
    setStateValue(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  return (
    <DeliveryContext.Provider
      value={{
        state,
        setState,
        hydrated,
        isPickerOpen,
        openPicker: () => setPickerOpen(true),
        closePicker: () => setPickerOpen(false),
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const ctx = useContext(DeliveryContext);
  if (!ctx) throw new Error("useDelivery must be used within DeliveryProvider");
  return ctx;
}
