const mongoose = require("mongoose");


const metierSchema = mongoose.Schema(
  {
    nom : {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        maxLength:  100,
        minLength: 2,
    }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Metier", metierSchema);
