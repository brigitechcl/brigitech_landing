import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const productos = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/productos" }),
  schema: z.object({
    nombre: z.string().trim().min(1),
    resumen: z.string().trim().min(1),
    categoria: z.string().trim().min(1),
    caracteristicas: z.array(z.string().trim().min(1)).min(1).max(5),
    icono: z.enum(["layers", "bag", "phone", "connect", "code", "support"]).default("layers"),
    imagen: z.object({
      src: z.string().regex(/^\/(?!\/)/, "Usa una ruta local desde public/, por ejemplo /productos/imagen.webp"),
      alt: z.string().trim().min(1),
    }).optional(),
    enlace: z.string().refine(
      (value) => /^\/(?!\/)/.test(value) || URL.canParse(value) && ["https:", "http:"].includes(new URL(value).protocol),
      "Usa una ruta interna o una URL http/https",
    ).optional(),
    estado: z.enum(["Disponible", "En desarrollo", "Próximamente"]).default("Próximamente"),
    orden: z.number().int().nonnegative().default(100),
    ejemplo: z.boolean().default(false),
    borrador: z.boolean().default(false),
  }),
});

export const collections = { productos };
