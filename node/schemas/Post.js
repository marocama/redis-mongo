const mongoose = require('mongoose')

const Post = new mongoose.Schema({
  title: String,
  author: String,
})

module.exports = mongoose.model('Post', Post)