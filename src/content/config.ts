import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

export const linkNames = {
  bandcamp: "Bandcamp",
  spotify: "Spotify",
  soundcloud: "SoundCloud",
  appleMusic: "Apple Music",
  youtube: "YouTube",
  tidal: "Tidal",
  discogs: "Discogs",
};

const pages = defineCollection({
  schema: z.object({
    // title: z.string(),
    // date: z.string().optional(),
  }),
});

const releases = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/releases",
  }),
  schema: () =>
    z.object({
      // slug: z.string(),
      title: z.string().min(1),
      artist: z.string().min(1),
      artistLink: z.string().optional(),
      otherArtists: z.array(z.string()).default([]),
      releaseDate: z.coerce.date(),

      cover: z
        .string()
        .regex(/^\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i)
        .optional(), // allow relative URLs like /hello/world.jpg
      gallery: z
        .array(z.string().regex(/^\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i))
        .optional(), // allow relative URLs

      credits: z.string().optional(),
      masteredBy: z.string().optional(),
      label: z.string().optional(),
      labelLink: z.string().url().optional(),

      genre: z.array(z.string()).default([]),
      format: z
        .enum(["vinyl", "digital", "cassette", "CD", "other"])
        .default("digital"),
      isDraft: z.boolean().default(false),
      isUpcoming: z.boolean().default(false),

      pressKitLink: z.string().url().optional(),

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
    }),
});

const mixes = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./src/content/mixes",
  }),
  schema: () =>
    z.object({
      title: z.string().min(1),
      dj: z.string().min(1),
      djLink: z.string().url().optional(),
      otherDJs: z.array(z.string()).default([]),

      date: z.coerce.date(),

      cover: z
        .string()
        .regex(/^\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i)
        .optional(),

      event: z.string().optional(),
      eventLink: z.string().url().optional(),

      venue: z.string().optional(),
      location: z.string().optional(),

      isDraft: z.boolean().default(false),
      isUpcoming: z.boolean().default(false),

      link: z.string().url().optional(),
    }),
});

export const collections = { pages, releases, mixes };
