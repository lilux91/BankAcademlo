const express = require('express');
const { transferRouter } = require('../routes/transfer.routes');
const cors = require('cors');
const { usersRouter } = require('../routes/user.routes');
const { db } = require('../database/db');
const morgan = require('morgan');
//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    //defino un objeto
    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfers',
    };

    this.database();
    //Middelwares siempre encima de las rutas
    this.middlewares();

    this.routes();
  }
  //Me permite trabajar con json en el servidor
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      //console.log('HOLA ESTOY EN DESARROLLO');
      this.app.use(morgan('dev'));
    }

    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  //RUTAS
  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.transfers, transferRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  //METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running in port', this.port);
    });
  }
}

//2. Exportamos el servidor
module.exports = Server;
