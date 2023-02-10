const { body, validationResult } = require('express-validator');

exports.checkEmail = [
  body('email').isEmail().withMessage("Email format not valid")
]

exports.checkIdentity = [
  body('firstName').isAlphanumeric().withMessage('FirstName format is not valide'),
  body('lastName').isAlphanumeric().withMessage('lastName format is not valide')
]

exports.checkPassword = [
  body('password')
    .notEmpty()
    .isLength({ min: 11, max: 30 })
    .matches(/^[A-Za-z0-9 .,'!&(§è!çà)]+$/)
]


exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors:errors.array()
    })
  }
  next();
}

exports.checkfreelance = [
  body("tauxjournalier").isAlphanumeric().withMessage("tauxjournalier format is not valid"),
  body("experience").isAlphanumeric().withMessage("experience format is not valid"),
]

exports.checkentreprise = [
  body("entrepriseName").isAscii().withMessage("name is not valid"),
  body("entrepriseSiret").isAlphanumeric().isLength({min: 9, max: 9}).withMessage("Siret format is not valid"),
  body("entrepriseStatus").custom((value) => {
    if (value != "SAS" && value != "SASU" && value != "SARL" && value != "EURL") {
      throw new Error("Company status format is not valid");
    }
    return true;
  }),
];