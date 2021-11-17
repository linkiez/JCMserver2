'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PedidoCompras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      pedido: {
        type: Sequelize.STRING
      },
      fornecedor_id:{
        type: Sequelize.BIGINT,
        references: {model:'Fornecedores', key: 'id'}
      },
      data_emissao: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      cond_pagamento: {
        type: Sequelize.STRING
      },
      frete: {
        type: Sequelize.DECIMAL
      },
      transporte: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PedidoCompras');
  }
};
