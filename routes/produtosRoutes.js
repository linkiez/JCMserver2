const { Router } = require('express');
const ProdutosController = require('../controllers/ProdutosController');

const router = Router();
router
    .get('/produtos', ProdutosController.findAllProdutos)
    .get('/produtos/:id', ProdutosController.findOneProduto)
    .get('/produto/findByName/', ProdutosController.findProdutoByName)
    .post('/produtos', ProdutosController.createProduto)
    .put('/produtos/:id', ProdutosController.updateProduto)
    .delete('/produtos/:id', ProdutosController.destroyProduto);

    module.exports = router;
