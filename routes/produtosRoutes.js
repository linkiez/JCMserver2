const { Router } = require('express');
const ProdutosController = require('../controllers/ProdutosController');

const router = Router();
router
    .get('/produtos', ProdutosController.findAll)
    .get('/produtos/:id', ProdutosController.findOne)
    .post('/produtos', ProdutosController.create)
    .put('/produtos/:id', ProdutosController.update)
    .delete('/produtos/:id', ProdutosController.destroy);

    module.exports = router;
