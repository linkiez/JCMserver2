const database = require("../models");

class PedidoComprasController {
  static async importPedidoCompras(req, res, next) {
    let pedidoCompras = req.body;
    let pedidoComprasCreated;
    const t = await database.sequelize.transaction();

    try {
      let itens = pedidoCompras.itens;
      delete pedidoCompras.itens;

      let fornecedor = await database.Fornecedores.findOne({
        where: { nome: pedidoCompras.fornecedor },
      });
      delete pedidoCompras.fornecedor;
      pedidoCompras.FornecedoreId = fornecedor.id;

      pedidoComprasCreated = await database.PedidoCompras.create(pedidoCompras);

      itens.map(async (item) => {
        let produto = await database.Produtos.findOne({
          where: { nome: item.produto },
        });
        delete item.produto;
        item.ProdutoId = produto.id;
        item.PedidoCompraId = pedidoComprasCreated.id;

        let itemCreated = await database.PedidoComprasItens.create(item);
        return itemCreated;
      });

      pedidoComprasCreated = await database.PedidoCompras.findOne({
        where: { id: pedidoComprasCreated.id },
        include: [
          database.Fornecedores,
          database.PedidoComprasItens,
        ],
      });

      await t.commit();

      return res.status(201).json(pedidoComprasCreated);
    } catch (error) {
      await t.rollback();
      console.error(error.message);
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PedidoComprasController;
