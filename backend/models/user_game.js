'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes, User, Game) => {
  class UserGame extends Model {}
  UserGame.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    GameId: {
      type: DataTypes.INTEGER,
      references: {
        model: Game,
        key: 'id'
      }
    },
    isWinner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserGame',
  });
  return UserGame;
};