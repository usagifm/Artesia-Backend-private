'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     User.belongsToMany(models.Artefact, {
       through: models.UserArtefact,
       foreignKey: {
        name: 'UserId'
      }
     });


    User.belongsToMany(models.City, {
      through: models.UserArtefact,
      foreignKey: {
        name: 'UserId'
      }
    });

    // models.City.belongsToMany(models.Artefact, {
    //   through: models.UserArtefact,
    //   foreignKey: {
    //     name: 'CityId'
    //   }
    // });




    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    photo: DataTypes.STRING,
    password: DataTypes.STRING,
    googleId: DataTypes.STRING,
    provider: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};