'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artefact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Artefact.belongsTo(models.City);
      Artefact.belongsTo(models.Tourism);

      Artefact.belongsTo(models.UserArtefact);

      // Artefact.belongsToMany(models.User, {
      //   through: models.UserArtefact,
      //   foreignKey: 'UserId'
      // })


    }


  };

 
  Artefact.init({
    slug: {
     unique:true,
     type: DataTypes.STRING,
     allowNull: false,
     validate:{
       notEmpty: true
     }
    },
    title: {
      unique:true,
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
     },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    sub_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    trivia: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    CityId: DataTypes.INTEGER,
    TourismId: DataTypes.INTEGER,
    effect_url: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Artefact',
  });



  return Artefact;
};