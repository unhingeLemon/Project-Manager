const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  projectId: {
    /// Holds the current project of the users. Immutable.s
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
