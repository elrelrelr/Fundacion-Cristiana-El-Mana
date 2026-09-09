// Servidor de desarrollo opcional. El sitio publicado no necesita Node.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Puedes elegir otro puerto con la variable PORT. Por defecto se usa 3000.
const port = Number(process.env.PORT || 3000);
// Indica al navegador qué tipo de archivo recibe: página, estilo, imagen o fuente.
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};
http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://dev.local').pathname);
    } catch {
      res.writeHead(400);
      return res.end('Solicitud incorrecta');
    }
    // Bloquea archivos ocultos y carpetas de herramientas que no debe visitar el público.
    if (
      pathname.split('/').some((part) => part.startsWith('.')) ||
      ['scripts', 'data', 'docs', 'node_modules'].includes(pathname.split('/')[1])
    ) {
      res.writeHead(403);
      return res.end('Acceso restringido');
    }
    // Solo sirve archivos dentro de la carpeta del proyecto.
    let file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403);
      return res.end();
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, 'index.html');
    // Si el archivo no existe, muestra la página 404 en lugar de una lista de carpetas.
    let status = 200;
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      status = 404;
      file = path.join(root, '404.html');
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404);
      return res.end('Página no encontrada');
    }
    // No guarda copias antiguas en la caché durante las pruebas de edición.
    res.writeHead(status, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    // Una petición HEAD solo necesita los datos del archivo, no su contenido.
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, '0.0.0.0', () =>
    console.log(`UNIMANÁ · Vista previa en el puerto ${port} (0.0.0.0)`),
  );
