import http from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4173;
const OPEN_BROWSER = !process.argv.includes('--no-open');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf'
};

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    send(res, 405, { 'Content-Type': 'text/plain; charset=utf-8', Allow: 'GET, HEAD' }, 'Method Not Allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
  } catch {
    send(res, 400, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Bad Request');
    return;
  }

  if (pathname === '/') pathname = '/index.html';
  const filePath = path.resolve(ROOT, `.${pathname}`);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    send(res, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Forbidden');
    return;
  }

  let stats;
  try {
    stats = statSync(filePath);
    if (stats.isDirectory()) {
      send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not Found');
      return;
    }
  } catch {
    send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not Found');
    return;
  }

  const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
  const headers = {
    'Content-Type': type,
    'Content-Length': stats.size,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  };

  if (req.method === 'HEAD') {
    res.writeHead(200, headers);
    res.end();
    return;
  }

  res.writeHead(200, headers);
  const stream = createReadStream(filePath);
  stream.on('error', () => {
    res.destroy();
  });
  stream.pipe(res);
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\nПорт ${PORT} уже занят. Закройте другой экземпляр ALOUD или запустите: PORT=4174 node server.js\n`);
  } else {
    console.error('Ошибка сервера:', error);
  }
  process.exitCode = 1;
});

server.listen(PORT, '127.0.0.1', () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n  ALOUD запущен: ${url}\n`);
  console.log('  Микрофон и распознавание речи работают на localhost.');
  console.log('  Остановить сервер: Ctrl+C\n');
  if (OPEN_BROWSER && process.platform === 'win32') {
    spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' }).unref();
  }
});
