'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes, Pod, Game) => {
  class PodGame extends Model {}
  PodGame.init({
    PodId: {
      type: DataTypes.INTEGER,
      references: {
        model: Pod,
        key: 'id'
      }
    },
    GameId: {
      type: DataTypes.INTEGER,
      references: {
        model: Game,
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'PodGame',
  });
  return PodGame;
};