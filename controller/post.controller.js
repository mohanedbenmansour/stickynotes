const post = require('../models/post.model');
const mongoose = require('mongoose');

module.exports.addPost = (req, res, next) => {
  let newPost = new post({
    userId: req.body.userId,
    content: req.body.content,
    date: req.body.date,
  });
  newPost.save((err, post) => {
    if (err) res.status(500).json({ errmsg: err });
    res.status(200).json({ msg: post });
  });
};
module.exports.getPosts = (req, res, next) => {
  let query = { userId: req.body.userId };
  post.find(query, (err, posts) => {
    if (err) res.status(500).json({ ermsg: err });
    res.status(200).json({ msg: posts });
  });
};
module.exports.deletePost = (req, res, next) => {
  post.findOneAndRemove({ _id: req.params.id }, (err, post) => {
    if (err) res.status(500).json({ ermsg: err });
    res.status(500).json({ post: post });
  });
};
