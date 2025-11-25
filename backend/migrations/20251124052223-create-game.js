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
      }
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  }
};