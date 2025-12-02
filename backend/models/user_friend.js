'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class UserFriend extends Model {
    static associate(models) {
      UserFriend.belongsTo(models.User, { foreignKey: 'user1Id' });
      UserFriend.belongsTo(models.User, { foreignKey: 'user2Id' });
    }
  }
  UserFriend.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    becameFriendsDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'UserFriend',
  });
  return UserFriend;
};
