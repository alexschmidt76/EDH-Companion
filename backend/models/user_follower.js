'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    followedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
  })
};