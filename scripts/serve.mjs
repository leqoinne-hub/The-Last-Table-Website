// Local preview of dist/ at http://localhost:8080 (PORT overrides). No dependencies.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const PORT = Number(process.env.PORT) || 8080;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.pdf': 'application/pdf', '.zip': 'application/zip', '.xml': 'application/xml', '.txt': 'text/plain',
};

async function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  for (const candidate of [clean, `${clean}.html`, join(clean, 'index.html')]) {
    const file = join(DIST, candidate);
    if (!file.startsWith(DIST)) continue;
    try { if ((await stat(file)).isFile()) return file; } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  const file = await resolve(req.url === '/' ? '/index.html' : req.url);
  const target = file || join(DIST, '404.html');
  res.writeHead(file ? 200 : 404, { 'Content-Type': TYPES[extname(target)] || 'application/octet-stream' });
  res.end(await readFile(target));
}).listen(PORT, () => console.log(`Previewing dist/ at http://localhost:${PORT}  (try ?launch=open on the home page)`));
