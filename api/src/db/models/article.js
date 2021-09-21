'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Article.init({
    title: {
        unique:true,
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty: true
    }
    },
    slug: {
        unique:true,
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty: true
    }
    },
    CategorySlug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty: true
    }},
    SubCategorySlug: {
        type: DataTypes.STRING,
        validate:{
          notEmpty: true
        }
    },
    thumbnail_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty: true
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
          notEmpty: true
        }
    },
    flag: DataTypes.STRING,
    is_published: DataTypes.BOOLEAN,
    published_at: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    imgurl_1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty: true
        }
    },
    imgurl_2: {
        type: DataTypes.STRING,
        validate:{
          notEmpty: true
        }
    },
    imgurl_3: {
        type: DataTypes.STRING,
        validate:{
          notEmpty: true
        }
    },
    imgurl_4: {
        type: DataTypes.STRING,
        validate:{
          notEmpty: true
        }
    },
    imgurl_5: {
        type: DataTypes.STRING,
        validate:{
          notEmpty: true
        }
    },
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};