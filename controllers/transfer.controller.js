const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

const findTransfers = async (req, res) => {
  try {
    // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS TRUE
    const tranfers = await Transfer.findAll({
      where: {
        status: true,
      },
    });

    // 2. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'Pending',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const findTransfer = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;

    // 2. BUSCAR AL USUARIO CON EL ID QUE VENIA DE LOS PARAMETROS, Y QUE EL STATUS SEA TRUE
    const transfer = await Transfer.findOne({
      where: {
        status: true,
        id,
      },
    });

    // 3. SI NO EXISTE EL USUARIO ENVIAR UNA RESPUESTA DE ERROR
    if (!transfer) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // 4. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'Pending',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const createTransfer = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
  //recibir el amount, accountNumber, senderUserId = req.body

  const { amount, accountNumber, senderUserId } = req.body;

  //2.buscar el usuario userReceiver que va a recibir el monto userRec donde el status sea findone, donde el accountNumber: accountNumber

  const userReceiver = await User.findOne({
    //no esta definido
    where: {
      status: 'true',
      accountNumber,
    },
  });

  if (!userReceiver) {
    return res.status(404).json({
      status: 'error',
      message: 'receiver not found',
    });
  }
  //3.crear una constante que se llame receiverUserId=  userRx.Id

  const receiverUserId = userReceiver.id;

  //4.userMakeTransfer Buscar al usuario que va hacer la transferencia con el senderUserId
  const userMakeTransfer = await User.findOne({
    where: {
      status: 'true',
      id: senderUserId,
    },
  });
  if (!userMakeTransfer) {
    return res.status(404).json({
      status: 'error',
      message: 'sender not found',
    });
  }

  //5. verificar si el monto a transferir es mayor al monto que tiene el UserMakeTransfer enviar un error status 400

  if (amount > userMakeTransfer.amount) {
    return res.status(404).json({
      status: 'error',
      message: 'sender not fondo',
    });
  }

  //6. verificar si el id del usuario que recibe es igual al id del usuario que envia, enviar un error

  if (receiverUserId === userMakeTransfer.id) {
    return res.status(404).json({
      status: 'error',
      message: 'No pones transferir fondos a mi mismo ',
    });
  }

  //7.crear una const newAmountUserMakeTransfer
  //tendra el resultado de la resta entre el monto que tiene el usuario - el monto que se recibe de la req.body

  const newAmountUserMAkeTransfer = parseInt(userMakeTransfer.amount) - amount;

  //8. crear una constante que se llame newAmountUserReceiver
  //tendra el resultado de la suma entre el monto que tiene el usuario en la cuenta mas el monto que se recibe
  //de la req.body

  const newAmountUserReceiver = parseInt(userReceiver.amount) + amount;

  //9.actualizar la informacion del usuario que envia con su nuevo amount

  await userMakeTransfer.update({ amount: newAmountUserMAkeTransfer });

  //10. actualizar la info del usuario que recibe con su nuevo amount
  await userReceiver.update({ amount: newAmountUserReceiver });

  //11. guardar o crear la transferencia  en la base de dato

  await Transfer.create({ amount, senderUserId, receiverUserId });

  //12. enviar la resp al cliente que se hizo la transferencia exitosamente

  res.status(200).json({
    status: 'success',
    message: 'Successful transfer',
  });
};

const updateTransfer = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;
    // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
    const { name, accountNumber } = req.body;

    // 3. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
    const transfer = await Transfer.findOne({
      where: {
        status: true,
        id,
      },
    });
    //4. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // 5. REALIZAR LA ACTUALIZACIÓN DEL USUARIO, CAMPOS USERNAME, EMAIL
    await transfer.update({ name, accountNumber });

    // 6. ENVIAR UNA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'Completed',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const deleteTransfer = async (req, res) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;
    // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
    const transfer = await Transfer.findOne({
      where: {
        status: true,
        id,
      },
    });
    //3. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
    if (!transfer) {
      return res.status(404).json({
        status: 'error',
        message: 'Disable a user account',
      });
    }
    // 4. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
    await transfer.update({ status: cancelled });
    // 5. ENVIAR UNA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'Transfer deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  findTransfers,
  findTransfer,
  createTransfer,
  updateTransfer,
  deleteTransfer,
};
