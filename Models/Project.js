const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  user: {
    type: String,
  },
  /// ADD userS schema here that hold an array of users (email)
  users: {
    type: Array,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('project', ProjectSchema);
