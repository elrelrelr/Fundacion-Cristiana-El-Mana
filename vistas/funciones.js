// Compatibilidad con referencias antiguas: un único controlador para todo el sitio.
// En las páginas actuales se carga directamente ../index.min.js con defer.
(() => {
  // Evita cargar dos veces las mismas acciones.
  if (window.UNIMANA_APP_READY || document.querySelector('script[data-unimana-compat]')) return;
  // Resuelve la ruta respecto a este archivo, también al abrir el sitio desde una carpeta.
  const script = document.createElement('script');
  script.src = new URL('../index.min.js', document.currentScript.src).href;
  script.dataset.unimanaCompat = '';
  script.defer = true;
  document.head.append(script);
})();
