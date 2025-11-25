'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// connect to sequelize
/*let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}*/

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

// create models for non-dependent tables
['game', 'pod', 'user_follower', 'user'].forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

// create models for dependent tables, these require other models to be passed to them to be created
[
  require(path.join(__dirname, 'pod_game'))(sequelize, Sequelize.DataTypes, db['Pod'], db['Game']),
  require(path.join(__dirname, 'pod_user'))(sequelize, Sequelize.DataTypes, db['Pod'], db['User']),
  require(path.join(__dirname, 'user_game'))(sequelize, Sequelize.DataTypes, db['User'], db['Game'])
].forEach(model => {
    db[model.name] = model
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
