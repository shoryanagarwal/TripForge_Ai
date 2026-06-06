'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarePackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FarePackage.belongsTo(models.Flight,{
        foreignKey:'flightId',
        as:'flight'
      })
    }
  }
  FarePackage.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true

    },

    flightId: {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'Flights',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    name:{
      type:DataTypes.STRING,
      allowNull: false

    },
    price: {
      type:DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    },
    features: {
      type:DataTypes.JSONB,
      allowNull: false,
      defaultValue: []

    }
  }, {
    sequelize,
    modelName: 'FarePackage',
  });
  return FarePackage;
};