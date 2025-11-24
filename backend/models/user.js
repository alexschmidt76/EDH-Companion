'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Game, UserGame, Pod, PodUser, UserFollower }) {
      // define associations here
      User.belongsToMany(Game, { through: UserGame });
      User.belongsToMany(Pod, { through: PodUser });
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