// Genera una única hoja de fuentes compartida, válida tanto en file:// como en HTTPS.
// No se desactiva CORS ni se depende de JavaScript o de un proveedor de fuentes externo.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// FUENTES ORIGINALES. Manrope se usa en títulos y DM Sans en el texto normal.
const fonts = [
  { family: 'Manrope', file: 'manrope-latin-wght-normal.woff2', weight: '200 800' },
  { family: 'DM Sans', file: 'dm-sans-latin-wght-normal.woff2', weight: '100 1000' },
];
// Lee cada fuente y la integra como texto dentro del CSS compartido.
// Esto evita que el navegador tenga que pedir un archivo WOFF2 desde una dirección file://.
const rules = await Promise.all(
  fonts.map(async (font) => {
    const bytes = await fs.readFile(path.join(root, 'assets/fonts', font.file));
    const uri = `data:font/woff2;base64,${bytes.toString('base64')}`;
    return `@font-face{font-family:'${font.family}';src:url('${uri}') format('woff2');font-style:normal;font-weight:${font.weight};font-display:swap}`;
  }),
);
// Escribe la hoja generada. Para cambiarla, edita este script, no la cadena larga de datos.
await fs.writeFile(
  path.join(root, 'assets/fonts/fonts.css'),
  '/* FUENTES COMPARTIDAS. Generado por scripts/fonts.mjs; edita ese archivo y ejecuta npm run build.\n   Los datos largos de abajo contienen las fuentes originales. No los cambies a mano.\n   Permiten abrir las páginas con doble clic, sin bloquear fuentes locales. Licencias conservadas. */\n' +
    rules.join('\n') +
    '\n',
);
console.log(
  'Manrope y DM Sans integradas en un único CSS: sin solicitudes WOFF2 ni CORS en file://.',
);
