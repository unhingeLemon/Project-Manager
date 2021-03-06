const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../Models/User');

// @route   GET api/auth
// @desc    Get log in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).sendStatus('Server Error');
  }
});

// @route   GET api/auth
// @desc    Get ID of an email
// @access  Private
router.get('/:email', auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      '-password'
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).sendStatus('Server Error');
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // if the email does not exist
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      /// compare the hash password and the plain txt password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentias' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 60 * 60 * 12,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
