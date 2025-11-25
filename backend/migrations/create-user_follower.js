'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserFollowers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      followDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserFollowers');
  }
};