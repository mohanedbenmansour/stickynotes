const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
  content: {
    type: 'string',
    required: 'content should not be empty',
    minlength: [5, 'min length is 5 for content'],
  },
  userId: {
    type: 'string',
    required: 'user ID should not be empty',
  },
  date: {
    type: 'string',
    required: 'date should not be empty',
  },
});

module.exports = mongoose.model('post', postSchema);
