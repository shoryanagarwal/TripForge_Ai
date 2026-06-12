"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Flight_Bookings_cancelledBy"
      ADD VALUE IF NOT EXISTS 'SYSTEM';
    `);
  },

  async down(queryInterface, Sequelize) {
    // PostgreSQL enum value easily remove nahi hoti
  }
};