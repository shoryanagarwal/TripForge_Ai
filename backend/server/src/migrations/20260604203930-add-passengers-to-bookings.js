'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Flight_Bookings','passengerDetails',{
      type:Sequelize.JSONB,
      allowNull:true
    })

    await queryInterface.addColumn('Bus_Bookings','passengerDetails',{
      type:Sequelize.JSONB,
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

    await queryInterface.removeColumn('Flight_Bookings','passengerDetails')
    await queryInterface.removeColumn('Bus_Bookings','passengerDetails')
  }
};
