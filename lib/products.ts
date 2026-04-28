export interface Product {
  id: string;
  name: string;
  verse: string;
  reference: string;
  image: string;
  basePrice: number; // NGN, price for 12x16
}

// Pricing model (placeholders, NGN):
// 12x16 = base, 16x24 = base * 1.6, 24x36 = base * 2.6
// custom: rate per square inch derived from base / (12*16)
export const SIZES = [
  { id: "12x16", label: '12" × 16"', width: 12, height: 16, multiplier: 1 },
  { id: "16x24", label: '16" × 24"', width: 16, height: 24, multiplier: 1.6 },
  { id: "24x36", label: '24" × 36"', width: 24, height: 36, multiplier: 2.6 },
  { id: "custom", label: "Custom Size", width: 0, height: 0, multiplier: 0 },
] as const;

export type SizeId = (typeof SIZES)[number]["id"];

export const PRODUCTS: Product[] = [
  { id: "john-316", name: "For God So Loved", verse: "For God so loved the world", reference: "John 3:16", image: "/frames/1.png", basePrice: 28000 },
  { id: "psalm-23", name: "The Lord Is My Shepherd", verse: "The Lord is my shepherd", reference: "Psalm 23", image: "/frames/2.png", basePrice: 32000 },
  { id: "phil-413", name: "Through Christ", verse: "I can do all things through Christ", reference: "Philippians 4:13", image: "/frames/3.png", basePrice: 28000 },
  { id: "psalm-4610", name: "Be Still", verse: "Be still and know that I am God", reference: "Psalm 46:10", image: "/frames/4.png", basePrice: 30000 },
  { id: "prov-35", name: "Trust in the Lord", verse: "Trust in the Lord with all your heart", reference: "Proverbs 3:5", image: "/frames/41.png", basePrice: 28000 },
  { id: "prov-3125", name: "Strength & Dignity", verse: "She is clothed with strength and dignity", reference: "Proverbs 31:25", image: "/frames/42.png", basePrice: 32000 },
  { id: "josh-2415", name: "Me & My House", verse: "As for me and my house, we will serve the Lord", reference: "Joshua 24:15", image: "/frames/43.png", basePrice: 30000 },
  { id: "cor-13", name: "Love Is Patient", verse: "Love is patient, love is kind", reference: "1 Corinthians 13", image: "/frames/8.png", basePrice: 32000 },
  { id: "isa-431", name: "You Are Mine", verse: "I have called you by name, you are mine", reference: "Isaiah 43:1", image: "/frames/9.png", basePrice: 35000 },
  { id: "psalm-150", name: "Praise the Lord", verse: "Let everything that has breath praise the Lord", reference: "Psalm 150:6", image: "/frames/10.png", basePrice: 28000 },
  { id: "neh-810", name: "Joy of the Lord", verse: "The joy of the Lord is my strength", reference: "Nehemiah 8:10", image: "/frames/11.png", basePrice: 30000 },
  { id: "prov-36", name: "Acknowledge Him", verse: "In all your ways acknowledge Him", reference: "Proverbs 3:6", image: "/frames/12.png", basePrice: 28000 },
];

const BASE_AREA = 12 * 16;

export function calculatePrice(
  basePrice: number,
  sizeId: SizeId,
  customWidth?: number,
  customHeight?: number,
): number {
  if (sizeId === "custom") {
    if (!customWidth || !customHeight) return 0;
    const ratePerSqIn = basePrice / BASE_AREA;
    // Custom carries a 15% craftsmanship premium
    return Math.round(ratePerSqIn * customWidth * customHeight * 1.15);
  }
  const size = SIZES.find((s) => s.id === sizeId);
  if (!size) return basePrice;
  return Math.round(basePrice * size.multiplier);
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
