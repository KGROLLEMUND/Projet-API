const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const entreprise = require('../controllers/entreprise.controller');
const { checkIdentity, checkEmail, checkentreprise, checkPassword, validation } = require('../middlewares/validator');
const verifyEntreprise = require('../middlewares/verifyEntreprise');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, verifyEntreprise);
router.get('/missions', verifyToken, verifyEntreprise, entreprise.mission);
router.get('/freelance', verifyToken, verifyEntreprise, entreprise.freelance);
router.get('/profil', verifyToken, verifyEntreprise, entreprise.viewProfil);

router.put('/forgetMDP', verifyToken, verifyEntreprise, entreprise.forgetPassword);
router.put('/missions/:id', verifyToken, verifyEntreprise, entreprise.updateMission);
router.put('/profil', checkPassword, validation, verifyToken, verifyEntreprise, entreprise.updateProfil);

router.post('/register', checkIdentity, checkEmail, checkPassword, checkentreprise, validation, auth.registerEntreprise);
router.post('/login', checkEmail, checkPassword, validation, auth.loginEntreprise);
router.post('/missions/create', verifyToken, verifyEntreprise, entreprise.createMission);


module.exports = router;