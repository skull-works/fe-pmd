const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 3000;
const app = express();

require('dotenv').config();
let host = process.env.HOST || 'http://localhost';
let proxyHost = `${host}:9000`;

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running

//proxy api end points
app.use('/login',  createProxyMiddleware({ target: proxyHost }));
app.use('/csrf-token',  createProxyMiddleware({ target: proxyHost }));
app.use('/isLoggedIn',  createProxyMiddleware({ target: proxyHost }));
app.use('/logout',  createProxyMiddleware({ target: proxyHost }));
app.use('/application_form',  createProxyMiddleware({ target: proxyHost }));
app.use('/application_form-details',  createProxyMiddleware({ target: proxyHost }));
app.use('/passbook',  createProxyMiddleware({ target: proxyHost }));
app.use('/passbook-item',  createProxyMiddleware({ target: proxyHost }));
app.use('/calendarReport', createProxyMiddleware({ target: proxyHost }));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);