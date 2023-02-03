const { Router } = require('express');
const {
  findUsers,
  findUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', findUsers);

router.get('/:id/history', findUser);

router.post('/signup', createUser);

router.post('/login', loginUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = {
  usersRouter: router,
};
