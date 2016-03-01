const _ = require('lodash');

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  // 10 days
  expireTime: 24 * 60 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  }
};

// Set default prorcess.env.NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// Set config.env to NODE_ENV
config.env = process.env.NODE_ENV;

var envConfig;

try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

module.exports = _.merge(config, envConfig);
