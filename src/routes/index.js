const express = require('express');
const router = express.Router();
const entrepriseRouter = require("./entreprise.route");
const freelanceRouter = require("./freelance.route");
const adminRouter = require("./admin.route")

router.use("/entreprise", entrepriseRouter);
router.use("/freelance", freelanceRouter);
router.use("/admin", adminRouter);

module.exports = router;