'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passwordDigest: {
        type: Sequelize.STRING,
        allowNull: false
      },
      commanders: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};