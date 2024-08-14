const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
  likes: {
    type: Array, // Assuming likes are stored as an array of user IDs or usernames
    default: [],
  },
});

module.exports = mongoose.model('Post', postSchema);
