const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Проксируем все запросы напрямую на Telegram API без изменения путей (это исключает двойные слеши)
app.use(
  '/',
  createProxyMiddleware({
    target: 'https://api.telegram.org',
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req, res) => {
        // Удаляем заголовок host, чтобы Telegram принял запрос
        proxyReq.removeHeader('host');
      }
    }
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
