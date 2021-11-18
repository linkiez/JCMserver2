'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoCompras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PedidoCompras.hasMany(models.PedidoComprasItens, { foreignKey: 'pedidoCompras_id', onDelete: 'cascade'})
      PedidoCompras.belongsTo(models.Fornecedores)
    }
  };
  PedidoCompras.init({
    pedido: DataTypes.STRING,
    data_emissao: DataTypes.DATEONLY,
    cond_pagamento: DataTypes.STRING,
    frete: DataTypes.DECIMAL,
    transporte: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PedidoCompras',
  });
  return PedidoCompras;
};
