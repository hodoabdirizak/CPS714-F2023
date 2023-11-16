const dbOperationUserAccount = require('./SQLServerFiles/dbOperationUserAccount');
const dbOperationEvent = require('./SQLServerFiles/dbOperationEvent');
const dbOperationEventAttendees = require('./SQLServerFiles/dbOperationEventAttendees');
const dbOperationVenues = require('./SQLServerFiles/dbOperationVenues');
const dbOperationEventHosting = require('./SQLServerFiles/dbOperationEventHosting');
const dbOperationOrganizerEvents = require('./SQLServerFiles/dbOperationOrganizerEvents');

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
    }
    // noDupEmails: async(req,res) => {
    //     console.log('Called /api/account/nodupemails');
    //     const result = await dbOperationUserAccount.noDupEmails(req.body.email);
    //     const emailExists = result.toString().length > 0;
    //     // console.dir(`Email exists: ${emailExists}`);
    //     res.send(emailExists.toString());
    // }
};


const organizerController = {

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
        await dbOperationEvent.createEvent(req.body);
        const result = await dbOperationEvent.getEvents();
        console.log('hosting');
        await dbOperationEventHosting.createEventHosting(result.Event_id, req.body.VenueId);
        //console.log('organizer');
        //await dbOperationOrganizerEvents.createOrganizerEvent(result.values.Event_id, req.OrganizerId);
        console.dir(result);
        res.send(result.recordset);
    },
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
    getVenues: async (req, res) => {
        console.log('Called /api/venue/getVenues');
        const result = await dbOperationVenues.getVenues(req.body);
        console.dir(result);
        res.send(result.recordset);
    }
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