const express = require('express');
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const router = express.Router();

router.all('*', (req, res, next) => {
  req.app.locals.layout = 'home';
  next();
});

router.get('/', (req, res) => {
  Post.find({}).then(posts => {
    Category.find({}).then(categories => res.render('home/index', { posts, categories }))
  });
});

router.get('/about', (req, res) => {
  res.render('home/about');
});

router.get('/login', (req, res) => {
  res.render('home/login');
});

router.get('/register', (req, res) => {
  res.render('home/register');
});

router.get('/post/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      Category.find({}).then(categories => res.render('home/post', { post, categories }))
    });
});

module.exports = router;