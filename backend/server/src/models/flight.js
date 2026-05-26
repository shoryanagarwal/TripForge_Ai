'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Flight.belongsTo(models.Airplane,{
        foreignKey:'airplaneId',
        as:'airplane'
      })
      // define association here --- IGNORE ---
    }
  }
  Flight.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true

    },


    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false

    },
    destination:{
      type: DataTypes.STRING,
      allowNull: false
    },
    departureTime:{
      type: DataTypes.DATE,
      allowNull: false
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'delayed', 'cancelled', 'departed', 'arrived'),
      
    },
    airplaneId: {
      type: DataTypes.UUID,
      allowNull: false,
      references:{
        model:'Airplanes',
        key:'id'
      }

    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};