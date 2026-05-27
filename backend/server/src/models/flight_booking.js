'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight_Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Flight_Booking.belongsTo(models.User,{
        foreignKey:'userId',
        as:'user'
      })


      Flight_Booking.belongsTo(models.Flight,{
        foreignKey:'flightId',
        as:'flight'
      })



    }
  }
  Flight_Booking.init({

    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true

    },


    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    flightId:  {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Flights',
        key: 'id'
      }
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    totalAmount:  {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
        defaultValue: "pending",
        allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Flight_Booking',
  });
  return Flight_Booking;
};