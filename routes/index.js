const express = require('express');
var cors = require('cors')



const fornecedores = require('./fornecedoresRoutes');
const produtos = require('./produtosRoutes');
const pedidoCompras = require('./pedidoComprasRoutes');

var corsOptions = {
  origin: ['*'],
  optionsSuccessStatus: 200,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}


module.exports = app => {
  
  app.use(cors(corsOptions))
  app.use(
      express.json(),
      express.urlencoded({ extended: true }),
        //Rotas aqui
        fornecedores,
        produtos,
        pedidoCompras,
      )
    }
