// Se ejecuta antes de pintar: evita destellos al cambiar de página.
(() => {
  // La clase js permite mostrar controles que sí requieren JavaScript.
  const root = document.documentElement;
  root.classList.add('js');
  // Recupera únicamente las preferencias de color y movimiento.
  try {
    const theme = localStorage.getItem('theme');
    root.dataset.theme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.motion = localStorage.getItem('unimana-motion') === 'off' ? 'off' : 'on';
    // Si el navegador bloquea el almacenamiento, el sitio sigue funcionando en modo claro.
  } catch {
    root.dataset.theme = 'light';
  }
})();
