'use strict';
const _ = require('lodash');
const Category = require('./categoryModel');

exports.params = (req, res, next, id) => {
  Category.findById(id)
    .then(category => {
      if (!category) {
        next(new Error('No Category with this id'));
      }
      req.category = category;
      next();
    })
    .catch(err => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  Category.find({})
    .then(categories => {
      res.json(categories);
    })
    .catch(err => {
      next(err);
    });
};

exports.getOne = (req, res, next) => {
  var category = req.category;
  res.json(category);
};

exports.put = (req, res, next) => {
  var category = req.category;
  var update = req.body;

  _.merge(category, update);

  category.save((err, saved) => {
    if (err) {
      next(err);
    }
    res.json(saved);
  });
};

exports.post = (req, res, next) => {
  var newcategory = req.body;

  Category.create(newcategory)
    .then(category => {
      res.json(category);
    })
    .catch(err => {
      next(err);
    });
};

exports.delete = (req, res, next) => {
  req.category.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
