'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Airplanes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      airline: {
        type: Sequelize.STRING,
        allowNull: false
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      economySeats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      buisnessSeats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('active', 'maintenance', 'retired'),
        allowNull: false,
        defaultValue: 'active'
   },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Airplanes');
  }
};