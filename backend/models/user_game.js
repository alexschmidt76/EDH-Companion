'use strict';
import { Model } from 'sequelize';
const UserGame = (sequelize, DataTypes) => {
  class UserGame extends Model {
    static associate(models) {
      UserGame.belongsTo(models.User, { foreignKey: 'UserId' });
      UserGame.belongsTo(models.Game, { foreignKey: 'GameId' });
    }
  }
  UserGame.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    isWinner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isOwner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserGame',
  });
  return UserGame;
};
export default UserGame;