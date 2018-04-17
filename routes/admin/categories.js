const express = require('express');
const Category = require('../../models/Category');
const router = express.Router();


router.all('*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.get('/', (req, res) => {
  res.render('admin/categories/index');
});

router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard');
});

router.post('/generate-fake-posts', (req, res) => {
  for(let i = 0; i < req.body.amount; i++) {
    let post = new Post();
    post.title = faker.name.title();
    post.status = 'public';
    post.allowComments = faker.random.boolean();
    post.body = faker.lorem.sentence();
    post.save(err => {
      if (err) throw err;
    });
  }
  res.redirect('/admin')
});

module.exports = router;