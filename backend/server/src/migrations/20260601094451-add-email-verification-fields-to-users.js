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


    await queryInterface.addColumn('Users','isVerified',{
      type: Sequelize.BOOLEAN,
      defaultValue:false,
      allowNull:false
    })

    await queryInterface.addColumn('Users','otp',{
      type: Sequelize.STRING,
      allowNull:true
    })
    
    await queryInterface.addColumn('Users','otp_expiry',{
      type: Sequelize.DATE,
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

    await queryInterface.removeColumn('Users','isVerified');
    await queryInterface.removeColumn('Users','otp');
    await queryInterface.removeColumn('Users','otp_expiry');
  }
};
