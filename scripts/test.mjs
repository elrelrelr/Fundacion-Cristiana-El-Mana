// Pruebas reales de navegador. npm install; npx playwright install --with-deps chromium.
// En otra terminal: npm start. Luego: npm test. URL opcional: TEST_URL=http://... npm test
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { programs } from '../data/programas.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const url = (process.env.TEST_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
// Abre un navegador real sin ventana visible para probar el sitio automáticamente.
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'no-preference',
});
const page = await context.newPage();
page.setDefaultTimeout(8000);
// Reúne los resultados. Cada prueba indica si pasó y, si no, explica el error.
const report = {
  environment: 'Chromium / Playwright',
  url,
  testDate: new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Bogota' }).format(new Date()),
  tests: [],
  accessibility: [],
  javascriptErrors: [],
  unexpectedAssetErrors: [],
  externalRequestsBeforeVideo: [],
};
// Vigila errores de JavaScript, archivos fallidos y conexiones externas inesperadas.
page.on('pageerror', (error) => report.javascriptErrors.push(error.message));
page.on('response', (response) => {
  if (response.status() >= 400 && !response.url().includes('pagina-inexistente-prueba'))
    report.unexpectedAssetErrors.push(`${response.status()} ${response.url()}`);
});
page.on('request', (request) => {
  if (
    !request.url().startsWith(url) &&
    !request.url().startsWith('data:') &&
    !request.url().includes('youtube-nocookie.com')
  )
    report.externalRequestsBeforeVideo.push(request.url());
});
// Abre una página y espera a que sus fuentes estén listas.
async function go(file = '') {
  await page.goto(url + '/' + file);
  await page.evaluate(() => document.fonts.ready);
}
// Ejecuta una comprobación y guarda el resultado sin detener las demás.
async function test(name, fn) {
  try {
    await fn();
    report.tests.push({ name, passed: true });
    console.log('✓', name);
  } catch (error) {
    report.tests.push({ name, passed: false, error: error.message });
    console.error('✗', name, error.message);
  }
}
// Revisa reglas automáticas de accesibilidad. No sustituye una revisión manual completa.
async function axe(p, label) {
  const result = await new AxeBuilder({ page: p })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const violations = result.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
  }));
  report.accessibility.push({ label, violations });
  assert.equal(violations.length, 0, `${label}: ${JSON.stringify(violations)}`);
}
await test('Todos los HTML: cargan, un H1, sin desbordamiento a 1440 / 390 / 320 px', async () => {
  const files = [
    'index.html',
    ...programs.map((p) => 'vistas/' + p.file),
    'vistas/psicologia-cognitiva.html',
    'vistas/inscripcion.html',
    'vistas/ingreso.html',
    'vistas/registro.html',
    'vistas/galeria.html',
    'vistas/privacidad.html',
  ];
  for (const file of files) {
    const response = await page.goto(url + '/' + file);
    assert.equal(response.status(), 200, file);
    assert.equal(await page.locator('h1').count(), 1, file);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      const sizes = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        viewport: innerWidth,
      }));
      assert.ok(sizes.width <= sizes.viewport + 1, `${file} desborda: ${JSON.stringify(sizes)}`);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
});
await test('Inicio: imagen principal cargada y todas las fotos originales presentes', async () => {
  await go();
  await page.locator('.hero-photo img').evaluate((img) => img.decode());
  assert.ok(await page.locator('.hero-photo img').evaluate((img) => img.naturalWidth > 0));
  assert.equal(await page.locator('.gallery-slide').count(), 22);
  assert.equal(await page.locator('[data-program-card]').count(), 18);
});
await test('Filtros 5 / 5 / 3 / 5 / 18 y búsqueda sin tildes, vacío y restablecimiento', async () => {
  await go();
  for (const [cat, total] of [
    ['profesionales', 5],
    ['especializaciones', 5],
    ['maestrias', 3],
    ['diplomados', 5],
    ['todos', 18],
  ]) {
    await page.locator(`[data-filter="${cat}"]`).click();
    assert.equal(await page.locator('[data-program-card]:visible').count(), total);
    assert.equal(await page.locator(`[data-filter="${cat}"]`).getAttribute('aria-pressed'), 'true');
  }
  await page.locator('#program-search').fill('GERONTOLOGIA');
  assert.equal(await page.locator('[data-program-card]:visible').count(), 1);
  assert.match(await page.locator('[data-program-card]:visible h3').innerText(), /Gerontología/);
  await page.locator('#program-search').fill('zzzzsinresultados');
  assert.ok(await page.locator('#catalog-empty').isVisible());
  await page.locator('#reset-filters').click();
  assert.equal(await page.locator('[data-program-card]:visible').count(), 18);
  await go('index.html?categoria=maestrias#carreras');
  assert.equal(await page.locator('[data-program-card]:visible').count(), 3);
});
await test('Megamenú: destinos propios, Escape y foco', async () => {
  await go();
  const summary = page.locator('.program-menu>summary');
  await summary.click();
  assert.ok(await page.locator('.mega-menu').isVisible());
  assert.equal(await page.locator('.mega-grid a').count(), 18);
  await page.keyboard.press('Escape');
  assert.ok(!(await page.locator('.mega-menu').isVisible()));
  assert.ok(await summary.evaluate((e) => document.activeElement === e));
});
await test('Búsqueda local: resultados, teclado, XSS como texto y coincidencias en página', async () => {
  await go();
  await page.locator('[data-open-search]').click();
  await page.locator('#site-search').fill('GERONTOLOGIA');
  assert.equal(await page.locator('#search-results a').count(), 1);
  assert.match(await page.locator('#search-results a').getAttribute('href'), /Gerontologia.html/);
  await page.keyboard.press('ArrowDown');
  assert.ok(await page.locator('#search-results a').evaluate((e) => document.activeElement === e));
  await page.locator('#site-search').fill('<img src=x onerror=alert(1)>');
  assert.equal(await page.locator('#search-results img').count(), 0);
  await page.locator('#site-search').fill('fundacion');
  await page.locator('#search-on-page').click();
  assert.ok((await page.locator('.highlight-search').count()) > 0);
  assert.ok(await page.locator('#in-page-search').isVisible());
  await page.locator('#page-search-next').click();
  assert.match(await page.locator('#page-search-status').innerText(), /Coincidencia 2/);
  await page.locator('#page-search-close').click();
  assert.equal(await page.locator('.highlight-search').count(), 0);
});
await test('Carrusel: flechas, vuelta al inicio, año y ampliación', async () => {
  await go();
  await page.locator('.gallery-prev').click();
  assert.equal(await page.locator('#carouselYear').innerText(), '2018');
  await page.locator('.gallery-next').click();
  assert.equal(await page.locator('#carouselYear').innerText(), '2021');
  await page.locator('.gallery-stage').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('[data-slide="1"]').getAttribute('aria-current'), 'true');
  await page.locator('.gallery-slide:visible [data-lightbox]').click();
  assert.ok(await page.locator('#image-dialog').isVisible());
  await page.locator('#lightbox-image').evaluate((img) => img.decode());
  assert.ok(await page.locator('#lightbox-image').evaluate((img) => img.naturalWidth > 0));
  await page.keyboard.press('Escape');
  assert.ok(!(await page.locator('#image-dialog').isVisible()));
});
await test('Carrusel: reproducción optativa y pausa real', async () => {
  const playbackContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'no-preference',
  });
  const playback = await playbackContext.newPage();
  await playback.goto(url + '/');
  await playback.clock.install();
  await playback.locator('[data-gallery]').scrollIntoViewIfNeeded();
  await playback.locator('.gallery-play').click();
  assert.equal(await playback.locator('.gallery-play').getAttribute('aria-pressed'), 'true');
  await playback.clock.fastForward(6300);
  assert.equal(await playback.locator('[data-slide="1"]').getAttribute('aria-current'), 'true');
  await playback.locator('.gallery-play').click();
  await playback.clock.fastForward(13000);
  assert.equal(await playback.locator('[data-slide="1"]').getAttribute('aria-current'), 'true');
  await playbackContext.close();
});
await test('Modo oscuro persistente y pausa de animaciones persistente', async () => {
  await go();
  await page.locator('[data-theme-toggle]').click();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await go('vistas/PNL.html');
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await page.locator('[data-motion-toggle]').click();
  assert.equal(await page.locator('html').getAttribute('data-motion'), 'off');
  assert.equal(
    await page
      .locator('.wave-front')
      .first()
      .evaluate((e) => getComputedStyle(e).animationName),
    'none',
  );
  await go();
  assert.equal(await page.locator('html').getAttribute('data-motion'), 'off');
  await page.locator('[data-motion-toggle]').click();
  await page.locator('[data-theme-toggle]').click();
});
await test('Olas: capa opaca coincide con sección destino en claro y oscuro', async () => {
  for (const theme of ['light', 'dark']) {
    await go();
    await page.evaluate((theme) => {
      document.documentElement.dataset.theme = theme;
    }, theme);
    const states = await page.locator('.section-wave').evaluateAll((waves) =>
      waves.map((w) => {
        const next = w.closest('section').nextElementSibling;
        return {
          fill: getComputedStyle(w.querySelector('.wave-front')).fill,
          background: next ? getComputedStyle(next).backgroundColor : null,
          opacity: getComputedStyle(w.querySelector('.wave-front')).opacity,
        };
      }),
    );
    for (const state of states) {
      if (state.background) assert.equal(state.fill, state.background, JSON.stringify(state));
      assert.equal(state.opacity, '1');
    }
  }
});
await test('Galería completa: todos los años, filtros y originales ampliables', async () => {
  await go('vistas/galeria.html');
  assert.equal(await page.locator('.album-photo').count(), 22);
  await page.locator('[data-year-filter="2025"]').click();
  assert.equal(await page.locator('.album-photo:visible').count(), 7);
  await page.locator('[data-year-filter="2016"]').click();
  assert.equal(await page.locator('.album-photo:visible').count(), 1);
  await page.locator('.album-photo:visible a').click();
  assert.ok(await page.locator('#image-dialog').isVisible());
  await page.keyboard.press('Escape');
  await page.locator('[data-year-filter="todos"]').click();
  assert.equal(await page.locator('.album-photo:visible').count(), 22);
});
await test('Programa: módulos, requisitos, video diferido y enlace de inscripción', async () => {
  await go('vistas/PNL.html');
  assert.equal(await page.locator('iframe').count(), 0);
  assert.equal(await page.locator('.module').count(), 4);
  const module = page.locator('.module').nth(2);
  await module.locator('summary').click();
  assert.ok(await module.evaluate((e) => e.open));
  await module.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.ok(!(await module.evaluate((e) => e.open)));
  assert.equal(await page.locator('#requisitos').count(), 1);
  await page.route('https://www.youtube-nocookie.com/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><html lang="es"><title>Simulación de proveedor en prueba</title><p>Inserción comprobada sin acceder al proveedor.</p></html>',
    }),
  );
  await page.locator('[data-play-video]').click();
  assert.equal(await page.locator('iframe').count(), 1);
  assert.match(
    await page.locator('iframe').getAttribute('src'),
    /youtube-nocookie.com\/embed\/PT6zEhrBaI0/,
  );
  await page.unroute('https://www.youtube-nocookie.com/**');
  await page.locator('.course-hero .button-primary').click();
  assert.match(page.url(), /inscripcion.html\?programa=pnl/);
  assert.equal(await page.locator('[name="programa"]').inputValue(), 'pnl');
});
await test('Formulario: errores, preparación local, sin fetch ni credenciales almacenadas', async () => {
  await go('vistas/inscripcion.html?programa=pnl&motivo=beca');
  const requests = [];
  const listener = (req) => {
    if (['xhr', 'fetch'].includes(req.resourceType())) requests.push(req.url());
  };
  page.on('request', listener);
  await page.locator('.form-submit').click();
  assert.equal(await page.locator('[name="nombre"]').getAttribute('aria-invalid'), 'true');
  await page.locator('[name="nombre"]').fill('Persona de prueba');
  await page.locator('[name="correo"]').fill('correo-no-valido');
  await page.locator('[name="consentimiento"]').check();
  await page.locator('.form-submit').click();
  assert.equal(await page.locator('[name="correo"]').getAttribute('aria-invalid'), 'true');
  await page.locator('[name="correo"]').fill('prueba@example.org');
  await page.locator('[name="telefono"]').fill('+57 300 123 4567');
  await page
    .locator('[name="mensaje"]')
    .fill('Deseo información sobre becas. <img src=x onerror="window.xss=true">');
  const beforeURL = page.url();
  await page.locator('.form-submit').click();
  assert.ok(await page.locator('[data-message-result]').isVisible());
  assert.match(await page.locator('[data-form-status]').innerText(), /Aún no se ha enviado/);
  assert.equal(page.url(), beforeURL);
  assert.match(await page.locator('[data-message-preview]').inputValue(), /<img src=x/);
  assert.equal(await page.evaluate(() => window.xss), undefined);
  assert.ok(
    (await page.locator('[data-mail-link]').getAttribute('href')).startsWith(
      'mailto:contacto@fundacionunimana.com?',
    ),
  );
  assert.equal(requests.length, 0);
  assert.ok(
    !(await page.evaluate(() => JSON.stringify(localStorage))).includes('Persona de prueba'),
  );
  page.off('request', listener);
  const download = page.waitForEvent('download');
  await page.locator('[data-download-message]').click();
  const downloaded = await download;
  assert.equal(downloaded.suggestedFilename(), 'consulta-unimana.txt');
  const text = await fs.readFile(await downloaded.path(), 'utf8');
  assert.match(text, /Persona de prueba/);
  await page.locator('[data-copy-message]').click();
  assert.ok((await page.locator('[data-copy-status]').innerText()).length > 0);
  await page.locator('[name="nombre"]').fill('Otra persona');
  assert.ok(!(await page.locator('[data-message-result]').isVisible()));
  await page.locator('.form-submit').click();
  await page.locator('[type="reset"]').click();
  assert.equal(await page.locator('[name="nombre"]').inputValue(), '');
  assert.ok(!(await page.locator('[data-message-result]').isVisible()));
});
await test('Registro / ingreso: campos deshabilitados, sin sesión simulada', async () => {
  for (const file of ['ingreso', 'registro']) {
    await go(`vistas/${file}.html`);
    assert.ok(await page.locator('[data-auth-form] fieldset').evaluate((e) => e.disabled));
    assert.equal(await page.locator('[data-auth-form] input:not(:disabled)').count(), 0);
    assert.ok(await page.locator('.auth-submit').isDisabled());
    assert.match(
      await page.locator('#auth-notice').innerText(),
      /No se solicitan ni se guardan credenciales/,
    );
    assert.equal(await page.locator('a[href*="accounts.google"],a[href*="forms.gle"]').count(), 0);
  }
});
await test('Página 404 real y recursos accesibles en rutas desconocidas', async () => {
  const response = await page.goto(url + '/vistas/pagina-inexistente-prueba.html');
  assert.equal(response.status(), 404);
  assert.match(await page.locator('h1').innerText(), /cambió de dirección/);
  assert.ok(
    (
      await page
        .locator('link[rel="stylesheet"]')
        .evaluateAll((links) => links.map((link) => link.getAttribute('href')))
    ).every((href) => href.startsWith('/')),
  );
});
// Móvil y teclado con contexto independiente.
const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  reducedMotion: 'reduce',
});
const mobile = await mobileContext.newPage();
mobile.setDefaultTimeout(8000);
mobile.on('pageerror', (error) => report.javascriptErrors.push('Móvil: ' + error.message));
await test('Menú móvil: modal, navegación interna y cierre al seleccionar', async () => {
  await mobile.goto(url + '/vistas/PNL.html');
  await mobile.locator('[data-open-menu]').click();
  assert.ok(await mobile.locator('#mobile-menu').isVisible());
  await mobile.locator('#mobile-menu a[href="../index.html#historia"]').click();
  assert.match(mobile.url(), /index.html#historia/);
  assert.ok(!(await mobile.locator('#mobile-menu').isVisible()));
  const position = await mobile.locator('#historia').evaluate((e) => e.getBoundingClientRect().top);
  assert.ok(position >= 70 && position < 200, `Ancla incorrecta ${position}`);
  await mobile.locator('[data-open-menu]').click();
  await mobile.keyboard.press('Escape');
  assert.ok(!(await mobile.locator('#mobile-menu').isVisible()));
});
await test('Movimiento reducido del dispositivo: ondas estáticas y carrusel manual', async () => {
  await mobile.goto(url + '/');
  assert.equal(
    await mobile
      .locator('.wave-front')
      .first()
      .evaluate((e) => getComputedStyle(e).animationName),
    'none',
  );
  assert.ok(await mobile.locator('.gallery-play').isDisabled());
  assert.ok(await mobile.locator('[data-motion-toggle]').isDisabled());
});
await test('Sin JavaScript: navegación, catálogo y protección de formularios', async () => {
  const noJS = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  const p = await noJS.newPage();
  await p.goto(url + '/');
  assert.equal(await p.locator('[data-program-card]:visible').count(), 18);
  assert.ok(await p.locator('h1').isVisible());
  assert.ok(await p.locator('.form-submit').isDisabled());
  await p.goto(url + '/vistas/PNL.html');
  assert.equal(await p.locator('.module').count(), 4);
  await p.locator('.module').nth(1).locator('summary').click();
  assert.ok(
    await p
      .locator('.module')
      .nth(1)
      .evaluate((e) => e.open),
  );
  await p.locator('#rocket-btn').click();
  assert.equal(await p.evaluate(() => scrollY), 0);
  assert.match(p.url(), /#arriba$/);
  await noJS.close();
});
await test('Navbar primero, sin CTA duplicado y con ingreso disponible en móvil', async () => {
  for (const width of [1440, 1131, 1024, 760, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await go();
    assert.equal(await page.locator('.topbar').count(), 0);
    assert.equal(
      await page.locator('.site-header').evaluate((e) => e.getBoundingClientRect().top),
      0,
    );
    assert.equal(await page.locator('.site-header a[href$="ingreso.html"]').count(), 1);
    assert.ok(await page.locator('.site-header .login-link').isVisible());
    assert.equal(
      await page
        .locator('#mobile-menu a[href$="ingreso.html"],.site-header a[href$="inscripcion.html"]')
        .count(),
      0,
    );
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await go('vistas/ingreso.html');
  assert.ok(await page.locator('.account-form-panel a[href="inscripcion.html"]').isVisible());
});
await test('Empezar ahora: efecto original y destino al catálogo', async () => {
  await go();
  const button = page.locator('.hero .futuristic-button');
  assert.equal(await button.getAttribute('href'), '#seccion-destino');
  assert.match(await button.innerText(), /EMPEZAR AHORA/i);
  assert.notEqual(await button.evaluate((e) => getComputedStyle(e).boxShadow), 'none');
  await button.click();
  await page.waitForFunction(
    () =>
      Math.abs(document.querySelector('#seccion-destino').getBoundingClientRect().top - 112) < 5,
  );
});
await test('Olas y moneda originales: animación real, tres velocidades y pausa accesible', async () => {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'no-preference',
  });
  const p = await ctx.newPage();
  await p.goto(url + '/');
  const paths = p.locator('.hero-waves path');
  assert.deepEqual(
    await paths.evaluateAll((es) => es.map((e) => getComputedStyle(e).animationDuration)),
    ['10s', '8s', '6s'],
  );
  const before = await paths.evaluateAll((es) => es.map((e) => getComputedStyle(e).transform));
  await p.waitForTimeout(350);
  const after = await paths.evaluateAll((es) => es.map((e) => getComputedStyle(e).transform));
  assert.notDeepEqual(before, after);
  assert.equal(
    await p.locator('.hero-waves .wave-front').evaluate((e) => getComputedStyle(e).opacity),
    '1',
  );
  assert.equal(
    await p.locator('.whatsapp-coin').evaluate((e) => getComputedStyle(e).animationName),
    'flip-coin',
  );
  assert.equal(
    await p.locator('.whatsapp-float').evaluate((e) => getComputedStyle(e).animationName),
    'coin-glow',
  );
  assert.match(await p.locator('.coin-back img').getAttribute('src'), /logovacacional/);
  const front = await p.locator('.whatsapp-coin').evaluate((e) => {
    const a = e.getAnimations()[0];
    a.pause();
    a.currentTime = 0;
    return getComputedStyle(e).transform;
  });
  const back = await p.locator('.whatsapp-coin').evaluate((e) => {
    e.getAnimations()[0].currentTime = 3600;
    return getComputedStyle(e).transform;
  });
  assert.notEqual(front, back);
  await p.locator('[data-motion-toggle]').click();
  assert.equal(await paths.first().evaluate((e) => getComputedStyle(e).animationName), 'none');
  assert.equal(
    await p.locator('.whatsapp-coin').evaluate((e) => getComputedStyle(e).animationName),
    'none',
  );
  await ctx.close();
});
await test('Cian exacto, año luminoso e iconos sociales originales con color de cada app', async () => {
  await go();
  assert.equal(
    await page
      .locator('html')
      .evaluate((e) => getComputedStyle(e).getPropertyValue('--primary').replace(/\s/g, '')),
    'rgb(115,226,254)',
  );
  assert.notEqual(
    await page.locator('#carouselYear').evaluate((e) => getComputedStyle(e).textShadow),
    'none',
  );
  for (const [name, color] of [
    ['facebook', 'rgb(24, 119, 242)'],
    ['youtube', 'rgb(255, 0, 0)'],
    ['whatsapp', 'rgb(37, 211, 102)'],
  ]) {
    const link = page.locator('.social-links .' + name);
    assert.equal(await link.locator('svg').getAttribute('viewBox'), '0 0 16 16');
    await link.hover();
    await page.waitForTimeout(350);
    assert.equal(await link.evaluate((e) => getComputedStyle(e).color), color);
    assert.match(await link.evaluate((e) => getComputedStyle(e).filter), /drop-shadow/);
  }
});
await test('Cohete original: 50 estrellas, regreso arriba sin cambiar de página y limpieza', async () => {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'no-preference',
  });
  const p = await ctx.newPage();
  await p.goto(url + '/vistas/PNL.html');
  const before = p.url();
  await p.locator('#rocket-btn').click();
  assert.equal(await p.locator('.star').count(), 50);
  await p.waitForFunction(() => scrollY < 2);
  assert.equal(p.url(), before);
  assert.ok(await p.locator('.site-header .brand').evaluate((e) => document.activeElement === e));
  await p.waitForFunction(() => !document.querySelector('.star'));
  await p.emulateMedia({ reducedMotion: 'reduce' });
  await p.locator('#rocket-btn').click();
  assert.equal(await p.locator('.star').count(), 0);
  assert.equal(await p.evaluate(() => scrollY), 0);
  await ctx.close();
});
await test('Ingreso sin fondo ni borde; sin barra móvil y WhatsApp a 20 px del borde', async () => {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const p = await ctx.newPage();
  await p.goto(url + '/');
  for (const width of [1440, 390, 320]) {
    await p.setViewportSize({ width, height: 844 });
    const login = await p.locator('.site-header .login-link').evaluate((e) => {
      const s = getComputedStyle(e);
      return { background: s.backgroundColor, border: s.borderTopWidth };
    });
    assert.equal(login.background, 'rgba(0, 0, 0, 0)');
    assert.equal(login.border, '0px');
    assert.equal(await p.locator('.mobile-cta').count(), 0);
    if (width < 761) {
      const bottom = await p
        .locator('.whatsapp-float')
        .evaluate((e) => innerHeight - e.getBoundingClientRect().bottom);
      assert.ok(Math.abs(bottom - 20) < 1, String(bottom));
      assert.ok(
        await p
          .locator('.site-footer')
          .evaluate((e) => parseFloat(getComputedStyle(e).paddingBottom) < 30),
      );
    }
  }
  await ctx.close();
});
await test('Aquí: oleada por letra, subrayado intacto, pausa y búsqueda sin perder el efecto', async () => {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'no-preference',
  });
  const p = await ctx.newPage();
  p.setDefaultTimeout(8000);
  await p.goto(url + '/');
  await p.evaluate(() => document.fonts.ready);
  const word = p.locator('[data-animated-word]');
  assert.equal(await word.locator('.hero-wave-letter').count(), 4);
  assert.equal(
    await p
      .getByRole('heading', { level: 1, name: 'Un futuro brillante empieza aquí.', exact: true })
      .count(),
    1,
  );
  const line = word.locator('svg');
  const before = await line.boundingBox();
  const path = await line.locator('path').getAttribute('d');
  for (const letter of ['a', 'q', 'u', 'í'])
    await p.waitForFunction(
      (value) => document.querySelector('.hero-wave-letter.is-wave-active')?.textContent === value,
      letter,
    );
  assert.deepEqual(await line.boundingBox(), before);
  assert.equal(
    await word
      .locator('.hero-wave-letter')
      .first()
      .evaluate((e) => getComputedStyle(e).color),
    await word.evaluate((e) => getComputedStyle(e).color),
  );
  await p.locator('[data-motion-toggle]').click();
  await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await p.waitForTimeout(400);
  assert.equal(await word.locator('.is-wave-active').count(), 0);
  await p.locator('[data-motion-toggle]').click();
  await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await p.waitForFunction(() => document.querySelector('.hero-wave-letter.is-wave-active'));
  await p.emulateMedia({ reducedMotion: 'reduce' });
  await p.waitForTimeout(100);
  assert.equal(await word.locator('.is-wave-active').count(), 0);
  await p.locator('[data-open-search]').click();
  await p.locator('#site-search').fill('aqui');
  await p.locator('#search-on-page').click();
  assert.equal(await p.locator('mark.highlight-search [data-animated-word]').count(), 1);
  await p.locator('#page-search-close').click();
  assert.equal(await word.locator('.hero-wave-letter').count(), 4);
  assert.equal(await line.locator('path').getAttribute('d'), path);
  await p.emulateMedia({ reducedMotion: 'no-preference' });
  await p.waitForFunction(() => document.querySelector('.hero-wave-letter.is-wave-active'));
  await ctx.close();
});
await test('Apertura file://: Manrope y DM Sans cargadas sin errores CORS ni peticiones WOFF2', async () => {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const p = await ctx.newPage();
  const errors = [],
    failed = [],
    fontRequests = [];
  p.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  p.on('pageerror', (error) => errors.push(error.message));
  p.on('requestfailed', (request) => failed.push(request.url()));
  p.on('request', (request) => {
    if (request.url().endsWith('.woff2')) fontRequests.push(request.url());
  });
  for (const file of [
    'index.html',
    'vistas/PNL.html',
    'vistas/ingreso.html',
    'vistas/inscripcion.html',
  ]) {
    await p.goto(pathToFileURL(path.join(root, file)).href);
    await p.evaluate(() => document.fonts.ready);
    const fonts = await p.evaluate(() =>
      [...document.fonts].map((font) => ({ family: font.family, status: font.status })),
    );
    for (const family of ['Manrope', 'DM Sans'])
      assert.ok(
        fonts.some((font) => font.family.includes(family) && font.status === 'loaded'),
        file + ': ' + JSON.stringify(fonts),
      );
    assert.equal(await p.locator('link[as="font"]').count(), 0);
    assert.ok(await p.evaluate(() => window.UNIMANA_APP_READY));
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(failed, []);
  assert.deepEqual(fontRequests, []);
  await ctx.close();
  const noJS = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const offline = await noJS.newPage();
  await offline.goto(pathToFileURL(path.join(root, 'index.html')).href);
  await offline.evaluate(() => document.fonts.ready);
  assert.ok(
    await offline.evaluate(
      () =>
        [...document.fonts].length === 2 &&
        [...document.fonts].every((font) => font.status === 'loaded'),
    ),
  );
  await noJS.close();
});
// TAMAÑOS DE LECTURA. Comprueba los estilos reales, no solo los valores escritos en el CSS.
await test('Tipografía: párrafos, subtítulos, notas y campos legibles en escritorio y móvil', async () => {
  const cases = [
    [
      'index.html',
      [
        ['.hero-description', 17],
        ['.benefit p', 16],
        ['.program-card p', 16],
        ['.benefit h3', 18],
        ['.small-note', 14],
        ['.photo-credit', 14],
        ['.field input, .field textarea, .field select', 16],
        ['.field > label', 15],
      ],
    ],
    [
      'vistas/PNL.html',
      [
        ['.course-tagline', 18],
        ['.course-intro', 17],
        ['.module strong', 18],
        ['.module small', 16],
        ['.small-note', 14],
      ],
    ],
    [
      'vistas/inscripcion.html',
      [
        ['.form-title p', 16],
        ['.field input, .field textarea, .field select', 16],
        ['.field > label', 15],
        ['.small-note', 14],
      ],
    ],
    [
      'vistas/ingreso.html',
      [
        ['.account-form-panel > p', 17],
        ['.field input', 16],
        ['.field > label', 15],
        ['.small-note', 14],
      ],
    ],
    [
      'vistas/privacidad.html',
      [
        ['.legal-content > p:not(.small-note)', 17],
        ['.small-note', 14],
      ],
    ],
  ];
  for (const [file, checks] of cases) {
    await go(file);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      const body = await page.locator('body').evaluate((e) => ({
        size: parseFloat(getComputedStyle(e).fontSize),
        weight: parseFloat(getComputedStyle(e).fontWeight),
      }));
      assert.equal(body.size, width === 1440 ? 18 : 17, file);
      assert.ok(body.weight >= 450, 'El texto general perdió su peso de lectura');
      for (const [selector, minimum] of checks) {
        const sizes = await page
          .locator(selector)
          .evaluateAll((nodes) => nodes.map((e) => parseFloat(getComputedStyle(e).fontSize)));
        assert.ok(sizes.length, `${file}: no se encontró ${selector}`);
        assert.ok(
          sizes.every((size) => size >= minimum),
          `${file} · ${width}px · ${selector}: ${sizes}`,
        );
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
});

// Estos valores se midieron antes de aumentar los párrafos. null deja libres los subtítulos pequeños.
await test('Los títulos principales conservan sus tamaños anteriores y la fuente Manrope', async () => {
  const cases = [
    [
      'index.html',
      [
        [1440, [27, 74, 28, 44, 43, 40, 49, 44, 44, 44]],
        [390, [null, 57, 34, 34, 34, 34, 39, 34, 34, 36]],
        [320, [null, 49, 31, 31, 31, 31, 39, 31, 31, 36]],
      ],
    ],
    [
      'vistas/PNL.html',
      [
        [1440, [27, 57, 29, 29, 29, 29, 29, 26, 29, 29, 26, 33]],
        [390, [null, 36, 27, 27, 27, 27, 27, 25, 27, 27, 30, 34]],
        [320, [null, 33, 27, 27, 27, 27, 27, 25, 27, 27, 30, 31]],
      ],
    ],
    [
      'vistas/inscripcion.html',
      [
        [1440, [27, 49, null, null, null, 44, 44]],
        [390, [null, 37, null, null, null, 34, 36]],
        [320, [null, 33, null, null, null, 34, 36]],
      ],
    ],
  ];
  for (const [file, widths] of cases) {
    await go(file);
    for (const [width, expected] of widths) {
      await page.setViewportSize({ width, height: 1000 });
      const headings = await page.locator('h1,h2').evaluateAll((nodes) =>
        nodes.map((e) => ({
          size: parseFloat(getComputedStyle(e).fontSize),
          family: getComputedStyle(e).fontFamily,
        })),
      );
      expected.forEach((size, i) => {
        if (size === null) return;
        assert.equal(headings[i].size, size, `${file} · ${width}px · título ${i}`);
        assert.ok(headings[i].family.includes('Manrope'), `${file}: cambió la fuente del título`);
      });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
});

await test('Texto ampliado: foto y tarjeta sin superposiciones, tarjetas sin recortes ni desbordamiento', async () => {
  await go();
  for (const width of [1440, 1131, 1024, 820, 760, 550, 390, 375, 360, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const layout = await page.evaluate(() => {
      const note = document.querySelector('.hero-note').getBoundingClientRect();
      const credit = document.querySelector('.photo-credit').getBoundingClientRect();
      const descriptions = [...document.querySelectorAll('.program-card:not([hidden]) p')];
      return {
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
        gap: credit.top - note.bottom,
        clipped: descriptions.filter((e) => e.scrollHeight > e.clientHeight + 1).length,
      };
    });
    assert.ok(layout.document <= layout.viewport + 1, `Desbordamiento: ${JSON.stringify(layout)}`);
    assert.ok(layout.gap >= 10, `La tarjeta tapa el crédito de la foto a ${width}px`);
    assert.equal(layout.clipped, 0, `Hay descripciones recortadas a ${width}px`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
});

await test('Accesibilidad WCAG 2.1 A/AA: plantillas en claro y oscuro', async () => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const file of [
    'index.html',
    'vistas/PNL.html',
    'vistas/pedagogia.html',
    'vistas/inscripcion.html',
    'vistas/ingreso.html',
    'vistas/registro.html',
    'vistas/galeria.html',
    'vistas/privacidad.html',
  ]) {
    await go(file);
    for (const theme of ['light', 'dark']) {
      await page.evaluate((theme) => {
        document.documentElement.dataset.theme = theme;
        return new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        );
      }, theme);
      await axe(page, `${file} · ${theme} · 1440px`);
    }
  }
});
await test('Accesibilidad WCAG 2.1 A/AA: móvil y diálogos', async () => {
  for (const file of [
    'index.html',
    'vistas/PNL.html',
    'vistas/inscripcion.html',
    'vistas/ingreso.html',
  ]) {
    await mobile.goto(url + '/' + file);
    await axe(mobile, `${file} · 390px`);
  }
  await mobile.goto(url + '/');
  await mobile.locator('[data-open-menu]').click();
  await axe(mobile, 'Menú móvil abierto');
  await mobile.keyboard.press('Escape');
  await mobile.locator('[data-open-search]').click();
  await mobile.locator('#site-search').fill('becas');
  await axe(mobile, 'Búsqueda móvil abierta');
  await mobile.keyboard.press('Escape');
});
await test('Sin errores JavaScript, recursos fallidos ni dependencias externas al cargar', async () => {
  assert.equal(report.javascriptErrors.length, 0, JSON.stringify(report.javascriptErrors));
  assert.equal(
    report.unexpectedAssetErrors.length,
    0,
    JSON.stringify(report.unexpectedAssetErrors),
  );
  assert.equal(
    report.externalRequestsBeforeVideo.length,
    0,
    JSON.stringify(report.externalRequestsBeforeVideo),
  );
});
// Guarda el informe final y cierra el navegador, incluso si alguna prueba falló.
report.passed = report.tests.every((test) => test.passed);
await fs.writeFile(
  path.join(root, 'docs/pruebas-navegador.json'),
  JSON.stringify(report, null, 2) + '\n',
);
await browser.close();
console.log(
  `${report.tests.filter((t) => t.passed).length}/${report.tests.length} pruebas correctas. ${report.accessibility.length} auditorías de accesibilidad ejecutadas.`,
);
if (!report.passed) process.exitCode = 1;
