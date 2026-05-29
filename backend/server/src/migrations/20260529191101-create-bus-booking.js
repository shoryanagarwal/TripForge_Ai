'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bus_Bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      busId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      seats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('confirmed', 'cancelled','pending'),
        allowNull: false,
        defaultValue:'pending'
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      reminderAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      reminderSent: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
    await queryInterface.dropTable('Bus_Bookings');
  }
};