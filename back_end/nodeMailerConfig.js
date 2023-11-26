const nodemailer = require('nodemailer');

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webevent23@gmail.com',
    pass: '', // Replace with your Gmail password or an app-specific password
  },
});

// Function to send verification email
const sendVerificationEmail = async (recipientEmail) => {
  const mailOptions = {
    from: 'webevent23@gmail.com', 
    to: recipientEmail,
    subject: 'Verification Code',
    text: `Your verification code is: code`,
  };

    await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
};
