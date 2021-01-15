const express = require('express');
const router = express.Router();
const bcrypts = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { createToken } = require('../config/auth');
const auth = require('../middleware/auth');

const User = require('../models/User');

// register user
router.post(
  '/',
  [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please add a valid email').isEmail(),
    check(
      'password',
      'Please add a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ success: false, msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypts.genSalt(10);

      user.password = await bcrypts.hash(password, salt);

      await user.save();

      const token = createToken(user._id, 60 * 60 * 24);

      res.cookie('authToken', token, {
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, msg: 'Server Error' });
    }
  }
);

// login user
router.post(
  '/login',
  [
    check('email', 'Please add a valid email').isEmail(),
    check('password', 'A password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypts.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, msg: 'Invalid Credentials' });
      }

      const token = createToken(user._id, 1000 * 60 * 60 * 24);

      res.cookie('authToken', token, {
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, msg: 'Server Error' });
    }
  }
);

// PRIVATE ROUTE - get the user after log in
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* TESTE INSERIR UMA COOKIE */
router.get('/cookie', (req, res) => {
  res.cookie('authToken', 'inserir cookie de teste aqui ', {
    maxAge: 1000 * 60 * 5,
  });
  res.send('cookie inserida');
});

module.exports = router;
