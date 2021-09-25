'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Artefacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slug: {
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      CityId: {
        type: Sequelize.INTEGER
      },
      TourismId: {
        type: Sequelize.INTEGER
      },
      photo: {
        type: Sequelize.STRING
      },
      sub_title: {
        type: Sequelize.STRING
      },
      trivia: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      effect_url: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Artefacts');
  }
};