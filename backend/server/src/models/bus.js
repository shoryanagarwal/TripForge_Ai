'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Bus.hasMany(models.Bus_Booking,{
        foreignKey:'busId',
        as:'bookings'
      })
    }
  }
  Bus.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    
    },
    operatorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    busNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
      
    },
    busType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destination:{
      type: DataTypes.STRING,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("scheduled", "delayed", "cancelled", "departed", "arrived", "full"),
      defaultValue: "scheduled"
    }
  }, {
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};