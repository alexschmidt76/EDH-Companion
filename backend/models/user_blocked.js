'use strict';
import { Model } from 'sequelize';
const UserBlocked = (sequelize, DataTypes) => {
  class UserBlocked extends Model {
    static associate(models) {
      UserBlocked.belongsTo(models.User, { foreignKey: 'BlockerId' });
      UserBlocked.belongsTo(models.User, { foreignKey: 'BlockedId' });
    }
  }
  UserBlocked.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    blockDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'UserBlocked',
  });
  return UserBlocked;
};
export default UserBlocked;