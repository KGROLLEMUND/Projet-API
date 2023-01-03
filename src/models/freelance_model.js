const mongoose = require("mongoose");

const freelanceSchema = mongoose.Schema(
  {
    honoraire: {
        type: Number,
        required: true,
        default: 0,
    },
    anneeExperience: {
        type: Number,
        required: true,
        default: 0,
    },
    competences: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Competence",
    },
    metiers: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Metier",
    },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Freelance", freelanceSchema);
