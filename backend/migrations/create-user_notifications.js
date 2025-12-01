'use strict';
/** @type {import('sequelize-cli'),Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserNotifications', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            SenderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: { 
                        tableName: 'Users' ,
                        key: 'id'
                    },
                }
            },
            RecieverId: {
                type: Sequelize.INTEGER,
                references: {
                    model: { 
                        tableName: 'Users' ,
                        key: 'id'
                    },
                }
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
        await queryInterface.dropTable('UserNotifications');
    }
};