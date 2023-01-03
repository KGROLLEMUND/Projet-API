const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/', verifyToken, userController.getUser);
router.get('/users',verifyToken, verifyAdmin, userController.getUserById);
router.put('/:id', userController.userUpdate);
router.delete('/:id', userController.userDelete);
router.put('/wishlist', verifyToken, userController.updateUserWishlist);

module.exports = router;
