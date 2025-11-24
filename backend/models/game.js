'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.belongsToMany(models.User, { through: models.UserGame });
      Game.belongsToMany(models.Pod, { through: models.PodGame });
    }
  }
  Game.init({
    id: {
      type: DataTypes.STRING,
      autoIncrement: true
    },
    logDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};