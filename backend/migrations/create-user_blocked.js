'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserBlocked', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      BlockerId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            key: 'id'
          }
        }
      },
      BlockedId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            key: 'id'
          }
        }
      },
      blockDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserBlocked');
  }
};