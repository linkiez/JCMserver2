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
      PedidoCompras.hasMany(models.PedidoComprasItens, {onDelete: 'cascade'})
      PedidoCompras.belongsTo(models.Fornecedores)
    }
  };
  PedidoCompras.init({
    pedido: DataTypes.STRING,
    data_emissao: DataTypes.DATE,
    cond_pagamento: DataTypes.STRING,
    frete: DataTypes.DECIMAL(10, 2),
    transporte: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'PedidoCompras',
    paranoid: true,
    defaultScope: {
        where: { deletedAt: null }
    }
      
  });
  return PedidoCompras;
};
