const database = require('../models');

class FornecedoresController {

    static async findAllFornecedor(req, res) {

        try{
            const fornecedores = await database.Fornecedores.findAll();
            return res.status(200).json(fornecedores);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async findOneFornecedor(req, res) {
        const { id } = req.params;
        try{
            const fornecedor = await database.Fornecedores.findOne({where:{ id: Number(id) }});
            return res.status(200).json(fornecedor);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async findFornecedorByName(req, res){
        const { nome } = req.params;
        try{
            const produto = await database.Produtos.findOne({where:{ nome: nome }});
            return res.status(200).json(produto);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }


    static async createFornecedor(req, res) {
        const fornecedor = req.body;
        try{
            const fornecedorCreated = await database.Fornecedores.create(fornecedor);
            return res.status(201).json(fornecedorCreated);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async updateFornecedor(req, res) {
        const { id } = req.params;
        const fornecedorUpdate = req.body;
        try{
            await database.Fornecedores.update(fornecedorUpdate, {where:{ id: Number(id) }});
            const fornecedorUpdated = await database.Fornecedores.findOne({where:{ id: Number(id) }});
            return res.status(202).json(fornecedorUpdated);
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async destroyFornecedor(req, res) {
        const { id } = req.params;
        try{
            await database.Fornecedores.destroy({where:{ id: Number(id) }});
            return res.status(202).json({message: `Fornecedor apagado`});
        }catch(error){
            console.log(error);
            return res.status(500).json(error.message);
        }
    }
}

module.exports = FornecedoresController;
