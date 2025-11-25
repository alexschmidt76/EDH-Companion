'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PodGames', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      PodId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Pods'
          },
          key: 'id'
        }
      },
      GameId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Games'
          },
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PodGames');
  }
};