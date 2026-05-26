'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Airplane.hasMany(models.Flight,{
        foreignKey:'airplaneId',
        as:'flights'
      })


    }
  }
  Airplane.init({

    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true

    },

    model:{
      type: DataTypes.STRING,
      allowNull: false

    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airline: {
      type: DataTypes.STRING,
      allowNull: false

    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    economySeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buisnessSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status:{
      type:DataTypes.ENUM('active','maintenance','retired'),
      allowNull:false,
      defaultValue:'active'
    },
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};