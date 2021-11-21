'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoComprasItens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      PedidoComprasItens.belongsTo(models.Produtos)
      PedidoComprasItens.belongsTo(models.PedidoCompras)
    }
  };
  PedidoComprasItens.init({
    dimensao: DataTypes.STRING,
    quantidade: DataTypes.STRING,
    peso: DataTypes.FLOAT,
    preco: DataTypes.FLOAT,
    ipi: DataTypes.DECIMAL(5,2),
    prazo: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PedidoComprasItens',
  });
  return PedidoComprasItens;
};
