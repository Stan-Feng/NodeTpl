var router = require('express').Router();
var logger = require('../../utils/logger');

router.route('/')
  .get((req, res) => {
    logger.log('Hey from category!');
    res.send({ ok: true });
  });

module.exports = router;
