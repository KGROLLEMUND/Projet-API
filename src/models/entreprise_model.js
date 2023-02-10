const mongoose = require("mongoose");

const entrepriseSchema = mongoose.Schema(
  {
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50,
    },
    entrepriseName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
    },
    entrepriseStatus: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 4,
    },
    entrepriseSiret: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 9,
    },
    entrepriseAddress: {
        type: String,
        default: "la defense",
    },
    entrepriseCity: {
        type: String,
        default: "Courbevoie",
    },
    entreprisePostal: {
        type: Number,
        default: 92000,
    },
    entrepriseTel: {
        type: String,
        default: "0189654723",
    },
    accountType: {
        type: String,
        default: "entreprise",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
  {
    timestamps: true,
  }
);
entrepriseSchema.pre("save", function(next) {
    if(!this.isModified("password")){
      return next();
    }
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashedPassword;
    next();
  })

module.exports = mongoose.model("Entreprise", entrepriseSchema);
