// COPIAS LIGERAS PARA EL NAVEGADOR.
// Las versiones comentadas siguen siendo style.css e index.js. Nunca edites los .min a mano.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { minify } from 'terser';
import CleanCSS from 'clean-css';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Reduce el CSS sin cambiar su diseño y detiene el proceso si encuentra valores inválidos.
const css = new CleanCSS({ level: 2 }).minify(
  await fs.readFile(path.join(root, 'style.css'), 'utf8'),
);
if (css.errors.length) throw new Error(css.errors.join('\n'));
if (css.styles.includes('NaN')) throw new Error('Valor CSS inválido generado al minificar.');
await fs.writeFile(
  path.join(root, 'style.min.css'),
  '/* Generado automáticamente. Edita style.css, con comentarios en español, y ejecuta npm run build. */\n' +
    css.styles,
);
// Reduce el JavaScript. Las explicaciones permanecen en el archivo fuente.
const js = await minify(await fs.readFile(path.join(root, 'index.js'), 'utf8'), {
  compress: true,
  mangle: true,
  format: { comments: false },
});
await fs.writeFile(
  path.join(root, 'index.min.js'),
  '/* Generado automáticamente. Edita index.js, con comentarios en español, y ejecuta npm run build. */\n' +
    js.code,
);
console.log('CSS y JavaScript minificados.');
