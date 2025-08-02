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
    from: `"LearnSphere(Group 19)" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Account Verification',
    html: `<p>Please verify your email by clicking on the following link:</p><a href="${verificationLink}">${verificationLink}</a>`,
  };
  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
  const mailOptions = {
    from: `"LearnSphere(Group 19)" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset. Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  };
  await transporter.sendMail(mailOptions);
};

const sendAccountLockoutEmail = async (email, token) => {
  const unlockLink = `${process.env.CLIENT_URL}/unlock-account/${token}`;
  const mailOptions = {
    from: `"LearnSphere Security(Group 19)" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Your Account Has Been Locked',
    html: `<p>Your account has been locked due to multiple failed login attempts. Please click the link below to unlock your account:</p><a href="${unlockLink}">${unlockLink}</a>`,
  };
  await transporter.sendMail(mailOptions);
};

const sendAdminLockoutNotification = async (lockedUserEmail) => {
  const adminEmail = 'thesarak03@gmail.com'; // Admin's email
  const mailOptions = {
    from: `"LearnSphere Security Alert(Group 19)" <${process.env.EMAIL_FROM}>`,
    to: adminEmail,
    subject: `Security Alert: Account Locked - ${lockedUserEmail}`,
    html: `<p>The account associated with the email <strong>${lockedUserEmail}</strong> has been locked after 5 unsuccessful login attempts.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendAccountLockoutEmail,
  sendAdminLockoutNotification,
};