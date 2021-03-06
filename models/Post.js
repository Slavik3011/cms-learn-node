const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // user: {
  //   type: String,
  //   required: true
  // },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'public'
  },
  allowComments: {
    type: Boolean,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  file: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;