'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PodUsers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      PodId: {
      type: Sequelize.INTEGER,
      references: {
        model: {
            tableName: 'Pods',
            key: 'id'
          },
      }
    },
    UserId: {
      type: Sequelize.INTEGER,
      references: {
        model: {
            tableName: 'Users',
            key: 'id'
          },
      }
    },
    isOwner: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    joinDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PodUser');
  }
};