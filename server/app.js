var express = require('express');
var logger = require('./utils/logger');

var api = require('./apis/api');

var app = express();
require('./middlewares/appMiddleware')(app);

// Routers
app.get('/', function (req, res) {
  res.sendFile('../client/index.html')
});

app.use('/api', api);

// 404 Error Handling
app.use(function (err, req, res, next) {
  res.status(404).json({ err: err, msg: 'Page Not Found.'});
});

module.exports = app;
