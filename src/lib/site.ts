import { getCollection, getEntry } from "astro:content";

export type Color = "yellow" | "pink" | "lilac" | "sky" | "lime" | "orange" | "mint";

// The deck: every section of the site, in the order you flip through them.
export const DECK = [
  { slug: "about", title: "About", color: "lilac", blurb: "Who I am, where I studied, what I care about." },
  { slug: "experience", title: "Experience", color: "sky", blurb: "Where I've worked and what I did there." },
  { slug: "projects", title: "Projects", color: "lime", blurb: "Models, tools, and apps I've built." },
  { slug: "research", title: "Research", color: "orange", blurb: "Papers on brain MRI segmentation." },
  { slug: "teaching", title: "Teaching & Talks", color: "mint", blurb: "Classes I've assisted and talks I've given." },
  { slug: "skills", title: "Skills", color: "pink", blurb: "The tools and languages I reach for." },
  { slug: "contact", title: "Contact", color: "yellow", blurb: "Say hi — or grab my CV." },
] as const satisfies readonly { slug: string; title: string; color: Color; blurb: string }[];

export type DeckSlug = (typeof DECK)[number]["slug"];

export function deckPosition(slug: DeckSlug) {
  const i = DECK.findIndex((d) => d.slug === slug);
  return {
    card: DECK[i],
    number: pad(i + 1),
    total: pad(DECK.length),
    prev: i > 0 ? { ...DECK[i - 1], number: pad(i) } : undefined,
    next: i < DECK.length - 1 ? { ...DECK[i + 1], number: pad(i + 2) } : undefined,
  };
}

export const pad = (n: number) => String(n).padStart(2, "0");

const CATEGORY_COLORS: Record<string, Color> = {
  LLM: "pink",
  Backend: "sky",
  "Computer Vision": "mint",
  "Medical Imaging": "lilac",
  NLP: "orange",
  Speech: "orange",
  Data: "sky",
  Web: "yellow",
};
const FALLBACK: Color[] = ["lime", "sky", "pink", "orange", "mint", "lilac", "yellow"];

export function categoryColor(category: string): Color {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  const hash = [...category].reduce((h, c) => h + c.charCodeAt(0), 0);
  return FALLBACK[hash % FALLBACK.length];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(value: string) {
  if (value === "present") return "Present";
  const [y, m] = value.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

export function formatDate(date: Date) {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

export async function getProfile() {
  const entry = await getEntry("profile", "profile");
  if (!entry) throw new Error("content/profile.md is missing");
  return entry;
}

// Newest first; ongoing roles sort above everything.
export async function getExperience(type: "work" | "organization") {
  const all = await getCollection("experience", (e) => e.data.type === type);
  const key = (e: (typeof all)[number]) => (e.data.end === "present" ? "9999" : e.data.end) + e.data.start;
  return all.sort((a, b) => key(b).localeCompare(key(a)));
}

export async function getProjects() {
  const all = await getCollection("projects");
  const order = (p: (typeof all)[number]) => p.data.order ?? Infinity;
  return all.sort(
    (a, b) =>
      order(a) - order(b) ||
      (b.data.year ?? 0) - (a.data.year ?? 0) ||
      Number(b.data.featured) - Number(a.data.featured),
  );
}

export async function getPublications() {
  const all = await getCollection("publications");
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getTalks() {
  const all = await getCollection("talks");
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getTeaching() {
  const all = await getCollection("teaching");
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
