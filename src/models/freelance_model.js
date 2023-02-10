const mongoose = require("mongoose");

const freelanceSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 2,
      maxLength: 30,
  },
  lastName: {
      type: String,
      required: true,
      lowercase: true,
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
  accountType: {
      type: String,
      default: "freelance",
  },
  address: {
      type: String,
      default: "6 rue de l'hotel de ville",
  },
  city: {
      type: String,
      default: "Evreux",
  },
  postal: {
      type: Number,
      default: 27000,
  },
  phone: {
      type: String,
      default: "0651727686",
  },
  experience: {
      type: Number,
      required: true,
      maxLength: 3,
  },
  tauxjournalier: {
      type: Number,
      required: true,
  },
  competence: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competence"
  },
  metiers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Metier"
  },
  mission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
      status: { type : String, enum: ["accepté", "refusé", "en attente"], default : 'en attente'}
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
freelanceSchema.pre("save", function(next) {
  if(!this.isModified("password")){
    return next();
  }
  const hashedPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashedPassword;
  next();
})

module.exports = mongoose.model("Freelance", freelanceSchema);
