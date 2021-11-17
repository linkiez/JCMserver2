const express = require('express');
var cors = require('cors')


const fornecedores = require('./fornecedoresRoutes');
const produtos = require('./produtosRoutes');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}


module.exports = app => {
  app.use(cors(corsOptions))
  app.use(
      express.json(),
      express.urlencoded({ extended: true }),
        //Rotas aqui
        fornecedores,
        produtos,

      )
    }
