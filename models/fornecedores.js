"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fornecedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fornecedores.hasMany(models.PedidoCompras);
    }
  }
  Fornecedores.init(
    {
      nome: DataTypes.STRING,
      contato: DataTypes.STRING,
      telefone: DataTypes.BIGINT,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "email inválido",
          },
        },
      },
      endereco: DataTypes.STRING,
      municipio: DataTypes.STRING,
      estado: DataTypes.STRING,
      cep: DataTypes.INTEGER,
      ie_rg: {
        type: DataTypes.BIGINT,
        unique: true
      },
      cnpj_cpf: {
        type: DataTypes.BIGINT,
        unique: true
      },
      descricao: DataTypes.TEXT,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Fornecedores",
      paranoid: true,
      timestamps: true,
      defaultScope: {
        where: { deletedAt: null },
      },
    }
  );
  return Fornecedores;
};
