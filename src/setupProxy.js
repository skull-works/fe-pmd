const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/login',  createProxyMiddleware({ target: 'http://localhost:9000' }));
  app.use('/csrf-token',  createProxyMiddleware({ target: 'http://localhost:9000' }));
  app.use('/isLoggedIn',  createProxyMiddleware({ target: 'http://localhost:9000' }));
  app.use('/logout',  createProxyMiddleware({ target: 'http://localhost:9000' }));
  app.use('/application_form',  createProxyMiddleware({ target: 'http://localhost:9000' }));
  app.use('/application_form-details',  createProxyMiddleware({ target: 'http://localhost:9000' }));
  app.use('/passbook',  createProxyMiddleware({ target: 'http://localhost:9000' }));
  app.use('/passbook-item',  createProxyMiddleware({ target: 'http://localhost:9000' }));
  app.use('/calendarReport', createProxyMiddleware({ target: 'http://localhost:9000' }));
  app.use('/GraphReport', createProxyMiddleware({ target: 'http://localhost:9000' }));
}