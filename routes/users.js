const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dataAssociationDB');

const plm = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  dp: {
    type: String, // Assuming dp is a URL to the display picture
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);

