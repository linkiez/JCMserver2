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
      PedidoComprasItens.belongsTo(models.PedidoCompras, {foreignKey: 'pedidoCompras_id'});
      PedidoComprasItens.hasOne(models.Produtos, {foreignKey: 'produto_id'});
    }
  };
  PedidoComprasItens.init({
    dimensao: DataTypes.STRING,
    quantidade: DataTypes.FLOAT,
    peso: DataTypes.FLOAT,
    preco: DataTypes.FLOAT,
    ipi: DataTypes.DECIMAL,
    prazo: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'PedidoComprasItens',
  });
  return PedidoComprasItens;
};
