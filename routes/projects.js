const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const User = require('../models/User');
const Project = require('../models/Project');

// @route   GET api/projects
// @desc    Get all the users projects
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user.id,
    }).sort({
      date: -1,
    });
    res.json(projects);
    req.current = projects;
    console.log(req.current);

    /// IF YOU WANT TO LOAD THE CURRENT,
    // JUST WRITE AN ALGO THAT WILL FILTER THE projects
    // and find the current: true.
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/projects
// @desc    Add new project
// @access  Private
router.post(
  '/',
  auth,
  [[check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    try {
      const newProject = new Project({
        title,
        description,
        user: req.user.id,
      });
      const project = await newProject.save();
      res.json(project);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET current api/projects
// @desc   Load the users current project
// @access  Private
router.get('/:projectId', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
