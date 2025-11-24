'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Game, { through: models.UserGame });
      User.belongsToMany(models.Pod, { through: models.PodUser });
      User.belongsToMany(User, {
        as: "followers",
        through: UserFollower,
        foreignKey: 'FollowingId',
        otherKey: 'FollowerID'
      })
      User.belongsToMany(User, {
        as: "following",
        through: UserFollower,
        foreignKey: "FollowerId",
        otherKey: "FollowingId"
      })
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