const User = require("../models/user_model");
const verifyToken = require("../middlewares/verifyToken");

//find all
exports.getUser = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//find one by id
exports.getUserById = (req, res) => {
  User.findById(req.userToken.id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "User not found with id:" + req.params.id });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//update one by id
exports.userUpdate = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//delete one by id
exports.userDelete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// updateUserWishlist

exports.updateUserWishlist = (req, res) => {
  User.findById(req.userToken.id).then(user => {
    const { wishlist } = user;
    if (wishlist.includes(req.body.productId)) {
      return res.send({
        message:"product already in you wishlist"
      })
    }
    user.wishlist.push(req.body.productId);
    user.save().then(userUpdate => {
      User.findById(req.userToken.id).populate('wishlist')
        .then(user => res.send(user))
          .catch(err => res.status(404).send(err))
    })
  })
};
