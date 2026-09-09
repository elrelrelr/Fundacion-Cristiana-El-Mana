# UNIMANÁ · Un futuro brillante empieza aquí

Rediseño del sitio de la **Fundación Cristiana El Maná**, conservando su identidad, sus recursos y las rutas existentes. La web publicada utiliza **únicamente HTML, CSS y JavaScript**, sin PHP, frameworks de interfaz, Bootstrap CSS/JS, jQuery ni CDN. Las siluetas originales de Bootstrap Icons 1.11.3 se incluyen como SVG locales con su licencia MIT.

## Lectura más cómoda y código explicado

- Párrafos principales de **18 px** en escritorio y **17 px** en teléfono; tarjetas y listas de **16 px**, notas de **14 px** y subtítulos pequeños más visibles.
- Más peso y contraste en el texto normal, **sin cambiar los tamaños de los títulos principales** ni las fuentes Manrope/DM Sans.
- Comentarios sencillos en español en HTML, CSS, JavaScript, datos editables y herramientas. Los HTML también se entregan ordenados, no comprimidos en una sola línea.
- Consulta la **[guía sencilla de edición](docs/GUIA-EDICION.md)** para saber qué archivo tocar y cómo cambiar las letras desde las variables al comienzo de `style.css`.

## Entrega final lista para GitHub

- La pestaña del inicio conserva el nombre original: **Fundación Cristiana El Maná**.
- El ZIP trae los archivos directamente en su raíz, **sin una carpeta adicional `unimana/`**. Extrae y copia todo su contenido a la raíz de tu repositorio, reemplazando los archivos coincidentes y conservando tu propia carpeta `.git`.
- `index.html` debe quedar en la raíz del repositorio, junto a `CNAME`, `style.css`, `vistas/` y `assets/`. Incluye los archivos ocultos, especialmente `.nojekyll`.
- Sube los archivos extraídos, no el ZIP. El resultado generado ya está incluido: **GitHub Pages no necesita ejecutar Node ni instalar dependencias** para servirlo.
- No se incluyen capturas, herramientas temporales, `node_modules/`, secretos ni historial Git. Consulta [los pasos de publicación](docs/PUBLICACION.md).

## Abrir el sitio

- Extrae el ZIP completo y abre `index.html` en el navegador, o usa Live Server de VS Code. Las fuentes están integradas en un CSS compartido para evitar errores CORS al abrir archivos `file://`.
- Para una vista previa HTTP consistente, con Node.js 20 o superior:

```bash
npm start
# http://localhost:3000
```

**No necesitas instalar dependencias para visualizarlo ni para ejecutar ese servidor de desarrollo.** También puedes subir los archivos directamente a un alojamiento estático, incluido GitHub Pages. El servidor Node es opcional y no es un backend de usuarios.

## Qué está incluido

- Inicio renovado, navegación adaptable, menú de programas, búsqueda local y filtros.
- Navbar azul vivo, sin franja superior ni accesos repetidos; «Inscríbete» está dentro de Ingreso.
- Botón «Empezar ahora» con resplandor y barrido de luz, año del carrusel luminoso, moneda WhatsApp giratoria y cohete con 50 estrellitas.
- Olas SVG continuas en los cambios de sección, con el color exacto de la sección siguiente y sin cortes rectangulares. En inicio recuperan las tres velocidades originales (10, 8 y 6 segundos). Modo oscuro, control de animaciones y respeto de `prefers-reduced-motion`.
- Las **18 fichas del catálogo que realmente estaba enlazado**: se completaron las 12 que faltaban y se actualizaron las 6 existentes.
- Misión y visión diferenciadas, historia, sedes, opciones de beca, preguntas frecuentes y canales de contacto.
- Carrusel con las **22 fotos originales**, selección por miniaturas, teclado, ampliación y reproducción opcional. Galería independiente con filtros por año.
- **40 imágenes originales conservadas**, versiones WebP responsivas, dimensiones explícitas y carga diferida fuera del contenido inicial.
- Folleto institucional original descargable desde `documentos/folleto-institucional.pdf`, sin depender de Drive.
- Un H1 por página, descripciones y títulos, canonical, Open Graph, Twitter, JSON-LD prudente, imagen OG de 1200 × 630, `sitemap.xml`, `robots.txt` y página 404.
- Fuentes locales Manrope y DM Sans, con sus licencias. `assets/fonts/fonts.css` incorpora sus datos WOFF2 originales y funciona tanto en `file://` como en HTTP/HTTPS, sin precargas de archivos de fuente bloqueadas por CORS.
- CSS y JS compartidos, versiones legibles y minificadas; HTML completo incluso sin JavaScript.

**No se agregó una sección de estadísticas, analítica, testimonios inventados, Google Forms ni acceso mediante proveedores externos.** Se mantuvieron WhatsApp, Facebook y el video de YouTube del sitio original como canales/contenidos, no como sistemas de registro. Los videos solo cargan el proveedor después de pulsar reproducir.

## Importante: cuentas, formularios y datos académicos

### Registro e ingreso: pantallas preparadas, NO habilitadas

Se implementó la opción elegida: `vistas/ingreso.html` y `vistas/registro.html` muestran el diseño y el aviso «Próximamente», con campos y botones deshabilitados. **No crean usuarios, no autentican, no guardan contraseñas y no simulan sesiones.** El acceso real requiere un backend seguro, fuera del alcance de esta versión estática.

### Orientación: preparación local, no envío automático

El formulario de contacto y `vistas/inscripcion.html`:

1. Validan los campos y el consentimiento.
2. Preparan una consulta en la memoria de la página.
3. Permiten abrir la aplicación de correo mediante `mailto:`, copiar el texto o descargarlo.

La interfaz dice expresamente **«Aún no se ha enviado»**. No hay `fetch` de datos personales, base de datos, servicio de formularios externo ni registro automático. Sin JavaScript, el botón permanece deshabilitado; además, una CSP impide el envío nativo de formularios. La preferencia de tema y la pausa de animaciones son los únicos valores guardados por el sitio en `localStorage`.

### Información por confirmar

Los módulos y duraciones que existían se conservaron. Las nuevas fichas incluyen descripciones, objetivos, ejes de estudio, perfil, requisitos orientativos y becas, pero **no inventan duración, costos, fechas de inicio, acreditaciones ni títulos habilitantes**. Lo que falta se señala como pendiente de confirmación con admisiones.

La ficha original `psicologia.html` realmente describía un **curso especializado en Psicología Cognitiva**, no el plan de una carrera completa. Se conserva ese contenido y se aclara la diferencia. `psicologia-cognitiva.html` es un alias con canonical a la URL original.

Consulta [la revisión del contenido](docs/CONTENIDO.md) antes de publicar.

## Archivos y mantenimiento

```text
index.html                         Inicio completo, listo para servir
style.css / style.min.css         Sistema visual compartido
index.js / index.min.js           Interacciones y formulario local
vistas/*.html                    Programas, orientación, galería y acceso
assets/fonts/                    Fuentes originales, licencias y fonts.css integrado
assets/icons/                    Iconos originales Bootstrap Icons y licencia MIT
assets/optimized/                WebP y miniaturas
assets/js/theme.js               Tema antes del primer pintado
assets/js/search-index.js        Índice de búsqueda local generado
imagenes/                        Todos los originales + imagen OG nueva
documentos/                      Folleto original alojado localmente
data/programas.mjs               Catálogo, textos, módulos y fuentes
data/social.mjs                  Enlaces oficiales; Instagram pendiente de URL
data/images.json                 Rutas y medidas de imágenes generadas
scripts/templates.mjs            Cabecera, pie, olas y componentes comunes
scripts/build.mjs                Generador de HTML estático en JavaScript
scripts/images.mjs               Conversión de imágenes sin borrar originales
scripts/fonts.mjs                Generación del CSS de fuentes compatible con file://
docs/GUIA-EDICION.md              Explicación sencilla para editar textos, letras y funciones
.prettierrc.json                  Formato común del código fuente y del HTML generado
docs/                            Cambios y validaciones actuales
```

Para cambiar estilos o interacciones, edita `style.css` o `index.js`. Para actualizar textos de programas, edita `data/programas.mjs`; los textos de inicio y páginas auxiliares están en `scripts/build.mjs`. La cabecera y el pie se comparten desde `scripts/templates.mjs` **durante la generación**, no con PHP ni peticiones de includes en el navegador.

```bash
npm ci
npm run format    # Ordenar el código y sus comentarios
npm run build     # Generar HTML comentado, fuentes, índice, sitemap y minificados
npm run images    # Solo si se añaden o cambian imágenes; después ejecutar build
npm run check     # Enlaces, anclas, metadatos, imágenes y restricciones
```

Prettier se usa solo como herramienta de edición; no se carga en el navegador ni añade dependencias de interfaz.

El resultado está incluido: **no hace falta ejecutar un build para publicar**. También puedes editar HTML directamente, sabiendo que una regeneración lo sobrescribirá.

### Pruebas de navegador

```bash
npx playwright install --with-deps chromium
npm start        # Mantener en otra terminal
npm test
```

Se incluyen `docs/auditoria-estatica.json`, `docs/pruebas-navegador.json` con los resultados de la versión actual. Las **31 pruebas correctas** incluyen tamaños mínimos de lectura y conservación de títulos, además de 22 auditorías automáticas de accesibilidad sin infracciones detectadas. Las pruebas abarcan 320, 390 y 1440 px, temas, teclado, filtros, búsqueda, formularios, carrusel, anclas, ausencia de envíos y pantallas de cuenta deshabilitadas. Las auditorías automáticas de accesibilidad no sustituyen una revisión con tecnologías de asistencia ni una certificación WCAG.

## Publicación y reversión

Lee [PUBLICACION.md](docs/PUBLICACION.md). Se mantienen `CNAME` y todas las rutas anteriores. `.nojekyll` permite servir directamente los archivos en GitHub Pages.

- `.htaccess`, `_headers` y `docs/nginx.conf.example` son **configuraciones opcionales** para servidores compatibles; GitHub Pages no las interpreta. No se afirma que esas cabeceras estén activas en el dominio.
- El historial Git mantiene las versiones anteriores. Se eliminaron ZIP duplicados, capturas temporales e informes de rendimiento antiguos para ahorrar espacio. El ZIP de entrega contiene solo el proyecto actual, no su historial `.git`.
- `docs/contenido-original.json` permite contrastar los textos, enlaces y videos existentes con la revisión.

La base del trabajo es el commit `414e3a91c88d486da328dd0fd19f6e142e9e3661` del repositorio original. No se modifica el dominio publicado solo por abrir esta vista previa.

## Personalización de esta revisión

- `--primary` es exactamente `rgb(115, 226, 254)` en ambos temas. Se usa en los acentos, enlaces internos sobre fondos oscuros y efectos. `--primary-ink` mantiene una tinta de contraste suficiente para textos sobre fondos claros.
- Los iconos y sus colores de hover corresponden a las aplicaciones originales: Facebook azul, YouTube rojo, WhatsApp verde e Instagram rosa. **Instagram no se muestra mientras falte su URL oficial**; completa `data/social.mjs` y ejecuta `npm run build` para activarlo.
- La moneda vuelve a girar automáticamente entre WhatsApp y el logo vacacional, con brillo. El botón del cohete está destacado al comienzo del footer y vuelve al principio de la página actual.
- Los efectos respetan el control de pausa y el movimiento reducido del dispositivo.

## Ajustes conservados: vista móvil y apertura local

- Ingreso ya no tiene fondo ni borde en su estado normal; conserva el foco de teclado y la respuesta al pasar el puntero.
- Se eliminó por completo la barra inferior móvil «Explora tu futuro / Quiero estudiar» y el espacio que reservaba en el footer. WhatsApp vuelve a 20 px del borde inferior en móvil, más la zona segura del dispositivo.
- «Aquí» tiene una oleada automática por letras con la escala y elevación del título original, sin mover su subrayado ni cambiar su azul. Respeta pausa, movimiento reducido y visibilidad de la pestaña. La búsqueda sigue resaltando la palabra completa sin desarmar el efecto.
- Las fuentes ya no se precargan desde archivos WOFF2. `scripts/fonts.mjs` genera una sola hoja `assets/fonts/fonts.css` con los mismos datos originales en URLs `data:`. No se sustituyeron las tipografías y no se necesita desactivar CORS ni cambiar opciones de seguridad del navegador.
- Las configuraciones opcionales de cabeceras permiten `data:` únicamente donde corresponde (`font-src` además de los usos existentes para imágenes). Si utilizas una CSP personalizada en tu servidor, debe incluir `font-src 'self' data:`.
- Para usar esta versión, reemplaza todos los archivos de la carpeta extraída, incluida `assets/fonts/fonts.css`, y recarga la pestaña. No basta con copiar únicamente `index.html` o el CSS principal.
