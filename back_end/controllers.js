const dbOperationUserAccount = require('./SQLServerFiles/dbOperationUserAccount');
const dbOperationEvent = require('./SQLServerFiles/dbOperationEvent');
const dbOperationEventAttendees = require('./SQLServerFiles/dbOperationEventAttendees');

const userAccountController = {
    getAccounts: async(req,res) => {
        console.log('Called /api/account/getaccounts');
        const result = await dbOperationUserAccount.getAccounts();
        console.dir(result);
        res.send(result.recordset);
    },    
    getUserId: async(req,res) => {
        console.log('Called /api/account/getuserid');
        const result = await dbOperationUserAccount.getUserId();
        // console.dir(`User ID is: ${result}`);
        res.send(result.toString());
    },
    noDupEmails: async(req,res) => {
        console.log('Called /api/account/nodupemails');
        const result = await dbOperationUserAccount.noDupEmails(req.body.email);
        const emailExists = result.toString().length > 0;
        // console.dir(`Email exists: ${emailExists}`);
        res.send(emailExists.toString());
    },
    getAccountByName: async(req,res) => {
        console.log('Called /api/account/getaccountbyname');
        const result = await dbOperationUserAccount.getAccountByName(req.body.name);
        console.dir(result);
        res.send(result.recordset);
    },
    createUserAccount: async(req,res) => {
        console.log('Called /api/account/addaccount');
        console.dir(req.body);
        // await dbOperation.addAccount(req.body);  
        // const result = await dbOperationUserAccount.getAccounts();
        // console.dir(result);
        // res.send(result.recordset);
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
    getTicketsOwned: async (req, res) => {
        console.log('Called /api/eventAttendee/getAttendeeQuantity');
        const result = await dbOperationEventAttendees.getAttendeeQuantity(req.body.eventID,req.body.userID);
        console.dir(result);
        res.send(result.recordset);
    },
    updateEventAttendee: async (req, res) => {
        console.log('Called /api/eventAttendee/updateEventAttendee');
        const result = await dbOperationEventAttendees.updateEventAttendee(req.body.eventID, req.body.userID, req.body.numOfTickets);
        console.dir(result);
        res.send(result.recordset);
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