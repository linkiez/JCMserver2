'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PedidoComprasItens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      pedidoCompras_id: {
        type: Sequelize.BIGINT,
        references: {model:'PedidoCompras', key: 'id'}
      },
      produto_id: {
        type: Sequelize.BIGINT,
        references: {model:'Produtos', key: 'id'}
      },
      dimensao: {
        type: Sequelize.STRING
      },
      quantidade: {
        type: Sequelize.FLOAT
      },
      peso: {
        type: Sequelize.FLOAT
      },
      preco: {
        type: Sequelize.FLOAT
      },
      ipi: {
        type: Sequelize.DECIMAL
      },
      prazo: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('PedidoComprasItens');
  }
};
