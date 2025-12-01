'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pod extends Model {
    static associate(models) {
      Pod.belongsToMany(models.User, { 
        inverse: {
          as: 'Pods'
        },
        through: models.PodUser,
        foreignKey: 'PodId',
        otherKey: 'UserId'
      });

      Pod.hasMany(models.Game, {
        foreignKey: 'PodId',
        inverse: {
          as: 'Pod'
        }
      });
    }
  }
  Pod.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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