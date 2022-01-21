const { Router } = require('express');
const ListaGenericaController = require('../controllers/ListaGenericaController');

const router = Router();

router
    .get('/listaGenerica', ListaGenericaController.findAllListaGenerica)
    .get('/listaGenerica/id/:id', ListaGenericaController.findOneListaGenerica)
    .get('/listaGenerica/nome/:nome', ListaGenericaController.findListaGenericaByName)
    .post('/listaGenerica', ListaGenericaController.createListaGenerica)
    .put('/listaGenerica/id/:id', ListaGenericaController.updateListaGenerica)
    .delete('/listaGenerica/id/:id', ListaGenericaController.destroyListaGenerica)

module.exports = router;

