'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pod extends Model {
    static associate(models) {
      Pod.belongsToMany(models.User, { through: models.PodUser });
      Pod.belongsToMany(models.Game, { through: models.PodGame });
    }
  }
  Pod.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Pod',
  });
  return Pod;
};