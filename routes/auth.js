const express = require('express');
const router = express.Router();
const { User, Role } = require('../models/init');
const { isAuthenticated } = require('../middleware/auth');

// Login page
router.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  res.render('auth/login');
});

// Login process
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.validatePassword(password))) {
      return res.render('auth/login', {
        error: 'Invalid username or password'
      });
    }

    if (!user.isActive) {
      return res.render('auth/login', {
        error: 'Account is deactivated'
      });
    }

    req.session.userId = user.id;
    user.lastLogin = new Date();
    await user.save();

    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

// Register page
router.get('/register', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  res.render('auth/register');
});

// Register process
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.render('auth/register', {
        error: 'Username or email already exists'
      });
    }

    // Get default role
    const defaultRole = await Role.findOne({ where: { name: 'user' } });
    if (!defaultRole) {
      throw new Error('Default role not found');
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      RoleId: defaultRole.id
    });

    req.session.userId = user.id;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/login');
  });
});

module.exports = router; 