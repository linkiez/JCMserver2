const database = require("../models");

class PedidoComprasController {
  static async importPedidoCompras(req, res) {
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
        include: [database.Fornecedores, database.PedidoComprasItens],
      });

      await t.commit();

      return res.status(201).json(pedidoComprasCreated);
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async findAllPedidoCompras(req, res) {
    try {
      let pedidosCompras = await database.PedidoCompras.findAll({
        include: [database.Fornecedores],
        order: [["id", "DESC"]],
      });

      let pedidosComprasTotal = await Promise.all(
        pedidosCompras.map(async (item) => {
          let pedidoComprasItens = await database.PedidoComprasItens.findAll({
            where: { PedidoCompraId: Number(item.id) },
          });

          let total = 0;

          pedidoComprasItens.forEach(async (pedidoItem) => {
            total =
              total +
              Number(pedidoItem.peso) *
                Number(pedidoItem.preco) *
                (1 + Number(pedidoItem.ipi));
          });

          item = item.toJSON();
          item.total = total;

          return item;
        })
      );

      return res.status(200).json(pedidosComprasTotal);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async findOnePedidoCompras(req, res) {
    const { id } = req.params;
    try {
      const pedidoCompras = await database.PedidoCompras.findOne({
        where: { id: Number(id) },
        include: [
          database.Fornecedores,
          { model: database.PedidoComprasItens, include: [database.Produtos] },
        ],
      });

      let pedidoComprasItens = await database.PedidoComprasItens.findAll({
        where: { PedidoCompraId: Number(id) },
      });

      let total = 0;

      pedidoComprasItens.forEach((pedidoItem) => {
        total =
          total +
          Number(pedidoItem.peso) *
            Number(pedidoItem.preco) *
            (1 + Number(pedidoItem.ipi));
      });

      pedidoCompras.dataValues.total = total;
      
      return res.status(200).json(pedidoCompras);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async createPedidoCompras(req, res) {
    let pedidoComprasCreated;
    let pedidoCompras;

    const t = await database.sequelize.transaction();

    try {
      pedidoCompras = req.body;

      pedidoCompras.FornecedoreId = pedidoCompras.Fornecedore.id;
      delete pedidoCompras.Fornecedore;

      let pedidoComprasItens = pedidoCompras.PedidoComprasItens;
      delete pedidoCompras.PedidoComprasItens;

      pedidoCompras.data_emissao = new Date();

      pedidoComprasCreated = await database.PedidoCompras.create(pedidoCompras);

      pedidoComprasItens.map(async (item) => {
        item.PedidoCompraId = pedidoComprasCreated.id;

        item.ProdutoId = item.Produto.id;
        delete item.Produto;

        let itemCreated = await database.PedidoComprasItens.create(item);
        return itemCreated;
      });

      await t.commit();

      pedidoComprasCreated = await database.PedidoCompras.findOne({
        where: { id: pedidoComprasCreated.id },
        include: [
          database.Fornecedores,
          { model: database.PedidoComprasItens, include: [database.Produtos] },
        ],
      });

      return res.status(201).json(pedidoComprasCreated);
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async destroyPedidoCompras(req, res) {
    const { id } = req.params;
    const t = await database.sequelize.transaction();

    try {
      await database.PedidoComprasItens.destroy({
        where: { PedidoCompraId: Number(id) },
      });
      await database.PedidoCompras.destroy({ where: { id: Number(id) } });

      await t.commit();

      return res.status(202).json({ message: `Pedido de compra apagado` });
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async updatePedidoCompras(req, res) {
    let pedidoComprasUpdated;
    let pedidoCompras;
    const { id } = req.params;

    const t = await database.sequelize.transaction();

    try {
      pedidoCompras = req.body;

      let pedidoComprasItens = pedidoCompras.PedidoComprasItens;
      delete pedidoCompras.PedidoComprasItens;
      delete pedidoCompras.Fornecedore;

      await database.PedidoCompras.update(pedidoCompras, {
        where: { id: Number(id) },
      });

      await database.PedidoComprasItens.destroy({
        where: { PedidoCompraId: Number(id) },
      });

      pedidoComprasItens.forEach(async (item) => {
        item.PedidoCompraId = id;

        item.ProdutoId = item.Produto.id;
        delete item.Produto;
        delete item.id;

        await database.PedidoComprasItens.create(item);
      });

      await t.commit();

      pedidoComprasUpdated = await database.PedidoCompras.findOne({
        where: { id: id },
        include: [
          database.Fornecedores,
          { model: database.PedidoComprasItens, include: [database.Produtos] },
        ],
      });

      return res.status(202).json({ message: `Pedido de compras atualizado` });
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PedidoComprasController;
