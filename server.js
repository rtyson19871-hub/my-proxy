const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(express.static(__dirname));

app.use('/proxy', createProxyMiddleware({
    target: 'https://cdn.jsdelivr.net/gh/rtyson19871-hub/LumenProxy@c530fd2/index.svg', // <-- CHANGE THIS to your website
    changeOrigin: true,
    pathRewrite: { '^/proxy': '' },
    onProxyRes: (proxyRes) => {
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    }
}));

app.listen(3000, () => {
    console.log('Proxy is running at http://localhost:3000');
});
