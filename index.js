const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/v1', createProxyMiddleware({
  target: 'https://api.mistral.ai',
  changeOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
  }
}));

app.listen(process.env.PORT || 3000);
