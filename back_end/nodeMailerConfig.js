const nodemailer = require('nodemailer');

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webevent23@gmail.com',
    pass: 'event23$', // Replace with your Gmail password or an app-specific password
  },
});

// Function to send verification email
const sendVerificationEmail = async (recipientEmail, verificationCode) => {
  const mailOptions = {
    from: 'webevent23@gmail.com', 
    to: recipientEmail,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Log the success
    console.log(`Verification email sent to ${recipientEmail}`);
  } catch (error) {
    // Log any errors
    console.error('Error sending verification email:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
};
