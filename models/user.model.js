const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const User = db.define('user', {
  id: {
    //llaves primarias
    primaryKey: true,
    autoIncrement: true,
    allowNull: false, //permitir nulos o no
    type: DataTypes.INTEGER, //tipo de dato numero
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = User;
