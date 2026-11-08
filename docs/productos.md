# Añadir productos al catálogo

La página `/productos/` se genera a partir de `src/content/productos/`.
Cada producto es un archivo JSON independiente: no necesitas editar la página ni las tarjetas.

## Crear un producto

1. Crea `src/content/productos/nombre-del-producto.json` con un nombre de archivo único.
2. Copia esta estructura y reemplaza los datos:

```json
{
  "nombre": "Nombre del producto",
  "resumen": "Descripción breve de lo que hace y a quién ayuda.",
  "categoria": "Gestión empresarial",
  "caracteristicas": ["Primera característica", "Segunda característica"],
  "icono": "layers",
  "estado": "Disponible",
  "orden": 4,
  "ejemplo": false,
  "borrador": false
}
```

3. Ejecuta `npm run build` para validar el contenido y generar el catálogo. Publica de nuevo el sitio para ver los cambios en producción.

Los filtros y el contador se actualizan automáticamente. Las categorías se obtienen de los productos publicados; utiliza el mismo texto para agrupar varios productos.

## Campos

| Campo | Uso |
| --- | --- |
| `nombre`, `resumen`, `categoria` | Textos obligatorios, no vacíos. |
| `caracteristicas` | Entre 1 y 5 textos para la lista de características. |
| `icono` | `layers`, `bag`, `phone`, `connect`, `code` o `support`. Por defecto, `layers`. |
| `estado` | `Disponible`, `En desarrollo` o `Próximamente`. Por defecto, `Próximamente`. |
| `orden` | Entero mayor o igual a 0; los menores aparecen primero. Por defecto, 100. Los empates se ordenan por nombre. |
| `ejemplo` | Por defecto, `false`. Si es `true`, muestra «Producto de ejemplo» en lugar del estado y una advertencia en el catálogo. |
| `borrador` | Por defecto, `false`. Si es `true`, no aparece en el catálogo, ni en desarrollo ni en producción. |
| `imagen` | Opcional: objeto con `src` (ruta local) y `alt` (descripción accesible). Si se omite, se muestra una ilustración con el icono. |
| `enlace` | Opcional: ruta interna existente o URL HTTP/HTTPS de una ficha, demo o sitio del producto. Si se omite, el botón abre un correo con el nombre del producto en el asunto. |

Para usar una imagen, guárdala en `public/productos/` y añade al JSON:

```json
"imagen": {
  "src": "/productos/mi-producto.webp",
  "alt": "Vista del panel principal de Mi Producto"
},
"enlace": "https://mi-producto.cl"
```

El catálogo no genera páginas de detalle automáticamente. No añadas un enlace interno sin crear antes su página.

## Ejemplos incluidos

`gestion-inventario.json`, `tienda-online.json` y `agenda-reservas.json` son muestras ilustrativas, no productos reales. Sustitúyelas por tus productos o establece `borrador: true` para ocultarlas. Al publicar datos reales, cambia `ejemplo` a `false` y define su estado.

## Estructura técnica

- `src/content.config.ts`: esquema y validación de los datos con las colecciones de Astro.
- `src/components/ProductCard.astro`: presentación reutilizable de cada producto.
- `src/pages/productos.astro`: listado, búsqueda sin distinción de acentos, filtros y estados vacíos.

El listado también funciona sin JavaScript; los controles interactivos solo aparecen cuando están disponibles. Las animaciones respetan la preferencia de movimiento reducido del usuario.
