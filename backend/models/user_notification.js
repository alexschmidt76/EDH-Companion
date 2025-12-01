'use strict';
import { Model } from 'sequelize';
const UserNotification = (sequelize, DataTypes) => {
    class UserNotification extends Model {
        static associate(models) {
            UserNotification.belongsTo(models.User, { foreignKey: 'SenderId' });
            UserNotification.belongsTo(models.User, { foreignKey: 'RecieverId'});
        }
    }
    UserNotification.init({
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
        modelName: 'UserNotification'
    });
    return UserNotification;
}
export default UserNotification;