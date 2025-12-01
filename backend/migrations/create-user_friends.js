'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserFriends', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      User1Id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            key: 'id'
          }
        }
      },
      User2Id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            key: 'id'
          }
        }
      },
      becameFriendsDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserFriends');
  }
};