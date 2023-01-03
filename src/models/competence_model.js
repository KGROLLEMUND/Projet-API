const mongoose = require("mongoose");

const competenceSchema = mongoose.Schema(
  {
    nom : {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  100,
        minLength: 2,
    }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Competence", competenceSchema);
