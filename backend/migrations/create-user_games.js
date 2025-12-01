'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserGames', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      UserId: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users',
          key: 'id'
        }
      }
      },

      GameId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Games',
            key: 'id'
          }
        }
      },

      isWinner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      isOwner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserGames');
  }
};