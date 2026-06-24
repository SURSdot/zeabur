const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Направляем сырой URL (req.url) напрямую в Telegram API без какого-либо роутинга
  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: req.url,
    method: req.method,
    headers: { ...req.headers }
  };

  // Удаляем заголовок host, чтобы Telegram принял запрос
  delete options.headers['host'];

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error_code: 500, description: err.message }));
  });

  // Перенаправляем входящий поток (тело запроса, файлы, видео) напрямую
  req.pipe(proxyReq, { end: true });
});

server.listen(PORT, () => {
  console.log(`Native proxy server running on port ${PORT}`);
});
