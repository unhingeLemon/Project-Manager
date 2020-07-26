const mongoose = require('mongoose');

const Roadmap = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: 'todo',
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
});

module.exports = mongoose.model('roadmap', Roadmap);
