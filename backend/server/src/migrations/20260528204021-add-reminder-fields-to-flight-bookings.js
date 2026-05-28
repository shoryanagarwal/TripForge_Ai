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

    await queryInterface.addColumn("Flight_Bookings","remainderAt",{
        type:Sequelize.DATE,  
        allowNull:true
    })

    await queryInterface.addColumn("Flight_Bookings","reminderSent",{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("Flight_Bookings","remainderAt");
    await queryInterface.removeColumn("Flight_Bookings","reminderSent");
  }
};
