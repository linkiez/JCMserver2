const { Router } = require('express');
const FornecedoresController = require('../controllers/FornecedoresController');

const router = Router();
router
    .get('/fornecedores', FornecedoresController.findAllFornecedor)
    .get('/fornecedores/id/:id', FornecedoresController.findOneFornecedor)
    .get('/fornecedores/nome', FornecedoresController.findFornecedorByName)
    .post('/fornecedores', FornecedoresController.createFornecedor)
    .put('/fornecedores/id/:id', FornecedoresController.updateFornecedor)
    .delete('/fornecedores/id/:id', FornecedoresController.destroyFornecedor);

    module.exports = router;
