'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.User,{
        foreignKey:'userId',
        as:'user'
      })
    }
  }
  Notification.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    userId:{
      type: DataTypes.UUID,
      allowNull:false,
      references:{
        model:'Users',
        key:'id'
      }

    },
    title:{
      type: DataTypes.STRING,
      allowNull:false

    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type:{
      type: DataTypes.ENUM("BOOKING_CONFIRMED",
        "BOOKING_CANCELLED",
        "BOOKING_EXPIRED",
        "PAYMENT_SUCCESS"),
      allowNull:false
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};