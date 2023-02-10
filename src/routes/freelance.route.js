const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const freelance = require('../controllers/freelance.controller')
const { checkIdentity, checkEmail, checkfreelance, checkPassword, validation } = require('../middlewares/validator');
const verifyFreelance = require('../middlewares/verifyFreelance');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, verifyFreelance);
router.get('/profil', verifyToken, verifyFreelance, freelance.viewProfil);

router.post('/register', checkIdentity, checkEmail, checkPassword, checkfreelance, validation, auth.registerFreelance);
router.post("/login", checkEmail, checkPassword, validation, auth.loginFreelance);

router.put('/profil', checkPassword, validation, verifyToken, verifyFreelance, freelance.updateProfil);
router.put('/forgetMDP', freelance.forgetPassword);

module.exports = router;