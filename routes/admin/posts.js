const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.get('/', (req, res) => {
  Post.find().then(posts => res.render('admin/posts', {posts}));
});

router.get('/create', (req, res) => {
  res.render('admin/posts/create')
});

router.post('/create', (req, res) => {
  let { title, status, allowComments, body } = req.body;
  allowComments = !!allowComments;
  const newPost = Post({
    title,
    status,
    allowComments,
    body
  });

  newPost.save()
    .then(() => res.redirect('/admin/posts'))
    .catch(err => console.log("Couldn't save post", err));
});

router.get('/edit/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.render('admin/posts/edit', {post}));
});

router.put('/edit/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      let { title, status, allowComments, body } = req.body;
      allowComments = !!allowComments;
      post.title = title;
      post.status = status;
      post.allowComments = allowComments;
      post.body = body;
      post.save().then(() => res.redirect('/admin/posts'));
    });
});

router.delete('/:id', (req, res) => {
  Post.remove({_id: req.params.id}).then(() => res.redirect('/admin/posts'))
});

module.exports = router;