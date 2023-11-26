const dbOperationUserAccount = require('./SQLServerFiles/dbOperationUserAccount');
const nodemailerConfig = require('nodeMailerConfig'); 

const emailSender = {
    sendVerificationCode: async (req,res) => {
        console.log('Called /api/email/sendverificationcode');
        const { email } = req.body;
    
        try {
          await nodemailerConfig.sendVerificationEmail(req.body.email);
    
          res.send('Verification code sent successfully.');
        } catch (error) {
          console.error('Error in sending verification code:', error);
          res.status(500).send('Internal Server Error');
        }
      }
};

