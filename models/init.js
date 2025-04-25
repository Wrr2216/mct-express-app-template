const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
    logging: config.env === 'development' ? console.log : false
  }
);

// Define models
const User = require('./User')(sequelize);
const Role = require('./Role')(sequelize);

// Define associations
User.belongsTo(Role);
Role.hasMany(User);

const initializeModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: config.env === 'development' });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  sequelize,
  initializeModels,
  User,
  Role
}; 