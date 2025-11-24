'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// connect to sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/* MODEL CREATIONS FROM MODEL FILES */

// create models for non-dependent tables
['game', 'pod', 'user_follower', 'user'].forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

// create models for dependent tables, these require other models to be passed to them to be created
['pod_game', 'pod_user', 'user_game'].forEach(file => {
  let model;
  switch (file) {
    case 'pod_game':
      model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes, db['Pod'], db['Game']);
      break;
    case 'pod_user':
      model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes, db['Pod'], db['User']);
      break;
    case 'user_game':
      model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes, db['User'], db['Game']);
      break;
  }
  db[model.name] = model;
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
