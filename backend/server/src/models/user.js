'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Flight_Booking,{
        foreignKey:'userId',
        as:'bookings'
      })
      
    }
  }
  User.init({

    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false



    },
    email:{
      
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:true
      }


    },
    password:{
      
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[3,300]
      }

    },
    role:{
        type: DataTypes.ENUM("USER","ADMIN"),
        defaultValue:"USER"


    },

    isVerified:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    },

    otp:{
        type: DataTypes.STRING,
        allowNull:true
    },

    otp_expiry:{
        type: DataTypes.DATE,
        allowNull:true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName:'Users',
    timestamps:true
  });
  return User;
};