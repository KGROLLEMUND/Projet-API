const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = mongoose.Schema(
  {
    AdminName: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 50,
      minLength: 2,
    },

    AdminEmail: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      length: 50,
    },
    AdminPassword: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      default: "Admin",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
AdminSchema.pre("save", function (next) {
  if (!this.isModified("AdminPassword")) {
    return next();
  }
  bcrypt.hash(this.AdminPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    this.AdminPassword = hashedPassword;
    next();
  });
});

module.exports = mongoose.model("Admin", AdminSchema);
