const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendAccountLockoutEmail,
  sendAdminLockoutNotification,
} = require('../services/emailService');
const { registerSchema, loginSchema, emailSchema, passwordResetSchema } = require('../utils/validation');

const MAX_LOGIN_ATTEMPTS = 5;

// ... (generateToken and generateRefreshToken functions remain the same)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    // Check if the account is currently locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      res.status(403);
      throw new Error('Account is locked. Please check your email to unlock it.');
    }

    if (await user.matchPassword(password)) {
      // Password is correct, reset attempts and unlock
      user.loginAttempts = 0;
      user.lockUntil = null;
      user.unlockToken = null;
      await user.save();

      // Proceed with login
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        refreshToken: generateRefreshToken(user._id),
      });
    } else {
      // Password is incorrect, increment attempts
      user.loginAttempts += 1;

      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        // Lock the account
        user.lockUntil = Date.now() + 24 * 60 * 60 * 1000; // Lock for 24 hours (or until unlocked)
        const unlockToken = crypto.randomBytes(32).toString('hex');
        user.unlockToken = unlockToken;

        // Send notification emails
        await sendAccountLockoutEmail(user.email, unlockToken);
        await sendAdminLockoutNotification(user.email);
      }

      await user.save();
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

const unlockAccount = async (req, res, next) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ unlockToken: token });

        if (!user) {
            res.status(400);
            throw new Error('Invalid unlock token.');
        }

        // Unlock the account and reset attempts
        user.loginAttempts = 0;
        user.lockUntil = null;
        user.unlockToken = null;
        await user.save();

        res.status(200).json({ message: 'Account has been unlocked successfully. You can now log in.' });
    } catch (error) {
        next(error);
    }
};

// ... (registerUser, verifyEmail, and other functions remain the same)
const registerUser = async (req, res, next) => {
    try {
      const { error } = registerSchema.validate(req.body);
      if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
      }
  
      const { username, email, password, role } = req.body;
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        res.status(400);
        throw new Error('User already exists');
      }
  
      const emailVerificationToken = crypto.randomBytes(32).toString('hex');
      const user = await User.create({
        username,
        email,
        password,
        role, 
        emailVerificationToken,
      });
  
      if (user) {
        await sendVerificationEmail(user.email, emailVerificationToken);
        res.status(201).json({
          message: 'Registration successful. Please check your email to verify your account.',
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    } catch (error) {
      next(error);
    }
  };
  
  const verifyEmail = async (req, res, next) => {
      try {
          const { token } = req.params;
          const user = await User.findOne({ emailVerificationToken: token });
  
          if (!user) {
              res.status(400);
              throw new Error('Invalid verification token');
          }
  
          user.isVerified = true;
          user.emailVerificationToken = undefined;
          await user.save();
  
          res.status(200).json({ message: 'Email verified successfully.' });
      } catch (error) {
          next(error);
      }
  };
  
  const requestPasswordReset = async (req, res, next) => {
      try {
          const { error } = emailSchema.validate(req.body);
          if (error) {
              res.status(400);
              throw new Error(error.details[0].message);
          }
  
          const user = await User.findOne({ email: req.body.email });
          if (!user) {
              res.status(404);
              throw new Error('User with that email does not exist.');
          }
  
          const resetToken = crypto.randomBytes(32).toString('hex');
          user.passwordResetToken = resetToken;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour
          await user.save();
          await sendPasswordResetEmail(user.email, resetToken);
  
          res.status(200).json({ message: 'Password reset link sent to your email.' });
      } catch (error) {
          next(error);
      }
  };
  
  const resetPassword = async (req, res, next) => {
      try {
          const { token } = req.params;
          const user = await User.findOne({
              passwordResetToken: token,
              passwordResetExpires: { $gt: Date.now() },
          });
  
          if (!user) {
              res.status(400);
              throw new Error('Password reset token is invalid or has expired.');
          }
  
          const { error } = passwordResetSchema.validate(req.body);
          if (error) {
              res.status(400);
              throw new Error(error.details[0].message);
          }
          
          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          await user.save();
  
          res.status(200).json({ message: 'Password has been reset successfully.' });
      } catch (error) {
          next(error);
      }
  };
  
  const refreshToken = (req, res, next) => {
      const { token } = req.body;
      if (!token) {
          return res.status(401).json({ message: 'Refresh token is required' });
      }
      
      try {
          const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
          const accessToken = generateToken(decoded.id);
          res.json({ token: accessToken });
      } catch (error) {
          return res.status(403).json({ message: 'Invalid refresh token' });
      }
  };

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  refreshToken,
  unlockAccount,
};