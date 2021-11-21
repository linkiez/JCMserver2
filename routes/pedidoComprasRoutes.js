const { Router } = require('express');
const PedidoComprasController = require('../controllers/PedidoComprasController');

const router = Router();
router
    .post('/pedidocompras/import', PedidoComprasController.importPedidoCompras)

    module.exports = router;
