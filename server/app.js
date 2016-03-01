const express = require('express');
const app = express();

const auth = require('./auth/routes');
const api = require('./apis/api');
const config = require('./config/config');
const logger = require('./utils/logger');

// Connect to db
require('mongoose').connect(config.db.url);

if (config.seed) {
  require('./utils/seed');
}

// Set up middlewares
require('./middlewares/appMiddleware')(app);

app.use('/api', api);
app.use('/auth', auth);

// 404 Error Handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Token');
  }
  res.status(500).json({ err: err, msg: 'Oops!!'});
});

module.exports = app;
