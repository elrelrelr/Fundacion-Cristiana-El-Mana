# Resumen de los cambios

## Diseño

- Identidad azul conservada, nueva tipografía local, jerarquía editorial y componentes compartidos.
- Modo claro/oscuro coherente en navegación, tarjetas, formularios, cursos y olas.
- Olas SVG nuevas, sobredimensionadas fuera del área visible y con una capa frontal opaca del color de la sección siguiente. Sin IDs SVG repetidos, extremos expuestos ni bordes inferiores de otro color.
- Se conservó la idea visual del [CodePen de Juanferfox](https://codepen.io/Juanferfox/pen/bGBdeEg), pero no se utiliza su PNG remoto ni se depende del servicio.
- Interfaces adaptadas y comprobadas a 320, 390 y 1440 píxeles. Animaciones pausables y movimiento reducido del dispositivo respetado.

## Navegación y contenido

- Menú con categorías y enlaces reales; búsquedas del sitio y de la página, ambas locales y sin servicios externos.
- Catálogo original completo: 18 programas; 6 fichas actualizadas y 12 creadas. No se añadieron nuevas ofertas no presentes en el catálogo.
- Anclas antiguas conservadas y enlaces desde vistas internas corregidos.
- Historia, misión, visión, sedes, contacto, becas y experiencia preservados y mejor organizados.
- Todas las fotografías originales, folleto y enlaces sociales conservados. Carrusel ampliado con controles, teclado, ampliación, reproducción opcional y una galería completa por años.
- Sin estadísticas institucionales nuevas, testimonios ficticios ni promesas de habilitación profesional o empleo. Ver `CONTENIDO.md` para los ajustes editoriales y los datos pendientes.

## Formularios y acceso

- Registro e ingreso diseñados como pantallas futuras, con campos desactivados. No hay cuentas ni contraseñas en el navegador.
- Formulario de orientación propio que valida y prepara el texto para correo, copia o descarga; no simula un envío. CSP bloquea el envío HTML nativo y el botón no se habilita sin JavaScript.
- Ningún Google Form, acceso de terceros, endpoint PHP ni proveedor de formularios.
- Aviso técnico de privacidad y ausencia de analítica/seguimiento propios.

## Rendimiento, SEO y mantenimiento

- 40 originales gráficos sin alterar; conversiones WebP, varias resoluciones, miniaturas, dimensiones, lazy loading y prioridad para la imagen inicial.
- Fuentes locales; sin Bootstrap, jQuery, CDN de iconos o fuentes remotas.
- HTML completo, sin renders de contenido que dependan de JavaScript; fuentes de edición compartidas en JS y catálogo mantenible.
- CSS y JS minificados; se conservan sus versiones legibles.
- Canonical, Open Graph, Twitter, JSON-LD conservador, OG 1200 × 630, sitemap, robots y 404.
- Configuraciones de cabeceras opcionales para Apache, Nginx y alojamientos compatibles con `_headers`, sin atribuirles efecto en GitHub Pages.

## Comprobaciones entregadas

- Auditoría estática: **26 HTML**, **2.255 referencias a páginas/anclas** y **1.006 referencias a recursos locales**, sin errores. Los conteos incluyen componentes compartidos repetidos por página.
- Navegador: **31 pruebas funcionales y de presentación correctas**, incluidas ausencia de envíos, filtros, navegación, módulos, búsqueda, carrusel, ampliación, estados de formulario y ausencia de errores JavaScript.
- Accesibilidad: **22 auditorías automatizadas de plantillas y diálogos**, en escritorio/móvil y modos claro/oscuro, sin infracciones detectadas en las reglas WCAG A/AA ejecutadas. No equivale a certificación ni reemplaza una revisión manual.
- Se retiraron los informes de Lighthouse de la primera entrega para evitar que se confundan con mediciones de esta revisión. Falta repetir rendimiento después de publicar.
- Faltan una revisión institucional del contenido, pruebas con lectores de pantalla, navegadores adicionales y una nueva medición después de publicar.

## Reversión

La base exacta permanece en el historial Git (`414e3a91c88d486da328dd0fd19f6e142e9e3661`); los cambios se hicieron en una rama de revisión. El ZIP de respaldo duplicado se eliminó a petición del usuario. Para publicar y revertir de forma segura, consulta `PUBLICACION.md`.

## Ajustes solicitados en la segunda revisión

1. Se recuperó el azul vivo `#008ff5` del navbar, con su gradiente hacia `#005fcc`. No hay texto encima del navbar. Solo aparece un acceso a Ingreso; la inscripción está dentro de esa página y no se repite en el desplegable.
2. Las olas del inicio tienen desplazamientos horizontales y verticales inspirados directamente en los de la versión original, con velocidades de 10/8/6 segundos. La capa frontal es opaca y coincide con el color del siguiente bloque. «Empezar ahora» recupera el brillo, la elevación, el barrido de luz y la pulsación del botón original.
3. El año recupera el azul y la sombra futurista; en modo oscuro utiliza exactamente `rgb(115, 226, 254)` y el doble resplandor original. La tinta clara se ajustó ligeramente para conservar contraste. `--primary` tiene el cian solicitado; los enlaces internos sobre fondos oscuros lo utilizan directamente.
4. La moneda recupera su tamaño de 60 px, giro automático de seis segundos, logo vacacional al reverso, degradado verde, resplandor y destello.
5. Se recuperaron las siluetas de Bootstrap Icons 1.11.3 como SVG locales y los efectos de hover por aplicación. Instagram queda preparado en `data/social.mjs`, pero no se inventó un enlace institucional que no figuraba en el original.
6. El cohete sólido original vuelve a ser visible al inicio del footer. Al pulsarlo se generan 50 estrellitas y se vuelve al principio de la página actual. Se respeta el movimiento reducido y se limpian los efectos sin acumulación.
7. Se eliminaron unos 61 MiB de capturas, archivos temporales, ZIP/parche antiguos, respaldo duplicado e informes obsoletos. No se eliminaron las fotos originales, el folleto ni el historial Git. Se entrega un único ZIP actualizado, sin duplicar un parche binario completo.

## Tercera revisión: solicitudes específicas

1. Se retiraron `background: #073874` y `border: 1px solid #ffffff45` del estado normal de Ingreso.
2. Se eliminó `mobile-cta` del HTML y del CSS de todas las páginas. La moneda conserva su giro y baja a `20px + env(safe-area-inset-bottom)` en móvil; se quitó el relleno reservado para la barra inferior.
3. La palabra «aquí» incorpora la oleada secuencial de letras (150 ms por letra, con una breve pausa entre pasadas). Mantiene el azul y el SVG de subrayado. Se conserva una lectura accesible continua y el buscador respeta la estructura animada al aplicar y quitar resaltados.
4. Se solucionó la carga de tipografías al abrir directamente con `file://`: los dos WOFF2 originales se integran en un único CSS, sin depender de precargas CORS, servidores o JavaScript. Los datos integrados se comparan byte por byte con los archivos fuente en la auditoría estática.
5. En esa revisión se validaron 28 escenarios correctos y 22 auditorías automáticas de accesibilidad sin infracciones detectadas. La apertura `file://` se probó en Chromium para inicio, PNL, ingreso e inscripción, además de una comprobación sin JavaScript: ambas fuentes cargaron, sin errores de consola, peticiones WOFF2 ni recursos fallidos.

La comprobación en Chromium valida el protocolo local utilizado en el aviso reportado; no se afirma haber ejecutado Brave para Windows. Para probar condiciones equivalentes a producción y contenidos de proveedores externos, sigue siendo recomendable HTTP/HTTPS mediante Live Server o `npm start`.


## Cuarta revisión: comentarios en español y texto más legible

1. Se organizaron y comentaron los archivos de HTML, CSS, JavaScript, datos editables y herramientas. Las funciones y los bloques principales tienen explicaciones sencillas. Los 26 HTML se generan con comentarios y sangría, sin perderlos al reconstruir el sitio.
2. Se centralizaron los tamaños en las variables `--type-*` de `style.css`: párrafos principales de 18 px (17 px en móvil), descripciones y listas de 16 px, subtítulos pequeños de 18 px, etiquetas y acciones de 15 px, notas de 14 px. Las etiquetas cortas y la leyenda del logo mantienen una escala propia. Los valores usan rem y se refieren al tamaño base habitual de 16 px.
3. Se conservan Manrope y DM Sans, los tamaños de los títulos principales, el cian, las olas, el neón, la oleada de «aquí», las redes, la moneda y el cohete. El texto general tiene peso 450 y las tintas secundarias más contraste en ambos temas.
4. La tarjeta de la fotografía principal reserva su altura y queda separada del crédito. La frase sobre la foto puede ocupar más de una línea. Así los textos ampliados no se tapan entre sí.
5. Las copias minificadas tienen un aviso que remite a su fuente comentada. El CSS de fuentes conserva los datos originales integrados. JSON sigue siendo válido, sin comentarios incompatibles; no se alteraron imágenes, PDF ni licencias.
6. Se añadió `docs/GUIA-EDICION.md`, configuración de formato y los comandos `npm run format` y `npm run format:check`. Prettier es una herramienta de desarrollo, no una dependencia del navegador.
7. Resultado: **31/31 pruebas correctas**, **22 auditorías automáticas de accesibilidad sin infracciones detectadas**, y auditoría estática sin errores de los **26 HTML comentados**, los **2.255 enlaces/anclas**, los **1.006 recursos locales** y las **220 imágenes con medidas**. Se compararon los títulos antes y después y se agregaron pruebas permanentes de tamaño y espacio para los textos ampliados.
8. Se mantiene una sola entrega ZIP actual. No se agregaron estadísticas, servicios de registro, envío de formularios, ofertas académicas ni enlaces sociales nuevos. La revisión de archivos no implica publicación en GitHub o en el dominio.


## Ajuste final: título original y entrega directa para GitHub

- Se verificó el título del inicio en la versión original (`414e3a91c88d486da328dd0fd19f6e142e9e3661`) y se restauró exactamente **Fundación Cristiana El Maná**. El título visible del diseño y los títulos descriptivos de las páginas internas no cambian.
- El cambio está en la fuente de generación y en el HTML final; las etiquetas para compartir el inicio usan el mismo nombre institucional.
- Se añadió una comprobación estática del título para evitar perderlo en una regeneración.
- El ZIP final contiene el proyecto directamente en su raíz, sin un directorio contenedor `unimana/`. Incluye archivos generados, fuentes comentadas, recursos originales, documentación, `CNAME` y `.nojekyll`, listo para copiar el contenido extraído a la raíz del repositorio.
- En este ajuste se vuelven a ejecutar construcción, comprobación de formato y auditoría estática, y se verifica la integridad del ZIP. El informe de 31 pruebas de navegador y 22 auditorías de accesibilidad corresponde a la revisión de legibilidad anterior; no se modifican estilos, interacciones ni el contenido visible del sitio.
- Se reemplaza la única entrega ZIP; no se publica ni se sube automáticamente a GitHub.
