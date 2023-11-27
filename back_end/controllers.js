const dbOperationUserAccount   = require('./SQLServerFiles/dbOperationUserAccount');

const userAccountController = {
    getAccounts: async(req,res) => {
        console.log('Called /api/account/getaccounts');
        const result = await dbOperationUserAccount.getAccounts();
        console.dir(result);
        res.send(result.recordset);
    },    
    getAccountByName: async(req,res) => {
        console.log('Called /api/account/getaccountbyname');
        const result = await dbOperationUserAccount.getAccountByName(req.body.name);
        console.dir(result);
        res.send(result.recordset);
    },
    createUserAccount: async(req,res) => {
        console.log('Called /api/account/addaccount');  
        await dbOperation.addAccount(req.body);  
        const result = await dbOperationUserAccount.getAccounts();
        console.dir(result);
        res.send(result.recordset);
    }
};


const organizerController = {

};


const eventController = {
<<<<<<< Updated upstream
=======
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
    getEventsWithVenues: async (req, res) => {
      try {
        console.log('Called /api/event/eventsWithVenues');
        const result = await dbOperationEvent.getEventsWithVenues(req.body); // Fetch events with venues
        console.dir(result);
        res.send(result.recordset);
      } catch (error) {
        console.error('Error fetching events with venues:', error);
        res.status(500).send('Internal Server Error');
      }
    },
    createEvent: async (req, res) => {
        console.log('Called /api/event/createEvent');
        console.dir(req.body);
        //create and return event
        await dbOperationEvent.createEvent(req.body);
        const result = await dbOperationEvent.getEventByName(req.body.Event_name);
>>>>>>> Stashed changes

};


const venueController = {

};


const catererController = {

};


module.exports = {
    userAccountController,
    organizerController,
    eventController,
    venueController,
    catererController
}