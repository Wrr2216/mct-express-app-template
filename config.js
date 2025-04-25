const path = require('path');

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'app_template',
    dialect: 'mysql'
  },
  
  session: {
    key: process.env.SESSION_KEY || 'app_template_session',
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: path.join(__dirname, 'log', 'app.log')
  }
};

module.exports = config; 