# Publicar, revisar y revertir

Para editar texto, estilos o acciones antes de publicar, empieza por [GUIA-EDICION.md](GUIA-EDICION.md). Los archivos entregados ya están generados y comentados.

## Antes de subir

1. Revisa el sitio en computador y teléfono, incluidos los temas claro y oscuro.
2. Valida con la fundación los datos señalados en `CONTENIDO.md`.
3. Revisa y aprueba el aviso técnico de privacidad; no habilites cuentas ni recolección en servidor sin una política institucional y un backend adecuado.
4. Confirma el correo `contacto@fundacionunimana.com`, teléfono, sedes y el folleto. El formulario no comprueba que el buzón exista ni puede confirmar que llegue un correo.

## Aplicar los archivos al repositorio

Trabaja en una rama de revisión, no sobrescribas directamente la producción:

```bash
git clone https://github.com/elrelrelr/Fundaci-n-Cristiana-El-Man-.git
cd Fundaci-n-Cristiana-El-Man-
git switch -c mejoras/unimana-estatico
```

El ZIP final **ya contiene los archivos en la raíz, sin una carpeta adicional `unimana/`**:

1. Extrae `unimana-mejorada.zip`.
2. Copia **todo el contenido extraído** a la raíz de tu proyecto de GitHub y reemplaza los archivos con el mismo nombre. `index.html` debe quedar junto a `CNAME`, `style.css` y las carpetas `vistas/` y `assets/`.
3. Incluye también los archivos ocultos, especialmente `.nojekyll`, `.gitignore`, `.prettierrc.json` y `.prettierignore`. El ZIP conserva las configuraciones opcionales de alojamiento.
4. Conserva la carpeta `.git` de tu propio repositorio. El ZIP no contiene historial, dependencias instaladas, cachés ni archivos privados.
5. Sube los archivos extraídos, **no el ZIP como un único archivo**. No hace falta ejecutar una compilación para publicar: el HTML, el CSS y el JavaScript finales ya están incluidos.

Si tu programa de descompresión crea automáticamente una carpeta llamada `unimana-mejorada`, copia lo que hay **dentro** de ella, no esa carpeta contenedora. No hace falta reorganizar las carpetas internas del sitio.

La pestaña de la página de inicio vuelve a llamarse **Fundación Cristiana El Maná**, exactamente como en la versión original. Los títulos descriptivos de las fichas se mantienen.

```bash
npm start
# Abre http://localhost:3000 y revisa.
# Las siguientes instrucciones se ejecutan desde otra terminal:
git status
git diff --stat
git add .
git commit -m "Mejorar sitio estático, programas y accesibilidad de UNIMANÁ"
git push -u origin mejoras/unimana-estatico
```

Después abre un pull request y revisa los cambios antes de fusionar. El push requiere tu propia autenticación de GitHub; no pongas tokens dentro de los archivos de la web.

## GitHub Pages / dominio actual

- Conserva el archivo `CNAME` con `fundacionunimana.com`.
- Conserva el directorio `vistas/`, las mayúsculas de las rutas antiguas y los nombres de las imágenes. Se usan rutas relativas para el sitio y anclas compatibles.
- Si Pages ya publica desde `main` y `/ (root)`, puedes mantener esa configuración al fusionar. No se requiere PHP ni un proceso Node en producción.
- El sitio es multipágina, no una SPA: las URLs de cada programa corresponden a archivos reales.
- `sitemap.xml` y canonical apuntan al dominio actual. Cambia ambos si publicas definitivamente bajo otro dominio.
- Se añadieron alias de las anclas `#hero-section`, `#seccion-destino`, `#third-section` y `#contactos`. La página de Psicología mantiene su URL; el alias cognitivo utiliza canonical para evitar duplicación.
- `404.html` usa rutas desde la raíz, adecuadas al dominio personalizado actual. Si publicas bajo un subdirectorio sin CNAME, adapta ese prefijo en la página 404.

### Qué subir

Incluye `assets/fonts/fonts.css`: contiene las mismas tipografías originales integradas para que también funcionen al abrir el HTML como archivo local. `npm run build` lo regenera desde los WOFF2 conservados. No hay que desactivar CORS ni añadir una cabecera global `Access-Control-Allow-Origin: *`.

El proyecto ya contiene el resultado generado. Publica el HTML, CSS, JS, `assets/`, `imagenes/`, `documentos/`, `CNAME`, `.nojekyll`, sitemap y robots. Los directorios `scripts/`, `data/` y `docs/` sirven para mantenimiento y no necesitan exponerse en un despliegue que permita separar fuentes y archivos públicos. No contienen claves.

No subas `node_modules/`, cachés de navegador, tokens ni archivos de entorno privados.

## Cabeceras de servidor

Las configuraciones de servidor incluyen `font-src 'self' data:` para permitir las fuentes integradas. Si ya usas una CSP propia, ajusta esa directiva sin desactivar las demás protecciones.

La página incluye una CSP mínima compatible con alojamiento estático: bloquea los envíos HTML nativos (`form-action 'none'`), objetos embebidos y bases ajenas. Esto protege el formulario también si JavaScript no se ejecuta.

Se entregan opciones adicionales:

- **Apache 2.4:** `.htaccess`, si el servidor admite esos módulos y `AllowOverride`.
- **Nginx:** fragmento `nginx.conf.example`, para integrar en una configuración existente con TLS.
- **Alojamientos que admitan `_headers`:** archivo de cabeceras estáticas.

**GitHub Pages ignora `.htaccess`, `_headers` y los fragmentos Nginx.** Las cabeceras HTTP dependen de su infraestructura. No se afirma que estos archivos las activen en Pages ni que estén aplicadas en el dominio público. HSTS se dejó comentado para no imponerlo sobre subdominios sin verificar HTTPS.

La configuración de producción impide que terceros incrusten el sitio mediante `frame-ancestors 'self'` / `X-Frame-Options`. El servidor opcional de vista previa no aplica esa restricción, porque el entorno de revisión necesita un iframe. Eso no cambia el diseño ni las rutas.

## Si posteriormente se habilitan cuentas

Las pantallas no están conectadas. No basta con quitar `disabled`:

- Implementa autenticación, autorización y validación en un backend propio (por ejemplo JavaScript con Node, si se amplía el alcance).
- Usa hashes de contraseña resistentes, sesiones seguras, cookies `HttpOnly`, `Secure`, `SameSite`, protección CSRF y límites de intentos.
- No guardes contraseñas, tokens sensibles o una base de usuarios en `localStorage`.
- Define tratamiento de datos, consentimiento, conservación y recuperación segura de cuentas.
- Revisa la CSP de meta y cabeceras: `form-action 'none'` se dejó deliberadamente cerrado.
- Implementa el envío real de correo desde un servicio controlado por la institución y muestra éxito solo después de una respuesta válida del servidor. Nunca expongas credenciales SMTP en el JavaScript público.

## Revertir

Si se fusionó un commit de mejora, utiliza `git revert` sobre ese commit para una reversión trazable, revisando antes cambios posteriores. Evita `reset --hard` sobre trabajo ajeno.

Para consultar la versión exacta anterior, usa el historial del repositorio: la base original es `414e3a91c88d486da328dd0fd19f6e142e9e3661` y el primer rediseño es `884f6c0`. No se mantienen ZIP históricos duplicados en el workspace. Si necesitas uno, puedes generarlo con `git archive` a partir del commit correspondiente, sin sobrescribir trabajo reciente.

## Validaciones y límites

- `npm run check`: enlaces, rutas, anclas, un H1, metadatos, imágenes y restricciones de formularios.
- `npm test`: navegación y comportamiento en Chromium; reporte en `pruebas-navegador.json`.
- Las auditorías WCAG son automáticas y muestreadas por plantilla; falta una revisión manual con lector de pantalla y una comprobación en navegadores adicionales.
- Los antiguos informes de Lighthouse se retiraron con la limpieza del workspace: no se presentan como mediciones de esta revisión. Repite la evaluación de rendimiento en el dominio después de publicar; las pruebas funcionales y de accesibilidad actuales sí están incluidas.
