'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buses', {
      id: {
        allowNull: false,
        
        primaryKey: true,
        
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
        
      },
      operatorName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      busNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      busType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      availableSeats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("scheduled", "delayed", "cancelled", "departed", "arrived", "full"),
        defaultValue: "scheduled"

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
    await queryInterface.dropTable('Buses');
  }
};