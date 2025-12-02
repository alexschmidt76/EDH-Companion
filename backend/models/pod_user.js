'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class PodUser extends Model {
    static associate(models) {
      PodUser.belongsTo(models.Pod, { foreignKey: 'PodId' });
      PodUser.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  PodUser.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    isOwner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    joinDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'PodUser',
  });
  return PodUser;
};

