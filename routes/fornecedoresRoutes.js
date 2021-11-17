const { Router } = require('express');
const FornecedoresController = require('../controllers/FornecedoresController');

const router = Router();
router
    .get('/fornecedores', FornecedoresController.findAll)
    .get('/fornecedores/:id', FornecedoresController.findOne)
    .post('/fornecedores', FornecedoresController.create)
    .put('/fornecedores/:id', FornecedoresController.update)
    .delete('/fornecedores/:id', FornecedoresController.destroy);

    module.exports = router;
