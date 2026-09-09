# Guía sencilla para editar UNIMANÁ

El sitio funciona con **HTML, CSS y JavaScript**. Los comentarios explican para qué sirve cada bloque; no desactivan funciones ni aparecen como texto en la página.

## 1. ¿Qué archivo debo abrir?

| Quiero cambiar… | Archivo que debo editar |
|---|---|
| Tamaños de letra, colores, espacios o apariencia | `style.css` |
| Acciones de botones, búsqueda, galería, animaciones o formulario | `index.js` |
| Textos de inicio, orientación, privacidad, galería o cuentas futuras | `scripts/build.mjs` |
| Menú, pie, tarjetas, olas, formularios o preguntas compartidas | `scripts/templates.mjs` |
| Nombres, descripciones, módulos, requisitos y datos de programas | `data/programas.mjs` |
| Enlaces de redes sociales | `data/social.mjs` |
| Preferencia de color al abrir la página | `assets/js/theme.js` |
| Fotografías originales | `imagenes/` y `imagenes/carousel/` |
| Folleto institucional original | `documentos/folleto-institucional.pdf` |

**Las rutas son relativas a la raíz del proyecto. El ZIP final trae `index.html` directamente en esa raíz, sin una carpeta adicional `unimana/`.** No cambies los nombres ni las mayúsculas de las páginas antiguas: otros enlaces pueden seguir utilizándolas.

## 2. Cambiar las letras sin tocar los títulos principales

Al comienzo de `style.css`, busca el comentario **TAMAÑOS DE LETRA**. Las variables reúnen los tamaños usados por todo el sitio:

| Variable | Se usa principalmente en | Tamaño de esta revisión |
|---|---|---|
| `--type-body` | Párrafos principales | 18 px; 17 px hasta 760 px de ancho |
| `--type-copy` | Descripciones de tarjetas, listas y texto de formularios | 16 px |
| `--type-lead` | Frases destacadas de las fichas | 20 px; 18 px en teléfono |
| `--type-subtitle` | Subtítulos pequeños y nombres de módulos | 18 px |
| `--type-label` | Etiquetas de campos | 15 px |
| `--type-control` | Botones y enlaces de acción | 15 px |
| `--type-small` | Ayudas, aclaraciones y notas | 14 px |
| `--type-eyebrow` | Etiquetas breves en mayúsculas | 13 px |

Los valores están escritos en `rem`: con la configuración habitual del navegador, **1 rem equivale a 16 px**. Por ejemplo, `1.125rem` equivale a 18 px. Esta unidad también respeta cambios del tamaño base de letra del navegador.

```css
/* Párrafos principales: 18 píxeles con la configuración habitual. */
--type-body: 1.125rem;

/* Descripciones y listas: 16 píxeles. */
--type-copy: 1rem;
```

Más abajo hay un bloque para pantallas de hasta 760 px que ajusta `--type-body` a `1.0625rem` (17 px). Si quieres cambiar el tamaño del teléfono, revisa también ese bloque.

- **Los títulos principales mantienen sus reglas y tamaños propios.** No hace falta modificar `h1`, los títulos grandes de sección ni el año luminoso para aumentar párrafos.
- Los títulos usan **Manrope** y el texto normal **DM Sans**, como antes.
- El texto general tiene peso `450` y más presencia. `line-height` controla la separación entre líneas.
- `--text`, `--muted` y `--subtle` son las tintas de texto. Las dos últimas tienen más contraste en esta revisión.
- La leyenda del logo y los enlaces compactos del menú tienen variables propias; no son párrafos.
- `--primary` conserva exactamente `rgb(115, 226, 254)`. `--primary-ink` es su alternativa más oscura para leer enlaces sobre fondos claros.

## 3. Cambiar textos de una página

### Textos de programas

Abre `data/programas.mjs`. Cada programa tiene un comentario con su identificador y su página. Los comentarios iniciales explican sus campos:

- `name`: nombre del catálogo.
- `title`: título de la ficha cuando necesita una denominación más precisa.
- `summary`: resumen de la tarjeta.
- `description`: párrafos de presentación.
- `objective`, `profile`, `audience`: objetivo, aprendizajes y destinatarios.
- `requirements`: requisitos.
- `modules`: módulos y temas.
- `duration`, `workload`, `durationNote`: información de tiempo y sus aclaraciones.

**No cambies datos pendientes por cifras supuestas.** Los contenidos orientativos y las condiciones de becas deben seguir identificados como tales hasta que la fundación los apruebe.

### Textos del inicio y otras páginas

El nombre de la pestaña de inicio se define con `title` al generar `index.html`: **Fundación Cristiana El Maná**. Es independiente del título grande que ves dentro de la página.

Abre `scripts/build.mjs`. Busca los comentarios **PÁGINA DE INICIO**, **ORIENTACIÓN**, **GALERÍA COMPLETA** o **PRIVACIDAD**. Dentro de las plantillas, cada sección también tiene un comentario HTML.

### Menú y pie

Abre `scripts/templates.mjs`. Las funciones `header` y `footer` generan esas partes para todas las páginas. Modificar una pieza compartida evita editar a mano los 26 HTML.

## 4. Aplicar los cambios

Abre una terminal dentro de la carpeta del proyecto. Para editar y regenerar necesitas Node.js 20 o superior:

```bash
npm ci
npm run format
npm run build
npm run check
```

- `npm ci`: instala las herramientas de edición indicadas en el proyecto.
- `npm run format`: ordena el código fuente y su sangría. No publica nada.
- `npm run build`: vuelve a generar los HTML comentados, las fuentes integradas, el índice de búsqueda, el mapa del sitio y las copias ligeras de CSS y JS.
- `npm run check`: revisa archivos, enlaces, imágenes, fuentes y comentarios de los HTML.
- `npm run format:check`: permite comprobar el formato sin modificar archivos.

Después vuelve a abrir `index.html` o recarga la vista previa. **El ZIP ya contiene el sitio generado: no necesitas instalar herramientas para verlo.**

También puedes editar directamente un HTML, pero **el siguiente `npm run build` lo sobrescribirá**. Para cambios que quieras conservar, edita las fuentes indicadas en esta guía.

## 5. Archivos que no se editan a mano

- `style.min.css` e `index.min.js`: copias ligeras para el navegador. Su comentario inicial te remite a `style.css` e `index.js`.
- `assets/fonts/fonts.css`: contiene las fuentes originales integradas como datos. Se regenera con `scripts/fonts.mjs`. Mantén esta solución para evitar errores al abrir con `file://`.
- `assets/js/search-index.js`: lista generada para la búsqueda. Sus datos vienen del catálogo y de `scripts/build.mjs`.
- `data/images.json`: rutas y medidas de las imágenes. Lo escribe `scripts/images.mjs`.
- `sitemap.xml` y `robots.txt`: los escribe `scripts/build.mjs`.
- `docs/auditoria-estatica.json` y `docs/pruebas-navegador.json`: resultados de las comprobaciones.

**JSON no admite comentarios.** Por eso `data/images.json`, `package.json`, `.prettierrc.json` y los informes se mantienen válidos, y sus explicaciones están aquí o en sus generadores. En el manifiesto de imágenes, `width` y `height` son las medidas originales, `variants` reúne versiones por ancho y `thumb` señala una miniatura cuando existe.

Las imágenes, las fuentes originales, el PDF y las licencias de terceros se conservan sin alterar. No se insertan explicaciones dentro de archivos binarios ni se modifican licencias.

## 6. Cómo leer los comentarios

```html
<!-- Esta sección muestra los programas disponibles. -->
```

```css
/* Esta regla cambia la apariencia de los botones. */
```

```js
// Esta función abre el menú del teléfono.
```

- En HTML explican las partes visibles y los controles.
- En CSS explican colores, tamaños, componentes, adaptación al teléfono, efectos e impresión.
- En JavaScript explican cada función y las acciones importantes.
- Los comentarios `/* HTML */` de las plantillas ayudan a la herramienta de formato a reconocer el fragmento de página.
- `data-*` conecta elementos con JavaScript; `aria-*` ayuda a los lectores de pantalla. No los borres solo porque no sean visibles.

## 7. Qué revisar antes de entregar o publicar

1. Abre inicio, una ficha, orientación, ingreso, galería y privacidad.
2. Prueba pantalla amplia y teléfono; comprueba que nada se tape o se salga del ancho.
3. Revisa claro y oscuro, buscador, filtros y teclado.
4. Comprueba la pausa de animaciones y el efecto de «aquí».
5. No quites los avisos de **cuentas no habilitadas** ni de **mensaje no enviado**.
6. Conserva las fotos, el PDF, los canales oficiales y las condiciones académicas.

Para las pruebas automáticas de navegador:

```bash
npx playwright install --with-deps chromium
npm start
# En otra terminal, dentro de la misma carpeta:
npm test
```

No mantengas ZIP antiguos ni capturas temporales dentro de la entrega. Para publicar de verdad consulta [PUBLICACION.md](PUBLICACION.md): editar los archivos o abrir la vista previa **no actualiza por sí solo el dominio ni GitHub**.
