var path = require('path');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
  // Static files
  app.use(express.static('client'));

  // Log request
  app.use(morgan('dev'));

  // Parsers
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
