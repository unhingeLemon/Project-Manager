const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const User = require('../models/User');
const Bug = require('../Models/Bug');

// @route   GET api/bugs
// @desc    Get all the project's bugs
// @access  Private
router.get('/:projectId', auth, async (req, res) => {
  try {
    const bugs = await Bug.find({ project: req.params.projectId }).sort({
      date: -1,
    });
    res.json(bugs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/bugs
// @desc    Add new bugs
// @access  Private
// put auth in the middle to make it private
router.post(
  '/:projectId',
  auth,
  [
    [check('title', 'Title is required').not().isEmpty()],
    [check('priority', 'Priority is required')],
    [check('status', 'Status is required')],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, priority, description, status, createdBy } = req.body;
    try {
      const newBug = new Bug({
        title,
        priority,
        description,
        status,
        createdBy,
        project: req.params.projectId,
      });
      const bug = await newBug.save();
      res.json(bug);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/bugs/:id
// @desc    Update Bugs
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { status } = req.body;

  // Build bug object
  const bugFields = {};
  if (status) bugFields.status = status;

  try {
    let bug = await Bug.findById(req.params.id);

    if (!bug) return res.status(404).json({ msg: 'Bug not found' });

    bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { $set: bugFields },
      { new: true }
    );

    res.json(bug);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/bugs/:id
// @desc    Delete Bugs
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let bug = await Bug.findById(req.params.id);

    if (!bug) return res.status(404).json({ msg: 'Bug not found' });

    await Bug.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Bug removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
