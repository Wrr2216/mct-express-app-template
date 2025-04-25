const { User, Role } = require('../models/init');

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/auth/login');
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.redirect('/auth/login');
    }

    const user = await User.findByPk(req.session.userId, {
      include: [Role]
    });

    if (!user || user.Role.name !== 'admin') {
      return res.status(403).render('error', {
        message: 'Access denied. Admin privileges required.',
        error: {}
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const hasPermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.session || !req.session.userId) {
        return res.redirect('/auth/login');
      }

      const user = await User.findByPk(req.session.userId, {
        include: [Role]
      });

      if (!user || !user.Role.permissions[permission]) {
        return res.status(403).render('error', {
          message: 'Access denied. Insufficient permissions.',
          error: {}
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  isAuthenticated,
  isAdmin,
  hasPermission
}; 