const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  status: {
    type: String,
    default: 'public'
  },
  allowComments: {
    type: Boolean,
    require: true
  },
  body: {
    type: String,
    require: true
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;