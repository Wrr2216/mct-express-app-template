const express = require('express');
const router = express.Router();
const { User } = require('../models/init');
const { isAuthenticated } = require('../middleware/auth');

// Home page
router.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/dashboard');
  }
  res.render('index');
});

// Dashboard
router.get('/dashboard', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.userId, {
      attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'lastLogin']
    });

    res.render('dashboard', {
      user,
      title: 'Dashboard'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 