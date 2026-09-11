/* UNIMANÁ · Interacciones nativas compartidas en todas las páginas.
   Sin backend, analítica, registro externo, contraseñas locales ni envíos simulados.
   Todo dato introducido por el visitante se inserta con textContent/value, nunca como HTML. */
(() => {
  'use strict';
  if (window.UNIMANA_APP_READY) return;
  window.UNIMANA_APP_READY = true;
  // ATAJOS. $ busca un elemento; $$ devuelve una lista de elementos.
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const root = document.documentElement;
  const base = document.body.dataset.root || '';
  // Busca sin distinguir mayúsculas ni tildes; los textos originales no se modifican.
  const normalize = (value) =>
    String(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  // Respeta la preferencia del sistema para reducir las animaciones.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionOff = () => reduced.matches || root.dataset.motion === 'off';
  const scrollBehavior = () => (motionOff() ? 'instant' : 'smooth');
  // Guarda únicamente tema y movimiento. Nunca datos del formulario ni contraseñas.
  const store = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Navegación privada: la preferencia solo vive en la página. */
    }
  };
  // Pequeños dibujos para cambiar entre reproducir y pausar.
  const icons = {
    play: '<path d="m8 4 12 8-12 8V4Z"></path>',
    pause: '<path d="M8 4v16M16 4v16"></path>',
  };
  // Cambia solo el dibujo de un botón, sin reemplazar el propio botón.
  const setIcon = (button, name) => {
    const svg = $('svg', button);
    if (svg && icons[name]) svg.innerHTML = icons[name];
  };
  // TEMA CLARO U OSCURO. Actualiza el nombre accesible y el estado de los botones.
  const updateThemeButtons = () => {
    const dark = root.dataset.theme === 'dark';
    document.body.classList.toggle('dark-mode', dark);
    $$('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', `Activar modo ${dark ? 'claro' : 'oscuro'}`);
      button.title = `Activar modo ${dark ? 'claro' : 'oscuro'}`;
    });
  };
  updateThemeButtons();
  $$('[data-theme-toggle]').forEach((button) =>
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      store('theme', root.dataset.theme);
      updateThemeButtons();
    }),
  );
  // PAUSA DE EFECTOS. Mantiene sincronizados los controles y las animaciones.
  const updateMotion = () => {
    $$('[data-motion-toggle]').forEach((button) => {
      const off = motionOff();
      button.setAttribute('aria-pressed', String(off));
      $('span', button).textContent = reduced.matches
        ? 'Movimiento reducido'
        : off
          ? 'Reanudar animaciones'
          : 'Pausar animaciones';
      setIcon(button, off ? 'play' : 'pause');
      button.disabled = reduced.matches;
      button.title = reduced.matches
        ? 'Se respeta la preferencia de movimiento reducido de tu dispositivo.'
        : '';
    });
    document.dispatchEvent(new Event('unimana:motion'));
  };
  $$('[data-motion-toggle]').forEach((button) =>
    button.addEventListener('click', () => {
      root.dataset.motion = root.dataset.motion === 'off' ? 'on' : 'off';
      store('unimana-motion', root.dataset.motion);
      updateMotion();
    }),
  );
  reduced.addEventListener('change', updateMotion);
  updateMotion();
  $$('.site-footer [data-year]').forEach(
    (el) => (el.textContent = String(new Date().getFullYear())),
  );

  // Oleada original, limitada a «aquí»: una letra cada 150 ms, sin modificar el SVG.
  // El lector de pantalla lee la palabra completa; la animación se detiene fuera de vista.
  const animatedWord = $('[data-animated-word]');
  if (animatedWord) {
    const letters = $$('.hero-wave-letter', animatedWord);
    let timer = null,
      index = 0,
      visible = !('IntersectionObserver' in window);
    // Quita el efecto de todas las letras para comenzar o detener una pasada.
    const clearLetters = () =>
      letters.forEach((letter) => letter.classList.remove('is-wave-active'));
    // Cancela la espera pendiente. Así no queda una animación trabajando a escondidas.
    const stopWord = () => {
      clearTimeout(timer);
      timer = null;
      index = 0;
      clearLetters();
    };
    // Activa una letra por vez y espera un momento al terminar la palabra.
    function nextLetter() {
      timer = null;
      if (!visible || document.hidden || motionOff()) {
        stopWord();
        return;
      }
      clearLetters();
      if (index < letters.length) {
        letters[index++].classList.add('is-wave-active');
        timer = setTimeout(nextLetter, 150);
      } else {
        index = 0;
        timer = setTimeout(nextLetter, 1200);
      }
    }
    // Arranca la oleada solo si la palabra está visible y se permite el movimiento.
    const syncWord = () => {
      stopWord();
      if (visible && !document.hidden && !motionOff()) nextLetter();
    };
    if ('IntersectionObserver' in window) {
      const wordObserver = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        syncWord();
      });
      wordObserver.observe(animatedWord);
    }
    document.addEventListener('unimana:motion', syncWord);
    document.addEventListener('visibilitychange', syncWord);
    window.addEventListener('pagehide', stopWord);
    window.addEventListener('pageshow', syncWord);
    syncWord();
  }

  // Diálogos nativos: foco contenido, Escape, cierre exterior y devolución del foco.
  const dialogTriggers = new WeakMap();
  // Cierra la ventana solo si está abierta.
  const closeDialog = (dialog) => {
    if (dialog?.open) dialog.close();
  };
  // Abre la ventana y recuerda el control que la abrió para devolverle el foco.
  const openDialog = (dialog, focusElement) => {
    if (!dialog || dialog.open) return;
    $$('dialog[open]').forEach(closeDialog);
    dialogTriggers.set(dialog, document.activeElement);
    dialog.showModal();
    document.body.classList.add('dialog-open');
    if (focusElement) focusElement.focus();
  };
  $$('dialog').forEach((dialog) => {
    $$('[data-close-dialog]', dialog).forEach((button) =>
      button.addEventListener('click', () => closeDialog(dialog)),
    );
    dialog.addEventListener('close', () => {
      if (!$('dialog[open]')) document.body.classList.remove('dialog-open');
      const trigger = dialogTriggers.get(dialog);
      if (trigger?.isConnected && !trigger.disabled) trigger.focus({ preventScroll: true });
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        closeDialog(dialog);
    });
  });
  // MENÚ DEL TELÉFONO. Usa el mismo sistema de apertura y cierre de ventanas.
  const mobileMenu = $('#mobile-menu');
  $$('[data-open-menu]').forEach((button) =>
    button.addEventListener('click', () => openDialog(mobileMenu)),
  );
  $$('a', mobileMenu).forEach((link) =>
    link.addEventListener('click', () => closeDialog(mobileMenu)),
  );
  window.matchMedia('(min-width: 1131px)').addEventListener('change', (event) => {
    if (event.matches) closeDialog(mobileMenu);
  });
  // MENÚ DE PROGRAMAS. También se puede cerrar con Escape o al hacer clic fuera.
  const mega = $('.program-menu');
  if (mega) {
    // Cierra la lista de programas al pulsar fuera de ella.
    document.addEventListener('click', (event) => {
      if (mega.open && !mega.contains(event.target)) mega.open = false;
    });
    mega.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mega.open) {
        event.preventDefault();
        mega.open = false;
        $('summary', mega).focus();
      }
    });
    mega.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!mega.contains(document.activeElement)) mega.open = false;
      }, 0);
    });
    $$('a', mega).forEach((link) =>
      link.addEventListener('click', () => {
        mega.open = false;
      }),
    );
  }

  // Búsqueda del sitio: índice estático propio, sin consultas de red.
  const searchDialog = $('#search-dialog');
  const searchInput = $('#site-search');
  const searchResults = $('#search-results');
  const searchStatus = $('#search-status');
  const searchData = Array.isArray(window.UNIMANA_SEARCH) ? window.UNIMANA_SEARCH : [];
  // Filtra el índice local y crea los resultados como texto seguro, no como HTML del usuario.
  function renderSearch() {
    const query = normalize(searchInput.value);
    const terms = query.split(/\s+/).filter(Boolean);
    let results = searchData.filter((item) =>
      terms.every((term) =>
        normalize(`${item.title} ${item.label} ${item.description}`).includes(term),
      ),
    );
    if (query)
      results.sort(
        (a, b) =>
          Number(normalize(b.title).includes(query)) - Number(normalize(a.title).includes(query)),
      );
    const total = results.length;
    results = results.slice(0, query ? 12 : 6);
    searchResults.replaceChildren();
    searchStatus.textContent = query
      ? total
        ? `${total} resultado${total === 1 ? '' : 's'}${total > 12 ? '; mostrando los primeros 12' : ''}.`
        : 'No encontramos coincidencias.'
      : 'Explora programas e información de UNIMANÁ.';
    if (!results.length) {
      const li = document.createElement('li');
      li.className = 'search-empty';
      li.textContent =
        'Prueba con otra palabra, como «educación», «becas» o «contacto». También puedes buscar dentro de esta página.';
      searchResults.append(li);
      return;
    }
    results.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'search-result';
      const link = document.createElement('a');
      link.href = base + item.url;
      const text = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = item.title;
      const label = document.createElement('span');
      label.textContent = item.label;
      const description = document.createElement('p');
      description.textContent = item.description;
      text.append(title, label, description);
      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden', 'true');
      link.append(text, arrow);
      li.append(link);
      searchResults.append(li);
      link.addEventListener('click', () => closeDialog(searchDialog));
    });
  }
  // Abre el buscador, actualiza los resultados y coloca el cursor en el campo.
  function showSearch() {
    if (mega) mega.open = false;
    renderSearch();
    openDialog(searchDialog, searchInput);
  }
  $$('[data-open-search]').forEach((button) => button.addEventListener('click', showSearch));
  searchInput?.addEventListener('input', renderSearch);
  $('#site-search-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    renderSearch();
    $('a', searchResults)?.focus();
  });
  searchInput?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      $('a', searchResults)?.focus();
    }
  });
  searchResults?.addEventListener('keydown', (event) => {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    const links = $$('a', searchResults);
    const current = links.indexOf(document.activeElement);
    event.preventDefault();
    if (event.key === 'ArrowUp' && current <= 0) searchInput.focus();
    else
      links[
        Math.min(links.length - 1, Math.max(0, current + (event.key === 'ArrowDown' ? 1 : -1)))
      ]?.focus();
  });
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      showSearch();
    }
  });

  // Búsqueda dentro de la página (se conserva y mejora el resaltado original).
  let pageMatches = [],
    currentPageMatch = -1;
  // Quita las marcas amarillas sin destruir los enlaces, las letras ni sus eventos.
  function clearHighlights() {
    $$('.highlight-search').forEach((mark) => {
      const parent = mark.parentNode;
      mark.replaceWith(...mark.childNodes);
      parent?.normalize();
    });
    pageMatches = [];
    currentPageMatch = -1;
  }
  // Va a una coincidencia y abre sus detalles si estaba dentro de un bloque cerrado.
  function selectPageMatch(index) {
    if (!pageMatches.length) return;
    pageMatches.forEach((mark) => mark.classList.remove('current'));
    currentPageMatch = (index + pageMatches.length) % pageMatches.length;
    const mark = pageMatches[currentPageMatch];
    let details = mark.closest('details');
    while (details) {
      details.open = true;
      details = details.parentElement.closest('details');
    }
    mark.classList.add('current');
    mark.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
    $('#page-search-status').textContent =
      `Coincidencia ${currentPageMatch + 1} de ${pageMatches.length}.`;
  }
  // Marca coincidencias en el contenido. No busca dentro de scripts ni controles.
  function searchOnPage(term) {
    clearHighlights();
    const normalizedTerm = normalize(term);
    if (!normalizedTerm) return;
    // Las letras animadas se resaltan como una palabra completa, sin perder su estructura.
    $$('[data-animated-word]', $('#contenido-principal')).forEach((word) => {
      if (!normalize($('.sr-only', word)?.textContent || '').includes(normalizedTerm)) return;
      const mark = document.createElement('mark');
      mark.className = 'highlight-search';
      word.before(mark);
      mark.append(word);
      pageMatches.push(mark);
    });
    const walker = document.createTreeWalker($('#contenido-principal'), NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (
          !parent ||
          parent.closest(
            'script,style,noscript,svg,button,input,select,option,textarea,label,nav,.sr-only,[aria-hidden="true"],[hidden],[data-contact-form],[data-animated-word]',
          )
        )
          return NodeFilter.FILTER_REJECT;
        return normalize(node.nodeValue).includes(normalizedTerm)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach((textNode) => {
      const text = textNode.nodeValue;
      // Normalización sin trim para mantener los índices del texto original en español.
      const plain = text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      const fragment = document.createDocumentFragment();
      let offset = 0,
        found = plain.indexOf(normalizedTerm);
      if (found < 0) return;
      while (found !== -1 && pageMatches.length < 200) {
        fragment.append(document.createTextNode(text.slice(offset, found)));
        const mark = document.createElement('mark');
        mark.className = 'highlight-search';
        mark.textContent = text.slice(found, found + normalizedTerm.length);
        fragment.append(mark);
        pageMatches.push(mark);
        offset = found + normalizedTerm.length;
        found = plain.indexOf(normalizedTerm, offset);
      }
      fragment.append(document.createTextNode(text.slice(offset)));
      textNode.replaceWith(fragment);
    });
    pageMatches.sort((a, b) =>
      a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
    $('#in-page-search').hidden = false;
    $('#page-search-next').disabled = !pageMatches.length;
    if (pageMatches.length) selectPageMatch(0);
    else
      $('#page-search-status').textContent =
        'No hay coincidencias en el contenido visible de esta página.';
  }
  $('#search-on-page')?.addEventListener('click', () => {
    if (!searchInput.value.trim()) {
      searchStatus.textContent = 'Escribe primero una palabra para buscar.';
      searchInput.focus();
      return;
    }
    closeDialog(searchDialog);
    searchOnPage(searchInput.value);
  });
  $('#page-search-next')?.addEventListener('click', () => selectPageMatch(currentPageMatch + 1));
  $('#page-search-close')?.addEventListener('click', () => {
    clearHighlights();
    $('#in-page-search').hidden = true;
    $('[data-open-search]')?.focus({ preventScroll: true });
  });

  // Catálogo: conserva todas las tarjetas en HTML y las filtra solo con JS.
  const catalog = $('#program-grid');
  if (catalog) {
    const cards = $$('[data-program-card]', catalog);
    const buttons = $$('[data-filter]');
    const input = $('#program-search');
    const allowed = new Set(['todos', ...cards.map((card) => card.dataset.category)]);
    const selected = new URLSearchParams(location.search).get('categoria');
    let category = allowed.has(selected) ? selected : 'profesionales';
    const names = {
      profesionales: 'Profesionales y técnicos',
      especializaciones: 'Especializaciones',
      maestrias: 'Maestrías',
      diplomados: 'Diplomados',
      todos: 'Todo el catálogo',
    };
    // Muestra las tarjetas que coinciden con la categoría y el texto.
    // La URL recuerda solo la categoría; no guarda datos personales.
    function applyFilters(updateURL = false) {
      const query = normalize(input.value),
        terms = query.split(/\s+/).filter(Boolean);
      let count = 0;
      cards.forEach((card) => {
        const matches =
          (category === 'todos' || card.dataset.category === category) &&
          terms.every((term) => normalize(card.dataset.search).includes(term));
        card.hidden = !matches;
        if (matches) count++;
      });
      buttons.forEach((button) => {
        const active = button.dataset.filter === category;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      $('.advice-card', catalog).hidden = count === 0 || query.length > 0;
      $('#catalog-empty').hidden = count > 0;
      $('#catalog-status').textContent =
        `${count} programa${count === 1 ? '' : 's'} · ${names[category]}${query ? ` · Búsqueda: «${input.value.trim()}»` : ''}`;
      if (updateURL) {
        try {
          const url = new URL(location.href);
          url.searchParams.set('categoria', category);
          history.replaceState(null, '', url);
        } catch {
          /* file:// o navegación restringida: el filtro sigue siendo funcional. */
        }
      }
    }
    buttons.forEach((button) =>
      button.addEventListener('click', () => {
        category = button.dataset.filter;
        applyFilters(true);
      }),
    );
    input.addEventListener('input', () => {
      if (input.value.trim()) category = 'todos';
      applyFilters();
    });
    $('#reset-filters').addEventListener('click', () => {
      input.value = '';
      category = 'todos';
      applyFilters(true);
      input.focus({ preventScroll: true });
    });
    window.addEventListener('popstate', () => {
      const cat = new URLSearchParams(location.search).get('categoria');
      category = allowed.has(cat) ? cat : 'profesionales';
      applyFilters();
    });
    applyFilters();
  }

  // Carrusel original completo, con control manual, teclado y reproducción opcional.
  const gallery = $('[data-gallery]');
  if (gallery) {
    const slides = $$('.gallery-slide', gallery);
    const thumbs = $$('[data-slide]', gallery);
    const thumbStrip = $('.gallery-thumbs', gallery);
    const playButton = $('.gallery-play', gallery);
    const status = $('[data-gallery-status]', gallery);
    let current = 0,
      playing = false,
      timer = null,
      inView = false;
    // Cancela el próximo cambio automático de fotografía.
    function stopTimer() {
      if (timer) clearInterval(timer);
      timer = null;
    }
    // Programa otra foto únicamente si se activó la reproducción y la galería está visible.
    function schedule() {
      stopTimer();
      if (playing && inView && !document.hidden && !motionOff())
        timer = setInterval(() => showSlide(current + 1), 6000);
    }
    // Muestra una foto, actualiza el año y selecciona su miniatura.
    // user indica que el cambio lo pidió la persona, no el reloj automático.
    function showSlide(index, user = false) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.hidden = i !== current;
      });
      thumbs.forEach((button, i) => {
        if (i === current) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });
      $('#carouselYear').textContent = slides[current].dataset.year;
      status.textContent = `Fotografía ${current + 1} de ${slides.length} · ${slides[current].dataset.year}`;
      const thumb = thumbs[current];
      const relativeOffset = thumb.offsetLeft - thumbs[0].offsetLeft;
      thumbStrip.scrollTo({
        left: Math.max(0, relativeOffset - thumbStrip.clientWidth / 2 + thumb.clientWidth / 2),
        behavior: user ? scrollBehavior() : 'instant',
      });
      if (inView) {
        const next = $('img', slides[(current + 1) % slides.length]);
        if (next) next.loading = 'eager';
      }
      if (user) setPlaying(false);
    }
    // Activa o pausa el carrusel y actualiza el botón para que anuncie su estado.
    function setPlaying(value) {
      playing = value && !motionOff();
      playButton.setAttribute('aria-pressed', String(playing));
      playButton.setAttribute(
        'aria-label',
        playing
          ? 'Pausar reproducción automática de la galería'
          : 'Reproducir galería automáticamente',
      );
      setIcon(playButton, playing ? 'pause' : 'play');
      status.setAttribute('aria-live', playing ? 'off' : 'polite');
      schedule();
    }
    $('.gallery-prev', gallery).addEventListener('click', () => showSlide(current - 1, true));
    $('.gallery-next', gallery).addEventListener('click', () => showSlide(current + 1, true));
    thumbs.forEach((button) =>
      button.addEventListener('click', () => showSlide(Number(button.dataset.slide), true)),
    );
    playButton.addEventListener('click', () => setPlaying(!playing));
    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showSlide(current + (event.key === 'ArrowLeft' ? -1 : 1), true);
      }
    });
    gallery.addEventListener('mouseenter', stopTimer);
    gallery.addEventListener('mouseleave', () => {
      if (!gallery.contains(document.activeElement)) schedule();
    });
    gallery.addEventListener('focusin', stopTimer);
    gallery.addEventListener('focusout', () =>
      setTimeout(() => {
        if (!gallery.contains(document.activeElement)) schedule();
      }, 0),
    );
    document.addEventListener('visibilitychange', () =>
      document.hidden ? stopTimer() : schedule(),
    );
    // Pausa las fotos si el sistema o la persona piden reducir movimiento.
    const galleryMotion = () => {
      playButton.disabled = motionOff();
      if (motionOff()) setPlaying(false);
    };
    document.addEventListener('unimana:motion', galleryMotion);
    galleryMotion();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        (entries) => {
          inView = entries[0].isIntersecting;
          inView ? schedule() : stopTimer();
        },
        { threshold: 0.1 },
      ).observe(gallery);
    } else {
      inView = true;
    }
    window.addEventListener('pagehide', stopTimer);
  }
  // Evita trabajo de animación fuera de pantalla, sin ocultar contenido.
  if ('IntersectionObserver' in window) {
    const waveObserver = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        $$('path', entry.target).forEach((path) => {
          path.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        });
      }),
    );
    $$('.section-wave').forEach((el) => waveObserver.observe(el));
  }
  // ÁLBUM POR AÑO. Oculta solo las fotos de otros años y anuncia cuántas quedan.
  const yearButtons = $$('[data-year-filter]');
  if (yearButtons.length)
    yearButtons.forEach((button) =>
      button.addEventListener('click', () => {
        const year = button.dataset.yearFilter;
        let count = 0;
        $$('[data-photo-year]').forEach((photo) => {
          photo.hidden = year !== 'todos' && photo.dataset.photoYear !== year;
          if (!photo.hidden) count++;
        });
        yearButtons.forEach((b) => {
          const active = b === button;
          b.classList.toggle('active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        $('#album-status').textContent =
          `${count} fotografía${count === 1 ? '' : 's'} · ${year === 'todos' ? 'Todo el archivo institucional' : year}`;
      }),
    );
  // FOTOGRAFÍA AMPLIADA. Usa el archivo original dentro de una ventana accesible.
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-lightbox]');
    if (!trigger) return;
    event.preventDefault();
    const url = new URL(trigger.dataset.lightbox, document.baseURI);
    if (!['http:', 'https:', 'file:'].includes(url.protocol) || url.origin !== location.origin)
      return;
    const caption = trigger.dataset.caption || 'Archivo institucional de UNIMANÁ';
    $('#lightbox-image').src = url.href;
    $('#lightbox-image').alt = caption;
    $('#lightbox-caption').textContent = caption;
    $('#lightbox-original').href = url.href;
    openDialog($('#image-dialog'));
  });

  // El video existente se conecta a YouTube solamente después de una acción explícita.
  $$('[data-play-video]').forEach((button) =>
    button.addEventListener('click', () => {
      const card = button.closest('[data-video-card]');
      if (!/^[a-zA-Z0-9_-]{11}$/.test(card.dataset.video)) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${card.dataset.video}?rel=0&autoplay=1`;
      iframe.title = 'Video institucional de la Fundación Cristiana El Maná · UNIMANÁ';
      iframe.width = '560';
      iframe.height = '315';
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      iframe.setAttribute('allowfullscreen', '');
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      card.replaceChildren(iframe);
      iframe.focus();
    }),
  );

  // Preparar una consulta NO es enviarla ni confirmar una matrícula.
  // Los datos personales viven solo en esta página: no se envían ni se guardan en el navegador.
  $$('[data-contact-form]').forEach((form) => {
    const fields = [...form.elements].filter(
      (element) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName) && element.name,
    );
    const status = $('[data-form-status]', form);
    const result = $('[data-message-result]', form);
    const preview = $('[data-message-preview]', form);
    const mailLink = $('[data-mail-link]', form);
    const copyStatus = $('[data-copy-status]', form);
    const programSelect = form.elements.programa;
    let prepared = '';
    const consentText =
      'He leído el aviso de privacidad. Si envío esta consulta, solicito orientación sobre mi formación.';
    // Revisa un campo y devuelve un mensaje sencillo si falta algo o tiene un formato incorrecto.
    function fieldMessage(field) {
      const value = field.value.trim();
      if (field.type === 'checkbox')
        return field.checked
          ? ''
          : 'Debes aceptar el aviso de privacidad para preparar tu consulta.';
      if (field.required && !value)
        return field.tagName === 'SELECT'
          ? 'Elige un programa o la opción de orientación.'
          : 'Completa este campo.';
      if (field.name === 'nombre' && value.length < 2)
        return 'Escribe tu nombre completo (al menos 2 caracteres).';
      if (field.name === 'correo' && field.validity.typeMismatch)
        return 'Escribe un correo electrónico válido, por ejemplo nombre@correo.com.';
      if (
        field.name === 'telefono' &&
        value &&
        (!/^[+\d\s().-]+$/.test(value) ||
          value.replace(/\D/g, '').length < 7 ||
          value.replace(/\D/g, '').length > 15)
      )
        return 'Escribe entre 7 y 15 dígitos. Puedes incluir el prefijo del país.';
      if (field.name === 'mensaje' && value.length < 10)
        return 'Cuéntanos un poco más (al menos 10 caracteres).';
      if (field.maxLength > 0 && value.length > field.maxLength)
        return `Usa como máximo ${field.maxLength} caracteres.`;
      return '';
    }
    // Muestra el error junto al campo y lo comunica a los lectores de pantalla.
    function validateField(field) {
      const message = fieldMessage(field);
      const error = document.getElementById(field.getAttribute('aria-describedby'));
      if (error) error.textContent = message;
      if (message) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
      return !message;
    }
    // Borra el mensaje preparado al cambiar los campos, para no copiar una consulta desactualizada.
    function discardPrepared() {
      if (prepared)
        status.textContent =
          'Modificaste los datos. Vuelve a preparar el mensaje para actualizarlo.';
      prepared = '';
      preview.value = '';
      mailLink.setAttribute('href', 'mailto:contacto@fundacionunimana.com');
      result.hidden = true;
      copyStatus.textContent = '';
    }
    fields.forEach((field) => {
      field.addEventListener('input', () => {
        if (field.hasAttribute('aria-invalid')) validateField(field);
        discardPrepared();
      });
      field.addEventListener('change', () => {
        if (field.hasAttribute('aria-invalid')) validateField(field);
        discardPrepared();
      });
    });
    // Reconoce el programa elegido desde una ficha. La dirección no contiene datos de la persona.
    const query = new URLSearchParams(location.search);
    const requested = query.get('programa');
    const option = [...programSelect.options].find(
      (option) => option.value === requested && option.value,
    );
    if (option) {
      programSelect.value = option.value;
      const note = $('#selected-program-note');
      if (note)
        note.textContent = `Te interesa ${option.textContent}. Dejamos este programa seleccionado; puedes cambiarlo si lo deseas.`;
    }
    if (query.get('motivo') === 'beca' && !form.elements.mensaje.value) {
      const name = option ? `el programa de ${option.textContent}` : 'los programas de UNIMANÁ';
      form.elements.mensaje.value = `Hola, me gustaría conocer las opciones de beca para ${name}, los requisitos y las condiciones vigentes. Gracias.`;
    }
    // PREPARAR CONSULTA. Comprueba los campos y compone un texto solo en esta página.
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const invalid = fields.filter((field) => !validateField(field));
      if (invalid.length) {
        discardPrepared();
        status.textContent = 'Revisa los campos indicados antes de preparar tu mensaje.';
        invalid[0].focus();
        return;
      }
      const name = form.elements.nombre.value.trim();
      const email = form.elements.correo.value.trim();
      const phone = form.elements.telefono.value.trim() || 'No indicado';
      const program = programSelect.selectedOptions[0].textContent;
      const message = form.elements.mensaje.value.trim();
      prepared = `Consulta de orientación · UNIMANÁ\n\nNombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\nPrograma de interés: ${program}\n\nMensaje:\n${message}\n\n${consentText}\n\nEsta consulta no confirma una matrícula ni una asignación de beca.`;
      preview.value = prepared;
      mailLink.href = `mailto:contacto@fundacionunimana.com?subject=${encodeURIComponent('Orientación UNIMANÁ · ' + program)}&body=${encodeURIComponent(prepared)}`;
      status.textContent = 'Mensaje preparado en tu navegador. Aún no se ha enviado.';
      copyStatus.textContent = '';
      result.hidden = false;
      result.tabIndex = -1;
      result.focus({ preventScroll: true });
      result.scrollIntoView({ behavior: scrollBehavior(), block: 'nearest' });
    });
    mailLink.addEventListener('click', () => {
      copyStatus.textContent =
        'Si se abre tu aplicación de correo, revisa el mensaje y envíalo desde allí. Si no se abre, puedes copiarlo o descargarlo.';
    });
    // COPIAR. Usa el portapapeles; si no está disponible, permite copiar manualmente.
    $('[data-copy-message]', form).addEventListener('click', async () => {
      if (!prepared) return;
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(prepared);
          copied = true;
        }
      } catch {
        /* Alternativa de copia cuando el navegador no permite usar el portapapeles. */
      }
      if (!copied) {
        preview.focus();
        preview.select();
        try {
          copied = document.execCommand('copy');
        } catch {
          copied = false;
        }
      }
      copyStatus.textContent = copied
        ? 'Mensaje copiado. Pégalo en tu correo para enviarlo cuando quieras.'
        : 'El navegador no permitió copiarlo. El texto está seleccionado: usa Copiar o Ctrl+C / Cmd+C.';
    });
    // DESCARGAR. Crea un archivo de texto en el dispositivo, sin subirlo a ningún servidor.
    $('[data-download-message]', form).addEventListener('click', () => {
      if (!prepared) return;
      const blob = new Blob(['\uFEFF' + prepared], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'consulta-unimana.txt';
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      copyStatus.textContent =
        'Se solicitó la descarga del texto. Descargarlo no envía la consulta a la fundación.';
    });
    // LIMPIAR. Retira los datos escritos, el mensaje preparado y los errores.
    form.addEventListener('reset', () => {
      prepared = '';
      preview.value = '';
      result.hidden = true;
      mailLink.setAttribute('href', 'mailto:contacto@fundacionunimana.com');
      status.textContent = '';
      copyStatus.textContent = '';
      fields.forEach((field) => {
        field.removeAttribute('aria-invalid');
        const error = document.getElementById(field.getAttribute('aria-describedby'));
        if (error) error.textContent = '';
      });
      const note = $('#selected-program-note');
      if (note)
        note.textContent =
          'Elige tu programa en el formulario. Si aún no lo tienes claro, selecciona la opción de orientación.';
    });
    // Activa el botón solo después de preparar todas las acciones locales del formulario.
    // Sin JavaScript el botón permanece desactivado y CSP impide cualquier envío nativo.
    $('.form-submit', form).disabled = false;
  });
  // Defensa adicional: las cuentas siguen DESHABILITADAS, incluso si se intenta un submit programático.
  $$('[data-auth-form]').forEach((form) =>
    form.addEventListener('submit', (event) => event.preventDefault()),
  );

  // Cohete original: 50 estrellitas suben por la pantalla; sin acumulación en clics repetidos.
  const clearStars = () => $$('.star').forEach((star) => star.remove());
  document.addEventListener('unimana:motion', () => {
    if (motionOff()) clearStars();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearStars();
  });
  $('#rocket-btn')?.addEventListener('click', (event) => {
    event.preventDefault();
    clearStars();
    if (!motionOff())
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('span');
        star.className = 'star fly-up';
        star.setAttribute('aria-hidden', 'true');
        const size = 2 + Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 98 + 1}vw`;
        star.style.animationDelay = `${Math.random() * 0.5}s`;
        star.style.animationDuration = `${Math.random() * 1.5 + 1.5}s`;
        document.body.append(star);
        star.addEventListener('animationend', () => star.remove(), { once: true });
        setTimeout(() => star.remove(), 4000);
      }
    // Mismo documento en todas las fichas; no regresa al inicio de otra página.
    $('.site-header .brand')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  });
  // Resalta la sección actual sin romper las anclas históricas.
  if ('IntersectionObserver' in window && document.body.classList.contains('home-page')) {
    const navLinks = $$('.desktop-nav > a');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            if (new URL(link.href).hash === `#${entry.target.id}`)
              link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 },
    );
    ['quienes-somos', 'historia', 'experiencia', 'contacto'].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  // Lógica del logo de la moneda flotante según el mes
  const coinImg = document.querySelector('.coin-back img');
  const coinPicture = document.querySelector('.coin-back picture');
  if (coinImg && coinPicture) {
    const month = new Date().getMonth(); // 0 = Enero, 6 = Julio, 11 = Diciembre
    let newSrc = '';
    
    if (month === 0) {
      newSrc = base + 'imagenes/logo_gafas.png';
    } else if (month === 6) {
      newSrc = base + 'imagenes/logo_colombiano.png';
    } else if (month === 8) { // Septiembre
      newSrc = base + 'imagenes/logo_amoryamistad.jpg';
    } else if (month === 11) {
      newSrc = base + 'imagenes/logo_navideño.png';
    }
    
    if (newSrc) {
      coinPicture.querySelectorAll('source').forEach(s => s.remove());
      coinImg.src = newSrc;
      coinImg.style.backgroundColor = '#005bb5'; // Azul de fondo
      coinImg.style.borderRadius = '50%'; // Fondo redondeado
      coinImg.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)'; // Sombra bonita
    }
  }
})();
