const router = require('express').Router();
const vertifyUser = require('./auth').vertifyUser;
const controller = require('./controller');

router.post('/signin', vertifyUser(), controller.signin);

module.exports = router;
