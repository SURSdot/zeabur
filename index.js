const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Перенаправляем все входящие запросы и потоки в Telegram API без ограничения по времени
app.use(
  '/',
  createProxyMiddleware({
    target: 'https://api.telegram.org',
    changeOrigin: true,
    pathRewrite: {
      '^/': '/',
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        // Обязательно удаляем заголовок host
        proxyReq.removeHeader('host');
      }
    }
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});