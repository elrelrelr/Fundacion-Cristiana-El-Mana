// Solo se ejecuta al editar imágenes. Los originales nunca se eliminan.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'imagenes');
const dest = path.join(root, 'assets/optimized');
await fs.mkdir(dest, { recursive: true });
const manifest = {};
// Recorre las carpetas de fotos y crea versiones WebP más ligeras.
// Nunca modifica ni elimina los JPG y PNG originales.
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    if (!/\.(jpe?g|png)$/i.test(file) || entry.name === 'og-image.jpg') continue;
    const rel = path.relative(source, file).replaceAll(path.sep, '/');
    const stem = rel.replace(/\.[^.]+$/, '').replaceAll('/', '-');
    const metadata = await sharp(file).metadata();
    // Limita el tamaño máximo; nunca agranda una imagen pequeña.
    const cap = rel === 'logo.png' ? 320 : rel === 'logovacacional.jpg' ? 160 : 1600;
    const max = Math.min(metadata.width, cap);
    const widths = [
      ...new Set(
        (rel === 'logo.png' ? [80, 160, 240, max] : [400, 800, 1200, max]).filter((w) => w <= max),
      ),
    ].sort((a, b) => a - b);
    // Prepara varios anchos para que cada pantalla descargue solo lo necesario.
    const variants = [];
    for (const width of widths) {
      const filename = `${stem}-${width}.webp`;
      await sharp(file)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 79, effort: 5 })
        .toFile(path.join(dest, filename));
      variants.push({ width, src: `assets/optimized/${filename}` });
    }
    const fallback = variants.at(-1).src;
    manifest[rel] = { width: metadata.width, height: metadata.height, variants, src: fallback };
    // Las fotos del carrusel también tienen una miniatura para sus controles.
    if (rel.startsWith('carousel/')) {
      const thumb = `${stem}-thumb.webp`;
      await sharp(file)
        .rotate()
        .resize(128, 88, { fit: 'cover' })
        .webp({ quality: 70 })
        .toFile(path.join(dest, thumb));
      manifest[rel].thumb = `assets/optimized/${thumb}`;
    }
  }
}
await walk(source);
await fs.mkdir(path.join(root, 'data'), { recursive: true });
// Guarda las rutas y medidas en un JSON válido. Este formato no permite comentarios.
await fs.writeFile(path.join(root, 'data/images.json'), JSON.stringify(manifest, null, 2));
// Crea la imagen para compartir el sitio en redes, usando fotos y logo locales.
const photo = (await fs.readFile(path.join(root, manifest['carousel/202501.jpg'].src))).toString(
  'base64',
);
const logo = (await fs.readFile(path.join(root, manifest['logo.png'].src))).toString('base64');
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="p"><rect x="660" y="125" width="480" height="365" rx="60"/></clipPath></defs><rect width="1200" height="630" fill="#f1f5fb"/><circle cx="1130" cy="115" r="180" fill="#e1eafb"/><image href="data:image/webp;base64,${logo}" x="60" y="45" width="95" height="56"/><text x="170" y="79" font-family="DejaVu Sans,sans-serif" font-size="29" font-weight="bold" fill="#112744">UNIMANÁ</text><text x="65" y="185" font-family="DejaVu Sans,sans-serif" font-size="17" letter-spacing="3" fill="#305ec2">EDUCACIÓN CON PROPÓSITO</text><g font-family="DejaVu Sans,sans-serif" font-size="65" font-weight="bold"><text x="60" y="270" fill="#122a49">Un futuro</text><text x="60" y="348" fill="#122a49">brillante</text><text x="60" y="426" fill="#2e62d9">empieza aquí.</text></g><image href="data:image/webp;base64,${photo}" x="620" y="125" width="610" height="365" preserveAspectRatio="xMidYMid slice" clip-path="url(#p)"/><rect x="745" y="463" width="317" height="61" rx="18" fill="#f9c565"/><text x="778" y="501" font-family="DejaVu Sans,sans-serif" font-weight="bold" font-size="22" fill="#122a49">Crecer para servir.</text><path d="M0 550 Q300 510 600 562 T1200 540 L1200 630H0Z" fill="#142e4e"/><text x="65" y="595" font-family="DejaVu Sans,sans-serif" font-size="19" fill="#ffffff">Fundación Cristiana El Maná · fundacionunimana.com</text></svg>`;
await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(path.join(source, 'og-image.jpg'));
console.log(
  `${Object.keys(manifest).length} imágenes optimizadas; originales conservados y OG 1200 × 630 creado.`,
);
