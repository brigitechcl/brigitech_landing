# Añadir productos al catálogo

La página `/products/` se genera a partir de `src/content/products/`.
Cada producto tiene su propio archivo JSON; no es necesario modificar la página ni las tarjetas.
Los identificadores del código y los nombres de archivo se mantienen en inglés. Esta documentación y los textos dirigidos a los clientes están en español.
La URL anterior, `/productos/`, redirige a `/products/`.

## Crear un producto

1. Crea `src/content/products/product-name.json` con un nombre de archivo único.
2. Copia esta estructura y sustituye los valores:

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

3. Ejecuta `npm run build` para validar el contenido y generar el catálogo. Vuelve a desplegar el sitio para publicar los cambios.

Los filtros y el contador se actualizan automáticamente. Las categorías se obtienen de los productos publicados; utiliza el mismo texto de categoría para agrupar productos.

## Campos

| Campo | Función |
| --- | --- |
| `name`, `summary`, `category` | Textos visibles obligatorios que no pueden estar vacíos. |
| `features` | Entre 1 y 5 descripciones de características, ninguna vacía. |
| `backgroundImage` | Objeto de imagen opcional con un `src` local y un `alt` no vacío. Rellena el área de vista previa mediante `object-fit: cover`. Omítelo o usa `null` para dejarla vacía. |
| `iconImage` | Objeto de imagen opcional con un `src` local y un `alt` no vacío. Se muestra centrado a 64 × 64 píxeles con `object-fit: contain`. Omítelo o usa `null` para dejarlo vacío. |
| `status` | Acepta `available`, `in-development` o `coming-soon`. El valor predeterminado es `coming-soon`. Se muestra como «Disponible», «En desarrollo» o «Próximamente». |
| `order` | Número entero no negativo; los valores menores aparecen primero. El valor predeterminado es 100. En caso de empate, se ordenan por nombre. |
| `example` | El valor predeterminado es `false`. Si es `true`, muestra «Producto de ejemplo» en lugar del estado y añade un aviso al catálogo. |
| `draft` | El valor predeterminado es `false`. Si es `true`, oculta el producto tanto en desarrollo como en producción. |
| `link` | Ruta interna existente o URL HTTP/HTTPS opcional para una página de producto, demostración o sitio web. Si se omite, el botón abre un correo con el nombre del producto en el asunto. |
| `version` | Etiqueta de versión opcional que no puede estar vacía, por ejemplo, `v1.2.0`. |
| `requiresLicense` | Booleano opcional, `false` por defecto. Si es `true`, muestra el badge «Licencia de pago» y el aviso con enlace a contacto. |
| `downloads` | Lista opcional de objetos de descarga. Cada uno requiere un `label` descriptivo y una `url` con una ruta pública local o una URL HTTP/HTTPS. Cada objeto genera un botón independiente. |
| `downloadUrl` | URL de descarga única del formato anterior. Solo se utiliza cuando se omite `downloads`; muestra un botón genérico «Descargar». |

`version` y las descargas se pueden configurar de forma independiente. Por ejemplo:

```json
"downloads": [
  { "label": "Descargar Windows (.exe)", "url": "/products/installer.exe" },
  { "label": "Descargar macOS (.dmg)", "url": "/products/installer.dmg" },
  { "label": "Descargar versión portable (.zip)", "url": "/products/portable.zip" }
]
```

Utiliza etiquetas que identifiquen la plataforma, el formato u otra diferencia relevante. Si la lista está vacía o se omite, no se muestran botones de descarga (salvo si se omite la lista y está presente el campo anterior `downloadUrl`). Si ambos campos están presentes, `downloads` tiene prioridad. Para una descarga local, coloca el archivo en `public/`. Si la URL pertenece a otro origen, configura su servidor para enviar `Content-Disposition: attachment`, ya que los navegadores pueden ignorar el atributo `download` en las URL de otros orígenes.

## Imágenes de fondo e iconos

Guarda los archivos en `public/products/` y referencia cada imagen por separado:

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

Puedes incluir solo un fondo, solo un icono, ambos o ninguno. Las imágenes que faltan no generan elementos de imagen, marcadores de posición, iconos generados, degradados, patrones ni efectos decorativos. La vista previa conserva su espacio y el resto de la tarjeta no cambia.

El catálogo no genera automáticamente páginas de detalle de los productos. Crea una página interna antes de enlazarla.

## Ejemplos incluidos

`inventory-management.json`, `online-store.json` y `reservation-calendar.json` son ejemplos ilustrativos, no productos reales. Sustituye su contenido o establece `draft: true` para ocultarlos. Al publicar productos reales, establece `example` en `false` y elige su estado.

## Estructura técnica

- `src/content.config.ts`: esquema de la colección de Astro y validación de datos.
- `src/content/products/`: archivos JSON individuales de los productos.
- `src/components/ProductCard.astro`: tarjeta de producto reutilizable.
- `src/pages/products.astro`: listado, búsqueda que no distingue tildes, filtros y estados sin resultados.

El listado se puede utilizar sin JavaScript; los controles interactivos solo aparecen cuando están disponibles. Las animaciones respetan la preferencia del usuario de reducir el movimiento.
