const database = require('../models');

class ProdutosController {

    static async findAll(req, res, next) {

        try{
            const produtos = await database.Produtos.findAll();
            return res.status(200).json(produtos);
        }catch(error){
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }

    static async findOne(req, res, next) {
        const { id } = req.params;
        try{
            const produto = await database.Produtos.findOne({where:{ id: Number(id) }});
            return res.status(200).json(produto);
        }catch(error){
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }

    static async create(req, res, next) {
        const produto = req.body;
        try{
            const produtoCreated = await database.Produtos.create(produto);
            return res.status(201).json(produtoCreated);
        }catch(error){
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }

    static async update(req, res, next) {
        const { id } = req.params;
        const produtoUpdate = req.body;
        try{
            await database.Produtos.update(produtoUpdate, {where:{ id: Number(id) }});
            const produtoUpdated = await database.Produtos.findOne({where:{ id: Number(id) }});
            return res.status(202).json(produtoUpdated);
        }catch(error){
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }

    static async destroy(req, res, next) {
        const { id } = req.params;
        try{
            await database.Produtos.destroy({where:{ id: Number(id) }});
            return res.status(202).json({message: `Produto apagado`});
        }catch(error){
            console.error(error.message);
            return res.status(500).json(error.message);
        }
    }

    
}

module.exports = ProdutosController;
