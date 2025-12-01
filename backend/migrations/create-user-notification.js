'use strict';
/** @type {import('sequelize-cli'),Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserNotification', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            sentDate: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            podRequest: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            friendRequest: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserNotification');
    }
};