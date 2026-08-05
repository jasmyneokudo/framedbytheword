export type FrameShape = "portrait" | "square";
export interface Product {
  id: number;
  key?: string;
  name: string;
  tags: string;
  qty?: number;
  reference: string;
  image: string;
  video?: string;
  extraNotes?: string;
  basePrice: number; // NGN, price for 12x16
    /** "square" frames are only produced in the fixed square sizes below */
  shape?: FrameShape;
}

// Pricing model (placeholders, NGN):
// 12x16 = base, 16x24 = base * 1.6, 24x36 = base * 2.6
// custom: rate per square inch derived from base / (12*16)
export const SIZES = [
  { id: "8x12", label: '8" × 12"', width: 8, height: 12, multiplier: 0.7 },
  { id: "12x16", label: '12" × 16"', width: 12, height: 16, multiplier: 1 },
  { id: "16x24", label: '16" × 24"', width: 16, height: 24, multiplier: 1.6 },
  { id: "24x36", label: '24" × 36"', width: 24, height: 36, multiplier: 2.6 },
  { id: "36x48", label: '36" × 48"', width: 36, height: 48, multiplier: 5.2 },
  // { id: "custom", label: "Custom Size", width: 0, height: 0, multiplier: 0 },
] as const;

// export type SizeId = (typeof SIZES)[number]["id"];

/** Square frames are produced only in these sizes, at fixed prices. */
export const SQUARE_SIZES = [
  { id: "6x6", label: '6" × 6"', width: 6, height: 6, price: 70000 },
  { id: "8x8", label: '8" × 8"', width: 8, height: 8, price: 85000 },
  { id: "10x10", label: '10" × 10"', width: 10, height: 10, price: 100000 },
  { id: "12x12", label: '12" × 12"', width: 12, height: 12, price: 125000 },
] as const;

export type RectSizeId = (typeof SIZES)[number]["id"];
export type SquareSizeId = (typeof SQUARE_SIZES)[number]["id"];
export type SizeId = RectSizeId | SquareSizeId;

export const ALL_SIZES: { id: SizeId; label: string }[] = [...SIZES, ...SQUARE_SIZES];

export function isSquareSize(sizeId: SizeId): sizeId is SquareSizeId {
  return SQUARE_SIZES.some((s) => s.id === sizeId);
}

export function isSquareProduct(product: Product): boolean {
  return product.shape === "square";
}

/** Size options offered for a given product. */
export function sizesForProduct(product: Product): { id: SizeId; label: string }[] {
  return isSquareProduct(product)
    ? SQUARE_SIZES.map((s) => ({ id: s.id as SizeId, label: s.label }))
    : SIZES.map((s) => ({ id: s.id as SizeId, label: s.label }));
}

export function sizeLabel(sizeId: SizeId, customWidth?: number, customHeight?: number): string {
  // if (sizeId === "custom") return `Custom ${customWidth}" × ${customHeight}"`;
  return ALL_SIZES.find((s) => s.id === sizeId)?.label ?? sizeId;
}

export const bestsellers: Product[] = [ 
{
    id: 0,
    key: "born-of-god-2-frame-1",
    name: "Born Of God 2-frame set (1)",
    tags: "faith, overcoming, born of God",
    reference: "1 John.5:4",
    qty: 2,
    image: "/frames/18.png",
    basePrice: 40000,
  },
  {
    id: 0,
    key: "not-for-sale",
    name: "not for sale",
    tags: "faith, overcoming, born of God",
    reference: "1 John.5:4",
    qty: 2,
    image: "/frames/18.png",
    basePrice: 100,
  },
  {
    id: 1,
    key: "elroi-2-frame-1",
    name: "ELROI 2-frame set (1)",
    tags: "elroi",
    reference: "Genesis.16:13 x Luke.1:37",
    qty: 2,
    image: "/frames/3.png",
    basePrice: 40000,
  },
  {
    id: 2,
    key: "1-thess-5-16-18-3-frame",
    name: "1 Thess.5:16-18 3-frame set",
    tags: "rejoice, pray, thanksgiving",
    reference: "1 Thessalonians 5:16-18",
    qty: 3,
    image: "/frames/8.png",
    basePrice: 60000,
  },
  {
    id: 3,
    key: "esther-2-frame",
    name: "Esther 2-frame set",
    tags: "strength, hope, dignity",
    reference: "Proverbs.31:25 x Psalm 46:5",
    qty: 2,
    image: "/frames/10.png",
    basePrice: 40000,
  },
  {
    id: 4,
    key: "mercy-2-frame",
    name: "Mercy 2-frame set",
    tags: "mercy, righteous",
    reference: "Romans.9:16 x Proverbs.4:18",
    qty: 2,
    image: "/frames/1.png",
    basePrice: 40000,
  },
  {
    id: 5,
    key: "abundance-2-frame-set",
    name: "Abundance 2-frame-set",
    tags: "provision, abundance",
    reference: "2 Kings.3:17 x Matthew.6:26-30",
    qty: 2,
    image: "/frames/20.png",
    basePrice: 40000,
  },
   {
    id: 6,
    key: "faith-hope-love-3-frame",
    name: "Faith-Hope-Love 3-frame set",
    tags: "faith, hope, love",
    reference: "Hebrews.11:1 x Jeremiah.29:1 x 1 Corinthians.13:12",
    qty: 3,
    image: "/frames/58.jpeg",
    basePrice: 60000,
  },
   {
    id: 7,
    key: "philippians-4-6-7-3-frame",
    name: "Philippians.4:6-7 3-frame set",
    tags: "pray, thanksgiving, peace",
    reference: "Philippians.4:6-7",
    qty: 3,
    image: "/frames/23.png",
    basePrice: 60000,
  },
    {
    id: 8,
    key: "light-salvation-3-frame",
    name: "Light & Salvation 3-frame set",
    tags: "light, salvation, service",
    reference: "Joshua.24:15 x Psalm.27:1 x Psalms.124:1",
    qty: 3,
    image: "/frames/4.png",
    basePrice: 60000,
  },
]

export const PRODUCTS: Product[] = [
  {
    id: 0,
    key: "mercy-2-frame",
    name: "Mercy 2-frame set",
    tags: "mercy, righteous",
    reference: "Romans.9:16 x Proverbs.4:18",
    qty: 2,
    image: "/frames/1.png",
    basePrice: 40000,
  },
    {
    id: 0,
    key: "not-for-sale",
    name: "not for sale",
    tags: "faith, overcoming, born of God",
    reference: "1 John.5:4",
    qty: 2,
    image: "/frames/18.png",
    basePrice: 50,
  },
   {
    id: 0,
    key: "not-for-sale-2",
    name: "not for sale 2",
    tags: "faith, overcoming, born of God",
    reference: "1 John.5:4",
    qty: 2,
    image: "/frames/18.png",
    basePrice: 50,
  },
  {
    id: 1,
    key: "power-of-god-2-frame",
    name: "Power Of God 2-frame set",
    tags: "power, wisdom",
    reference: "Numbers.23:19 x 1 Corinthians.2:5",
    qty: 2,
    image: "/frames/2.png",
    basePrice: 40000,
  },
  {
    id: 2,
    key: "elroi-2-frame-1",
    name: "ELROI 2-frame set (1)",
    tags: "elroi",
    reference: "Genesis.16:13 x Luke.1:37",
    qty: 2,
    image: "/frames/3.png",
    basePrice: 40000,
  },
  {
    id: 3,
    key: "light-salvation-3-frame",
    name: "Light & Salvation 3-frame set",
    tags: "light, salvation, service",
    reference: "Joshua.24:15 x Psalm.27:1 x Psalms.124:1",
    qty: 3,
    image: "/frames/4.png",
    basePrice: 60000,
  },
  {
    id: 4,
    key: "peace-2-frame-1",
    name: "Peace 2-frame set (1)",
    tags: "peace",
    reference: "John.14:27",
    qty: 2,
    image: "/frames/41.png",
    basePrice: 40000,
  },
  {
    id: 5,
    key: "blessing-4-frame-1",
    name: "The Blessing 4-frame set (1)",
    tags: "blessing, favour",
    reference: "Numbers.6:24-26",
    qty: 4,
    image: "/frames/42.png",
    basePrice: 80000,
  },
  {
    id: 6,
    key: "blessing-4-frame-2",
    name: "The Blessing 4-frame set (2)",
    tags: "blessing, favour",
    reference: "Numbers.6:24-26",
    qty: 4,
    image: "/frames/44.png",
    basePrice: 80000,
  },
  {
    id: 7,
    key: "1-thess-5-16-18-3-frame",
    name: "1 Thess.5:16-18 3-frame set",
    tags: "rejoice, pray, thanksgiving",
    reference: "1 Thessalonians 5:16-18",
    qty: 3,
    image: "/frames/8.png",
    basePrice: 60000,
  },
  {
    id: 8,
    key: "fruit-9-frame-1",
    name: "Fruit-of-the-Spirit 9-frame set (1)",
    tags: "peace, love, joy, patience, kindness, goodness, faithfulness, gentleness, self-control",
    reference: "Galations:5:22-23",
    image: "/frames/66.png",
    basePrice: 70000,
  },
  {
    id: 9,
    key: "esther-2-frame",
    name: "Esther 2-frame set",
    tags: "strength, hope, dignity",
    reference: "Proverbs.31:25 x Psalm 46:5",
    qty: 2,
    image: "/frames/10.png",
    basePrice: 40000,
  },
  {
    id: 10,
    key: "wealthy-place-2-frame",
    name: "Wealthy Place 2-frame set",
    tags: "new beginnings, wealth",
    reference: "Psalms.66:12 x Genesis.1:1",
    qty: 2,
    image: "/frames/11.png",
    basePrice: 40000,
  },
  {
    id: 11,
    key: "elroi-2-frame-2",
    name: "ELROI 2-frame set (2)",
    tags: "elroi",
    reference: "Genesis.16:13 x Psalms.124:1",
    qty: 2,
    image: "/frames/12.png",
    basePrice: 40000,
  },
  {
    id: 12,
    key: "bloom-2-frame",
    name: "BLOOM 2-frame set",
    tags: "promises, fulfillment, strength",
    reference: "Proverbs 3:6",
    qty: 2,
    image: "/frames/55.png",
    basePrice: 40000,
  },
  {
    id: 13,
    key: "lamp-2-frame",
    name: "LAMP 2-frame set",
    tags: "word, lamp, family, service",
    reference: "Psalms.119:105 x Joshua.24:15",
    qty: 2,
    image: "/frames/56.png",
    basePrice: 40000,
  },
  {
    id: 14,
    key: "jigidem-2-frame",
    name: "JIGIDEM 2-frame set",
    tags: "strength, courage, hope",
    reference: "Philippians.4:13 x Joshua.1:9",
    qty: 2,
    image: "/frames/57.png",
    basePrice: 40000,
  },
  {
    id: 15,
    key: "faith-hope-love-3-frame",
    name: "Faith-Hope-Love 3-frame set",
    tags: "faith, hope, love",
    reference: "Hebrews.11:1 x Jeremiah.29:1 x 1 Corinthians.13:12",
    qty: 3,
    image: "/frames/58.jpeg",
    basePrice: 60000,
  },
  {
    id: 16,
    key: "psalms-44-3-2-frame",
    name: "Psalms.44:3 2-frame set",
    tags: "possession, inheritance, favour",
    reference: "Psalms.44:3",
    qty: 2,
    image: "/frames/59.png",
    basePrice:40000,
  },

  {
    id: 17,
    key: "city-on-a-hill-1-frame",
    name: "City On A Hill Single Frame",
    tags: "This is just a single frame, please let us know your preference in the checkout form.",
    reference: "Proverbs 3:6",
    qty: 1,
    image: "/frames/60.png",
    basePrice: 20000,
  },

  {
    id: 18,
    key: "fruit-9-frame-2",
    name: "Fruit-of-the-Spirit 9-frame set (2)",
    tags: "peace, love, joy, patience, kindness, goodness, faithfulness, gentleness, self-control",
    reference: "Galatians:5:22-23",
    basePrice: 70000,
    shape: "square",
    qty: 9,
    image: "/frames/61.png",
  },

  {
    id: 19,
    key: "fruit-9-frame-3",
    name: "Fruit-of-the-Spirit 9-frame set (3)",
    tags: "peace, love, joy, patience, kindness, goodness, faithfulness, gentleness, self-control",
    reference: "Galatians:5:22-23",
    basePrice: 70000,
    shape: "square",
    qty: 9,
    image: "/frames/62.png",
  },
  {
    id: 20,
    key: "fruit-9-frame-4",
    name: "Fruit-of-the-Spirit 9-frame set (4)",
    tags: "peace, love, joy, patience, kindness, goodness, faithfulness, gentleness, self-control",
    reference: "Galations:5:22-23",
    basePrice: 70000,
    shape: "square",
    qty: 9,
    image: "/frames/63.png",
  },

  {
    id: 21,
    key: "fruit-9-frame-5",
    name: "Fruit-of-the-Spirit 9-frame set (5)",
    tags: "peace, love, joy, patience, kindness, goodness, faithfulness, gentleness, self-control",
    reference: "Galations:5:22-23",
    basePrice: 70000,
    shape: "square",
    qty: 9,
    image: "/frames/64.png",
  },
  {
    id: 22,
    key: "fruit-9-frame-5",
    name: "Fruit-of-the-Spirit 9-frame set (5)",
    tags: "peace, love, joy, patience, kindness, goodness, faithfulness, gentleness, self-control",
    reference: "Galations:5:22-23",
    basePrice: 70000,
    shape: "square",
    qty: 9,
    image: "/frames/65.png",
  },
  {
    id: 23,
    key: "fruit-9-frame-6",
    name: "Fruit-of-the-Spirit 9-frame set (6)",
    tags: "peace, love, joy, patience, kindness, goodness, faithfulness, gentleness, self-control",
    reference: "Galations:5:22-23",
    basePrice: 70000,
    shape: "square",
    qty: 9,
    image: "/frames/66.png",
  },
  {
    id: 25,
    key: "abundance-2-frame-set",
    name: "Abundance 2-frame-set",
    tags: "provision, abundance",
    reference: "2 Kings.3:17 x Matthew.6:26-30",
    qty: 2,
    image: "/frames/20.png",
    basePrice: 40000,
  },
  {
    id: 26,
    key: "kiddies-2-frame-1",
    name: "Kiddies 2-frame set (1)",
    tags: "children, peace",
    reference: "1 John.4:4 x Isaiah.54:13",
    image: "/frames/21.png",
    basePrice: 40000,
  },
  {
    id: 27,
    key: "psalms-67-2-frame",
    name: "Psalms 67 2-frame set",
    tags: "blessing, merxcy, favour",
    reference: "Psalms 67:1 x Psalms 67:7",
    image: "/frames/22.png",
    basePrice: 40000,
  },
  {
    id: 28,
    key: "philippians-4-6-7-3-frame",
    name: "Philippians.4:6-7 3-frame set",
    tags: "pray, thanksgiving, peace",
    reference: "Philippians.4:6-7",
    qty: 3,
    image: "/frames/23.png",
    basePrice: 60000,
  },
  {
    id: 29,
    key: "kiddies-2-frame-2",
    name: "Kiddies 2-frame set (2)",
    tags: "children, peace",
    reference: "Daniel.1:17 x Luke.2:40",
    image: "/frames/24.png",
    basePrice: 40000,
  },
  {
    id: 30,
    key: "peace-2-frame-2",
    name: "Peace 2-frame set (2)",
    tags: "peace",
    reference: "John.14:27",
    qty: 2,
    image: "/frames/41.png",
    basePrice: 40000,
  },
  {
    id: 31,
    key: "eve-2-frame",
    name: "EVE 2-frame set",
    tags: "beauty, appreciation, love",
    reference: "Proverbs 31:29 x Psalms.139:14",
    qty: 2,
    image: "/frames/25.jpeg",
    basePrice: 40000,
  },
  {
    id: 32,
    key: "kiddies-2-frame-3",
    name: "Kiddies 2-frame set (3)",
    tags: "children, signs, wonders",
    reference: "1 John.4:4 x Isaiah.8:18",
    image: "/frames/26.jpeg",
    basePrice: 40000,
  },
  {
    id: 33,
    key: "favour-2-frame",
    name: "FAVOUR 2-frame set",
    tags: "favour, waiting, strength",
    reference: "Psalms.5:12 x Isaiah.40:31",
    qty: 2,
    image: "/frames/27.jpeg",
    basePrice: 40000,
  },
  {
    id: 34,
    key: "light-salvation-2-frame",
    name: "Light & Salvation 2-frame set",
    tags: "light, salvation",
    reference: "Psalms.27:1 x Psalms.23:1",
    qty: 2,
    image: "/frames/28.jpeg",
    basePrice: 40000,
  },
  {
    id: 35,
    key: "angels-2-frame",
    name: "Angels 2-frame set",
    tags: "protection, angels, warfare",
    reference: "Isaiah.54:17 x Psalms.91:11",
    qty: 2,
    image: "/frames/29.jpeg",
    basePrice: 40000,
  },
  {
    id: 36,
    key: "psalms-23-4-frame",
    name: "Psalms 23 4-frame set",
    tags: "green pastures, peace, restoration, guidance",
    reference: "Psalms 23:2-4",
    qty: 4,
    image: "/frames/30.jpeg",
    basePrice: 80000,
  },
  {
    id: 37,
    name: "Acknowledge Him",
    tags: "In all your ways acknowledge Him",
    reference: "Proverbs 3:6",
    qty: 2,
    image: "/frames/31.jpeg",
    basePrice: 40000,
  },
  {
    id: 38,
    key: "wealthy-place-2-frame-2",
    name: "Wealthy Place 2-frame set (2)",
    tags: "new beginnings, wealth",
    reference: "Psalms.66:12 x Genesis.1:1",
    qty: 2,
    image: "/frames/32.png",
    basePrice: 40000,
  },
  {
    id: 39,
    key: "angels-2-frame-2",
    name: "Angels 2-frame set (2)",
    tags: "protection, angels, warfare",
    reference: "Isaiah.54:17 x Psalms.91:11",
    qty: 2,
    image: "/frames/33.jpeg",
    basePrice: 40000,
  },
  {
    id: 40,
        key: "blessing-4-frame-3",
    name: "The Blessing 4-frame set (3)",
    tags: "blessing, favour",
    reference: "Numbers.6:24-26",
    qty: 4,
    image: "/frames/43.png",
    basePrice: 80000,
  },
  {
    id: 41,
    key: "elroi-2-frame-3",
    name: "ELROI 2-frame set (3)",
    tags: "elroi, family, service",
    reference: "Genesis.16:13 x Joshua.24:15",
    qty: 2,
    image: "/frames/35.png",
    basePrice: 40000,
  },
  {
    id: 42,
    key: "born-of-god-2-frame-1",
    name: "Born Of God 2-frame set (1)",
    tags: "faith, overcoming, born of God",
    reference: "1 John.5:4",
    qty: 2,
    image: "/frames/18.png",
    basePrice: 40000,
  },
  {
    id: 43,
    key: "born-of-god-2-frame-2",
    name: "Born Of God 2-frame set (2)",
    tags: "faith, overcoming, born of God",
    reference: "1 John.5:4",
    qty: 2,
    image: "/frames/19.png",
    basePrice: 40000,
  },
    {
    id: 44,
    key: "josh-24-15-frame",
    name: "JOSH.24:15 Single Frame",
    tags: "This is just a single frame, please let us know your preference in the checkout form.",
    reference: "Joshua.24:15",
    qty: 1,
    image: "/frames/67.png",
    basePrice: 20000,
  },
];

// const BASE_AREA = 12 * 16;

export function calculatePrice(
  basePrice: number,
  sizeId: SizeId,
  // customWidth?: number,
  // customHeight?: number,
): number {
  // if (sizeId === "custom") {
  //   if (!customWidth || !customHeight) return 0;
  //   const ratePerSqIn = basePrice / BASE_AREA;
  //   // Custom carries a 15% craftsmanship premium
  //   return Math.round(ratePerSqIn * customWidth * customHeight * 1.15);
  // }
  const square = SQUARE_SIZES.find((s) => s.id === sizeId);
  if (square) return square.price;
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
  return PRODUCTS.find((p) => p.key === id);
}
