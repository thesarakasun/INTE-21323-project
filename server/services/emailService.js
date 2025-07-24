const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;
  
  const mailOptions = {
    from: `"Authentication Service" <${process.env.EMAIL_FROM}>`, 
    to: email,
    subject: 'Account Verification (Group 19)',
    html: `<p>Please verify your email by clicking on the following link:</p><a href="${verificationLink}">${verificationLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
  
  const mailOptions = {
    from: `"Auth Service" <${process.env.EMAIL_FROM}>`, // <-- UPDATED LINE
    to: email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset. Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };