'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tourism extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tourism.hasMany(models.Artefact)
    }
  };
  Tourism.init({
    CityId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
    }}, 
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
    }}, 
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
    }}, 
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tourism',
  });
  return Tourism;
};