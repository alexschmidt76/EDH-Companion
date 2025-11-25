require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DEVELOPMENT_DATABASE_USERNAME,
    password: process.env.DEVELOPMENT_DATABASE_PASSWORD,
    database: process.env.DEVELOPMENT_DATABASE_NAME,
    host: process.env.DEVELOPMENT_DATABASE_URL,
    dialect: 'postgres',
    port: 5432,
    ssl: true,
    dialectOptions: { 
      clientMinMessages: 'notice'
    }
  },
  "production": {
    username: process.env.PRODUCTION_DATABASE_USERNAME,
    password: process.env.PRODUCTION_DATABASE_PASSWORD,
    database: process.env.PRODUCTION_DATABASE_NAME,
    host: process.env.PRODUCTION_DATABASE_URL,
    dialect: 'postgres',
    port: 5432,
    ssl: true,
    dialectOptions: { 
      clientMinMessages: 'notice'
    }
  }
};
