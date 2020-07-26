const mongoose = require('mongoose');

const BugSchema = mongoose.Schema({
  project: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    default: 'Low',
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: 'todo',
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('bug', BugSchema);
