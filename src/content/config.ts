import { glob } from "astro/loaders";
import { z, reference, defineCollection } from "astro:content";

const releases = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/releases",
  }),
  schema: () =>
    z.object({
      slug: z.string(),
      title: z.string().min(1),
      artist: z.string().min(1),
      artistLink: z.string().url().optional(),
      releaseDate: z.coerce.date(),
      cover: z
        .string()
        .regex(/^\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i)
        .optional(), // allow relative URLs like /hello/world.jpg
      gallery: z
        .array(z.string().regex(/^\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i))
        .optional(), // allow relative URLs

      description: z.string().min(1),
      credits: z.string().optional(),
      masteredBy: z.string().optional(),
      label: z.string().optional(),

      genre: z.array(z.string()).default([]),
      format: z
        .enum(["vinyl", "digital", "cassette", "CD", "other"])
        .default("digital"),
      isDraft: z.boolean().default(false),
      isUpcoming: z.boolean().default(false),

      pressKitLink: z.string().url().optional(),
      recordPageLink: z.string().url().optional(),

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
      relatedReleases: z.array(reference("releases")).optional(),
      createdAt: z.coerce.date().default(() => new Date()),
      updatedAt: z.coerce.date().optional(),
    }),
});

export const collections = { releases };
