'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes, Pod, User) => {
  class PodUser extends Model {}
  PodUser.init({
    PodId: {
      type: DataTypes.INTEGER,
      references: {
        model: Pod,
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
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