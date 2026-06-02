'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */


    await queryInterface.addColumn('Flight_Bookings','cancelledBy',{
      type:DataTypes.ENUM("USER","ADMIN"),
      allowNull:true
    })

    await queryInterface.addColumn('Flight_Bookings','cancellationReason',{
      type:DataTypes.STRING,
      allowNull:true
    })

    await queryInterface.addColumn('Flight_Bookings','cancelledAt',{
      type:DataTypes.DATE,
      allowNull:true
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('Flight_Booking','cancelledBy');
    await queryInterface.removeColumn('Flight_Booking','cancellationReason');
    await queryInterface.removeColumn('Flight_Booking','cancelledAt');
  }
};
