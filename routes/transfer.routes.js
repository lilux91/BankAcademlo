const { Router } = require('express');
const { createTransfer } = require('../controllers/transfer.controller');

const router = Router();

router.post('/', createTransfer);

module.exports = {
  transferRouter: router,
};
