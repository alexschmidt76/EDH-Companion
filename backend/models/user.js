'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Game, { 
        inverse: {
          as: 'players',
        },
        through: models.UserGame,
        foreignKey: 'UserId',
        otherKey: 'GameId'
      });

      User.belongsToMany(models.Pod, { 
        inverse: {
          as: 'members'
        },
        through: models.PodUser,
        foreignKey: 'UserId',
        otherKey: 'PodId'
      });

      User.belongsToMany(User, {
        inverse: {
          as: 'friends'
        },
        through: models.UserFriend,
        foreignKey: 'User1Id',
        otherKey: 'User2Id'
      });

      User.belongsToMany(User, {
        inverse: {
          as: 'blockedBy'
        },
        through: models.UserBlocked,
        foreignKey: 'BlockerId',
        otherKey: 'BlockedId'
      });
       
      User.belongsToMany(User, {
        inverse: {
          as: 'blockedUsers'
        },
        through: models.UserBlocked,
        foreignKey: 'BlockedId',
        otherKey: 'BlockerId'
      })

      User.belongsToMany(models.Notification, {
        inverse: {
          as: 'sentNotifications'
        },
        through: models.UserNotification,
        foreignKey: 'RecieverId',
        otherKey: 'SenderId'
      });

      User.belongsToMany(models.Notification, {
        inverse: {
          as: 'recievedNotifications'
        },
        through: models.UserNotification,
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
