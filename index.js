const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Максимально простое проксирование. 
// changeOrigin: true автоматически подменит заголовок Host на "api.telegram.org",
// а отсутствие ручных обработчиков исключит ошибку отсутствующего Host-заголовка.
app.use(
  '/',
  createProxyMiddleware({
    target: 'https://api.telegram.org',
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
