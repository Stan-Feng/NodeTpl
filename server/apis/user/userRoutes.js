var router = require('express').Router();
var logger = require('../../utils/logger');

router.route('/')
  .get((req, res) => {
    logger.log('Hey from user!');
    res.send({ ok: true });
  });

module.exports = router;
