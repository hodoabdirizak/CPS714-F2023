const dbOperationUserAccount = require('./SQLServerFiles/dbOperationUserAccount');
const dbOperationCaterer = require('./SQLServerFiles/dbOperationCaterer');
const dbOperationEvent = require('./SQLServerFiles/dbOperationEvent');
const dbOperationEventAttendees = require('./SQLServerFiles/dbOperationEventAttendees');
const dbOperationVenues = require('./SQLServerFiles/dbOperationVenues');
const dbOperationEventHosting = require('./SQLServerFiles/dbOperationEventHosting');
const dbOperationOrganizer = require('./SQLServerFiles/dbOperationOrganizer');
const dbOperationOrganizerEvents = require('./SQLServerFiles/dbOperationOrganizerEvents');
const dbOperationCaterers = require('./SQLServerFiles/dbOperationCaterer');
const nodemailerConfig = require('./nodeMailerConfig');

const userAccountController = {
  createUserAccount: async(req,res) => {
    console.log('Called /api/account/addaccount');
    const result = await dbOperationUserAccount.addAccount(req.body);  
    try {
        res.send(result.toString());
    } catch {
        res.send(''.toString());
    }
  },
  verifyEmail: async(req,res) => {
    console.log('Called /api/account/verifyemail');
    const result = await dbOperationUserAccount.verifyEmail(req.body.email);
    console.dir(result[0]);
    res.send(result);
  }, 
  changePassword: async(req,res) => {
    console.log('Called /api/account/changepassword');
    console.log(req.body['email']);
    const result = await dbOperationUserAccount.changePassword(req.body['email'],req.body['password']);  
    try {
        console.log(result.toString());
        res.send(result.toString());
    } catch {
        res.send(''.toString());
    }
  },
  addOrganizerAccount: async(req,res) => {
    console.log('Called /api/account/addorganizeraccount');
    const result = await dbOperationUserAccount.addOrganizerAccount(req.body.userId);  
    try {
        res.send(result.toString());
    } catch {
        res.send(''.toString());
    }
  },
  addCatererAccount: async(req,res) => {
    console.log('Called /api/account/addcatereraccount');
    const result = await dbOperationUserAccount.addCatererAccount(req.body.userId);  
    try {
        res.send(result.toString());
    } catch {
        res.send(''.toString());
    }
  },
  getUserAccount: async(req,res) => {
    console.log('Called /api/account/getuseraccount');
    const result = await dbOperationUserAccount.getUserAccount(req.body.email);
    console.dir(result);
    res.send(result);
  },    
  getAccountType: async(req,res) => {
    console.log('Called /api/account/getaccounttype');
    const result = await dbOperationUserAccount.getAccountType(req.body.email);
    console.dir(result);
    res.send(result);
  },  
  getAccounts: async(req,res) => {
    console.log('Called /api/account/getaccounts');
    const result = await dbOperationUserAccount.getAccounts();
    console.dir(result);
    res.send(result);
  },    
  getUserIdByEmail: async(req,res) => {
    console.log('Called /api/account/getuseridbyemail');
    console.log('input',req.body.email);
    const result = await dbOperationUserAccount.getUserIdByEmail(req.body.email);
    console.log('result',result[0]['User_id'].toString());
    res.send(`${result[0]['User_id']}`);
  },
  updateUserAccount: async(req,res) => {
    console.log('Called /api/account/updateuseraccount');
    const result = await dbOperationUserAccount.updateUserAccount(req.body);  
    try {
      res.send('True');
    } catch {
      res.send('False');
    }
  },
  verifyLogin: async (req, res) => {
    console.log('Called /api/account/verifylogin');
    const result = await dbOperationUserAccount.verifyLogin(req.body.email, req.body.password);
    if (result > 0) {
      res.send('True');
    } else {
      res.send('False');
    }
  },
  deleteAccountAttendee: async (req, res) => {
    console.log('Called /api/account/deleteaccountattendee');
    const result = await dbOperationUserAccount.deleteAccountAttendee(req.body.email);
    if (result > 0) {
      res.send('True');
    } else {
      res.send('False');
    }
  },
  isAccountVerified: async (req, res) => {
    console.log('Called /api/account/isaccountverified');
    const result = await dbOperationUserAccount.isAccountVerified(req.body.email);
    if (result == 'No') {
      console.log("Account hasn't been verified");
      res.send('False');
    } else {
      res.send('True');
    }
  },
  verifyAccount: async (req, res) => {
    console.log('Called /api/account/updateaccountverificationstatus');
    const result = await dbOperationUserAccount.verifyAccount(req.body.email);
    if (result > 0) {
      console.log("Account has been verified");
      res.send('True');
    } else {
      res.send('False');
    }
  }
}

const organizerController = {
  getOrganizerAccount: async(req,res) => {
    console.log('Called /api/organizer/getorganizeraccount');
    const result = await dbOperationOrganizer.getOrganizerAccount(req.body.email);
    console.dir(result);
    res.send(result);
  },
  deleteAccountOrganizer: async (req, res) => {
    try {
      console.log('Called /api/organizer/deleteaccountorganizer');
      const result = await dbOperationOrganizer.deleteAccountOrganizer(req.body.email);
      console.dir(result);
      if (result > 0) {
        res.send('True');
      } else {
        res.send('False');
      }   
    } catch (err) {
      console.log(err);
    }
  },
  updateOrganizerAccount: async(req,res) => {
    console.log('Called /api/organizer/updateuseraccount');
    const result = await dbOperationOrganizer.updateOrganizerAccount(req.body);  
    console.dir(result);
    if (result > 0) {
      res.send('True');
    } else {
      res.send('False');
    }  
  }
};


const eventController = {
    getEventByName: async (req, res) => {
        console.log('Called /api/event/getEventByName');
        const result = await dbOperationEvent.getEventByName(req.body.name);
        console.dir(result);
        res.send(result.recordset);
    },
    getEvents: async (req, res) => {
        console.log('Called /api/event/getEvents');
        const result = await dbOperationEvent.getEvents(req.body.name);
        console.dir(result);
        res.send(result.recordset);
    },
    createEvent: async (req, res) => {
        console.log('Called /api/event/createEvent');
        console.dir(req.body);
        //create and return event
        await dbOperationEvent.createEvent(req.body);
        const result = await dbOperationEvent.getEventByName(req.body.Event_name);

        //stop if event is virtual
        if(req.body.eventFormat == "Virtual"){
            console.log('1event'+ JSON.parse(JSON.stringify(result.recordset[0]))['Event_id']);
            await dbOperationOrganizerEvents.createOrganizerEvent(JSON.parse(JSON.stringify(result.recordset[0]))['Event_id'], req.body.OrganizerId);
        }else{
            console.log('hosting ' + JSON.parse(JSON.stringify(result.recordset[0]))['Event_id']);
            await dbOperationEventHosting.createEventHosting(JSON.parse(JSON.stringify(result.recordset[0]))['Event_id'], req.body.VenueId);
            console.log('2event'+ JSON.parse(JSON.stringify(result.recordset[0]))['Event_id']);
            await dbOperationOrganizerEvents.createOrganizerEvent(JSON.parse(JSON.stringify(result.recordset[0]))['Event_id'], req.body.OrganizerId);
        }
        console.dir(result);
        res.send(result.recordset);
    },
    getCapacity: async (req, res) => {
        console.log('Called /api/event/getCapacity');
        const result = await dbOperationEvent.getCapacity(req.body.id);
        console.dir(result);
        res.send(result.recordset);
    },
    getEventInfo: async (req, res) => {
        console.log('Called /api/event/getEventInfo');
        const result = await dbOperationEvent.getEventInfo(req.body.id);
        console.dir(result);
        res.send(result.recordset);
    },
};

const eventAttendeeController = {
  getAttendeeQuantity: async (req, res) => {
    console.log('Called /api/eventAttendee/getAttendeeQuantity');
    const result = await dbOperationEventAttendees.getAttendeeQuantity(req.body.eventID,req.body.userID);
    console.dir(result);
    res.send(result.recordset);
  },
  updateEventAttendee: async (req, res) => {
    console.log('Called /api/eventAttendee/updateEventAttendee');
    const result = await dbOperationEventAttendees.updateEventAttendee(req.body);
    console.dir("result: "+result);
    res.send(result);
  },
  getTicketsSold: async (req, res) => {
    console.log('Called /api/eventAttendee/getTicketsSold');
    const result = await dbOperationEventAttendees.getTicketsSold(req.body.id);
    console.dir(result);
    res.send(result.recordset);
  },
  getUserEvents: async (req, res) => {
    console.log('Called /api/eventAttendee/getUserEvents');
    const result = await dbOperationEventAttendees.getUserEvents(req.body.id);
    console.dir(result);
    res.send(result);
  },
};

const venueController = {
    getVenues: async (req, res) => {
        console.log('Called /api/venue/getVenues');
        const result = await dbOperationVenues.getVenues(req.body);
        console.dir(result);
        res.send(result);
    }
};


const catererController = {
    getCaterers: async(req,res) => {
        console.log('Called /api/caterer/getCaterers');
        const result = await dbOperationCaterers.getCaterers(req.body);
        console.dir(result);
        res.send(result);
    },

  getCatererAccount: async(req,res) => {
    console.log('Called /api/caterer/getcatereraccount');
    const result = await dbOperationCaterer.getCatererAccount(req.body.email);
    console.dir(result);
    res.send(result);
  },
  deleteAccountCaterer: async (req, res) => {
    try {
      console.log('Called /api/caterer/deleteaccountcaterer');
      const result = await dbOperationCaterer.deleteAccountCaterer(req.body.email);
      console.dir(result);
      if (result > 0) {
        res.send('True');
      } else {
        res.send('False');
      }   
    } catch (err) {
      console.log(err);
    }
  },
  updateCatererAccount: async(req,res) => {
    console.log('Called /api/caterer/updateuseraccount');
    const result = await dbOperationCaterer.updateCatererAccount(req.body);  
    console.dir(result);
    if (result > 0) {
      res.send('True');
    } else {
      res.send('False');
    }  
  }
};

const emailController = {
  sendVerificationCode: async (req, res) => {
    console.log('Called /api/email/sendverificationcode');
    const { email } = req.body;

    try {
      await nodemailerConfig.sendVerificationEmail(req.body.email);

      res.send('Verification code sent successfully.');
    } catch (error) {
      console.error('Error in sending verification code:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  verifyEmail: async (req, res) => {
    console.log('Called /api/email/verifyemail');
    try {
      const result = await nodemailerConfig.verifyEmail(req.body.email);
      console.dir(result);
      res.send('Email sent successfully.');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  verifyAccount: async (req, res) => {
    console.log('Called /api/loginverify');
    const email = req.query.email;
    console.log(`${email} was recieved from the URL. type: ${typeof email}`);
    res.send(email.toString());
  }
}

module.exports = {
    userAccountController,
    organizerController,
    eventController,
    eventAttendeeController,
    venueController,
    catererController,
    emailController
}
