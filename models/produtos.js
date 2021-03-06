"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produtos.hasMany(models.PedidoComprasItens);
    }
  }
  Produtos.init(
    {
      nome: DataTypes.STRING,
      categoria: DataTypes.STRING,
      espessura: DataTypes.STRING,
      peso: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Produtos",
      paranoid: true,
      timestamps: true,
      defaultScope: {
        where: { deletedAt: null },
      },
    }
  );
  return Produtos;
};
