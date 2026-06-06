'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus_Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Bus_Booking.belongsTo(models.User,{
        foreignKey:'userId',
        as:'user'
      })

      Bus_Booking.belongsTo(models.Bus,{
        foreignKey:'busId',
        as:'bus'
      })

    }
  }
  Bus_Booking.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
        
    },
    busId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('confirmed', 'cancelled','pending'),
      allowNull: false,
      defaultValue:'pending'
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    reminderAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reminderSent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    passengerDetails: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Bus_Booking',
  });
  return Bus_Booking;
};