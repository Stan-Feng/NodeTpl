var _ = require('lodash');
var express = require('express');
var router = express.Router();

var id = 1;
var lions = [
  { name: 'Stan Feng', pride: 'High', age: '22', gender: 'male', id: '0' }
];

router.param('id', function (req, res, next, id) {
  var lion = _.find(lions, { id: id });

  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.status(404).json({ err: 'Invalid Id. \n', id: id });
  }
});

router.get('/', (req, res) => {
  res.json(lions);
});

router.post('/', (req, res) => {
  var lion = req.body;
  lion.id = id + '';
  id += 1;
  lions.push(lion);

  res.json(lion);
});

router.get('/:id', (req, res) => {
  res.json(req.lion);
});

router.put('/:id', (req, res) => {
  var updatingLion = req.body;
  var updatedLion = _.assign(lions[req.lion.id], updatingLion);

  res.json(updatedLion);
});

router.delete('/:id', (req, res) => {
  var deletedLion = lions[req.lion.id];
  lions = lions.slice(parseInt(req.lion.id, 10), 1);

  res.json(deletedLion);
});

module.exports = router;
