'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CityArtefactCount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // CityArtefactCount.belongsTo(models.City);
    }
  };
  CityArtefactCount.init({
    CityId: DataTypes.INTEGER,
    total_artefact: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CityArtefactCount',
  });
  return CityArtefactCount;
};