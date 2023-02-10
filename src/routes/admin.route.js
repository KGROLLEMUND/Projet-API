const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const admin = require('../controllers/admin.controller')
const { checkEmail, checkPassword, validation } = require('../middlewares/validator');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.get("/", verifyToken, verifyAdmin);
router.get("/entreprises", verifyToken, verifyAdmin, admin.entreprise);
router.get("/entreprise/:id", verifyToken, verifyAdmin, admin.oneEntreprise);
router.get("/freelances", verifyToken, verifyAdmin, admin.freelance);
router.get("/freelance/:id", verifyToken, verifyAdmin, admin.oneFreelance);
router.get("/competences", verifyToken, verifyAdmin, admin.competences);
router.get("/competence/:id", verifyToken, verifyAdmin, admin.oneCompetences);
router.get("/metiers", verifyToken, verifyAdmin, admin.metiers);
router.get("/metier/:id", verifyToken, verifyAdmin, admin.oneMetiers);
router.get("/missions", verifyToken, verifyAdmin, admin.missions);
router.get("/mission/:id", verifyToken, verifyAdmin, admin.oneMission);
router.get('/profil', verifyToken, verifyAdmin, admin.profil);

router.post("/register", checkPassword, validation, auth.registerAdmin);
router.post("/login", checkEmail, checkPassword, validation, auth.loginAdmin);
router.post("/competence/create", verifyToken, verifyAdmin, admin.createCompetence);
router.post("/metier/create", verifyToken, verifyAdmin, admin.createMetier);

router.put("/entreprise/:id", verifyToken, verifyAdmin, admin.updateEntreprise);
router.put("/freelance/:id", verifyToken, verifyAdmin, admin.updateFreelance);
router.put("/competence/:id", verifyToken, verifyAdmin, admin.updateCompetence);
router.put("/metier/:id", verifyToken, verifyAdmin, admin.updateMetier);
router.put('/profil', checkPassword, validation, verifyToken, verifyAdmin, admin.updateProfil);
router.put('/forgetMDP', admin.forgetPassword);

router.delete("/entreprise/:id", verifyToken, verifyAdmin, admin.delEntreprise);
router.delete("/freelance/:id", verifyToken, verifyAdmin, admin.delFreelance);
router.delete("/competence/:id", verifyToken, verifyAdmin, admin.delCompetence);
router.delete("/metier/:id", verifyToken, verifyAdmin, admin.delMetier);

module.exports = router;
