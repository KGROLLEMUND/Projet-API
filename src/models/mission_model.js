const mongoose = require("mongoose");

const missionSchema = mongoose.Schema(
  {
    datedebut: {
        type: Date,
        required: true,
    },
    datefin: {
        type: Date,
        required: true,
    },
    montanttotal: {
        type: Number,
        required: true,
        default: 0,
    },
    description : {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  500,
        minLength: 2,
    },
    titre : {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  100,
        minLength: 2,
    },
    metier : {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  100,
        minLength: 2,
    },
    competence : {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  200,
        minLength: 2,
    },
    status : {
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

module.exports = mongoose.model("Mission", missionSchema);
