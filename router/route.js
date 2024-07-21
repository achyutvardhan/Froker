const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Signup Route
router.post('/signup', userController.signup);

// Login Route
router.post('/login', userController.login);

// Get User Data Route
router.get('/user', authMiddleware, userController.getUserData);

// Borrow Money Route
router.post('/borrow', authMiddleware, userController.borrowMoney);

module.exports = router;
