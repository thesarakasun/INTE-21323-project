const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/emailService');
const { registerSchema, loginSchema, emailSchema, passwordResetSchema } = require('../utils/validation');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const registerUser = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const { username, email, password } = req.body;
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

const loginUser = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
        res.status(401);
        throw new Error('Account not verified. Please check your email.');
      }
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        refreshToken: generateRefreshToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
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

const getProtectedData = (req, res) => {
    res.json({
        message: `Hello ${req.user.username}! This is protected data. Your role is ${req.user.role}.`
    });
};

const getAdminData = (req, res) => {
    res.json({
        message: `Hello Admin ${req.user.username}! This is admin-only data.`
    });
};

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    requestPasswordReset,
    resetPassword,
    refreshToken,
    getProtectedData,
    getAdminData,
};