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
        item.ListaGenericaId = pedidoComprasCreated.id;
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

  static async updateListaGenerica(req, res){
      
  }
}
