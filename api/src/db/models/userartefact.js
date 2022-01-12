'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserArtefact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserArtefact.belongsTo(models.User);

      UserArtefact.belongsTo(models.Artefact);
    }
  };
  UserArtefact.init({
    ArtefactId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserArtefact',
  });
  return UserArtefact;
};