'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListaGenericaItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ListaGenericaItem.belongsTo(models.ListaGenerica);
    }
  };
  ListaGenericaItem.init({
    nome: DataTypes.STRING,
    valor: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'ListaGenericaItem',
    paranoid: true,
    defaultScope: {
        where: { deletedAt: null }
    }
  });
  return ListaGenericaItem;
};
