'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      logDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      publicToAll: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      publicToFriendsOnly: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      publicToPodOnly: {
        defaultValue:false,
        type: Sequelize.BOOLEAN
      },
      publicToPodAndFriendsOnly: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  }
};