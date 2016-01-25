// colors will attached colors to String.prototype
require('colors');
var _ = require('lodash');

var config = require('../config/config');

// create a noop (no operation) function for when loggin is disabled
var noop = function () {};
// check if loggin is enabled in the config
// if it is, then use console.log
// if not then noop
var consoleLog = config.logging ? console.log.bind(console) : noop;

var logger = {
  log: function () {
    var args = _.toArray(arguments)
      .map(arg => {
        if (typeof arg === 'object') {
          var string = JSON.stringify(arg, 2);

          return string.magenta;
        } else {
          arg += '';

          return arg.magenta;
        }
      });

    consoleLog.apply(console, args);
  }
};

module.exports = logger;
