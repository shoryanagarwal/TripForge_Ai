'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus_Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bus_Payment.belongsTo(models.Bus_Booking,{
        foreignKey:'busBookingId',
        as:'booking',

      })
    }
  }
  Bus_Payment.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    busBookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Bus_Bookings',
        key: 'id'
      },
      onDelete: 'CASCADE'

    },
    amount:{
      type: DataTypes.FLOAT,
      allowNull: false

    },
    paymentMode: {
      type: DataTypes.STRING,
      allowNull: false

    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type:DataTypes.ENUM('pending','success','failed'),
      defaultValue:'pending',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Bus_Payment',
  });
  return Bus_Payment;
};