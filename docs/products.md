# Adding products to the catalog

The `/products/` page is generated from `src/content/products/`.
Each product has its own JSON file; no page or card changes are required.
Code identifiers, file names, and documentation use English. Customer-facing copy remains in Spanish.
The previous `/productos/` URL redirects to `/products/`.

## Create a product

1. Create `src/content/products/product-name.json` with a unique file name.
2. Copy this structure and replace the values:

```json
{
  "name": "Nombre del producto",
  "summary": "Descripción breve de lo que hace y a quién ayuda.",
  "category": "Gestión empresarial",
  "features": ["Primera característica", "Segunda característica"],
  "backgroundImage": null,
  "iconImage": null,
  "status": "available",
  "order": 4,
  "example": false,
  "draft": false
}
```

3. Run `npm run build` to validate the content and generate the catalog. Redeploy the site to publish your changes.

Filters and the counter update automatically. Categories come from published products; use the same category text to group products together.

## Fields

| Field | Purpose |
| --- | --- |
| `name`, `summary`, `category` | Required, non-empty display text. |
| `features` | Between 1 and 5 non-empty feature descriptions. |
| `backgroundImage` | Optional image object with a local `src` and non-empty `alt`. Fills the preview area with `object-fit: cover`. Omit or set to `null` to leave it empty. |
| `iconImage` | Optional image object with a local `src` and non-empty `alt`. Displayed centered at 64 × 64 pixels with `object-fit: contain`. Omit or set to `null` to leave it empty. |
| `status` | `available`, `in-development`, or `coming-soon`. Defaults to `coming-soon`. Displayed as «Disponible», «En desarrollo», or «Próximamente». |
| `order` | Non-negative integer; lower values appear first. Defaults to 100. Ties are sorted by name. |
| `example` | Defaults to `false`. When `true`, displays «Producto de ejemplo» instead of the status and adds a notice to the catalog. |
| `draft` | Defaults to `false`. When `true`, hides the product in both development and production. |
| `link` | Optional existing internal route or HTTP/HTTPS URL for a product page, demo, or website. If omitted, the button opens an email with the product name in the subject. |

## Background and icon images

Save your files in `public/products/` and reference them independently:

```json
{
  "name": "Nombre del producto",
  "summary": "Descripción breve del producto.",
  "category": "Gestión empresarial",
  "features": ["Primera característica"],
  "backgroundImage": {
    "src": "/products/product-background.webp",
    "alt": "Vista del panel principal del producto"
  },
  "iconImage": {
    "src": "/products/product-icon.png",
    "alt": "Logo del producto"
  },
  "link": "https://example.com",
  "status": "available"
}
```

You can provide only a background, only an icon, both, or neither. Missing images produce no image elements, placeholders, generated icons, gradients, patterns, or decorative effects. The preview keeps its layout space, and the rest of the card remains unchanged.

The catalog does not generate product detail pages automatically. Create an internal page before linking to it.

## Included examples

`inventory-management.json`, `online-store.json`, and `reservation-calendar.json` are illustrative samples, not real products. Replace their content or set `draft: true` to hide them. When publishing real products, set `example` to `false` and choose their status.

## Technical structure

- `src/content.config.ts`: Astro collection schema and data validation.
- `src/content/products/`: individual product JSON files.
- `src/components/ProductCard.astro`: reusable product card.
- `src/pages/products.astro`: listing, accent-insensitive search, filters, and empty states.

The list remains usable without JavaScript; interactive controls appear only when available. Animations respect the user's reduced-motion preference.
