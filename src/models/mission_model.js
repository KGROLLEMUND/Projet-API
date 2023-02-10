const mongoose = require("mongoose");

const missionSchema = mongoose.Schema(
  {
    entrepriseCreateMission: {
        type: String,
        required: true,
    },
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Metier",
        required: true,
    },
    competence : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competence",
        required: true,
    },
    status : {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  100,
        minLength: 2,
    },
    statusCandidat: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Freelance",
        status: { type : String, enum: ["accepted", "refused", "pending"]}
    }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mission", missionSchema);
