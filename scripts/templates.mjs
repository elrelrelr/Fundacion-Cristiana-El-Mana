// PIEZAS COMPARTIDAS DE LAS PÁGINAS.
// Aquí se editan el menú, el pie, los formularios y las tarjetas.
// Después ejecuta npm run build para aplicar los cambios en todos los HTML.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { programs, categories, locations } from '../data/programas.mjs';
import { socialProfiles } from '../data/social.mjs';
// Ubica la carpeta del proyecto, aunque ejecutes el comando desde otra carpeta.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Lee las rutas y los tamaños de las fotos. El archivo JSON no admite comentarios.
export const images = JSON.parse(fs.readFileSync(path.join(root, 'data/images.json'), 'utf8'));
// Convierte caracteres especiales para que los textos no se interpreten como etiquetas HTML.
export const escape = (s) =>
  String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
// Dibujos pequeños de los botones y secciones. Son SVG locales: no cargan librerías externas.
const icons = {
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  external: '<path d="M7 17 17 7M7 7h10v10"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  moon: '<path d="M20.8 13.2A9 9 0 0 1 10.8 3.3 9 9 0 1 0 20.8 13.2Z"/><path d="M17 2v4m-2-2h4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  graduation: '<path d="m2 9 10-5 10 5-10 5L2 9Zm4 3v5c4 3 8 3 12 0v-5m4-3v8"/>',
  book: '<path d="M12 5c-4-3-9-2-9-2v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2Zm0 0v16M6 7h3m-3 4h3m6-4h3m-3 4h3"/>',
  crossbook: '<path d="M4 3h15v18H5a2 2 0 0 1 0-4h14M4 3v16m8-13v8m-3-5h6"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6.5c4 2 10 2 14 0M5 17.5c4-2 10-2 14 0"/>',
  laptop: '<rect x="4" y="3" width="16" height="13" rx="2"/><path d="m4 16-2 5h20l-2-5M9 18.5h6"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="m8 13-2 9 6-3 6 3-2-9m-6-5 1.5 1.5L15 6"/>',
  certificate:
    '<rect x="3" y="3" width="18" height="14" rx="2"/><path d="M7 7h10M7 11h4m6 5v6l-3-2-3 2v-6"/><circle cx="14" cy="14" r="3"/>',
  heart:
    '<path d="M20.5 5.5a5.5 5.5 0 0 0-8.5 1 5.5 5.5 0 0 0-8.5-1c-4.5 5 2 10 8.5 15 6.5-5 13-10 8.5-15Z"/>',
  hands:
    '<path d="m2 10 4-5 5 1 3-1 4 1 4 5-4 7-5 3-7-4-4-7Zm7-3-2 4 2 2 4-3 6 5m-6-5 3 3m-7 5 2-2m1 4 2-2M2 10l4 2m12-3 4 2"/>',
  brain:
    '<path d="M12 18V5c-1-4-6-3-6 1-4 0-4 6-2 7-3 3 0 7 3 6 0 4 5 4 5-1Zm0 0V5c1-4 6-3 6 1 4 0 4 6 2 7 3 3 0 7-3 6 0 4-5 4-5-1ZM6 6c0 3 3 2 3 5m9-5c0 3-3 2-3 5M4 13c2-1 4 1 4 3m12-3c-2-1-4 1-4 3"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',
  map: '<path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  phone: '<path d="m5 3 4 5-2 3c2 3 3 4 6 6l3-2 5 4c-1 5-6 3-10 0S1 9 3 5l2-2Z"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6"/>',
  play: '<path d="m8 4 12 8-12 8V4Z"/>',
  pause: '<path d="M8 4v16M16 4v16"/>',
  expand: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5"/>',
  shield: '<path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6l-9-4Z"/><path d="m8 12 3 3 5-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/>',
  scale: '<path d="M12 3v18m-6 0h12M3 7h18M6 7l-4 8h8L6 7Zm12 0-4 8h8l-4-8Z"/>',
  leaf: '<path d="M20 3C4 0-1 18 10 19c8 1 12-8 10-16ZM4 22 16 7m-9 9-1-5m6 1 5 1"/>',
  people:
    '<circle cx="9" cy="7" r="3"/><path d="M3 20v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m3 10v-3a5 5 0 0 0-3-4"/>',
  paw: '<ellipse cx="5" cy="8" rx="2" ry="3" transform="rotate(-20 5 8)"/><ellipse cx="11" cy="5" rx="2" ry="3"/><ellipse cx="17" cy="6" rx="2" ry="3" transform="rotate(20 17 6)"/><ellipse cx="21" cy="11" rx="1.5" ry="2.5"/><path d="M7 20c-5-2 0-6 2-8 2-2 5-2 7 1 2 3 4 6 1 8-3 1-4-2-6-1l-4 0Z"/>',
  stethoscope:
    '<path d="M4 3v6a5 5 0 0 0 10 0V3M3 3h3m6 0h3M9 14v2a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="10" r="3"/>',
  sparkles: '<path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-11v1"/>',
  chat: '<path d="M21 11c0 5-4 8-9 8H7l-5 3 2-6c-1-1-2-3-2-5 0-5 4-9 10-9s9 4 9 9Z"/><path d="M7 8h10M7 12h6"/>',
};
// Las mismas siluetas Bootstrap Icons 1.11.3 de la versión original, ahora SVG locales.
const originalIcons = Object.fromEntries(
  ['facebook', 'instagram', 'youtube', 'whatsapp', 'rocket-fill'].map((name) => [
    name,
    fs.readFileSync(path.join(root, `assets/icons/${name}.svg`), 'utf8').trim(),
  ]),
);
// Devuelve el dibujo solicitado. Los iconos decorativos no se leen como texto.
export function icon(name, cls = '') {
  const original = originalIcons[name === 'rocket' ? 'rocket-fill' : name];
  if (original)
    return original
      .replace(/class="[^"]*"/, `class="icon icon-original ${cls}"`)
      .replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
  return /* HTML */ `<svg
    class="icon ${cls}"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    ${icons[name] || icons.book}
  </svg>`;
}
// Prepara una imagen con sus versiones ligeras y sus medidas.
// base indica la ruta hasta el inicio; alt describe la foto; eager carga primero la imagen principal.
export function picture(
  file,
  base = '',
  {
    cls = '',
    alt = '',
    sizes = '(max-width: 680px) 100vw, 50vw',
    eager = false,
    thumb = false,
  } = {},
) {
  const m = images[file];
  if (!m) throw new Error('Imagen no encontrada: ' + file);
  if (thumb)
    return /* HTML */ `<img
      src="${base}${m.thumb}"
      width="128"
      height="88"
      loading="lazy"
      decoding="async"
      alt="${escape(alt)}"
      class="${cls}"
    />`;
  const srcset = m.variants.map((v) => `${base}${v.src} ${v.width}w`).join(', ');
  return /* HTML */ `<picture class="${cls}"
    ><source type="image/webp" srcset="${srcset}" sizes="${sizes}" />
    <img
      src="${base}imagenes/${file}"
      width="${m.width}"
      height="${m.height}"
      alt="${escape(alt)}"
      ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}
      decoding="${eager ? 'sync' : 'async'}"
  /></picture>`;
}
// Crea las tres capas de una ola. next indica el color de la sección que viene después.
export function wave(next = 'surface', variant = '') {
  // Los extremos se extienden fuera del viewBox. La capa opaca une la siguiente sección sin costuras.
  return /* HTML */ `<div class="section-wave wave-to-${next} ${variant}" aria-hidden="true">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path
        class="wave-back"
        d="M-1440 38Q-1080-18-720 44T0 38T720 44T1440 38T2160 44T2880 38V160H-1440Z"
      />
      <path
        class="wave-mid"
        d="M-1440 70C-1200 120-960-4-720 44S-240 112 0 58S480 6 720 60S1200 120 1440 58S1920 6 2160 60S2640 120 2880 58V160H-1440Z"
      />
      <path
        class="wave-front"
        d="M-1440 76C-1200 24-960 128-720 76S-240 24 0 76S480 128 720 76S1200 24 1440 76S1920 128 2160 76S2640 24 2880 76V160H-1440Z"
      />
    </svg>
  </div>`;
}
// Muestra el mismo logo y nombre en el menú o en el pie de página.
function brand(base, footer = false) {
  return /* HTML */ `<a
    class="brand${footer ? ' brand-footer' : ''}"
    href="${base}index.html"
    title="Ir al inicio"
    >${picture('logo.png', base, { alt: '', sizes: '76px', eager: !footer })}<span
      class="brand-name"
      >UNIMANÁ<span>FUNDACIÓN CRISTIANA EL MANÁ</span></span
    ></a
  >`;
}
// Construye el menú azul, el acceso, la búsqueda y el menú para teléfonos.
export function header(base = '') {
  const home = base + 'index.html';
  const links = [
    ['#quienes-somos', 'Nosotros'],
    ['#historia', 'Historia'],
    ['#experiencia', 'Experiencia'],
    ['#contacto', 'Contacto'],
  ];
  const list = links
    .map(([id, text]) => /* HTML */ `<a class="nav-link" href="${home}${id}">${text}</a>`)
    .join('');
  const menuGroups = categories
    .map(
      (c) =>
        /* HTML */ `<div class="mega-group">
          <p class="mega-title">${icon(c.icon)}${c.name}</p>
          ${programs
            .filter((p) => p.category === c.id)
            .map((p) => /* HTML */ `<a href="${base}vistas/${p.file}">${escape(p.name)}</a>`)
            .join('')}
        </div>`,
    )
    .join('');
  return /* HTML */ `<!-- ACCESIBILIDAD. Atajo de teclado para pasar directamente al contenido. -->
    <a class="skip-link" href="#contenido-principal">Saltar al contenido</a>
    <!-- MENÚ SUPERIOR. Es lo primero visible: logo, programas, búsqueda, tema e ingreso. -->
    <header class="site-header">
      <div class="container header-inner">
        ${brand(base)}
        <!-- Navegación para pantallas amplias; las rutas se repiten en el menú del teléfono. -->
        <nav class="desktop-nav" aria-label="Navegación principal">
          <details class="program-menu">
            <summary class="nav-link">Programas ${icon('chevron')}</summary>
            <!-- Lista de los 18 programas, agrupados según data/programas.mjs. -->
            <div class="mega-menu">
              <div class="mega-intro">
                <span>ENCUENTRA TU CAMINO</span
                ><a href="${home}#carreras">Explorar todos los programas ${icon('arrow')}</a>
              </div>
              <div class="mega-grid">${menuGroups}</div>
            </div>
          </details>
          ${list}
        </nav>
        <!-- Controles de búsqueda y color. Ingreso lleva a la pantalla de acceso preparada. -->
        <div class="nav-actions">
          <button
            type="button"
            class="icon-button search-toggle"
            data-open-search
            aria-label="Buscar en el sitio"
          >
            ${icon('search')}</button
          ><button
            type="button"
            class="icon-button theme-toggle"
            data-theme-toggle
            aria-label="Activar modo oscuro"
            aria-pressed="false"
          >
            <span class="theme-moon">${icon('moon')}</span
            ><span class="theme-sun">${icon('sun')}</span></button
          ><a class="login-link" href="${base}vistas/ingreso.html"
            >${icon('user')}<span>Ingreso</span></a
          ><button
            type="button"
            class="icon-button menu-toggle"
            data-open-menu
            aria-label="Abrir menú de navegación"
            aria-haspopup="dialog"
          >
            ${icon('menu')}
          </button>
        </div>
      </div>
    </header>
    <!-- MENÚ DEL TELÉFONO. Se abre con el botón de tres líneas y se cierra también con Escape. -->
    <dialog class="mobile-menu" id="mobile-menu" aria-labelledby="mobile-menu-title">
      <div class="mobile-menu-head">
        <span id="mobile-menu-title">Explora UNIMANÁ</span
        ><button type="button" class="icon-button" data-close-dialog aria-label="Cerrar menú">
          ${icon('close')}
        </button>
      </div>
      <nav aria-label="Navegación móvil">
        <a href="${home}">Inicio ${icon('arrow')}</a>
        <details>
          <summary>Programas ${icon('chevron')}</summary>
          <div class="mobile-programs">
            ${categories
              .map(
                (c) =>
                  /* HTML */ `<details>
                    <summary>${c.name} ${icon('chevron')}</summary>
                    ${programs
                      .filter((p) => p.category === c.id)
                      .map(
                        (p) => /* HTML */ `<a href="${base}vistas/${p.file}">${escape(p.name)}</a>`,
                      )
                      .join('')}
                  </details>`,
              )
              .join('')}<a href="${home}#carreras">Explorar el catálogo completo</a>
          </div>
        </details>
        ${list}<a href="${home}#becas">Becas</a>
      </nav>
      <p class="mobile-menu-foot">Aprender. Crecer. Servir.</p>
    </dialog>
    <!-- BUSCADOR LOCAL. Sus resultados se completan con assets/js/search-index.js. -->
    <dialog class="search-dialog" id="search-dialog" aria-labelledby="search-title">
      <div class="dialog-head">
        <div>
          <span class="eyebrow">UNIMANÁ, MÁS CERCA</span>
          <h2 id="search-title">¿Qué estás buscando?</h2>
        </div>
        <button type="button" class="icon-button" data-close-dialog aria-label="Cerrar búsqueda">
          ${icon('close')}
        </button>
      </div>
      <form id="site-search-form" role="search">
        <label class="sr-only" for="site-search">Buscar programas e información</label>
        <div class="search-field">
          ${icon('search')}<input
            id="site-search"
            name="buscar"
            type="search"
            placeholder="Psicología, becas, admisiones…"
            autocomplete="off"
            maxlength="80"
          /><button class="button button-primary" type="submit">Buscar</button>
        </div>
      </form>
      <p class="search-status" id="search-status" role="status">
        Programas e información que pueden interesarte
      </p>
      <ul id="search-results" class="search-results"></ul>
      <button type="button" class="text-link" id="search-on-page">
        Buscar coincidencias en esta página ${icon('arrow')}
      </button>
      <p class="search-help">También puedes buscar sin tildes. Presiona Esc para cerrar.</p>
    </dialog>
    <!-- Barra para recorrer las palabras resaltadas en la página actual. -->
    <div class="in-page-search" id="in-page-search" hidden>
      <p id="page-search-status" role="status"></p>
      <button type="button" class="text-link" id="page-search-next">Siguiente</button
      ><button
        type="button"
        class="icon-button"
        id="page-search-close"
        aria-label="Quitar resaltados"
      >
        ${icon('close')}
      </button>
    </div>`;
}
// Construye el pie común, el cohete y la moneda de WhatsApp.
// Las redes se editan en data/social.mjs; las que no tienen URL no se muestran.
export function footer(base = '') {
  const home = base + 'index.html';
  return /* HTML */ `<!-- PIE COMPARTIDO. Contacto, redes, enlaces útiles y vuelta al inicio. -->
    <footer class="site-footer">
      <div class="container">
        <!-- Cohete para volver arriba. Las estrellas se crean y se eliminan desde index.js. -->
        <div class="footer-return">
          <a
            class="back-link"
            href="#arriba"
            id="rocket-btn"
            aria-label="Volver arriba, al inicio de la página"
            >${icon('rocket')}</a
          ><span>Volver arriba</span>
        </div>
        <div class="footer-top">
          <div class="footer-brand">
            ${brand(base, true)}
            <p>Educación con propósito.<br />Una comunidad para aprender,<br />crecer y servir.</p>
            <div class="social-links" aria-label="Redes de UNIMANÁ">
              ${socialProfiles
                .filter((profile) => profile.url)
                .map(
                  (profile) =>
                    /* HTML */ `<a
                      class="social-link ${profile.id}"
                      href="${escape(profile.url)}"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="${profile.name} de Unimaná (abre otra pestaña)"
                      >${icon(profile.id)}</a
                    >`,
                )
                .join('')}
            </div>
          </div>
          <div>
            <h2>Conócenos</h2>
            <a href="${home}#quienes-somos">¿Quiénes somos?</a
            ><a href="${home}#historia">Nuestra historia</a
            ><a href="${home}#experiencia">Nuestra experiencia</a
            ><a href="${base}vistas/galeria.html">Galería institucional</a
            ><a
              href="${base}documentos/folleto-institucional.pdf"
              target="_blank"
              rel="noopener"
              type="application/pdf"
              >Folleto institucional ${icon('download')}</a
            >
          </div>
          <div>
            <h2>Tu formación</h2>
            ${categories
              .map((c) => /* HTML */ `<a href="${home}?categoria=${c.id}#carreras">${c.name}</a>`)
              .join('')}<a href="${home}#becas">Becas y orientación</a
            ><a href="${base}vistas/ingreso.html">Ingreso de estudiantes</a>
          </div>
          <div class="footer-contact">
            <h2>Hablemos</h2>
            <a href="mailto:contacto@fundacionunimana.com">contacto@fundacionunimana.com</a
            ><a href="tel:+573116450990">+57 311 645 0990</a>
            <p>Presencia en Colombia.<br />Formación que conecta.</p>
            <a class="footer-cta" href="${base}vistas/inscripcion.html"
              >Da el primer paso ${icon('arrow')}</a
            >
          </div>
        </div>
        <div class="footer-bottom">
          <p>
            © <span data-year>2026</span> Fundación Cristiana El Maná · UNIMANÁ.<br
              class="mobile-only"
            />
            Todos los derechos reservados.
          </p>
          <div>
            <a href="${base}vistas/privacidad.html">Privacidad</a
            ><button type="button" class="motion-toggle" data-motion-toggle aria-pressed="false">
              ${icon('pause')}<span>Pausar animaciones</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
    <a
      class="whatsapp-float whatsapp-coin-container"
      href="https://wa.me/573116450990"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Habla con Unimaná por WhatsApp (abre otra pestaña)"
      ><span class="whatsapp-tooltip">¿Hablamos?</span
      ><span class="whatsapp-coin"
        ><span class="coin-front">${icon('whatsapp')}</span
        ><span class="coin-back"
          >${picture('logovacacional.jpg', base, { alt: '', sizes: '56px' })}</span
        ></span
      ></a
    >
    <!-- FOTO AMPLIADA. Esta ventana reutiliza las imágenes originales de la galería. -->
    <dialog class="lightbox" id="image-dialog" aria-labelledby="lightbox-title">
      <div class="lightbox-head">
        <p id="lightbox-title">Galería institucional</p>
        <button type="button" class="icon-button" data-close-dialog aria-label="Cerrar fotografía">
          ${icon('close')}
        </button>
      </div>
      <img id="lightbox-image" alt="" width="1280" height="900" />
      <div class="lightbox-foot">
        <p id="lightbox-caption"></p>
        <a
          class="text-link"
          id="lightbox-original"
          href="${base}vistas/galeria.html"
          target="_blank"
          rel="noopener"
          >Abrir imagen original ${icon('external')}</a
        >
      </div>
    </dialog>`;
}
// Arma una página completa: datos del navegador, estilos, menú, contenido y pie.
// Los archivos .min cargan rápido; sus versiones comentadas son style.css e index.js.
export function page({
  title,
  description,
  canonical,
  content,
  base = '',
  cls = '',
  schema,
  noindex = false,
}) {
  const url = 'https://fundacionunimana.com/' + canonical;
  const html = /* HTML */ `<!DOCTYPE html>
    <!-- PÁGINA GENERADA. Cambia el contenido en scripts/build.mjs y las piezas comunes en scripts/templates.mjs.
Para colores y letras usa style.css; para acciones usa index.js. Ejecuta npm run build al terminar.
Guía sencilla: docs/GUIA-EDICION.md. Este HTML ya funciona sin un servidor de plantillas. -->
    <html lang="es" data-theme="light">
      <head>
        <!-- DATOS DE LA PÁGINA. Idioma, título, descripción, seguridad e imagen al compartir. -->
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escape(title)}</title>
        <meta name="description" content="${escape(description)}" />
        <meta name="theme-color" content="#008ff5" />
        <meta name="color-scheme" content="light dark" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          http-equiv="Content-Security-Policy"
          content="form-action 'none'; base-uri 'self'; object-src 'none'"
        />
        ${noindex ? '<meta name="robots" content="noindex, follow">' : ''}
        <link rel="canonical" href="${url}" />
        <link rel="icon" href="${base}imagenes/logo.png" type="image/png" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="UNIMANÁ · Fundación Cristiana El Maná" />
        <meta property="og:title" content="${escape(title)}" />
        <meta property="og:description" content="${escape(description)}" />
        <meta property="og:url" content="${url}" />
        <meta property="og:image" content="https://fundacionunimana.com/imagenes/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="UNIMANÁ: un futuro brillante empieza aquí. Comunidad de la Fundación Cristiana El Maná."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${escape(title)}" />
        <meta name="twitter:description" content="${escape(description)}" />
        <meta name="twitter:image" content="https://fundacionunimana.com/imagenes/og-image.jpg" />
        <!-- Preferencias antes de mostrar el contenido, para evitar destellos de color. -->
        <script src="${base}assets/js/theme.js"></script>
        <!-- Fuentes integradas: también funcionan al abrir este archivo con doble clic. -->
        <link rel="stylesheet" href="${base}assets/fonts/fonts.css" />
        <link rel="stylesheet" href="${base}style.min.css" />
        ${schema
          ? /* HTML */ `<script type="application/ld+json">
              ${JSON.stringify(schema).replaceAll('<', '\\u003c')}
            </script>`
          : ''}
        <!-- Acciones compartidas. defer espera a que el HTML esté listo antes de ejecutarlas. -->
        <script src="${base}assets/js/search-index.js" defer></script>
        <script src="${base}index.min.js" defer></script>
      </head>
      <body id="arriba" class="${cls}" data-root="${base}">
        ${header(base)}<!-- CONTENIDO PROPIO DE ESTA PÁGINA. El menú y el pie se comparten con las demás. -->
        <main id="contenido-principal" tabindex="-1">${content}</main>
        ${footer(base)}
      </body>
    </html> `;
  // Deja un espacio después del salto para no pegar palabras cuando se oculta en móviles.
  return html.replace(/<br\s*\/?>/g, (tag) => `${tag} `);
}
// Muestra la ruta de navegación para saber en qué parte del sitio estamos.
export function breadcrumbs(items, base = '../') {
  return /* HTML */ `<!-- Ruta de navegación: permite volver al inicio o a la sección anterior. -->
    <nav class="breadcrumbs" aria-label="Ruta de navegación">
      <ol>
        <li><a href="${base}index.html">Inicio</a></li>
        ${items
          .map(
            (it, i) =>
              /* HTML */ `<li>
                ${icon('chevron')}${it.href
                  ? /* HTML */ `<a href="${it.href}">${escape(it.text)}</a>`
                  : /* HTML */ `<span aria-current="${i === items.length - 1 ? 'page' : 'false'}"
                      >${escape(it.text)}</span
                    >`}
              </li>`,
          )
          .join('')}
      </ol>
    </nav>`;
}
// Crea una tarjeta del catálogo a partir de un programa de data/programas.mjs.
export function card(p, base = '') {
  const category = categories.find((c) => c.id === p.category);
  return /* HTML */ `<!-- TARJETA DE PROGRAMA. Nombre, resumen y enlaces tomados del catálogo compartido. -->
    <article
      class="program-card tone-${p.tone}"
      data-program-card
      data-category="${p.category}"
      data-search="${escape(p.name + ' ' + p.summary)}"
    >
      <div class="program-card-top">
        <span class="program-icon">${icon(p.icon)}</span
        ><span class="program-kind"
          >${p.category === 'profesionales'
            ? p.practical
              ? 'Técnica'
              : p.id === 'psicologia'
                ? 'Psicología'
                : 'Licenciatura'
            : p.category === 'diplomados'
              ? 'Diplomado'
              : p.category === 'maestrias'
                ? 'Maestría'
                : 'Especialización'}</span
        >
      </div>
      <h3><a href="${base}vistas/${p.file}">${escape(p.name)}</a></h3>
      <p>${escape(p.summary)}</p>
      <div class="program-modality">
        ${icon(p.practical ? 'hands' : 'laptop')}
        ${p.practical ? 'Consulta las prácticas' : p.modality}
      </div>
      <div class="program-card-bottom">
        <a class="text-link" href="${base}vistas/${p.file}">Conoce el programa ${icon('arrow')}</a
        ><a
          class="scholarship-link"
          href="${base}vistas/inscripcion.html?programa=${p.id}&amp;motivo=beca#solicitud"
          >Solicita tu beca</a
        >
      </div>
    </article>`;
}
// Prepara el formulario de consulta. No envía datos ni confirma inscripciones.
// El botón solo se activa cuando index.js instala la preparación local del mensaje.
export function contactForm(base = '', id = 'contact-form') {
  return /* HTML */ `<!-- FORMULARIO LOCAL. Solo prepara un mensaje; no lo envía ni guarda datos personales. -->
    <form class="contact-form" id="${id}" data-contact-form novalidate>
      <div class="form-title">
        <span class="eyebrow">ESTAMOS PARA ORIENTARTE</span>
        <h3>Cuéntanos qué te gustaría estudiar.</h3>
        <p>Prepara un mensaje para nuestro equipo. Los campos con * son obligatorios.</p>
      </div>
      <!-- Campos de consulta. Cada etiqueta está asociada con su campo y su mensaje de error. -->
      <div class="form-grid">
        <div class="field">
          <label for="${id}-name">Nombre completo *</label
          ><input
            id="${id}-name"
            name="nombre"
            autocomplete="name"
            placeholder="Tu nombre y apellido"
            required
            minlength="2"
            maxlength="100"
            aria-describedby="${id}-name-error"
          /><span class="field-error" id="${id}-name-error"></span>
        </div>
        <div class="field">
          <label for="${id}-email">Correo electrónico *</label
          ><input
            id="${id}-email"
            name="correo"
            type="email"
            autocomplete="email"
            inputmode="email"
            placeholder="nombre@correo.com"
            required
            maxlength="150"
            aria-describedby="${id}-email-error"
          /><span class="field-error" id="${id}-email-error"></span>
        </div>
        <div class="field">
          <label for="${id}-phone">Teléfono <span>(opcional)</span></label
          ><input
            id="${id}-phone"
            name="telefono"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            placeholder="+57 300 000 0000"
            maxlength="25"
            aria-describedby="${id}-phone-error"
          /><span class="field-error" id="${id}-phone-error"></span>
        </div>
        <div class="field">
          <label for="${id}-program">Programa de interés *</label
          ><select
            id="${id}-program"
            name="programa"
            required
            aria-describedby="${id}-program-error"
          >
            <option value="">Elige tu programa</option>
            ${categories
              .map(
                (c) =>
                  /* HTML */ `<optgroup label="${c.name}">
                    ${programs
                      .filter((p) => p.category === c.id)
                      .map((p) => /* HTML */ `<option value="${p.id}">${escape(p.name)}</option>`)
                      .join('')}
                  </optgroup>`,
              )
              .join('')}
            <option value="orientacion">Aún no lo sé, necesito orientación</option></select
          ><span class="field-error" id="${id}-program-error"></span>
        </div>
        <div class="field full-width">
          <label for="${id}-message">¿Cómo podemos ayudarte? *</label
          ><textarea
            id="${id}-message"
            name="mensaje"
            rows="3"
            placeholder="Cuéntanos tus dudas sobre el programa, la modalidad o las becas…"
            required
            minlength="10"
            maxlength="1500"
            aria-describedby="${id}-message-error"
          ></textarea
          ><span class="field-error" id="${id}-message-error"></span>
        </div>
      </div>
      <!-- Consentimiento para preparar la consulta. No autoriza un envío automático. -->
      <div class="consent-field">
        <label class="checkbox-label" for="${id}-consent"
          ><input
            type="checkbox"
            id="${id}-consent"
            name="consentimiento"
            required
            aria-describedby="${id}-consent-error"
          /><span
            >He leído el
            <a href="${base}vistas/privacidad.html" target="_blank" rel="noopener"
              >aviso de privacidad</a
            >
            y acepto usar mis datos para preparar esta consulta y, si decido enviarla, recibir
            orientación. *</span
          ></label
        ><span class="field-error" id="${id}-consent-error"></span>
      </div>
      <!-- Aviso que explica el funcionamiento local de los datos. -->
      <div class="form-safety">
        ${icon('lock')}
        <p>
          Tu información se procesa solo en esta página. No se guarda ni se envía automáticamente.
        </p>
      </div>
      <button class="button button-primary form-submit" type="submit" disabled>
        Preparar mi mensaje ${icon('arrow')}
      </button>
      <p class="form-status" data-form-status role="status"></p>
      <noscript
        ><p>
          Este formulario necesita JavaScript para preparar el mensaje. Puedes escribir directamente
          a
          <a href="mailto:contacto@fundacionunimana.com">contacto@fundacionunimana.com</a>.
        </p></noscript
      >
      <!-- RESULTADO LOCAL. Muestra el texto listo para revisar, copiar o abrir en el correo. -->
      <section
        class="message-result"
        data-message-result
        hidden
        aria-labelledby="${id}-result-title"
      >
        <h4 id="${id}-result-title">Tu mensaje está listo.</h4>
        <p>
          <strong>Aún no se ha enviado.</strong> Abre tu aplicación de correo para enviarlo o copia
          el texto. Prepararlo no crea una cuenta ni confirma una matrícula.
        </p>
        <label class="sr-only" for="${id}-preview">Vista previa de tu mensaje</label
        ><textarea
          class="message-preview"
          id="${id}-preview"
          data-message-preview
          rows="8"
          readonly
        ></textarea>
        <!-- Acciones voluntarias: abrir correo, copiar, descargar o borrar lo escrito. -->
        <div class="message-actions">
          <a
            class="button button-primary"
            href="mailto:contacto@fundacionunimana.com"
            data-mail-link
            >${icon('email')} Abrir mi correo</a
          ><button class="button button-outline" type="button" data-copy-message>
            ${icon('copy')} Copiar</button
          ><button class="text-link" type="button" data-download-message>
            ${icon('download')} Descargar .txt</button
          ><button class="text-link" type="reset">Limpiar datos</button>
        </div>
        <p data-copy-status role="status"></p>
      </section>
    </form>`;
}
// Muestra las sedes de data/programas.mjs sin repetir sus datos en cada página.
export function locationList() {
  return /* HTML */ `<!-- Sedes institucionales. Se mantienen centralizadas en data/programas.mjs. -->
    <ul class="location-list">
      ${locations
        .map(
          ([name, region]) =>
            /* HTML */ `<li>
              ${icon('map')}<span><strong>${name}</strong><span>${region}, Colombia</span></span>
            </li>`,
        )
        .join('')}
      <li>
        ${icon('globe')}<span
          ><strong>Desde donde estés</strong><span>Alcance global · Modalidad virtual</span></span
        >
      </li>
    </ul>`;
}
// Preguntas desplegables. course elige entre preguntas de un programa o preguntas generales.
export function faq(base = '', course = false) {
  const rows = course
    ? [
        [
          '¿Qué certificación recibiré?',
          'Consulta con admisiones la denominación exacta, quién expide la certificación, los requisitos y su alcance. Esta ficha no garantiza reconocimiento oficial, titulación profesional ni habilitación para ejercer actividades reguladas.',
        ],
        [
          '¿Cuándo empieza y cuánto cuesta?',
          'Las fechas, el calendario, los valores y los medios de pago deben ser confirmados por la fundación. Solicita por escrito las condiciones antes de efectuar cualquier pago.',
        ],
        [
          '¿Puedo acceder a una beca?',
          'El sitio institucional anuncia becas del 50% al 75%. Su aplicación depende del programa, la convocatoria, la disponibilidad y los criterios de admisión; no son automáticas.',
        ],
        [
          '¿La formación es completamente virtual?',
          'Consulta la modalidad específica de tu programa. Aunque la oferta incluye formación virtual, puede haber actividades, evaluaciones o prácticas con condiciones particulares.',
        ],
      ]
    : [
        [
          '¿Cómo puedo comenzar mi proceso de inscripción?',
          'Explora los programas y solicita orientación. Nuestro equipo debe confirmar disponibilidad, requisitos, valores y condiciones. Preparar una consulta en este sitio no crea una cuenta ni confirma una matrícula.',
        ],
        [
          '¿Cómo funcionan las becas?',
          'La información institucional anuncia apoyos del 50% al 75%. El porcentaje aplicable, la vigencia y los requisitos deben confirmarse con admisiones. No hay asignación automática de becas.',
        ],
        [
          '¿Puedo estudiar desde otra ciudad?',
          'La fundación ofrece formación virtual y cuenta con presencia en varias ciudades de Colombia. Confirma el calendario, el acceso a las actividades y los componentes prácticos de tu programa.',
        ],
        [
          '¿Ya puedo crear mi cuenta o ingresar?',
          'Las pantallas de registro e ingreso están preparadas, pero todavía no están habilitadas. No se solicitan ni almacenan contraseñas. Mientras se activa el servicio, puedes comunicarte por los canales de contacto.',
        ],
      ];
  return /* HTML */ `<!-- PREGUNTAS FRECUENTES. Cada respuesta se despliega sin depender de librerías. -->
    <div class="faq-list">
      ${rows
        .map(
          ([q, a], i) =>
            /* HTML */ `<details${i === 0 ? ' open' : ''}><summary>${q}<span class="faq-plus" aria-hidden="true">+</span></summary><p>${a}</p></details>`,
        )
        .join('')}
    </div>`;
}
