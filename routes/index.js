const express = require("express");

const fornecedores = require("./fornecedoresRoutes");
const produtos = require("./produtosRoutes");
const pedidoCompras = require("./pedidoComprasRoutes");
const listaGenerica = require("./listaGenericaRoutes");




module.exports = (app) => {
  app.use(
    express.json(),
    express.urlencoded({ extended: true }),
    //Rotas aqui
    fornecedores,
    produtos,
    pedidoCompras,
    listaGenerica,
  );
};
