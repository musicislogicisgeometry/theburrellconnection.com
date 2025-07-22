import { glob } from "astro/loaders";
import { z, reference, defineCollection } from "astro:content";

const articles = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/articles",
  }),
  schema: ({ image }) =>
    z.object({
      cover: image().optional(),
      coverAlt: z.string(),
      title: z.string(),
      slug: z.string(),
      snippet: z.string(),
      category: z.string(),
      pubDate: z.coerce.date(),
      isDraft: z.boolean().default(false),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default("Retro Rocket Team"),
      relatedArticles: z.array(reference("articles")).optional(),
    }),
});

const releases = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/releases",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      artist: z.string().min(1),
      releaseDate: z.coerce.date(),
      cover: image(),
      gallery: z.array(image()).optional(), // additional artwork or press shots

      description: z.string().min(10), // long-form description
      credits: z.string().optional(), // liner notes
      masteredBy: z.string().optional(),
      label: z.string().optional(),

      genre: z.array(z.string()).default([]),
      format: z
        .enum(["vinyl", "digital", "cassette", "CD", "other"])
        .default("digital"),
      isDraft: z.boolean().default(false),
      isUpcoming: z.boolean().default(false), // future release flag

      pressKitLink: z.string().url().optional(), // for press materials
      recordPageLink: z.string().url().optional(), // label catalog page, etc.

      links: z
        .object({
          bandcamp: z.string().url().optional(),
          spotify: z.string().url().optional(),
          soundcloud: z.string().url().optional(),
          appleMusic: z.string().url().optional(),
          youtube: z.string().url().optional(),
          tidal: z.string().url().optional(),
          discogs: z.string().url().optional(),
        })
        .default({}),

      tags: z.array(z.string()).optional(),
      relatedReleases: z.array(reference("releases")).optional(), // cross-link to other releases
      createdAt: z.coerce.date().default(() => new Date()), // creation timestamp
      updatedAt: z.coerce.date().optional(), // manually settable
    }),
});

export const collections = { articles };
