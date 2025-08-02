const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  refreshToken,
  unlockAccount,
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-email/:token', verifyEmail);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);
router.post('/refresh-token', refreshToken);
router.get('/unlock/:token', unlockAccount); // New route for unlocking account

module.exports = router;