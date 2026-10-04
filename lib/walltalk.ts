/**
 * Walltalk Design Studio — editable business configuration and site data.
 * All business details below are placeholders and can be updated here in one place.
 */
import heroImg from "../public/walltalk/hero.jpg";
import catVision from "../public/walltalk/cat-vision.jpg";
import catGratitude from "../public/walltalk/cat-gratitude.jpg";
import catFamily from "../public/walltalk/cat-family.jpg";
import catFaith from "../public/walltalk/cat-faith.jpg";
import catLove from "../public/walltalk/cat-love.jpg";
import afterImg from "../public/walltalk/after.jpg";
import livingRoom1 from "../public/living-room-1.jpg";
import livingRoom2 from "../public/living-room-2.jpg";
import bedroom1 from "../public/bedroom-1.jpg";
import bedroom2 from "../public/bedroom-2.jpg";
import dining1 from "../public/dining-1.jpg";
import hallway1 from "../public/hallway-1.jpg";
import stairway1 from "../public/stairway-1.jpg";
import kitchen1 from "../public/kitchen-1.jpg";
import kitchen2 from "../public/kitchen-2.jpg";
import { StaticImageData } from "next/image";

// ── Business configuration (edit these values; do not hardcode elsewhere) ──
export const WT_CONFIG = {
  consultationFee: 50000, // ₦ — consultation fee
  launchDiscountPercent: 50, // Launch offer discount (%)
  launchSlots: 3, // Number of discounted launch slots
  quotationValidityDays: 14, // Quotation validity period (days)
  depositPercent: 70, // Deposit required before production begins (%)
  // TODO: replace with the studio's real contact details
  phone: "+234 800 000 0000",
  whatsappNumber: "2348000000000",
  email: "hello@walltalkdesignstudio.com",
  instagram: "@walltalkdesignstudio",
  // Editable policy copy:
  timelinePolicy:
    "Project timelines are confirmed in your design proposal and depend on the number of walls or rooms, frame production and installation scope.",
  refundPolicy:
    "Consultation fee refund terms will be confirmed in writing before payment. Please ask about this during your discovery call.",
  creditPolicy:
    "The consultation fee covers the consultation and assessment stage. Project design, frame production, materials and installation are quoted separately where applicable. Whether the consultation fee may be credited toward your project will be confirmed in your design proposal.",
};

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

// ── Hero ──
export const HERO = {
  image: heroImg,
  headline: ["Your home already has a story.", "Let's put it on your walls."],
  sub: "Premium wall styling and gallery design for homes and spaces in Abuja.",
  body: "Walltalk Design Studio curates photographs, memories, artwork, quotes, scriptures and meaningful pieces — and transforms them into beautifully composed wall displays.",
  primaryCta: "Book a Consultation",
  secondaryCta: "Explore Our Gallery Wall Styles",
};

// ── Services ──
export interface Service {
  id: "gallery" | "home";
  name: string;
  description: string;
  suited: string[];
  cta: string;
  image: StaticImageData;
}

export const SERVICES: Service[] = [
  {
    id: "gallery",
    name: "Gallery Wall Design",
    description:
      "A professionally designed collection of frames arranged around a specific wall, room or theme. You choose the wall and the story; we develop a cohesive gallery-wall concept around it.",
    suited: [
      "Living rooms",
      "Bedrooms",
      "Stairways",
      "Hallways",
      "Studies",
      "Libraries",
      "Prayer corners",
      "Dining areas",
      "Offices",
      "Other feature walls",
    ],
    cta: "Design My Gallery Wall",
    image: catVision,
  },
  {
    id: "home",
    name: "Whole-Home Frame Styling",
    description:
      "A comprehensive framing and wall-styling service for clients who want their entire home considered as one cohesive visual story. We assess multiple rooms and walls, understand your preferences, curate appropriate frame concepts and create a coordinated framing plan throughout the home.",
    suited: [
      "New homes",
      "Newly renovated homes",
      "Homeowners wanting a complete transformation",
      "Clients who want consistency across multiple rooms",
    ],
    cta: "Style My Home",
    image: catFamily,
  },
];

// ── Gallery wall categories ──
export interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  contents: string[];
  rooms: string[];
  image: StaticImageData;
  featured?: boolean;
}

const CATEGORY_IMAGES = [
  catVision, catGratitude, catFamily, catFaith, catLove,
  afterImg, livingRoom2, bedroom2, hallway1, stairway1,
  dining1, kitchen1, livingRoom1, bedroom1, kitchen2,
];

function categoryImage(index: number): StaticImageData {
  return CATEGORY_IMAGES[index % CATEGORY_IMAGES.length];
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: "personal-vision", name: "Personal Vision Wall", featured: true,
    description: "A collection representing your aspirations, goals, dreams, values and the person you are becoming.",
    contents: ["Vision statements", "Personal goals", "Inspirational photographs", "Quotes", "Scriptures", "Words representing desired qualities"],
    rooms: ["Study", "Home Office", "Bedroom", "Entryway"],
  },
  {
    id: "gratitude", name: "Gratitude Wall", featured: true,
    description: "A celebration of the things, people and moments you are grateful for.",
    contents: ["Family photographs", "Answered-prayer memories", "Milestones", "Celebrations", "Meaningful quotes", "Gratitude statements", "Scriptures about thanksgiving"],
    rooms: ["Dining Room", "Living Room", "Hallway"],
  },
  {
    id: "family-legacy", name: "Family Legacy Wall", featured: true,
    description: "A visual representation of family history, relationships and generations.",
    contents: ["Parents", "Grandparents", "Children", "Family portraits", "Wedding photographs", "Family names & dates", "Scriptures about generations"],
    rooms: ["Stairway", "Hallway", "Living Room"],
  },
  {
    id: "faith", name: "Faith Wall", featured: true,
    description: "A meaningful Christian-focused gallery for your home.",
    contents: ["Favourite scriptures", "Prayer declarations", "Christian artwork", "Faith statements", "Family declarations", "Worship-inspired artwork"],
    rooms: ["Prayer Corner", "Living Room", "Bedroom"],
  },
  {
    id: "love-story", name: "Love Story Wall", featured: true,
    description: "A visual timeline of a couple's relationship, told frame by frame.",
    contents: ["First photograph together", "Proposal", "Engagement", "Wedding", "Honeymoon", "Favourite quotes", "Wedding vows", "Marriage scriptures"],
    rooms: ["Living Room", "Bedroom", "Hallway"],
  },
  { id: "family-tree", name: "Family Tree Wall", description: "Generations arranged like branches — a lineage you can see at a glance.", contents: ["Grandparents", "Parents", "Children", "Family names", "Important dates"], rooms: ["Hallway", "Stairway", "Living Room"] },
  { id: "prayer", name: "Prayer Wall", description: "A quiet, reverent gallery built around prayer and devotion.", contents: ["Scriptures", "Prayer declarations", "Calm artwork", "Words for the season"], rooms: ["Prayer Corner", "Bedroom", "Study"] },
  { id: "wedding-memories", name: "Wedding Memories Wall", description: "The day itself, retold across a considered composition of frames.", contents: ["Wedding photographs", "Vows", "Invitations", "Dates & venues"], rooms: ["Living Room", "Bedroom", "Stairway"] },
  { id: "childrens-growth", name: "Children's Growth Wall", description: "Milestones and portraits that grow with your children, year by year.", contents: ["Newborn photographs", "Birthdays", "First words", "Handprints", "Milestones"], rooms: ["Children's Room", "Hallway", "Stairway"] },
  { id: "friendship", name: "Friendship Wall", description: "The people who make life richer — gathered in one place.", contents: ["Friendship photographs", "Quotes", "Shared memories", "Celebrations"], rooms: ["Living Room", "Study", "Dining Room"] },
  { id: "travel-adventure", name: "Travel & Adventure Wall", description: "Journeys, places and moments that shaped how you see the world.", contents: ["Travel photographs", "Maps", "Tickets", "Postcards", "Quotes"], rooms: ["Hallway", "Study", "Living Room"] },
  { id: "achievement", name: "Achievement / Milestone Wall", description: "Degrees, awards and milestones — displayed with intention.", contents: ["Certificates", "Awards", "Milestone photographs", "Accomplishment quotes"], rooms: ["Study", "Home Office", "Entryway"] },
  { id: "new-home", name: "New Home Wall", description: "Marking the beginning — a wall that grows with your new home.", contents: ["First photographs in the home", "Keys & dates", "House blessing scriptures", "Family portraits"], rooms: ["Entryway", "Living Room", "Hallway"] },
  { id: "motherhood", name: "Motherhood Wall", description: "A tender, personal gallery celebrating motherhood.", contents: ["Mother & child photographs", "Poems", "Scriptures", "Milestones"], rooms: ["Bedroom", "Children's Room", "Hallway"] },
  { id: "fatherhood", name: "Fatherhood Wall", description: "Strength, guidance and legacy — framed for the family to see.", contents: ["Father & child photographs", "Quotes", "Legacy statements", "Scriptures"], rooms: ["Study", "Living Room", "Hallway"] },
  { id: "memorial", name: "Memorial & Remembrance Wall", description: "A dignified, gentle tribute to loved ones who are remembered.", contents: ["Portraits", "Memorial dates", "Meaningful scriptures", "Handwritten notes"], rooms: ["Hallway", "Bedroom", "Prayer Corner"] },
  { id: "personal-identity", name: "Personal Identity Wall", description: "Who you are — your tastes, values and story, curated on one wall.", contents: ["Portraits", "Personal statements", "Favourite quotes", "Monochrome artwork"], rooms: ["Bedroom", "Study", "Entryway"] },
  { id: "library", name: "Book Lover's / Library Wall", description: "Literary prints and words for rooms built around reading.", contents: ["Book covers & prints", "Literary quotes", "Author portraits", "Illustrations"], rooms: ["Library", "Study", "Living Room"] },
  { id: "inspiration", name: "Inspiration & Motivation Wall", description: "Daily drive, placed where you will see it every morning.", contents: ["Motivational quotes", "Goal statements", "Role models", "Abstract artwork"], rooms: ["Home Office", "Study", "Gym/Corner"] },
  { id: "peace-wellness", name: "Peace & Wellness Wall", description: "A calm, restorative composition for slower spaces.", contents: ["Botanical prints", "Calm scriptures", "Landscape photography", "Gentle words"], rooms: ["Bedroom", "Prayer Corner", "Bathroom"] },
  { id: "culture-heritage", name: "Culture & Heritage Wall", description: "Roots and heritage, honoured in a rich visual story.", contents: ["Cultural artefacts (framed)", "Heritage textiles", "Family history", "Proverbs"], rooms: ["Living Room", "Dining Room", "Entryway"] },
  { id: "founder", name: "Founder / Entrepreneur Wall", description: "The journey of building — vision, grit and milestones.", contents: ["Vision statements", "Business milestones", "Press & features", "Motivational quotes"], rooms: ["Home Office", "Study", "Office"] },
  { id: "team-culture", name: "Team & Company Culture Wall", description: "People, values and milestones — for offices and professional spaces.", contents: ["Team photographs", "Company values", "Milestones", "Client stories"], rooms: ["Office", "Reception", "Corridor"] },
  { id: "childrens-learning", name: "Children's Learning Wall", description: "Artwork, alphabets and achievements that encourage growing minds.", contents: ["Children's artwork", "Alphabet prints", "Achievements", "Learning charts"], rooms: ["Children's Room", "Playroom", "Hallway"] },
  { id: "seasonal", name: "Seasonal & Celebration Wall", description: "Birthdays, Christmas, naming ceremonies — celebrations worth keeping.", contents: ["Celebration photographs", "Cards", "Dates", "Festive artwork"], rooms: ["Living Room", "Dining Room", "Hallway"] },
].map((c, i) => ({ ...c, image: (c as { image?: StaticImageData }).image ?? categoryImage(i) }));

// ── Who is this for ──
export const WHO_FOR = [
  { title: "Homeowners", body: "People who want to transform blank or underutilised walls." },
  { title: "New Homeowners", body: "People moving into a new home who want their walls thoughtfully planned from the beginning." },
  { title: "Families", body: "Families who want to display memories, loved ones and their story." },
  { title: "Couples", body: "Couples who want to turn their relationship and memories into a meaningful wall." },
  { title: "Christian Homes", body: "Clients who want scriptures, faith declarations and Christian artwork incorporated beautifully into their homes." },
  { title: "Professionals & Business Owners", body: "People who want sophisticated wall displays in offices, studies and professional spaces." },
  { title: "People With Beautiful Memories", body: "People with photographs and memories sitting on their phones who want to finally bring them into their physical spaces." },
];

// ── How it works ──
export const HOW_IT_WORKS = [
  {
    step: 1, title: "Book Your Consultation",
    body: "Complete the consultation form and pay the consultation fee.",
  },
  {
    step: 2, title: "Discovery Call",
    body: "Our team schedules a call with you to understand your vision, preferences, space, desired outcome and project requirements.",
  },
  {
    step: 3, title: "In-Person Space Assessment",
    body: "We visit your Abuja address — examining the space, taking measurements, understanding wall dimensions, discussing preferences, reviewing your photographs and materials, and considering your existing interior aesthetic.",
  },
  {
    step: 4, title: "Design Proposal",
    body: "A tailored design proposal and project quotation will be presented for your review and approval — proposed gallery arrangement, frame sizes, number of frames, recommended content and placement, overall design direction and quotation.",
  },
  {
    step: 5, title: "Approval & Project Commencement",
    body: "Once you approve the proposal and quotation, a 70% project deposit is required before production begins. The remaining balance is payable according to the agreed project terms.",
  },
];

export const QUOTATION_NOTE =
  "Approved project quotations are valid for 14 days from the date of issuance. A 70% deposit must be received within this period to secure the quoted pricing and project slot. Pricing may be reviewed after the quotation validity period.";

// ── Consultation explanation ──
export const CONSULTATION_STEPS = [
  { n: 1, title: "Discovery Call", body: "We discuss what you want to achieve." },
  { n: 2, title: "Physical Site Assessment", body: "We visit your Abuja location." },
  { n: 3, title: "Measurements & Space Assessment", body: "We measure the relevant walls and assess the available space." },
  { n: 4, title: "Creative Direction", body: "We discuss colours, frame styles, photographs, artwork, themes and desired mood." },
  { n: 5, title: "Design Planning", body: "We translate everything gathered into a tailored wall-styling concept." },
  { n: 6, title: "Proposal & Quotation", body: "You receive the proposed design and project quotation for approval." },
];

// ── Problem section ──
export const PROBLEMS = [
  "A blank wall that feels unfinished",
  "One or two frames placed without a cohesive arrangement",
  "Several unrelated frames scattered around the home",
  "Beautiful memories sitting inside phones instead of being displayed",
  "Meaningful artwork or scriptures with no clear place or arrangement",
  "New homes where the walls have not yet been intentionally styled",
];

export const PROBLEM_QUESTIONS = [
  "What belongs on the wall?",
  "How many pieces should there be?",
  "What sizes should they be?",
  "How should they be arranged?",
  "Where should everything go?",
];

// ── What we do ──
export const CAPABILITIES = [
  "Creative direction",
  "Wall styling",
  "Frame selection",
  "Artwork/photo curation",
  "Layout composition",
  "Space consideration",
  "Measurements",
  "Professional design planning",
  "Frame production",
  "Optional installation",
];

// ── Why Walltalk ──
export const WHY_WALLTALK = [
  { title: "Personal", body: "Every project reflects the client's story and preferences." },
  { title: "Intentional", body: "We consider wall dimensions, proportions, spacing, frame sizes and the existing aesthetic." },
  { title: "Creative", body: "We combine photography, art, Scripture, words and meaningful objects into cohesive visual stories." },
  { title: "Professional", body: "From consultation and measurement through design, production and installation, the process is structured and professionally managed." },
  { title: "Meaningful", body: "Your walls can hold more than decoration. They can hold memories, values, faith and milestones." },
];

// ── Portfolio ──
export const PORTFOLIO = [
  { image: livingRoom1, label: "Living Room", caption: "Salon-style feature wall above a media console" },
  { image: catFamily, label: "Stairway", caption: "A family timeline climbing the staircase wall" },
  { image: bedroom1, label: "Bedroom", caption: "A calm, personal pairing above the bed" },
  { image: catFaith, label: "Faith", caption: "A prayer corner with a scripture gallery" },
  { image: dining1, label: "Family", caption: "A gratitude wall in the dining room" },
  { image: hallway1, label: "Whole Home", caption: "A hallway memory gallery connecting rooms" },
  { image: kitchen1, label: "Office", caption: "An inspiration wall for the home office" },
  { image: stairway1, label: "Stairway", caption: "An editorial stairway composition" },
  { image: livingRoom2, label: "Living Room", caption: "An asymmetric gallery over a lounge sofa" },
];

// ── Before & after ──
export const BEFORE_AFTER_TRANSFORMATIONS = [
  "Blank wall → Gallery wall",
  "Scattered frames → Cohesive composition",
  "Empty hallway → Memory gallery",
  "Bare staircase → Family timeline",
  "Plain prayer corner → Faith gallery",
];

// ── FAQ ──
export const FAQS = [
  { q: "Do you only design gallery walls?", a: "No. Walltalk Design Studio offers both gallery wall design and whole-home frame styling." },
  { q: "Do I need to already have photographs?", a: "No. We can work with photographs and materials you already have, or help you determine what would work best for your project." },
  { q: "Can I use scriptures and quotes?", a: "Yes. Faith-based pieces, scriptures and meaningful quotes can be incorporated into your gallery design." },
  { q: "Do you provide the frames?", a: "Yes, we do. Walltalk Design Studio can provide the frames required for the project." },
  { q: "Do you install the frames?", a: "Yes, we offer neat and professional installation services." },
  { q: "Do you work outside Abuja?", a: "Yes, we do. Please send us a message before going ahead to book." },
  { q: "Can I style just one wall?", a: "Yes. Gallery Wall Design is specifically designed for individual walls or selected walls." },
  { q: "Can you style my entire house?", a: "Yes. Choose Whole-Home Frame Styling during consultation." },
  { q: "How long does a project take?", a: WT_CONFIG.timelinePolicy },
  { q: "Is the consultation fee refundable?", a: WT_CONFIG.refundPolicy },
  { q: "What happens after I pay for the consultation?", a: "After payment: a discovery call, a physical site assessment, then a design proposal and quotation. Once you approve, a 70% deposit secures your project slot and production begins — with the balance payable per the agreed terms." },
];

// ── Booking form options ──
export const GALLERY_WALL_OPTIONS = ["1", "2", "3", "4+", "Not sure yet"];

export const GALLERY_ROOM_OPTIONS = [
  "Living Room", "Bedroom", "Dining Room", "Stairway", "Hallway", "Study",
  "Library", "Prayer Corner", "Home Office", "Children's Room", "Entryway", "Other",
];

export const GALLERY_CONTENT_OPTIONS = [
  "Family photographs", "Couple photographs", "Children's photographs", "Travel photographs",
  "Artwork", "Scriptures", "Quotes", "Personal achievements", "Certificates", "Family history",
  "Illustrations", "Other",
];

export const HOME_ROOM_OPTIONS = ["1–3", "4–6", "7–10", "10+"];
export const HOME_FLOOR_OPTIONS = ["1", "2", "3", "4+"];

export const HOME_SPACE_OPTIONS = [
  "Living Room", "Bedrooms", "Dining Room", "Stairway", "Hallways", "Study",
  "Library", "Prayer Room/Corner", "Home Office", "Children's Rooms", "Entryway", "Other",
];

export const HOME_STATUS_OPTIONS = [
  "New Home / Moving In", "Recently Renovated", "Existing Home", "Still Under Construction", "Other",
];

export const HOME_CONTENT_OPTIONS = [
  "Family photographs", "Artwork", "Scriptures", "Quotes", "Memories", "Family history", "Achievements", "Other",
];

export const BUDGET_OPTIONS = [
  "Not sure yet", "Under ₦250,000", "₦250,000–₦500,000", "₦500,000–₦1,000,000",
  "₦1,000,000+", "I'd prefer to discuss this during consultation",
];

export const HEARD_OPTIONS = ["Instagram", "WhatsApp", "A friend or referral", "Google search", "Other"];

export const THEME_OPTIONS = [
  ...GALLERY_CATEGORIES.map((c) => c.name),
  "Custom / I have another idea",
];
