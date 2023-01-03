const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 50,
      minLength: 2,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 50,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      length: 50,
    },
    adresse : {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  100,
        minLength: 2,
    },
    ville : {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  100,
        minLength: 2,
    },
    codePostal : {
        type: String,
        required: true,
        lowercase: true,
        maxLength:  100,
        minLength: 2,
    },
    telephone : {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        maxLength:  100,
        minLength: 2,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    // wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    this.password = hashedPassword
    next();
  });
})

module.exports = mongoose.model("User", userSchema);
