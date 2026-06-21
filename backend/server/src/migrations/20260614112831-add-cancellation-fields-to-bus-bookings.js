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


     await queryInterface.addColumn('Bus_Bookings','cancelledBy',{
          type:Sequelize.ENUM("USER","ADMIN"),
          allowNull:true
        })
    
        await queryInterface.addColumn('Bus_Bookings','cancellationReason',{
          type:Sequelize.STRING,
          allowNull:true
        })
    
        await queryInterface.addColumn('Bus_Bookings','cancelledAt',{
          type:Sequelize.DATE,
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


    await queryInterface.removeColumn('Bus_Bookings','cancelledBy');
    await queryInterface.removeColumn('Bus_Bookings','cancellationReason');
    await queryInterface.removeColumn('Bus_Bookings','cancelledAt');
  }
};
