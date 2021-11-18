const { Router } = require('express');
const ProdutosController = require('../controllers/ProdutosController');

const router = Router();
router
    .get('/produtos', ProdutosController.findAllProdutos)
    .get('/produtos/id/:id', ProdutosController.findOneProduto)
    .get('/produto/nome/', ProdutosController.findProdutoByName)
    .post('/produtos', ProdutosController.createProduto)
    .put('/produtos/id/:id', ProdutosController.updateProduto)
    .delete('/produtos/id/:id', ProdutosController.destroyProduto);

    module.exports = router;
