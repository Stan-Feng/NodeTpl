const User = require('../apis/user/userModel');
const signToken = require('./auth').signToken;

exports.signin = function (req, res, next) {
  const token = signToken(req.user._id);
  res.json(token);
};
