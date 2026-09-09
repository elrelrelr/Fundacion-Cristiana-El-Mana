// Auditoría estática reproducible, sin dependencias ni acceso a la red.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { programs, gallery } from '../data/programas.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Reúne el inicio, el error 404 y las páginas internas que vamos a comprobar.
const files = [
  'index.html',
  '404.html',
  ...(await fs.readdir(path.join(root, 'vistas')))
    .filter((f) => f.endsWith('.html'))
    .map((f) => 'vistas/' + f),
];
const errors = [],
  cache = new Map();
// Lee cada archivo una sola vez para no repetir trabajo.
const read = async (f) => {
  if (!cache.has(f)) cache.set(f, await fs.readFile(path.join(root, f), 'utf8'));
  return cache.get(f);
};
// Anota el problema y sigue revisando el resto de archivos.
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};
// Recupera los caracteres normales de las direcciones escritas en HTML.
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"');
let links = 0,
  assets = 0,
  pictures = 0;
// REVISIONES DE CADA PÁGINA. Título, datos básicos, seguridad, imágenes y enlaces.
for (const file of files) {
  const html = await read(file);
  // El inicio conserva exactamente el nombre de la pestaña de la versión original.
  if (file === 'index.html') {
    assert(
      /<title>Fundación Cristiana El Maná<\/title>/.test(html),
      file + ': debe conservar el título original de la pestaña',
    );
  }
  // El HTML entregado también debe ser legible y conservar sus explicaciones.
  assert(html.includes('PÁGINA GENERADA.'), file + ': falta la guía de edición del HTML');
  assert((html.match(/<!--/g) || []).length >= 10, file + ': faltan comentarios por bloques');
  assert(html.split('\n').length > 100, file + ': el HTML no está escrito de forma legible');
  assert((html.match(/<h1(?:\s|>)/g) || []).length === 1, file + ': debe tener un H1');
  for (const token of [
    'name="description"',
    'rel="canonical"',
    'property="og:title"',
    'property="og:image"',
    'name="twitter:card"',
    'lang="es"',
    'Saltar al contenido',
  ])
    assert(html.includes(token), file + ': falta ' + token);
  assert(!/href=["'](?:#!|#|javascript:[^"']*)["']/.test(html), file + ': enlace vacío o inválido');
  assert(
    !/(forms\.gle|forms\.google|accounts\.google|formspree)/i.test(html),
    file + ': servicio de registro excluido por el usuario',
  );
  assert(
    !/(?:href|src)="(?!https?:)[^"]*\.php(?:["'?])/i.test(html),
    file + ': dependencia PHP local',
  );
  assert(html.includes("form-action 'none'"), file + ': falta protección contra envíos nativos');
  assert(!html.includes('mobile-cta'), file + ': barra móvil obsoleta');
  assert(
    html.includes('assets/fonts/fonts.css'),
    file + ': falta CSS de fuentes compatible con file://',
  );
  assert(
    !/<link[^>]+as="font"/.test(html),
    file + ': precarga de fuente local incompatible con file://',
  );
  // Comprueba que no haya dos elementos con el mismo identificador.
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert(new Set(ids).size === ids.length, file + ': IDs duplicados');
  // Comprueba que los datos de los buscadores sean JSON válido.
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      errors.push(file + ': JSON-LD inválido');
    }
  }
  if (file === 'index.html' || programs.some((p) => file === 'vistas/' + p.file))
    assert(html.includes('application/ld+json'), file + ': falta schema');
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    pictures++;
    assert(/\balt="[^"]*"/.test(match[0]), file + ': imagen sin alt');
    assert(
      /\bwidth="\d+"/.test(match[0]) && /\bheight="\d+"/.test(match[0]),
      file + ': imagen sin dimensiones',
    );
  }
  // Revisa que cada recurso local exista y que las anclas lleven a un elemento real.
  const refs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const m of html.matchAll(/\bsrcset="([^"]+)"/g))
    refs.push(...m[1].split(',').map((s) => s.trim().split(/\s+/)[0]));
  for (const value of refs) {
    if (/^(https?:|mailto:|tel:|data:|blob:)/i.test(value)) continue;
    const url = new URL(decode(value), 'https://local.test/' + file);
    const target = decodeURIComponent(url.pathname).replace(/^\//, '') || 'index.html';
    try {
      const stat = await fs.stat(path.join(root, target));
      assert(stat.isFile(), file + ': recurso no es archivo ' + target);
    } catch {
      errors.push(file + ': recurso ausente ' + value);
      continue;
    }
    if (target.endsWith('.html')) {
      links++;
      if (url.hash) {
        const destination = await read(target);
        assert(
          destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          file + ': ancla ausente ' + value,
        );
      }
    } else assets++;
  }
}
// Compara los bytes de las fuentes integradas con sus archivos originales.
// Así se conserva la solución para abrir el sitio con doble clic, sin errores de fuentes.
const fontCSS = await read('assets/fonts/fonts.css');
const fontData = [...fontCSS.matchAll(/data:font\/woff2;base64,([A-Za-z0-9+/=]+)/g)].map((m) =>
  Buffer.from(m[1], 'base64'),
);
assert(fontData.length === 2, 'Deben estar integradas ambas fuentes originales');
for (const [i, file] of [
  'manrope-latin-wght-normal.woff2',
  'dm-sans-latin-wght-normal.woff2',
].entries()) {
  const original = await fs.readFile(path.join(root, 'assets/fonts', file));
  assert(fontData[i]?.equals(original), 'La fuente integrada no coincide con el original: ' + file);
}
assert(programs.length === 18, 'El catálogo original debe mantener sus 18 programas');
assert(gallery.length === 22, 'Deben conservarse las 22 fotografías del carrusel original');
assert(
  (await read('index.html')).includes('id="third-section"') &&
    (await read('index.html')).includes('id="seccion-destino"'),
  'Faltan anclas históricas',
);
for (const p of programs)
  assert(p.modules.length >= 4, p.name + ': faltan módulos/ejes de estudio');
for (const f of ['ingreso', 'registro']) {
  const html = await read(`vistas/${f}.html`);
  assert(html.includes('<fieldset disabled'), f + ': formulario de cuenta sin bloquear');
  assert(html.includes('no está habilitado'), f + ': aviso de cuenta ausente');
}
// Guarda un informe fácil de revisar en docs/auditoria-estatica.json.
const report = {
  pages: files.length,
  programPages: programs.length,
  documentedPages: files.length,
  originalGalleryImages: gallery.length,
  checkedInternalLinks: links,
  checkedLocalAssetReferences: assets,
  imagesWithDimensions: pictures,
  errors,
};
await fs.mkdir(path.join(root, 'docs'), { recursive: true });
await fs.writeFile(
  path.join(root, 'docs/auditoria-estatica.json'),
  JSON.stringify(report, null, 2) + '\n',
);
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
