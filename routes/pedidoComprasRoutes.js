const { Router } = require('express');
const PedidoComprasController = require('../controllers/PedidoComprasController');

const router = Router();
router
    .post('/pedidocompras/import', PedidoComprasController.importPedidoCompras)
    .post('/pedidocompras', PedidoComprasController.createPedidoCompras)
    .get('/pedidocompras', PedidoComprasController.findAllPedidoCompras)
    .get('/pedidocompras/id/:id', PedidoComprasController.findOnePedidoCompras)
    .delete('/pedidocompras/id/:id', PedidoComprasController.destroyPedidoCompras)
    .put('/pedidocompras/id/:id', PedidoComprasController.updatePedidoCompras)

    module.exports = router;
