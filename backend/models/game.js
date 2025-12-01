'use strict';
import { Model } from 'sequelize';
const Game = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.belongsToMany(models.User, { 
        through: models.UserGame,
        inverse: {
          as: 'games'
        },
        foreignKey: 'GameId',
        otherKey: 'UserId'
      });

      Game.belongsTo(models.Pod, {
        foreignKey: 'PodId',
        inverse: {
          as: 'games',
          type: 'hasMany'
        }
      });
    }
  }
  Game.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    logDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    publicToAll: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    publicToFriendsOnly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    publicToPodOnly: {
      defaultValue:false,
      type: DataTypes.BOOLEAN
    },
    publicToPodAndFriendsOnly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};

export default Game;