// Generador opcional en JavaScript nativo. El resultado es HTML estático completo.
// Edita textos compartidos aquí y el catálogo en data/programas.mjs, luego npm run build.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';
import { programs, categories, gallery } from '../data/programas.mjs';
import {
  page,
  icon,
  picture,
  wave,
  card,
  escape,
  breadcrumbs,
  contactForm,
  locationList,
  faq,
  images,
} from './templates.mjs';
// Carpeta base y lista de páginas que aparecerán en el mapa del sitio.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = [];
// El formato se define una sola vez en .prettierrc.json. No se usa en el navegador.
const formatOptions = (await resolveConfig(path.join(root, 'index.html'))) || {};
// Guarda cada archivo generado. Los HTML y el índice de búsqueda se escriben con sangría.
const write = async (file, content, index = true) => {
  await fs.mkdir(path.dirname(path.join(root, file)), { recursive: true });
  // La sangría y los comentarios se conservan también en los archivos entregados.
  if (file.endsWith('.html') || file.endsWith('.js')) {
    content = await format(content, {
      ...formatOptions,
      parser: file.endsWith('.html') ? 'html' : 'babel',
    });
  }
  await fs.writeFile(path.join(root, file), content);
  if (index) files.push(file);
};
// Información institucional para buscadores. No agrega cifras ni acreditaciones.
const org = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': 'https://fundacionunimana.com/#organizacion',
  name: 'Fundación Cristiana El Maná',
  alternateName: 'UNIMANÁ',
  url: 'https://fundacionunimana.com/',
  logo: 'https://fundacionunimana.com/imagenes/logo.png',
  description:
    'Fundación de identidad cristiana dedicada a la formación, el aprendizaje y el servicio a la comunidad.',
  email: 'contacto@fundacionunimana.com',
  telephone: '+573116450990',
  address: { '@type': 'PostalAddress', addressCountry: 'CO' },
};
// PÁGINA DE INICIO. Cada bloque de abajo corresponde a una sección visible.
const home = /* HTML */ ` <!-- PRESENTACIÓN PRINCIPAL. Conserva el título grande, la foto y el botón Empezar ahora. -->
  <section class="hero has-wave" id="inicio">
    <span class="anchor-alias" id="hero-section"></span>
    <div class="hero-orbit" aria-hidden="true"></div>
    <div class="container hero-grid">
      <!-- Título, descripción y acciones principales. Las letras de aquí conservan su animación. -->
      <div class="hero-copy">
        <p class="eyebrow hero-eyebrow">
          <span class="eyebrow-line"></span>EDUCACIÓN CON PROPÓSITO
        </p>
        <h1>
          Un futuro<br />brillante<br />empieza
          <span class="accent-text hero-wave-word" data-animated-word
            ><span class="sr-only">aquí.</span
            ><span class="hero-wave-letters" aria-hidden="true"
              >${[...'aquí']
                .map((letter) => /* HTML */ `<span class="hero-wave-letter">${letter}</span>`)
                .join('')}.</span
            ><svg viewBox="0 0 210 15" aria-hidden="true">
              <path
                d="M3 11Q105-3 206 6"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
              /></svg
          ></span>
        </h1>
        <p class="hero-description">
          Tu vocación puede transformar vidas.<br />En UNIMANÁ te acompañamos a descubrirla, con
          formación flexible y valores que trascienden.
        </p>
        <div class="hero-buttons">
          <a class="button futuristic-button" href="#seccion-destino"
            ><span>Empezar ahora</span>${icon('arrow')}</a
          ><a class="button button-outline" href="#becas">Conoce nuestras becas</a>
        </div>
        <div class="hero-values">
          <span>${icon('check-circle')} Formación con valores</span
          ><span>${icon('globe')} Desde donde estés</span>
        </div>
      </div>
      <!-- Foto original y mensajes de apoyo. Las etiquetas se acomodan sin taparse. -->
      <div class="hero-visual">
        <div class="hero-photo-wrap">
          ${picture('carousel/202501.jpg', '', {
            alt: 'Comunidad de Unimaná celebrando su graduación en 2025',
            cls: 'hero-photo',
            sizes: '(max-width: 760px) 94vw, (max-width: 1100px) 47vw, 600px',
            eager: true,
          })}<span class="photo-label">UNA COMUNIDAD, MUCHOS SUEÑOS</span>
        </div>
        <span class="hero-spark" aria-hidden="true">${icon('sparkles')}</span>
        <div class="hero-note">
          <span class="note-icon">${icon('graduation')}</span>
          <div><strong>Crecer para servir.</strong><span>El conocimiento deja huella.</span></div>
        </div>
        <a class="hero-scholarship" href="#becas"
          >${icon('award')}<span>Tu talento merece<br /><strong>una oportunidad.</strong></span
          >${icon('external')}</a
        >
        <div class="hero-dots" aria-hidden="true"></div>
        <p class="photo-credit">Momentos reales de nuestra comunidad · UNIMANÁ</p>
      </div>
    </div>
    ${wave('surface', 'hero-waves')}
  </section>
  <!-- POR QUÉ UNIMANÁ. Cuatro motivos para conocer la propuesta de formación. -->
  <section class="benefits section has-wave" id="por-que-unimana">
    <div class="container">
      <div class="section-heading compact-heading">
        <div>
          <span class="eyebrow">¿POR QUÉ UNIMANÁ?</span>
          <h2>Tu propósito nos inspira.</h2>
        </div>
        <p>
          Aprender es más que adquirir conocimientos.<br />Es encontrar nuevas posibilidades para tu
          vida.
        </p>
      </div>
      <div class="benefit-grid">
        ${[
          [
            'award',
            'Educación a tu alcance',
            'Becas del 50% al 75%, sujetas a las condiciones de cada programa.',
          ],
          [
            'laptop',
            'Aprende a tu ritmo',
            'Formación virtual para conectar el aprendizaje con tu día a día.',
          ],
          [
            'globe',
            'Una mirada al mundo',
            'Vocación de calidad y apertura a nuevos contextos y conocimientos.',
          ],
          [
            'hands',
            'No caminas solo',
            'Orientación cercana para dar el siguiente paso en tu formación.',
          ],
        ]
          .map(
            ([i, t, d]) =>
              /* HTML */ `<article class="benefit">
                <span class="benefit-icon">${icon(i)}</span>
                <h3>${t}</h3>
                <p>${d}</p>
              </article>`,
          )
          .join('')}
      </div>
    </div>
    ${wave('soft', 'wave-reverse')}
  </section>
  <!-- CATÁLOGO COMPLETO. Los filtros cambian lo visible, pero no eliminan programas del HTML. -->
  <section class="catalog section has-wave" id="carreras">
    <span class="anchor-alias" id="seccion-destino"></span>
    <div class="container">
      <div class="section-heading">
        <div>
          <span class="eyebrow">ENCUENTRA LO QUE TE MUEVE</span>
          <h2>Un camino para<br />cada vocación.</h2>
        </div>
        <div>
          <p>
            Conoce nuestros programas y da el siguiente paso.<br />Hay mucho por aprender y mucho
            por aportar.
          </p>
          <a
            class="text-link"
            href="documentos/folleto-institucional.pdf"
            target="_blank"
            rel="noopener"
            >Ver folleto institucional ${icon('download')}</a
          >
        </div>
      </div>
      <!-- Filtrar por categoría o buscar por nombre. Se activa cuando JavaScript está disponible. -->
      <div class="catalog-controls" data-enhance-only>
        <div class="filter-tabs" role="group" aria-label="Filtrar programas por categoría">
          ${categories
            .map(
              (c, i) =>
                /* HTML */ `<button
                  type="button"
                  class="filter-button${i === 0 ? ' active' : ''}"
                  data-filter="${c.id}"
                  aria-pressed="${i === 0}"
                >
                  ${c.name}
                </button>`,
            )
            .join('')}<button
            type="button"
            class="filter-button"
            data-filter="todos"
            aria-pressed="false"
          >
            Todos
          </button>
        </div>
        <div class="catalog-search search-field">
          ${icon('search')}<label class="sr-only" for="program-search"
            >Buscar en el catálogo de programas</label
          ><input
            id="program-search"
            type="search"
            maxlength="80"
            placeholder="¿Qué te gustaría estudiar?"
            autocomplete="off"
          />
        </div>
      </div>
      <p class="catalog-status" id="catalog-status" role="status" data-enhance-only>
        Explora nuestros programas profesionales y técnicos.
      </p>
      <!-- Aquí se insertan las tarjetas de todos los programas. -->
      <div class="program-grid" id="program-grid">
        ${programs.map((p) => card(p)).join('')}
        <!-- Tarjeta de orientación para quien todavía no ha elegido un programa. -->
        <article class="advice-card">
          <span class="advice-spark">${icon('sparkles')}</span
          ><span class="eyebrow">LO DESCUBRIMOS JUNTOS</span>
          <h3>¿Aún no sabes<br />qué elegir?</h3>
          <p>Hablemos de tus intereses y encontremos un camino que conecte contigo.</p>
          <a href="vistas/inscripcion.html" class="button button-light"
            >Quiero orientación ${icon('arrow')}</a
          >
        </article>
      </div>
      <div class="empty-state" id="catalog-empty" hidden>
        ${icon('search')}
        <h3>Busquemos otro camino.</h3>
        <p>
          No encontramos programas con esos términos. Prueba con otra palabra o explora el catálogo
          completo.
        </p>
        <button type="button" class="button button-primary" id="reset-filters">
          Ver todos los programas
        </button>
      </div>
      <p class="catalog-note">
        La modalidad, la disponibilidad y las condiciones académicas de cada programa deben
        confirmarse con admisiones. Las áreas prácticas pueden requerir actividades presenciales.
      </p>
    </div>
    ${wave('tint')}
  </section>
  <!-- BECAS. Se conservan los porcentajes anunciados y sus condiciones. -->
  <section class="scholarships section has-wave" id="becas">
    <div class="container scholarship-grid">
      <div class="scholarship-copy">
        <span class="eyebrow">LAS OPORTUNIDADES TAMBIÉN SE CONSTRUYEN</span>
        <h2>Tu talento importa.<br />Tu futuro, también.</h2>
        <p>
          Queremos que el deseo de aprender encuentre una oportunidad. Consulta los apoyos
          educativos anunciados por la fundación y conoce cuál puede aplicar a tu programa.
        </p>
        <ol class="scholarship-steps">
          <li>
            <span>01</span>
            <div>
              <strong>Encuentra tu programa</strong>
              <p>Elige un área que conecte con tu vocación.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Consulta los requisitos</strong>
              <p>Confirma la convocatoria y sus condiciones.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Da el primer paso</strong>
              <p>Solicita orientación de nuestro equipo.</p>
            </div>
          </li>
        </ol>
      </div>
      <!-- Resumen del apoyo. La nota final aclara que no se asigna automáticamente. -->
      <div class="scholarship-card">
        <span class="scholarship-seal">${icon('award')}</span
        ><span class="eyebrow">APOYOS PARA SEGUIR APRENDIENDO</span>
        <h3>Becas del<br /><span>50% al 75%</span></h3>
        <p>Una posibilidad de acercarte<br />a la formación que sueñas.</p>
        <a class="button button-amber" href="vistas/inscripcion.html?motivo=beca#solicitud"
          >Quiero conocer mi beca ${icon('arrow')}</a
        >
        <p class="small-note">
          Porcentajes anunciados en el sitio institucional. Su aplicación depende del programa, la
          disponibilidad y las condiciones vigentes. No se asignan automáticamente.
        </p>
      </div>
    </div>
    ${wave('surface')}
  </section>
  <!-- QUIÉNES SOMOS. Identidad de la Fundación Cristiana El Maná. -->
  <section class="about section has-wave" id="quienes-somos">
    <span class="anchor-alias" id="third-section"></span>
    <div class="container about-grid">
      <div class="about-visual">
        ${picture('carousel/202303.jpg', '', {
          alt: 'Integrantes de la comunidad de Unimaná en un encuentro institucional',
          cls: 'about-photo',
        })}<span class="about-stamp"
          >${icon('hands')}<span>Fe. Conocimiento.<br /><strong>Servicio.</strong></span></span
        >
        <div class="about-caption">
          <span class="caption-line"></span>El valor de aprender juntos.
        </div>
      </div>
      <div class="about-copy">
        <span class="eyebrow">¿QUIÉNES SOMOS?</span>
        <h2>Somos UNIMANÁ.<br />Creemos en tu propósito.</h2>
        <p>
          Somos la <strong>Fundación Cristiana El Maná</strong>, una comunidad con vocación
          educativa que busca acercar el conocimiento a las personas y formar líderes con valores
          éticos y espirituales.
        </p>
        <p>
          Estamos afiliados a la Confesión Gobierno Eclesiástico Apostólico y Profético Universal.
          Nuestra identidad institucional se enmarca en la Ley 133 de 1994 y la Ley 115 de 1994 de
          Colombia.
        </p>
        <a class="text-link" href="#historia">Conoce nuestra historia ${icon('arrow')}</a>
      </div>
    </div>
    <!-- Misión, visión y valores de la fundación. -->
    <div class="container mission-grid">
      <article class="mission-card">
        <div class="mission-icon">${icon('heart')}</div>
        <div>
          <h3>Nuestra misión</h3>
          <p>
            Formar líderes con bases técnicas y científicas, valores éticos y espirituales, capaces
            de aportar a su comunidad y cuidar el entorno.
          </p>
          <details class="text-details">
            <summary>Los valores que nos guían ${icon('chevron')}</summary>
            <p>
              Promovemos procesos de cambio con visión de futuro; personas autónomas y
              perseverantes, capaces de asumir retos, defender derechos, respetar a los demás y
              fomentar la conservación del medio ambiente.
            </p>
          </details>
        </div>
      </article>
      <article class="mission-card">
        <div class="mission-icon">${icon('globe')}</div>
        <div>
          <h3>Nuestra visión</h3>
          <p>
            Ser una comunidad educativa reconocida por acercar el conocimiento, impulsar la
            inclusión y formar personas que transformen positivamente su entorno, con innovación y
            vocación de servicio.
          </p>
        </div>
      </article>
    </div>
    <div class="container">
      <p class="institutional-note">
        La identidad y el marco institucional no sustituyen la verificación de las autorizaciones,
        la certificación o el alcance de cada programa. Consulta esta información antes de
        inscribirte.
      </p>
    </div>
    ${wave('navy', 'wave-reverse')}
  </section>
  <!-- HISTORIA. Texto institucional y fotografías originales. -->
  <section class="history section has-wave" id="historia">
    <div class="container history-grid">
      <div class="history-copy">
        <span class="eyebrow">NUESTRA HISTORIA</span>
        <h2>Una convicción.<br />Muchas puertas<br />por abrir.</h2>
        <p>
          Los largos viajes necesarios para estudiar en las grandes universidades y el costo de cada
          carrera hacían que la formación fuera inalcanzable para muchas personas de bajos recursos.
        </p>
        <p>
          Al vivir esta realidad, nuestros directivos comenzaron a estudiar con un propósito:
          compartir lo aprendido y hacer que el conocimiento llegara a más personas, en las
          distintas regiones de Colombia.
        </p>
        <a class="text-link light-link" href="#experiencia"
          >Mira el camino que compartimos ${icon('arrow')}</a
        >
      </div>
      <div class="history-story">
        <div class="story-line">
          <span class="story-dot"></span>
          <h3>El origen: una necesidad cercana.</h3>
          <p>La distancia y los costos no debían apagar las ganas de aprender.</p>
        </div>
        <div class="story-line">
          <span class="story-dot"></span>
          <h3>La respuesta: compartir el conocimiento.</h3>
          <p>Así nació la Fundación Cristiana El Maná, UNIMANÁ.</p>
        </div>
        <div class="story-line">
          <span class="story-dot"></span>
          <h3>El compromiso: aprender para la vida.</h3>
          <p>
            Una formación que conecta la teoría con la práctica, la comunidad y los desafíos del
            mundo real.
          </p>
        </div>
        <figure class="history-memory">
          ${picture('carousel/2016.jpg', '', {
            alt: 'Fotografía del archivo institucional de Unimaná del año 2016',
            sizes: '(max-width: 760px) 82vw, 400px',
          })}
          <figcaption>
            Pequeños comienzos. Un gran propósito.<span>Archivo institucional · 2016</span>
          </figcaption>
        </figure>
      </div>
    </div>
    ${wave('soft')}
  </section>
  <!-- EXPERIENCIA. Galería original con año, controles y miniaturas. -->
  <section class="experience section has-wave" id="experiencia">
    <div class="container">
      <div class="section-heading">
        <div>
          <span class="eyebrow">MOMENTOS QUE NOS UNEN</span>
          <h2>El orgullo de<br />seguir creciendo.</h2>
        </div>
        <div>
          <p>
            Revive con nosotros los mejores momentos de<br />nuestra labor académica e
            institucional.
          </p>
          <a class="text-link" href="vistas/galeria.html"
            >Ver toda la galería ${icon('external')}</a
          >
        </div>
      </div>
      <div
        class="gallery"
        data-gallery
        role="region"
        aria-roledescription="carrusel"
        aria-label="Fotografías de la comunidad de Unimaná"
      >
        <div class="gallery-info">
          <span class="eyebrow">NUESTRA EXPERIENCIA</span
          ><span class="gallery-year" id="carouselYear">2021</span><span class="year-rule"></span>
          <p>
            Cada encuentro cuenta<br />una historia.<br /><strong>Cada logro nos inspira.</strong>
          </p>
          <!-- Controles manuales y reproducción opcional; el movimiento comienza pausado. -->
          <div class="gallery-controls" data-enhance-only>
            <button type="button" class="icon-button gallery-prev" aria-label="Fotografía anterior">
              ${icon('arrow')}</button
            ><button
              type="button"
              class="icon-button gallery-next"
              aria-label="Fotografía siguiente"
            >
              ${icon('arrow')}</button
            ><button
              type="button"
              class="icon-button gallery-play"
              aria-label="Reproducir galería automáticamente"
              aria-pressed="false"
            >
              ${icon('play')}
            </button>
          </div>
          <p class="gallery-counter" data-gallery-status aria-live="polite">
            Fotografía 1 de ${gallery.length}
          </p>
          <a class="text-link" href="vistas/galeria.html">Explora los recuerdos ${icon('arrow')}</a>
        </div>
        <div class="gallery-main">
          <!-- Foto activa del carrusel. Las demás siguen disponibles en la misma página. -->
          <div
            class="gallery-stage"
            id="carouselExampleIndicators"
            tabindex="0"
            aria-label="Galería: usa las flechas del teclado para cambiar de fotografía"
          >
            ${gallery
              .map(
                (n, i) =>
                  /* HTML */ `<figure
                    class="gallery-slide"
                    data-year="${n.slice(0, 4)}"
                    ${i === 0 ? '' : 'hidden'}
                    aria-label="Fotografía ${i + 1} de ${gallery.length}, año ${n.slice(0, 4)}"
                  >
                    ${picture(`carousel/${n}.jpg`, '', {
                      alt: `Archivo institucional de Unimaná · ${n.slice(0, 4)} · Fotografía ${i + 1}`,
                      sizes: '(max-width: 760px) 94vw, 800px',
                    })}<button
                      type="button"
                      class="gallery-expand"
                      data-lightbox="imagenes/carousel/${n}.jpg"
                      data-caption="Archivo institucional de Unimaná · ${n.slice(0, 4)}"
                      aria-label="Ampliar fotografía de ${n.slice(0, 4)}"
                      data-enhance-only
                    >
                      ${icon('expand')}
                    </button>
                    <figcaption>Comunidad UNIMANÁ <span>· ${n.slice(0, 4)}</span></figcaption>
                  </figure>`,
              )
              .join('')}
          </div>
          <!-- Miniaturas para elegir directamente una fotografía. -->
          <div class="gallery-thumbs" aria-label="Elegir fotografía" data-enhance-only>
            ${gallery
              .map(
                (n, i) =>
                  /* HTML */ `<button
                    type="button"
                    data-slide="${i}"
                    aria-label="Ver fotografía ${i + 1}, año ${n.slice(0, 4)}"
                    ${i === 0 ? 'aria-current="true"' : ''}
                  >
                    ${picture(`carousel/${n}.jpg`, '', { thumb: true, alt: '' })}
                  </button>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
    ${wave('surface')}
  </section>
  <!-- CONTACTO. Canales institucionales, sedes y preparación de la consulta. -->
  <section class="contact section has-wave" id="contacto">
    <span class="anchor-alias" id="contactos"></span>
    <div class="container">
      <div class="section-heading">
        <div>
          <span class="eyebrow">EL SIGUIENTE PASO LO DAMOS JUNTOS</span>
          <h2>Hablemos de<br />tu próximo capítulo.</h2>
        </div>
        <p>
          ¿Tienes dudas sobre un programa o una beca?<br />Queremos escucharte y ayudarte a
          encontrar tu camino.
        </p>
      </div>
      <div class="contact-grid">
        <div class="contact-info">
          <div class="contact-links">
            <a href="mailto:contacto@fundacionunimana.com"
              >${icon('email')}<span
                ><small>Escríbenos</small><strong>contacto@fundacionunimana.com</strong></span
              >${icon('external')}</a
            ><a href="tel:+573116450990"
              >${icon('phone')}<span><small>Llámanos</small><strong>+57 311 645 0990</strong></span
              >${icon('external')}</a
            ><a href="https://wa.me/573116450990" target="_blank" rel="noopener noreferrer"
              >${icon('whatsapp')}<span
                ><small>Conversemos</small><strong>Estamos en WhatsApp</strong></span
              >${icon('external')}</a
            >
          </div>
          <h3>Presencia en Colombia</h3>
          <p class="locations-intro">Sedes administrativas y de apoyo académico:</p>
          ${locationList()}
        </div>
        ${contactForm()}
      </div>
    </div>
    ${wave('soft', 'wave-reverse')}
  </section>
  <!-- DUDAS FRECUENTES. Explicaciones generales antes de solicitar orientación. -->
  <section class="faq-section section has-wave" id="preguntas-frecuentes">
    <div class="container faq-grid">
      <div>
        <span class="eyebrow">RESOLVAMOS TUS DUDAS</span>
        <h2>Antes de<br />dar el paso.</h2>
        <p>Todo gran camino comienza<br />con una buena pregunta.</p>
      </div>
      ${faq()}
    </div>
    ${wave('navy')}
  </section>`;
await write(
  'index.html',
  page({
    // Nombre original de la pestaña del inicio; el título grande del diseño no cambia.
    title: 'Fundación Cristiana El Maná',
    description:
      'Conoce los programas de la Fundación Cristiana El Maná. Formación con valores, modalidad virtual y orientación sobre becas del 50% al 75%.',
    canonical: '',
    content: home,
    schema: org,
    cls: 'home-page',
  }),
);
// FICHAS DE PROGRAMAS. Reutiliza los mismos bloques con los datos de cada programa.
// Para cambiar textos, módulos o duración, edita data/programas.mjs.
function programPage(p, canonicalFile = p.file) {
  const b = '../';
  const cat = categories.find((c) => c.id === p.category);
  const apply = `inscripcion.html?programa=${p.id}#solicitud`;
  const modules = p.modules
    .map(
      (m, i) =>
        /* HTML */ `<!-- MÓDULO DESPLEGABLE. Título, explicación y temas de estudio. -->
          <details class="module" ${i === 0 ? ' open' : ''}>
            <summary>
              <span class="module-number">${String(i + 1).padStart(2, '0')}</span
              ><span
                ><strong>${escape(m.title)}</strong><small>${escape(m.description)}</small></span
              ><span class="module-meta">${escape(m.meta)}</span>${icon('chevron')}
            </summary>
            <div class="module-content">
              <ul class="check-list">
                ${m.items.map((t) => /* HTML */ `<li>${icon('check')}${escape(t)}</li>`).join('')}
              </ul>
            </div>
          </details>`,
    )
    .join('');
  const content = /* HTML */ `<!-- PORTADA DEL PROGRAMA. Título, frase inicial y datos que deben confirmar admisiones. -->
    <section class="course-hero has-wave tone-${p.tone}">
      <div class="container">
        ${breadcrumbs([
          { text: 'Programas', href: '../index.html#carreras' },
          { text: cat.name, href: `../index.html?categoria=${cat.id}#carreras` },
          { text: p.name },
        ])}
        <div class="course-hero-grid">
          <div>
            <span class="eyebrow">${escape(cat.name)} · UNIMANÁ</span>
            <h1>${escape(p.title)}</h1>
            <p class="course-tagline">${escape(p.tagline)}</p>
            <p class="course-intro">${escape(p.summary)}</p>
            <div class="hero-buttons">
              <a class="button button-primary" href="${apply}"
                >Solicita información ${icon('arrow')}</a
              ><a class="text-link" href="#modulos">Explora el contenido ${icon('chevron')}</a>
            </div>
          </div>
          <div class="course-hero-art" aria-hidden="true">
            <span class="course-art-ring"></span><span class="course-art-ring second-ring"></span>
            <div class="course-art-icon">${icon(p.icon)}</div>
            <span class="course-art-spark">${icon('sparkles')}</span
            ><span class="course-art-word">APRENDER PARA TRANSFORMAR</span>
          </div>
        </div>
      </div>
      ${wave('surface')}
    </section>
    <div class="container">
      <!-- Duración, dedicación y modalidad. No completar información pendiente con suposiciones. -->
      <dl class="course-facts">
        <div>
          ${icon('clock')}
          <dt>Duración</dt>
          <dd>${escape(p.duration)}</dd>
        </div>
        <div>
          ${icon('book')}
          <dt>Carga horaria</dt>
          <dd>${escape(p.workload)}</dd>
        </div>
        <div>
          ${icon(p.practical ? 'hands' : 'laptop')}
          <dt>Modalidad</dt>
          <dd>${escape(p.modality)}</dd>
        </div>
      </dl>
      <p class="facts-note">${escape(p.durationNote)}</p>
      <!-- Enlaces para ir directamente a las secciones de esta ficha. -->
      <nav class="course-nav" aria-label="Secciones del programa">
        <a href="#descripcion">Descripción</a><a href="#modulos">Plan de estudio</a
        ><a href="#perfil">Tu aprendizaje</a><a href="#requisitos">Requisitos</a
        ><a href="#becas">Becas</a><a href="#comunidad">Comunidad</a>
      </nav>
      <div class="course-layout">
        <!-- Contenido completo del programa, tomado de data/programas.mjs. -->
        <article class="course-content">
          <!-- Información de la ficha. El título de este bloque indica el tema que puedes editar. -->
          <section id="descripcion" class="course-block">
            <span class="eyebrow">CONOCE EL PROGRAMA</span>
            <h2>Conocimiento con propósito.</h2>
            ${p.description.map((t) => /* HTML */ `<p>${escape(t)}</p>`).join('')}
            <div class="objective-card">
              ${icon('sparkles')}
              <div>
                <h3>Objetivo general</h3>
                <p>${escape(p.objective)}</p>
              </div>
            </div>
            ${p.notice
              ? /* HTML */ `<!-- Aclaración importante sobre el alcance de la información publicada. -->
                  <aside class="information-note">
                    ${icon('info')}
                    <p>${escape(p.notice)}</p>
                  </aside>`
              : ''}
          </section>
          <!-- Información de la ficha. El título de este bloque indica el tema que puedes editar. -->
          <section class="course-block" id="modulos">
            <div class="course-block-heading">
              <div>
                <span class="eyebrow">PASO A PASO</span>
                <h2>${p.original ? 'Módulos del programa' : 'Ejes de estudio'}</h2>
              </div>
              <span class="content-label"
                >${p.original ? 'Contenido publicado' : 'Contenido orientativo'}</span
              >
            </div>
            <p>
              ${p.original
                ? 'Conservamos los módulos publicados en el sitio institucional. Consulta con admisiones su vigencia y las condiciones de desarrollo.'
                : 'Estos ejes ofrecen una introducción al área. Son una propuesta informativa para esta ficha, no un plan de estudios aprobado. La fundación debe confirmar su estructura definitiva.'}
            </p>
            <div class="modules-list">${modules}</div>
          </section>
          <!-- Información de la ficha. El título de este bloque indica el tema que puedes editar. -->
          <section class="course-block" id="perfil">
            <span class="eyebrow">LO QUE PUEDES EXPLORAR</span>
            <h2>Herramientas para seguir creciendo.</h2>
            <p>El aprendizaje se conecta con tu experiencia y tu formación previa.</p>
            <ul class="learning-list">
              ${p.profile
                .map((t) => /* HTML */ `<li>${icon('check-circle')}<span>${escape(t)}</span></li>`)
                .join('')}
            </ul>
            <div class="audience-card">
              <h3>¿A quién está dirigido?</h3>
              <p>${escape(p.audience)}</p>
            </div>
            <p class="small-note">
              Las competencias y las posibilidades de aplicación dependen del plan definitivo y de
              tu habilitación profesional. No se garantizan empleos ni se otorga autorización para
              ejercer actividades reguladas desde esta ficha.
            </p>
          </section>
          <!-- Información de la ficha. El título de este bloque indica el tema que puedes editar. -->
          <section class="course-block" id="requisitos">
            <span class="eyebrow">PREPÁRATE PARA DAR EL PASO</span>
            <h2>Requisitos de ingreso</h2>
            <ol class="requirements-list">
              ${p.requirements.map((t) => /* HTML */ `<li>${escape(t)}</li>`).join('')}
            </ol>
            <!-- Aclaración importante sobre el alcance de la información publicada. -->
            <aside class="information-note">
              ${icon('shield')}
              <p>
                Antes de inscribirte, verifica el nombre exacto del programa, la entidad que
                certifica, el alcance de la certificación, el calendario, las prácticas y los
                valores. Solicita las condiciones por escrito.
              </p>
            </aside>
          </section>
          ${p.video
            ? /* HTML */ `<!-- Información de la ficha. El título de este bloque indica el tema que puedes editar. -->
                <section class="course-block">
                  <span class="eyebrow">CONOCE NUESTRA COMUNIDAD</span>
                  <h2>Una ventana a UNIMANÁ</h2>
                  <!-- VIDEO OPCIONAL. Solo conecta con YouTube cuando la persona pulsa Reproducir. -->
                  <div class="video-card" data-video-card data-video="${p.video}">
                    ${picture('carousel/2021.jpg', '../', {
                      alt: 'Comunidad de Unimaná en una ceremonia de graduación',
                      sizes: '(max-width: 760px) 94vw, 740px',
                    })}<button type="button" class="video-play" data-play-video data-enhance-only>
                      ${icon('play')}<span>Reproducir video institucional</span>
                    </button>
                  </div>
                  <p class="video-note">
                    Conservamos el video enlazado en la página original. Solo al reproducirlo se
                    conecta con YouTube.
                    <a
                      href="https://www.youtube.com/watch?v=${p.video}"
                      target="_blank"
                      rel="noopener noreferrer"
                      >Ver directamente en YouTube</a
                    >.
                  </p>
                </section>`
            : ''}
          <!-- Información de la ficha. El título de este bloque indica el tema que puedes editar. -->
          <section class="course-block course-scholarships" id="becas">
            <span class="eyebrow">UN CAMINO MÁS ACCESIBLE</span>
            <h2>Conoce las opciones de beca.</h2>
            <p>
              La fundación anuncia becas del <strong>50% al 75%</strong>. Consulta si hay una
              convocatoria vigente para ${escape(p.name)}, sus requisitos y el porcentaje que podría
              aplicar.
            </p>
            <p class="small-note">
              La disponibilidad, los criterios de selección y la vigencia deben ser confirmados por
              admisiones. No hay adjudicación automática.
            </p>
            <a
              class="button button-amber"
              href="inscripcion.html?programa=${p.id}&amp;motivo=beca#solicitud"
              >Solicita orientación sobre becas ${icon('arrow')}</a
            >
          </section>
          <!-- Información de la ficha. El título de este bloque indica el tema que puedes editar. -->
          <section class="course-block" id="comunidad">
            <span class="eyebrow">APRENDER TAMBIÉN ES COMPARTIR</span>
            <h2>Una comunidad que inspira.</h2>
            <p>
              Estas fotografías forman parte del archivo institucional. Para conocer experiencias
              específicas de este programa, solicita a admisiones referencias de estudiantes que
              hayan autorizado compartirlas.
            </p>
            <div class="community-photos">
              <figure>
                ${picture('carousel/202501.jpg', '../', {
                  alt: 'Encuentro de la comunidad de Unimaná en 2025',
                  sizes: '(max-width: 760px) 88vw, 340px',
                })}
                <figcaption>
                  El valor de alcanzar una meta.<span>Comunidad UNIMANÁ · 2025</span>
                </figcaption>
              </figure>
              <figure>
                ${picture('carousel/202303.jpg', '../', {
                  alt: 'Comunidad de Unimaná reunida en un encuentro de 2023',
                  sizes: '(max-width: 760px) 88vw, 340px',
                })}
                <figcaption>
                  Historias que nos conectan.<span>Archivo institucional · 2023</span>
                </figcaption>
              </figure>
            </div>
            <a class="text-link" href="galeria.html">Conoce nuestra experiencia ${icon('arrow')}</a>
          </section>
          <!-- Información de la ficha. El título de este bloque indica el tema que puedes editar. -->
          <section class="course-block">
            <span class="eyebrow">PARA DECIDIR CON CONFIANZA</span>
            <h2>Preguntas frecuentes</h2>
            ${faq('../', true)}
          </section>
        </article>
        <!-- Panel de orientación. Lleva a la consulta con este programa seleccionado. -->
        <aside class="course-sidebar" aria-label="Orientación e inscripción">
          <div class="admission-card">
            <span class="admission-icon">${icon('graduation')}</span
            ><span class="eyebrow">TU SIGUIENTE PASO</span>
            <h2>Acércate a lo<br />que te inspira.</h2>
            <p>Resuelve tus dudas sobre este programa, sus requisitos y las opciones de beca.</p>
            <a class="button button-primary" href="${apply}">Quiero información ${icon('arrow')}</a
            ><span class="sidebar-divider"></span
            ><a class="sidebar-contact" href="tel:+573116450990"
              >${icon('phone')} +57 311 645 0990</a
            ><a class="sidebar-contact" href="mailto:contacto@fundacionunimana.com"
              >${icon('email')} Escribe a admisiones</a
            ><a
              class="sidebar-contact"
              href="../documentos/folleto-institucional.pdf"
              target="_blank"
              rel="noopener"
              >${icon('download')} Folleto institucional (PDF)</a
            >
            <p class="sidebar-note">Sin pagos ni matrículas automáticas desde esta página.</p>
          </div>
        </aside>
      </div>
    </div>
    <!-- OTROS CAMINOS. Programas relacionados del catálogo existente. -->
    <section class="related section has-wave">
      <div class="container">
        <div class="section-heading">
          <div>
            <span class="eyebrow">SIGUE EXPLORANDO</span>
            <h2>Más caminos para ti.</h2>
          </div>
          <a class="text-link" href="../index.html#carreras"
            >Todos los programas ${icon('arrow')}</a
          >
        </div>
        <!-- Aquí se insertan las tarjetas de todos los programas. -->
        <div class="program-grid">
          ${programs
            .filter((x) => x.id !== p.id)
            .sort((a, b) => (b.category === p.category) - (a.category === p.category))
            .slice(0, 3)
            .map((x) => card(x, '../'))
            .join('')}
        </div>
      </div>
      ${wave('navy')}
    </section>`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: p.title,
    description: p.summary,
    url: `https://fundacionunimana.com/vistas/${canonicalFile}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Fundación Cristiana El Maná · UNIMANÁ',
      url: 'https://fundacionunimana.com/',
    },
  };
  return page({
    title: `${p.title} · Programa y orientación | UNIMANÁ`,
    description: p.summary,
    canonical: `vistas/${canonicalFile}`,
    base: b,
    content,
    schema,
    cls: 'program-page',
  });
}
// Genera las 18 fichas y conserva sus nombres de archivo originales.
for (const p of programs) await write(`vistas/${p.file}`, programPage(p));
// Alias legible, con canonical a la URL existente para no romper enlaces ni duplicar indexación.
await write('vistas/psicologia-cognitiva.html', programPage(programs[0], 'psicologia.html'), false);
// ORIENTACIÓN. Explica los pasos y prepara una consulta, sin enviarla automáticamente.
const admissions = /* HTML */ `<!-- ORIENTACIÓN DE INSCRIPCIÓN. Explica el proceso sin prometer una matrícula automática. -->
  <section class="admissions-hero inner-hero has-wave">
    <div class="container">
      ${breadcrumbs([{ text: 'Inscripción y orientación' }])}
      <div class="admissions-hero-grid">
        <div>
          <span class="eyebrow">EL COMIENZO DE ALGO IMPORTANTE</span>
          <h1>
            Tu próximo capítulo<br />empieza con una<br /><span class="accent-text"
              >conversación.</span
            >
          </h1>
          <p>
            Cuéntanos qué te mueve. Te orientamos para que conozcas los programas, las becas y los
            pasos que debes confirmar antes de inscribirte.
          </p>
          <a class="button button-primary" href="#solicitud">Quiero orientación ${icon('arrow')}</a>
        </div>
        <!-- Pasos para pedir información y confirmar las condiciones con admisiones. -->
        <ol class="admission-steps">
          <li>
            <span>01</span>
            <div>
              <h2>Explora tus posibilidades</h2>
              <p>Conoce los programas y piensa en lo que quieres aprender.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h2>Resuelve tus dudas</h2>
              <p>Confirma requisitos, duración, certificación, costos y becas.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h2>Decide con información</h2>
              <p>Solicita las condiciones por escrito antes de continuar tu proceso.</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
    ${wave('surface')}
  </section>
  <section class="section" id="solicitud">
    <div class="container admissions-form-grid">
      <div class="admissions-intro">
        <span class="eyebrow">UN PASO A LA VEZ</span>
        <h2>Hablemos de<br />tu formación.</h2>
        <p id="selected-program-note">
          Elige tu programa en el formulario. Si aún no lo tienes claro, selecciona la opción de
          orientación.
        </p>
        <!-- Aclaración importante sobre el alcance de la información publicada. -->
        <div class="information-note">
          ${icon('info')}
          <p>
            Este formulario prepara un mensaje local. <strong>No lo envía automáticamente</strong>,
            no asigna becas y no confirma inscripciones.
          </p>
        </div>
        <div class="admission-direct">
          <h3>También puedes contactarnos</h3>
          <a href="tel:+573116450990">${icon('phone')} +57 311 645 0990</a
          ><a href="mailto:contacto@fundacionunimana.com"
            >${icon('email')} contacto@fundacionunimana.com</a
          >
        </div>
        <p class="small-note">
          El registro de cuentas y el ingreso de estudiantes todavía no están habilitados.
          <a href="ingreso.html">Conoce el estado del acceso</a>.
        </p>
      </div>
      ${contactForm('../', 'admissions-form')}
    </div>
  </section>
  <!-- DUDAS FRECUENTES. Explicaciones generales antes de solicitar orientación. -->
  <section class="faq-section section has-wave">
    <div class="container faq-grid">
      <div>
        <span class="eyebrow">ANTES DE EMPEZAR</span>
        <h2>Decide con<br />tranquilidad.</h2>
        <p>La información clara es el primer paso.</p>
      </div>
      ${faq('../')}
    </div>
    ${wave('navy')}
  </section>`;
await write(
  'vistas/inscripcion.html',
  page({
    title: 'Inscripción y orientación · Da el primer paso | UNIMANÁ',
    description:
      'Prepara tu consulta para admisiones de Unimaná. Conoce los pasos para confirmar requisitos, certificación y opciones de beca, sin registro externo.',
    canonical: 'vistas/inscripcion.html',
    base: '../',
    content: admissions,
    cls: 'admissions-page',
  }),
);
// INGRESO Y REGISTRO FUTUROS. Ambas pantallas quedan deshabilitadas.
// No quitar el bloqueo sin implementar antes un servicio seguro de cuentas.
for (const register of [false, true]) {
  const title = register ? 'Crea tu cuenta' : 'Qué bueno tenerte aquí.';
  const content = /* HTML */ `<!-- CUENTA FUTURA. La interfaz se conserva preparada, pero no hay cuentas ni contraseñas activas. -->
    <section class="account-section">
      <div class="container">
        ${breadcrumbs([{ text: register ? 'Registro' : 'Ingreso de estudiantes' }])}
        <div class="account-shell">
          <div class="account-story">
            <span class="eyebrow">TU ESPACIO EN UNIMANÁ</span>
            <h2>Tu propósito<br />tiene un lugar<br />aquí.</h2>
            <p>Una comunidad para descubrir,<br />aprender y crecer juntos.</p>
            ${picture('carousel/202501.jpg', '../', {
              alt: 'Comunidad de Unimaná celebrando un logro académico',
              cls: 'account-photo',
              sizes: '(max-width: 760px) 90vw, 500px',
              eager: true,
            })}<span class="account-motto">APRENDER. CRECER. SERVIR.</span>
          </div>
          <!-- Aviso y campos de acceso. El bloqueo se mantiene hasta tener un servicio seguro. -->
          <div class="account-form-panel">
            <!-- Ingreso y registro son dos pantallas informativas, no una autenticación local. -->
            <nav class="auth-tabs" aria-label="Opciones de acceso">
              <a href="ingreso.html" ${register ? '' : 'aria-current="page"'}>Ingresar</a
              ><a href="registro.html" ${register ? 'aria-current="page"' : ''}>Crear cuenta</a>
            </nav>
            <span class="auth-status">${icon('clock')} PRÓXIMAMENTE</span>
            <h1>${title}</h1>
            <p>
              ${register
                ? 'Estamos preparando un acceso propio, sin cuentas de Google ni proveedores externos.'
                : 'Estamos preparando tu espacio de acceso a la comunidad UNIMANÁ.'}
            </p>
            <!-- AVISO DE NO DISPONIBILIDAD. Debe permanecer mientras el acceso siga deshabilitado. -->
            <div class="auth-notice" id="auth-notice">
              ${icon('lock')}
              <div>
                <strong>El acceso aún no está habilitado.</strong>
                <p>
                  Esta es una pantalla preparada para una futura conexión segura. No permite crear
                  cuentas, recuperar contraseñas ni iniciar sesión. No se solicitan ni se guardan
                  credenciales.
                </p>
              </div>
            </div>
            <form data-auth-form autocomplete="off">
              <fieldset disabled aria-describedby="auth-notice">
                <legend class="sr-only">${register ? 'Registro' : 'Ingreso'} no disponible</legend>
                ${register
                  ? '<div class="field"><label for="auth-name">Nombre completo</label><input id="auth-name" type="text" placeholder="Tu nombre y apellido" autocomplete="off"></div>'
                  : ''}
                <div class="field">
                  <label for="auth-email">Correo electrónico</label
                  ><input
                    id="auth-email"
                    type="email"
                    placeholder="nombre@correo.com"
                    autocomplete="off"
                  />
                </div>
                <div class="field">
                  <label for="auth-password">Contraseña</label
                  ><input
                    id="auth-password"
                    type="password"
                    placeholder="Disponible cuando se habilite el acceso"
                    autocomplete="off"
                  />
                </div>
                ${register
                  ? '<div class="field"><label for="auth-confirm">Confirmar contraseña</label><input id="auth-confirm" type="password" placeholder="Repite tu contraseña" autocomplete="off"></div><label class="checkbox-label"><input type="checkbox"><span>Acepto la política de tratamiento de datos, pendiente de validación institucional.</span></label>'
                  : '<button type="button" class="text-link disabled-link">Recuperar contraseña · no disponible</button>'}<button
                  type="submit"
                  class="button button-primary auth-submit"
                  disabled
                >
                  ${register ? 'Crear cuenta' : 'Ingresar'} ${icon('lock')}
                </button>
              </fieldset>
            </form>
            <div class="auth-alternative">
              <span>¿Quieres comenzar a estudiar con nosotros?</span
              ><a class="button button-primary" href="inscripcion.html"
                >Inscríbete ${icon('arrow')}</a
              >
              <p class="small-note">
                Solicita orientación para tu inscripción sin crear una cuenta. La consulta no
                confirma una matrícula.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  const filename = register ? 'registro.html' : 'ingreso.html';
  await write(
    'vistas/' + filename,
    page({
      title: `${register ? 'Registro' : 'Ingreso de estudiantes'} · Próximamente | UNIMANÁ`,
      description:
        'El acceso de estudiantes de Unimaná está en preparación. Las cuentas no están habilitadas; puedes solicitar orientación sin crear una cuenta.',
      canonical: 'vistas/' + filename,
      base: '../',
      content,
      noindex: true,
      cls: 'account-page',
    }),
    false,
  );
}
// GALERÍA COMPLETA. Conserva todas las fotos originales y permite filtrarlas por año.
const galleryContent = /* HTML */ `<section class="inner-hero gallery-hero has-wave">
    <div class="container">
      ${breadcrumbs([
        { text: 'Nuestra experiencia', href: '../index.html#experiencia' },
        { text: 'Galería institucional' },
      ])}<span class="eyebrow">NUESTRA MEMORIA COMPARTIDA</span>
      <h1>Pequeños momentos.<br /><span class="accent-text">Grandes recuerdos.</span></h1>
      <p>
        Conservamos todas las fotografías de la galería original.<br />Una mirada a la comunidad que
        hace posible nuestra historia.
      </p>
    </div>
    ${wave('surface')}
  </section>
  <section class="section">
    <div class="container">
      <!-- Filtra el álbum por año sin borrar las imágenes del documento. -->
      <div
        class="filter-tabs year-filters"
        data-enhance-only
        role="group"
        aria-label="Filtrar fotografías por año"
      >
        <button
          type="button"
          class="filter-button active"
          data-year-filter="todos"
          aria-pressed="true"
        >
          Todos los recuerdos</button
        >${[...new Set(gallery.map((x) => x.slice(0, 4)))]
          .sort()
          .map(
            (y) =>
              /* HTML */ `<button
                type="button"
                class="filter-button"
                data-year-filter="${y}"
                aria-pressed="false"
              >
                ${y}
              </button>`,
          )
          .join('')}
      </div>
      <p class="catalog-status" id="album-status" role="status" data-enhance-only>
        Explora todo el archivo institucional.
      </p>
      <!-- ÁLBUM COMPLETO. Una tarjeta por cada fotografía original. -->
      <div class="album-grid">
        ${gallery
          .map(
            (n, i) =>
              /* HTML */ `<figure class="album-photo" data-photo-year="${n.slice(0, 4)}">
                <a
                  href="../imagenes/carousel/${n}.jpg"
                  data-lightbox="../imagenes/carousel/${n}.jpg"
                  data-caption="Comunidad UNIMANÁ · ${n.slice(0, 4)} · Fotografía ${i + 1}"
                  aria-label="Ampliar fotografía ${i + 1}, año ${n.slice(0, 4)}"
                  >${picture(`carousel/${n}.jpg`, '../', {
                    alt: `Archivo institucional de Unimaná, fotografía ${i + 1} de ${n.slice(0, 4)}`,
                    sizes: '(max-width: 600px) 94vw, (max-width: 950px) 46vw, 370px',
                  })}<span class="album-expand">${icon('expand')}</span></a
                >
                <figcaption>
                  <strong>Comunidad UNIMANÁ</strong><span>${n.slice(0, 4)}</span>
                </figcaption>
              </figure>`,
          )
          .join('')}
      </div>
      <div class="album-bottom">
        <p>El conocimiento nos transforma.<br />Los encuentros nos conectan.</p>
        <a class="button button-primary" href="inscripcion.html"
          >Sé parte del próximo capítulo ${icon('arrow')}</a
        >
      </div>
    </div>
  </section>`;
await write(
  'vistas/galeria.html',
  page({
    title: 'Galería institucional · Nuestra experiencia | UNIMANÁ',
    description:
      'Explora el archivo fotográfico de la Fundación Cristiana El Maná: encuentros, ceremonias y recuerdos de la comunidad Unimaná.',
    canonical: 'vistas/galeria.html',
    base: '../',
    content: galleryContent,
    cls: 'album-page',
  }),
);
// PRIVACIDAD. Explica lo que esta versión estática hace realmente con los datos.
const privacy = /* HTML */ `<section class="inner-hero has-wave">
    <div class="container">
      ${breadcrumbs([{ text: 'Privacidad' }])}<span class="eyebrow"
        >INFORMACIÓN CLARA, DESDE EL PRINCIPIO</span
      >
      <h1>Tu privacidad<br /><span class="accent-text">también importa.</span></h1>
      <p>Así funciona el tratamiento técnico de la información en esta versión del sitio.</p>
    </div>
    ${wave('surface')}
  </section>
  <section class="section">
    <!-- PRIVACIDAD. Describe el comportamiento técnico real de esta versión estática. -->
    <article class="container legal-content">
      <!-- Aclaración importante sobre el alcance de la información publicada. -->
      <aside class="information-note">
        ${icon('info')}
        <p>
          Este es el aviso técnico del sitio estático. Debe complementarse con la política
          institucional aprobada antes de habilitar cuentas, bases de datos o formularios con envío
          a un servidor.
        </p>
      </aside>
      <h2>1. Quién publica este sitio</h2>
      <p>
        El sitio presenta información de la Fundación Cristiana El Maná · UNIMANÁ. Para consultas
        sobre privacidad y sobre el uso de información enviada a la fundación, escribe a
        <a href="mailto:contacto@fundacionunimana.com">contacto@fundacionunimana.com</a>.
      </p>
      <h2>2. Formulario de orientación</h2>
      <p>
        Los datos que escribes —nombre, correo, teléfono opcional, programa y mensaje— se utilizan
        únicamente en la memoria de esta página para preparar un texto de consulta. No se guardan en
        localStorage, no se agregan a la URL ni se transmiten a un servidor desde el formulario.
      </p>
      <p>
        El mensaje no se envía automáticamente. Si eliges «Abrir mi correo», el navegador entrega el
        texto a la aplicación de correo que tengas configurada; tú decides si lo envías. Si copias
        el mensaje o descargas el archivo de texto, la copia queda bajo tu control. Elimina esas
        copias cuando dejes de necesitarlas y evita dispositivos compartidos.
      </p>
      <p>
        Al cambiar de página, el sitio no conserva un registro propio de la consulta. El navegador
        puede restaurar campos mediante sus funciones de autocompletado o historial. Usa «Limpiar
        datos» después de preparar el mensaje, especialmente en equipos compartidos. No incluyas
        documentos de identidad, datos de salud, contraseñas ni información sensible en tu consulta.
      </p>
      <h2>3. Registro e ingreso</h2>
      <p>
        Las pantallas de registro, ingreso y recuperación de contraseña todavía no están
        habilitadas. Sus campos están desactivados. No existe creación de cuentas, autenticación ni
        almacenamiento de contraseñas en esta versión.
      </p>
      <h2>4. Preferencias del navegador</h2>
      <p>
        Guardamos únicamente dos preferencias técnicas en el almacenamiento local, si tu navegador
        lo permite: <code>theme</code> para recordar el modo claro u oscuro, y
        <code>unimana-motion</code> para recordar si prefieres pausar las animaciones. Puedes
        eliminarlas desde la configuración de tu navegador.
      </p>
      <p>
        El sitio no incorpora herramientas de analítica, píxeles publicitarios ni cookies de
        seguimiento. Las fuentes, imágenes, estilos, scripts y el folleto se sirven desde el propio
        sitio. El proveedor de alojamiento puede generar registros técnicos de acceso, que deben
        revisarse en su propia política.
      </p>
      <h2>5. Videos y enlaces externos</h2>
      <p>
        Los videos de YouTube solo se cargan cuando pulsas el botón de reproducción. Se utiliza el
        dominio de inserción con privacidad mejorada de YouTube; esto no elimina las conexiones al
        proveedor. Puedes optar por no reproducirlos.
      </p>
      <p>
        Los enlaces a WhatsApp, Facebook y YouTube son canales institucionales conservados del sitio
        original. Al abrirlos se aplican las políticas de sus respectivos proveedores. No se
        utilizan para autenticar usuarios ni completar un registro en este sitio.
      </p>
      <h2>6. Si decides enviar una consulta</h2>
      <p>
        Cuando envías voluntariamente un correo o utilizas otro canal de contacto, la información
        pasa a ese canal y a su destinatario. Para conocer, actualizar, corregir o solicitar la
        eliminación de datos que hayas enviado a la fundación, comunícate con el correo
        institucional. Los plazos de conservación, responsables legales y procedimientos de atención
        deben definirse en la política institucional.
      </p>
      <p class="small-note">
        Aviso correspondiente a la versión estática rediseñada del sitio. No constituye
        certificación de cumplimiento legal ni sustituye la revisión institucional de la política de
        tratamiento de datos.
      </p>
      <a class="button button-primary" href="inscripcion.html"
        >Volver a orientación ${icon('arrow')}</a
      >
    </article>
  </section>`;
await write(
  'vistas/privacidad.html',
  page({
    title: 'Privacidad y uso de datos | UNIMANÁ',
    description:
      'Conoce cómo funciona el formulario local, las preferencias de navegación y el acceso de estudiantes en esta versión estática de Unimaná.',
    canonical: 'vistas/privacidad.html',
    base: '../',
    content: privacy,
  }),
);
// PÁGINA 404. Ofrece una salida clara cuando una dirección no existe.
const notFound = /* HTML */ `<!-- ERROR 404. Ayuda a volver a una página que sí existe. -->
  <section class="section error-section">
    <div class="container">
      <span class="error-illustration" aria-hidden="true">${icon('compass')}</span
      ><span class="eyebrow">PÁGINA NO ENCONTRADA · 404</span>
      <h1>Este camino<br />cambió de dirección.</h1>
      <p>
        Puede que el enlace esté incompleto o que la página no exista.<br />Volvamos a un lugar
        donde puedas seguir explorando.
      </p>
      <div class="hero-buttons">
        <a class="button button-primary" href="/index.html">Volver al inicio ${icon('arrow')}</a
        ><a class="button button-outline" href="/index.html#carreras">Explorar programas</a>
      </div>
    </div>
  </section>`;
await write(
  '404.html',
  page({
    title: 'Página no encontrada | UNIMANÁ',
    description: 'Encuentra tu camino de vuelta al sitio de Unimaná.',
    canonical: '404.html',
    base: '/',
    content: notFound,
    noindex: true,
  }),
  false,
);
// BÚSQUEDA LOCAL. Lista títulos y enlaces; no consulta Google ni un servicio externo.
const searchIndex = [
  ...programs.map((p) => ({
    title: p.name,
    label: categories.find((c) => c.id === p.category).name,
    description: p.summary,
    url: 'vistas/' + p.file,
  })),
  {
    title: 'Becas del 50% al 75%',
    label: 'Información',
    description: 'Condiciones y orientación sobre apoyos educativos.',
    url: 'index.html#becas',
  },
  {
    title: 'Inscripción y orientación',
    label: 'Admisiones',
    description: 'Prepara tu consulta y conoce los pasos de admisión.',
    url: 'vistas/inscripcion.html',
  },
  {
    title: 'Nuestra historia',
    label: 'La fundación',
    description: 'Los orígenes de la Fundación Cristiana El Maná.',
    url: 'index.html#historia',
  },
  {
    title: '¿Quiénes somos?',
    label: 'La fundación',
    description: 'Identidad, misión y visión de Unimaná.',
    url: 'index.html#quienes-somos',
  },
  {
    title: 'Contacto y sedes',
    label: 'Hablemos',
    description:
      'Correo, teléfono, Colombia, La Cumbre, Santander de Quilichao, Buenaventura, Barranquilla y Bucaramanga.',
    url: 'index.html#contacto',
  },
  {
    title: 'Experiencia y galería',
    label: 'Nuestra comunidad',
    description: 'Fotografías y memorias de nuestra comunidad.',
    url: 'vistas/galeria.html',
  },
  {
    title: 'Ingreso de estudiantes',
    label: 'Próximamente',
    description: 'Pantalla de acceso; las cuentas todavía no están habilitadas.',
    url: 'vistas/ingreso.html',
  },
  {
    title: 'Registro de cuenta',
    label: 'Próximamente',
    description: 'Interfaz preparada, registro todavía no habilitado.',
    url: 'vistas/registro.html',
  },
  {
    title: 'Privacidad',
    label: 'Información',
    description: 'Uso de datos y preferencias del navegador.',
    url: 'vistas/privacidad.html',
  },
];
await write(
  'assets/js/search-index.js',
  `// Índice generado por scripts/build.mjs. Edita allí las secciones y en data/programas.mjs los programas.\n// Cada entrada tiene título, categoría, descripción y enlace. La búsqueda funciona sin servicios externos.\nwindow.UNIMANA_SEARCH = ${JSON.stringify(searchIndex).replaceAll('<', '\\u003c')};\n`,
  false,
);
// MAPA DEL SITIO. Incluye las páginas principales y evita duplicar los alias.
const urls = files.filter((f) => f.endsWith('.html')).map((f) => (f === 'index.html' ? '' : f));
// XML sencillo: una dirección por línea. No se trata como una plantilla HTML.
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<!-- Mapa generado por scripts/build.mjs. Enumera las páginas públicas principales. -->\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => `  <url><loc>https://fundacionunimana.com/${u}</loc></url>`).join('\n') +
  '\n</urlset>\n';
await write('sitemap.xml', sitemap, false);
// Indica a los buscadores qué carpetas no rastrear. No sustituye un control de acceso.
await write(
  'robots.txt',
  '# Generado por scripts/build.mjs. Instrucciones para los buscadores.\n# Las carpetas de mantenimiento no forman parte del contenido a indexar.\nUser-agent: *\nAllow: /\nDisallow: /docs/\nDisallow: /scripts/\nDisallow: /data/\n\nSitemap: https://fundacionunimana.com/sitemap.xml\n',
  false,
);
console.log(
  `${programs.length} programas, inicio, orientación, galería, privacidad y pantallas de acceso generados. URLs originales conservadas.`,
);
