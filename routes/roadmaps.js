const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Roadmap = require('../Models/Roadmap');

// @route   GET api/plans
// @desc    Get all the users plans
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const plans = await Roadmap.find({ project: req.params.id }).sort({
      createdDate: 1,
    });
    res.json(plans);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/roadmap
// @desc    Add new plans
// @access  Private
// put auth in the middle to make it private
router.post(
  '/',
  auth,
  [[check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, project } = req.body;
    try {
      const newRoadmap = new Roadmap({
        title,
        project,
      });
      const roadmap = await newRoadmap.save();
      res.json(roadmap);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/roadmaps/:id
// @desc    Update Roadmap
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const {
    title,
    description,
    status,
    startDate,
    dueDate,
    childPlans,
  } = req.body;

  // Build Roadmap object
  const planFields = {};
  if (title) planFields.title = title;
  if (description) planFields.description = description;
  if (status) planFields.status = status;
  if (startDate) planFields.startDate = startDate;
  if (dueDate) planFields.dueDate = dueDate;
  if (childPlans) planFields.childPlans = childPlans;

  try {
    let plan = await Roadmap.findById(req.params.id);

    if (!plan) return res.status(404).json({ msg: 'Plan not found' });

    plan = await Roadmap.findByIdAndUpdate(
      req.params.id,
      { $set: planFields },
      { new: true }
    );

    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   UPDATE api/roadmaps/childplan/:id
// @desc    update a childPlan
// @access  Private
router.put('/childPlan/:id', auth, async (req, res) => {
  const { title, description, checked } = req.body;

  // Build child plan object
  const childPlanField = {};
  childPlanField._id = req.params.id;
  if (title) childPlanField.title = title;
  if (description) childPlanField.description = description;
  if (checked) childPlanField.checked = checked;

  try {
    let updatedChild = await Roadmap.findOneAndUpdate(
      { 'childPlans._id': req.params.id },
      {
        $set: {
          'childPlans.$': childPlanField,
        },
      }
    );
    updatedChild = await Roadmap.findOne({ 'childPlans._id': req.params.id });
    res.json(updatedChild);

    // if (!plan) return res.status(404).json({ msg: 'Plan not found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/roadmaps/childplan/:id
// @desc    Delete a childPlan
// @access  Private
router.delete('/childPlan/:id', auth, async (req, res) => {
  try {
    await Roadmap.findOne({ 'childPlans._id': req.params.id }, async function (
      err,
      result
    ) {
      try {
        await result.childPlans.id(req.params.id).remove();
        let doc = await result.save();

        res.json(doc);
      } catch (error) {
        res.status(404).json({ msg: 'Plan not found' });
      }
    });

    // if (!plan) return res.status(404).json({ msg: 'Plan not found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/roadmaps/childplan/:id
// @desc    Delete a childPlan
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let plan = await Roadmap.findById(req.params.id);

    if (!plan) return res.status(404).json({ msg: 'Plan not found' });

    await Roadmap.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Plan removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
