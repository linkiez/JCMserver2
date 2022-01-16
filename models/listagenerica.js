'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListaGenerica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListaGenerica.hasMany(models.ListaGenericaItem,  {onDelete: 'cascade'})
    }
  };
  ListaGenerica.init({
    lista: {
      type: DataTypes.STRING,
      unique: true
    },
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'ListaGenerica',
    paranoid: true,
    defaultScope: {
        where: { deletedAt: null }
    }
  });
  return ListaGenerica;
};