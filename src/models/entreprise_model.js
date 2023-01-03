const mongoose = require("mongoose");

const entrepriseSchema = mongoose.Schema(
  {
    nom: {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  100,
        minLength: 2,
    },
    statusSociete: {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  20,
        minLength: 1,
    },
    numeroSiret: {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  9,
        minLength: 1,
    },
    adresse: {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  100,
        minLength: 2,
    },
    ville: {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  100,
        minLength: 2,
    },
    codePostal: {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  10,
        minLength: 2,
    },  
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entreprise", entrepriseSchema);
