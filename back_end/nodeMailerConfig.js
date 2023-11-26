const nodemailer      = require('nodemailer');
const fs              = require('fs');
const cheerio         = require('cheerio');
const path            = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eventeasy714@gmail.com',
    pass: '', 
  },
});

// Forgot password
const sendVerificationEmail = async (recipientEmail) => {
  const mailOptions = {
    from: 'eventeasy714@gmail.com', 
    to: recipientEmail,
    subject: 'Verification Code',
    text: `Your verification code is: code`,
  };
  await transporter.sendMail(mailOptions);
};

// Sign up
const verifyEmail = async (recipientEmail, userId) => {
  const filePath = path.join(__dirname, 'email_templates', 'verifyAccountEmailBody.html');
  const emailBody = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(emailBody);

  const linkElement = $('#link');
  if (linkElement.length > 0) {
    linkElement.replaceWith(`<a id="link" href="http://localhost:3000/login?email=${recipientEmail}" class="verification-button">Verify Account</a>`);
  } else {
    console.error('Element with id "link" not found in the HTML content.');
  }
  const modifiedEmailBody = $.html();

  const mailOptions = {
    from: 'eventeasy714@gmail.com', 
    to: 'eventeasy714@gmail.com',
    subject: 'Verify Your Account to Get Started!',
    html: modifiedEmailBody,
  };

  console.log('Attempting to send to',mailOptions.to);
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  verifyEmail
};