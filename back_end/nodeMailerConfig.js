const nodemailer      = require('nodemailer');
const fs              = require('fs');
const cheerio         = require('cheerio');
const path = require('path');
const schedule = require('node-schedule');

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
const verifyEmail = async (recipientEmail) => {
  const filePath = path.join(__dirname, 'email_templates', 'verifyAccountEmailBody.html');
  const emailBody = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(emailBody);

  const linkElement = $('#link');
  if (linkElement.length > 0) {
    linkElement.replaceWith(`<a id="link" href="http://localhost:3000/loginverify?email=${recipientEmail}" class="verification-button">Verify Account</a>`);
  } else {
    console.error('Element with id "link" not found in the HTML content.');
  }
  const modifiedEmailBody = $.html();

  const mailOptions = {
    from: 'eventeasy714@gmail.com', 
    to: recipientEmail,
    subject: 'Verify Your Account to Get Started!',
    html: modifiedEmailBody,
  };

  console.log('Attempting to send to',mailOptions.to);
  await transporter.sendMail(mailOptions);
};

const remindEmail = async (recipientEmail, name, desc, startDate, startTime, endDate, endTime) => {
    const filePath = path.join(__dirname, 'email_templates', 'remindEmail.html');
    const emailBody = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(emailBody);

    const eventInfo = [name, desc, startDate, startTime, endDate, endTime];
    const text = ["Event Name", "Event Description", "Event Start Date", "Event Start Time", "Event End Date", "Event End Time"];
    const elementName = ["EventName", "EventDescription", "EventStartDate", "EventStartTime", "EventEndDate", "EventEndTime"];
    const linkElement = [$('#EventName'), $('#EventDescription'), $('#EventStartDate'), $('#EventStartTime'), $('#EventEndDate'), $('#EventEndTime')];
    for (var i = 0; i < linkElement.length; i++) {
        if (linkElement[i].length > 0) {
            linkElement[i].replaceWith(`<p id="${elementName[i]}">${text[i]}: ${eventInfo[i]}</p>`);
        } else {
            console.error('Element with id ' + text[i] + ' not found in the HTML content.');
            return ("Error while sending email");
        }
    }
    const modifiedEmailBody = $.html();

    const mailOptions = {
        from: 'eventeasy714@gmail.com',
        to: recipientEmail,
        subject: 'Event Reminder!',
        html: modifiedEmailBody,
    };

    const currDate = new Date();
    const compDate = new Date(startDate + " " + startTime);
    console.log("curr: " + currDate);
    console.log("compDate: " + compDate);
    var diff = compDate.getTime() - currDate.getTime();
    diff = diff / (1000 * 60 * 60 * 24);
    console.log("Days differ: "+diff);
    if (diff > 1) {
        console.log("scheduled a send");
        compDate.setDate(compDate.getDate() - 1);
        console.log('Attempting to send to', mailOptions.to);
        console.log("Sending it at " + compDate.toDateString() +" " + compDate.toTimeString());
        await schedule.scheduleJob(compDate, () => { transporter.sendMail(mailOptions) });
        return ("Email scheduled");
    }
    else {
        console.log('Attempting to send to', mailOptions.to);
        await transporter.sendMail(mailOptions);
        return ("Email sent successfully");
    }
};

module.exports = {
    sendVerificationEmail,
    verifyEmail,
    remindEmail
};