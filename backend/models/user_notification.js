'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {}
    Notification.init({
        id: {
            type: DataTypes.INTEGER,
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
    }, {
        sequelize,
        modelName: 'Notification'
    });
    return Notification;
}