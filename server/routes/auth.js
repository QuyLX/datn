const express = require('express');
const { register, login, logout, getMe, resetPassword } = require('../controllers/auth');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/resetpassword/:id', protect, authorize("admin", "moderator"), resetPassword);

module.exports = router;
