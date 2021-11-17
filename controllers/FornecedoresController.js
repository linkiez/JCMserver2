const database = require('../models');

class FornecedoresController {

    static async findAll(req, res, next) {

        try{
            const fornecedores = await database.Fornecedores.findAll();
            return res.status(200).json(fornecedores);
        }catch(error){
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }

    static async findOne(req, res, next) {
        const { id } = req.params;
        try{
            const fornecedor = await database.Fornecedores.findOne({where:{ id: Number(id) }});
            return res.status(200).json(fornecedor);
        }catch(error){
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }

    static async create(req, res, next) {
        const fornecedor = req.body;
        try{
            const fornecedorCreated = await database.Fornecedores.create(fornecedor);
            return res.status(200).json(fornecedorCreated);
        }catch(error){
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }

    static async update(req, res, next) {
        const { id } = req.params;
        const fornecedorUpdate = req.body;
        try{
            await database.Fornecedores.update(fornecedorUpdate, {where:{ id: Number(id) }});
            const fornecedorUpdated = await database.Fornecedores.findOne({where:{ id: Number(id) }});
            return res.status(200).json(fornecedorUpdated);
        }catch(error){
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }

    static async destroy(req, res, next) {
        const { id } = req.params;
        try{
            await database.Fornecedores.destroy({where:{ id: Number(id) }});
            return res.status(200).json({message: `Fornecedor apagado`});
        }catch(error){
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }
}

module.exports = FornecedoresController;
