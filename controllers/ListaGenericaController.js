const database = require("../models");

class ListaGenericaController {
  static async findAllListaGenerica(req, res) {
    try {
      let listaGenericas = await database.ListaGenerica.findAll({
        include: [database.ListaGenericaItem],
      });

      return res.status(200).json(listaGenericas);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async findOneListaGenerica(req, res) {
    const { id } = req.params;
    try {
      let listaGenerica = await database.ListaGenerica.findOne({
        where: { id: Number(id) },
        include: [database.ListaGenericaItem],
      });

      return res.status(200).json(listaGenerica);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async findListaGenericaByName(req, res) {
    const { nome } = req.params;
    try {
      let listaGenerica = await database.ListaGenerica.findOne({
        where: { lista: nome },
        include: [database.ListaGenericaItem],
      });

      return res.status(200).json(listaGenerica);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async createListaGenerica(req, res) {
    const t = await database.sequelize.transaction();
    let listaGenerica;
    let listaGenericaCreated;

    try {
      listaGenerica = req.body;

      let listaGenericaItem = listaGenerica.ListaGenericaItem;
      delete listaGenerica.ListaGenericaItem;

      listaGenericaCreated = await database.ListaGenerica.create(listaGenerica);

      listaGenericaItem.forEach((item) => {
        item.ListaGenericaId = listaGenericaCreated.id;
        database.ListaGenericaItem.create(item);
      });

      await t.commit();

      listaGenericaCreated = await database.ListaGenerica.findOne({
        where: { id: listaGenericaCreated.id },
        include: [database.ListaGenericaItem],
      });

      return res.status(201).json(listaGenericaCreated);
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async updateListaGenerica(req, res) {
    const { id } = req.params;
    const t = await database.sequelize.transaction();
    let listaGenerica;

    try {
      listaGenerica = req.body;

      let listaGenericaItem = listaGenerica.ListaGenericaItem;
      delete listaGenerica.ListaGenericaItem;

      await database.ListaGenerica.update(listaGenerica, {
        where: { id: Number(id) },
      });
      await database.ListaGenericaItem.destroy({
        where: { ListaGenericaId: Number(id) },
      });

      listaGenericaItem.forEach(async (item) => {
        item.ListaGenericaId = id;
        delete item.id;

        await database.ListaGenericaItem.create(item);
      });

      await t.commit();

      let listaGenericaUpdated = database.ListaGenerica.findOne({
        where: { id: Number(id) },
        include: database.ListaGenericaItem,
      });

      return res.status(202).json(listaGenericaUpdated);
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).json(error.message);
    }
  }

  static async destroyListaGenerica(req, res) {
    const { id } = req.params;
    const t = await database.sequelize.transaction();

    try {
      await database.ListaGenericaItem.destroy({
        where: { ListaGenericaId: Number(id) },
      });
      await database.ListaGenerica.destroy({ where: { id: Number(id) } });

      await t.commit();

      return res.status(202).json({ message: `Lista apagada` });
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ListaGenericaController;
