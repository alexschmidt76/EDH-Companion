'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Game, { 
        as: 'games',
        through: models.UserGame 
      });

      User.belongsToMany(models.Pod, { 
        as: 'pods',
        through: models.PodUser 
      });

      User.belongsToMany(User, {
        as: "followers",
        through: models.UserFollower,
        foreignKey: 'FollowingId',
        otherKey: 'FollowerID'
      });

      User.belongsToMany(User, {
        as: "following",
        through: models.UserFollower,
        foreignKey: "FollowerId",
        otherKey: "FollowingId"
      });

      User.belongsToMany(models.Notification, {
        as: 'recievedNotifications',
        through: models.Notification,
        foreignKey: 'RecieverId',
        otherKey: 'SenderId'
      });

      User.belongsToMany(models.Notification, {
        as: 'sentNotifications',
        through: models.Notification,
        foreignKey: 'SenderId',
        otherKey: 'RecieverId'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordDigest: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commanders: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};