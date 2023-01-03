const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { checkEmail, checkIdentity, checkPassword, validation } = require('../middlewares/validator');

router.post('/register', checkEmail, checkPassword, checkIdentity, validation, authController.register);
router.post('/login', checkEmail, checkPassword, validation, authController.login);

module.exports = router;