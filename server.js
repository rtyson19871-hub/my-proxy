const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(express.static(__dirname));

app.use('/proxy', createProxyMiddleware({
    target: 'https://cdn.jsdelivr.net/gh/rtyson19871-hub/LumenProxy@main/index.svg', // <-- CHANGE THIS to your website
    changeOrigin: true,
    pathRewrite: { '^/proxy': '' },
    onProxyRes: (proxyRes) => {
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy running on port ${PORT}`);
});

