'use strict';
/** @type {import('sequelize-cli'),Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Notification', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            sentDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            podRequest: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            friendRequest: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Notification');
    }
};