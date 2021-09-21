'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes, Sequelize) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // City.belongsToMany(models.Artefact, {
      //   through: models.UserArtefact,
      // })

    City.hasMany(models.Artefact);

    //  City.belongsToMany(models.User, {
    //     through: models.UserArtefact,
    //   });

    //  City.belongsToMany(models.Artefact, {
    //    through: models.UserArtefact
    //  });

      City.belongsToMany(models.Artefact, {
        through: models.UserArtefact,
        foreignKey: {
          name: 'CityId'
        }
      });

     City.hasOne(models.CityArtefactCount);

     
 
    }
  };
  City.init({
    name: { type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
    },
    photo: { type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
    },
    location: { type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
    },
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'City',
  });
  


  return City;
};