'use strict';
const _ = require('lodash');

const User = require('../apis/user/userModel');
const Post = require('../apis/post/postModel');
const Category = require('../apis/category/categoryModel');

const logger = require('./logger');

logger.log('Seeding the Database');

const users = [
  { username: 'Anan Wang', password: 'test123' },
  { username: 'Junwen Feng', password: 'test123' },
  { username: 'Mengyu Wang', password: 'test123' },
  { username: 'Min Cao', password: 'test123' }
];

const categories = [
  {name: 'intros'},
  {name: 'angular'},
  {name: 'UI/UX'}
];

const posts = [
  {title: 'Learn angular 2 today', text: 'Angular to is so dope'},
  {title: '10 reasons you should love IE7', text: 'IE7 is so amazing'},
  {title: 'Why we switched to Go', text: 'go is dope'}
];

const createDoc = function (Model, doc) {
  return new Promise((resolve, reject) => {
    new Model(doc).save((err, saved) => {
      return err ? reject(err) : resolve(saved);
    });
  });
};

const cleanDB = function () {
  logger.log('....cleaning the test DB.');

  const models = [User, Category, Post];
  return Promise.all(models.map(model => {
    return model.remove().exec();
  }));
};

const createUsers = function (data) {
  const promises = users.map(user => {
    return createDoc(User, user);
  });

  return Promise.all(promises)
    .then(users => {
      return _.merge({ users }, data || {});
    });
};

const createCategories = function (data) {
  const promises = categories.map((category) => {
    return createDoc(Category, category);
  });

  return Promise.all(promises)
    .then((categories) => {
      return _.merge({categories: categories}, data || {});
    });
};

const createPosts = function (data) {
  const addCategory = (post, category) => {
    post.categories.push(category);

    return new Promise((resolve, reject) => {
      post.save((err, saved) => {
        return err ? reject(err) : resolve(saved);
      });
    });
  };

  const newPosts = posts.map((post, i) => {
    post.author = data.users[i]._id;
    return createDoc(Post, post);
  });

  return Promise.all(newPosts)
   .then((savedPosts) => {
     return Promise.all(savedPosts.map((post, i) => {
       return addCategory(post, data.categories[i]);
     }));
   })
   .then(function () {
     return 'Seeded DB with 3 Posts, 3 Users, 3 Categories';
   });
};

cleanDB()
  .then(createUsers)
  .then(createCategories)
  .then(createPosts)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
