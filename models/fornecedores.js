'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fornecedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Fornecedores.init({
    nome: DataTypes.STRING,
    contato: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    endereco: DataTypes.STRING,
    municipio: DataTypes.STRING,
    estado: DataTypes.STRING,
    cep: DataTypes.STRING,
    ie_rg: DataTypes.STRING,
    cnpj_cpf: DataTypes.STRING,
    descricao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Fornecedores',
  });
  return Fornecedores;
};