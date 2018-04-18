const express = require('express');
const Category = require('../../models/Category');
const router = express.Router();


router.all('*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.get('/', (req, res) => {
  Category.find().then(categories => res.render('admin/categories/index', { categories }));
});

router.post('/create', (req, res) => {
  const newCategory = Category({
    name: req.body.name
  });
  newCategory.save().then(() => res.redirect('/admin/categories'));
});

router.get('/edit/:id', (req, res) => {
  Category.findById(req.params.id)
    .then(category => res.render('admin/categories/edit', { category }));
});

router.put('/edit/:id', (req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      category.name = req.body.name;
      return category.save();
    })
    .then(() => res.redirect('/admin/categories'));
});

router.delete('/:id', (req, res) => {
  Category.remove({ _id: req.params.id })
    .then(() => res.redirect('/admin/categories'));
});

module.exports = router;