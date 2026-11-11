import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const productImage = z.object({
  src: z.string().regex(/^\/(?!\/)/, "Use a local public/ path, for example /products/image.webp"),
  alt: z.string().trim().min(1),
});

const productUrl = z.string().refine(
  (value) => /^\/(?!\/)/.test(value) || URL.canParse(value) && ["https:", "http:"].includes(new URL(value).protocol),
  "Use an internal path or an HTTP/HTTPS URL",
);

const products = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/products" }),
  schema: z.object({
    name: z.string().trim().min(1),
    summary: z.string().trim().min(1),
    category: z.string().trim().min(1),
    features: z.array(z.string().trim().min(1)).min(1).max(5),
    backgroundImage: productImage.nullish(),
    iconImage: productImage.nullish(),
    link: z.string().refine(
      (value) => /^\/(?!\/)/.test(value) || URL.canParse(value) && ["https:", "http:"].includes(new URL(value).protocol),
      "Use an internal path or an HTTP/HTTPS URL",
    ).optional(),
    version: z.string().trim().min(1).optional(),
    requiresLicense: z.boolean().default(false),
    downloadUrl: productUrl.optional(),
    downloads: z.array(z.object({
      label: z.string().trim().min(1),
      url: productUrl,
    })).optional(),
    status: z.enum(["available", "in-development", "coming-soon"]).default("coming-soon"),
    order: z.number().int().nonnegative().default(100),
    example: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { products };
