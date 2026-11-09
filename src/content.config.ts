import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const link = z.object({ label: z.string(), url: z.string() });
// "2024-03" style month, kept as a string so YAML doesn't turn it into a date.
const month = z.string().regex(/^\d{4}-\d{2}$/);

const profile = defineCollection({
  loader: glob({ pattern: "profile.md", base: "./content" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    location: z.string(),
    photo: z.string(),
    cv: z.string(),
    tagline: z.string(),
    summary: z.string(),
    marquee: z.array(z.string()),
    interests: z.array(z.string()),
    languages: z.array(z.string()),
    softSkills: z.array(z.string()),
    skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
    education: z.array(
      z.object({ degree: z.string(), school: z.string(), place: z.string(), period: z.string() }),
    ),
    links: z.array(link.extend({ value: z.string() })),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/experience" }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    start: month,
    end: z.union([month, z.literal("present")]),
    type: z.enum(["work", "organization"]).default("work"),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/projects" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    year: z.coerce.number().optional(),
    /** Lower comes first on the projects page; unset projects sort by year. */
    order: z.number().optional(),
    summary: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    links: z.array(link).default([]),
    /** e.g. PoC, Production. */
    status: z.string().optional(),
    /** For projects split across several repositories. */
    repos: z
      .array(
        z.object({
          name: z.string(),
          role: z.string(),
          url: z.string().optional(),
          private: z.boolean().default(false),
        }),
      )
      .default([]),
    paper: z.string().optional(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/publications" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    venue: z.string(),
    venueFull: z.string(),
    date: z.coerce.date(),
    authorship: z.string(),
    authors: z.array(z.string()),
    citation: z.string(),
    links: z.array(link).default([]),
    project: z.string().optional(),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/talks" }),
  schema: z.object({
    title: z.string(),
    type: z.string(),
    venue: z.string(),
    date: z.coerce.date(),
    location: z.string(),
  }),
});

const teaching = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/teaching" }),
  schema: z.object({
    title: z.string(),
    type: z.string(),
    venue: z.string(),
    period: z.string(),
    date: z.coerce.date(),
    location: z.string(),
  }),
});

export const collections = { profile, experience, projects, publications, talks, teaching };
