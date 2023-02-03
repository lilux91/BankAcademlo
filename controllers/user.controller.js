const { response } = require('express');
const User = require('../models/user.model');

const findUsers = async (req, res) => {
  try {
    // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS TRUE
    const users = await User.findAll({
      where: {
        status: true,
      },
    });

    // 2. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'Users was found successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const findUser = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;

    // 2. BUSCAR AL USUARIO CON EL ID QUE VENIA DE LOS PARAMETROS, Y QUE EL STATUS SEA TRUE
    const user = await User.findOne({
      where: {
        status: true,
        id,
      },
    });

    // 3. SI NO EXISTE EL USUARIO ENVIAR UNA RESPUESTA DE ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // 4. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'User was found successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const createUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
  //1. OBTENER LA INFORMACION DE LA REQ.BODY
  const { name, password } = req.body;
  const status = true;
  const accountNumber = Math.floor(100000 + Math.random() * 900000);
  const amount = 1000;
  //2. CREAR EL USUARIO CON LA INFORMACION DE LA REQ.BODY
  const user = await User.create({
    name: name.toLowerCase(),
    accountNumber,
    password,
    amount,
    status,
  });
  //3. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user,
  });
};

const loginUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
  //1. recibir el password y el accountNumber  de la req.body
  const { accountNumber, password } = req.body;

  //2.buscar el usuario donde el status: true, accountNumber,password

  const user = await User.findOne({
    where: {
      status: 'true',
      accountNumber,
      password,
    },
  });

  //3.si no existe un usuario enviar un error

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  //4.enviar la respuesta al cliente

  res.status(200).json({
    status: 'success',
    message: 'Login success',
  });
};

const updateUser = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;
    // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
    const { name, accountNumber, amount } = req.body;

    // 3. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
    const user = await User.findOne({
      where: {
        status: true,
        id,
      },
    });
    //4. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // 5. REALIZAR LA ACTUALIZACIÓN DEL USUARIO, CAMPOS USERNAME, EMAIL
    await user.update({ name, accountNumber, amount });

    // 6. ENVIAR UNA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;
    // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
    const user = await User.findOne({
      where: {
        status: true,
        id,
      },
    });
    //3. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Disable a user account',
      });
    }
    // 4. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
    await user.update({ status: dissabled });
    // 5. ENVIAR UNA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
