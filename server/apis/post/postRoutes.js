const router = require('express').Router();
const controller = require('./postController');
const createRoute = require('../../utils/createRoute');

createRoute(controller, router);

module.exports = router;
