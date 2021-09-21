'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slug: {
        unique:true,
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notEmpty: true
    }
    },
      title: {
        type: Sequelize.STRING
      },
      CategorySlug: {
        type: Sequelize.STRING
      },
      SubCategorySlug: {
        type: Sequelize.STRING
      },
      thumbnail_url: {
        type: Sequelize.STRING
      },
      imgurl_1: {
        type: Sequelize.STRING
      },
      imgurl_2: {
        type: Sequelize.STRING
      },
      imgurl_3: {
        type: Sequelize.STRING
      },
      imgurl_4: {
        type: Sequelize.STRING
      },
      imgurl_5: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      flag: {
        type: Sequelize.STRING
      },
      is_published: {
        type: Sequelize.BOOLEAN
      },
      published_at: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Articles');
  }
};