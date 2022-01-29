const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = Router();

router
    .get('/usuarios', UsuarioController.findAllUsuarios)
    .get('/usuario/id/:id', UsuarioController.findOneUsuario)
    .post("/usuario", UsuarioController.createUsuario)
    .put('/usuario/id/:id', UsuarioController.updateUsuario)
    .delete('/usuario/id/:id', UsuarioController.destroyUsuario)

module.exports = router;
