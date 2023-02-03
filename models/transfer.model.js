const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Transfer = db.define('transfer', {
  id: {
    //llaves primarias
    primaryKey: true,
    autoIncrement: true,
    allowNull: false, //permitir nulos o no
    type: DataTypes.INTEGER, //tipo de dato numero
  },

  amount: {
    type: DataTypes.STRING,
    allowNull: false, //no quiero que sea nulo
  },

  senderUserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverUserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Transfer;
