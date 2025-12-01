'use strict';

// import node modules
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';


// may use these on production deployment for connecting to sequelize
//const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
/*let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}*/

// initialize db object
const db = {};


// connect to sequelize
const sequelize = new Sequelize({
  username: process.env.DEVELOPMENT_DATABASE_USERNAME,
  password: process.env.DEVELOPMENT_DATABASE_PASSWORD,
  database: process.env.DEVELOPMENT_DATABASE_NAME,
  host: process.env.DEVELOPMENT_DATABASE_URL,
  dialect: 'potsgres',
  port: 5432,
  ssl: true,
  dialectOptions: { 
    clientMinMessages: 'notice'
  }
});

/* MODEL CREATIONS FROM MODEL FILES */

// initialize models and add them to db
fs.readdirSync(__dirname).forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

// run model association functions
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;