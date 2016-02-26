const express = require('express');
const app = express();

const api = require('./apis/api');
const config = require('./config/config');
const logger = require('./utils/logger');

// Connect to db
require('mongoose').connect(config.db.url);

// Set up middlewares
require('./middlewares/appMiddleware')(app);

app.use('/api', api);

// 404 Error Handling
app.use(function (err, req, res, next) {
  res.status(404).json({ err: err, msg: 'Page Not Found.'});
});

module.exports = app;
