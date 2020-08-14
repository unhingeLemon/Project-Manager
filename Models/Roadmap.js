const mongoose = require('mongoose');

var childPlan = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const Roadmap = mongoose.Schema({
  project: {
    type: String,
    required: true,
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
    default: 'in-progress',
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  childPlan: [childPlan],
});

module.exports = mongoose.model('roadmap', Roadmap);
