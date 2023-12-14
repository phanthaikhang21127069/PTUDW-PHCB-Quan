'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requesteditplaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diaChi: {
        type: Sequelize.STRING
      },
      khuVuc: {
        type: Sequelize.STRING
      },
      loaiVT: {
        type: Sequelize.STRING
      },
      hinhThuc: {
        type: Sequelize.STRING
      },
      hinhAnh: {
        type: Sequelize.STRING
      },
      quyHoach: {
        type: Sequelize.STRING
      },
      longitute: {
        type: Sequelize.REAL
      },
      latitude: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Requesteditplaces');
  }
};