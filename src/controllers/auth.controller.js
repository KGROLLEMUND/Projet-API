const User = require("../models/user_model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email
  });
  
  try {
    const newUserToSave = await newUser.save();
    return res.send(newUserToSave);
  }

  catch(err) {
    next(err)
  }

}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message:"user not found"
        })
      }
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        return res.status(401).send({
          message: "password not valid",
          auth: false
        })
      }
      let userToken = jwt.sign({
        id: user._id,
        isAdmin:user.isAdmin
        },process.env.JWT_SECRET
      )
      res.send({
        message: "User logged",
        auth: true,
        token:userToken
      })
    })
  .catch(err=>res.Status(400).send(err))
}
