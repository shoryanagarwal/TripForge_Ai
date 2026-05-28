'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Flight_Booking,{
        foreignKey:'bookingId',
        as:'booking',
      
      })

    }
  }
  Payment.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Flight_Bookings',
        key: 'id'
      },
      onDelete: 'CASCADE'

    },
    amount: {
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
    modelName: 'Payment',
  });
  return Payment;
};