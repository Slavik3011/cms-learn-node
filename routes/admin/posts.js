const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const { isEmpty, uploadDir } = require('../../helpers/upload-helper');

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.get('/', (req, res) => {
  Post.find().then(posts => res.render('admin/posts', {posts}));
});

router.get('/create', (req, res) => {
  Category.find().then(categories => res.render('admin/posts/create', { categories }))
});

router.post('/create', (req, res) => {
  let { title, status, allowComments, body } = req.body;
  let fileName = 'no-photo.png';
  const errors = [];

  if(!title) errors.push({message: 'Please add a title'});
  if(!body) errors.push({message: 'Please add a description'});

  if (errors.length) {
    res.render('admin/posts/create', { errors });
  } else {
    if (!isEmpty(req.files)) {
      const file = req.files.file;
      fileName = `${Date.now()}-${file.name}`;
      const dirUploads = './public/uploads/';
      file.mv(dirUploads + fileName, err => {
        if (err) throw err;
      });
    }

    allowComments = !!allowComments;
    const newPost = Post({
      title,
      status,
      allowComments,
      body,
      file: fileName
    });

    newPost.save()
      .then((savedPost) => {
        req.flash('success-message', `Post ${savedPost.title} was created successfully.`);
        res.redirect('/admin/posts')
      })
      .catch(err => console.log("Couldn't save post", err));
  }
});

router.get('/edit/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      Category.find().then(categories => {
        res.render('admin/posts/edit', { post, categories })
      });
    });
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

      if (!isEmpty(req.files)) {
        const file = req.files.file;
        const fileName = `${Date.now()}-${file.name}`;
        const dirUploads = './public/uploads/';
        file.mv(dirUploads + fileName, err => {
          if (err) throw err;
        });
        post.file = fileName;
      }

      post.save().then(() => {
        req.flash('success_message', 'Post was successfully updated');
        res.redirect('/admin/posts')
      });

    });
});

router.delete('/:id', (req, res) => {
  Post.findOne({_id: req.params.id})
    .then(post => {
      fs.unlink(uploadDir + post.file, () => {
        post.remove();
        req.flash('success_message', 'Post was successfully deleted');
        res.redirect('/admin/posts');
      });

    })
});

module.exports = router;