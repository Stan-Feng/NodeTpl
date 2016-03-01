const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const config = require('../config/config');
const checkToken = expressJwt({ secret: config.secrets.jwt });

const User = require('../apis/user/userModel');

exports.decodeToken = function () {
  return (req, res, next) => {
    if (req.query && req.query.hasOwnProperty('access_token')) {
      // Namespacing with json web token
      req.headers.authrization = 'Bearer ' + req.query.access_token;
    }

    checkToken(req, res, next);
  };
};

exports.getFreshUser = function () {
  return function (req, res, next) {
    User.findById(req.user_id)
      .then(user => {
        if (!user) {
          res.status(401).send('Unauthorized');
        }

        req.user = user;
        next();
      })
      .catch(err => {
        next(err);
      });
  };
};

// Nothing to do with JWT, just vertification
exports.vertifyUser = function () {
  return function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      res.status(400).send('Username and password are required.');
      return;
    }

    User.findOne({ username })
      .then(user => {
        if (!user) {
          res.status(401).send('Username not found');
        }

        if (!user.authenticate(password)) {
          res.status(401).send('Invalid password');
        }

        req.user = user;
        next();
      })
      .catch(err => {
        next(err);
      });
  };
};

exports.signToken = function (id) {
  return jwt.sign(
    { _id: id },
    config.secrets.jwt,
    { expiresIn: config.expireTime }
  );
};
