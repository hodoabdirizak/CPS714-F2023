const dbOperationUserAccount = require('./SQLServerFiles/dbOperationUserAccount');
const dbOperationEvent = require('./SQLServerFiles/dbOperationEvent');
const dbOperationEventAttendees = require('./SQLServerFiles/dbOperationEventAttendees');

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
        // console.log('c',req.body['userId']);
        const result = await dbOperationUserAccount.addOrganizerAccount(req.body['userId']);  
        try {
            res.send(result.toString());
        } catch {
            res.send(''.toString());
        }
    },
    addCatererAccount: async(req,res) => {
        console.log('Called /api/account/addcatereraccount');
        // console.log('c',req.body['userId']);
        const result = await dbOperationUserAccount.addCatererAccount(req.body['userId']);  
        try {
            res.send(result.toString());
        } catch {
            res.send(''.toString());
        }
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
        res.send(result[0]['User_id'].toString());
    },
    // noDupEmails: async(req,res) => {
    //     console.log('Called /api/account/nodupemails');
    //     const result = await dbOperationUserAccount.noDupEmails(req.body.email);
    //     const emailExists = result.toString().length > 0;
    //     // console.dir(`Email exists: ${emailExists}`);
    //     res.send(emailExists.toString());
    // }
    
    verifyLogin: async (req, res) => {
        try {
          console.log('Called /api/account/verifylogin');
          console.log('input', req.body.email);
          const result = await dbOperationUserAccount.verifyLogin(req.body.email, req.body.password);
    
          if (result.length > 0) {
            console.log('Login successful for user:', result[0].User_id);
            res.send(result[0].User_id.toString());
          } else {
            console.log('Invalid credentials');
            res.status(401).send('Invalid credentials');
          }
        } catch (error) {
          console.error('Error in verifyLogin:', error);
          res.status(500).send('Internal Server Error');
        }
      }
};


const organizerController = {

};


const eventController = {
    getCapacity: async (req, res) => {
        console.log('Called /api/event/getCapacity');
        const result = await dbOperationEvent.getCapacity(req.body.id);
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
        const result = await dbOperationEventAttendee.getTicketsSold(req.body.id);
        console.dir(result);
        res.send(result.recordset);
    }
};

const venueController = {

};

const catererController = {

};


module.exports = {
    userAccountController,
    organizerController,
    eventController,
    eventAttendeeController,
    venueController,
    catererController
}
