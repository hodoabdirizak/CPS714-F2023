// Run `nodemon server.js` in terminal to run the server

const express       = require('express'),
      controllers   = require('../back_end/controllers'),
      cors          = require('cors');

// Define port
const API_PORT = process.env.PORT || 3000;
const app = express();
console.log(app);

let client, session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


// ROUTES
app.get("/")

// User_Account routes
app.post('/api/account/addaccount', controllers.userAccountController.createUserAccount);
app.post('/api/account/addorganizeraccount', controllers.userAccountController.addOrganizerAccount);
app.post('/api/account/addcatereraccount', controllers.userAccountController.addCatererAccount);
app.get('/api/account/getaccounts', controllers.userAccountController.getAccounts);
app.post('/api/account/getuseridbyemail', controllers.userAccountController.getUserIdByEmail);

// app.post('/api/account/nodupemails', controllers.userAccountController.noDupEmails);


// Organizer routes
// app.get('/api/organizer/', controllers.organizerController);
// app.post('/api/organizer/', controllers.organizerController);
// app.post('/api/organizer/', controllers.organizerController);


// Event routes
app.get('/api/event/getEvents', controllers.eventController.getEvents);
app.post('/api/event/getEventByName', controllers.eventController.getEventByName);
app.post('/api/event/createEvent', controllers.eventController.createEvent);
app.post('/api/event/getCapacity', controllers.eventController.getCapacity);

//Event Attendee routs
app.post('/api/eventAttendee/getAttendeeQuantity', controllers.eventAttendeeController.getAttendeeQuantity);
app.post('/api/eventAttendee/updateEventAttendee', controllers.eventAttendeeController.updateEventAttendee);
app.post('/api/eventAttendee/getTicketsSold', controllers.eventAttendeeController.getTicketsSold);


// Venue routes
app.get('/api/venue/getVenues', controllers.venueController.getVenues);
// app.post('/api/venue/', controllers.venueController);
// app.post('/api/venue/', controllers.venueController);


// Caterer routes
// app.get('/api/caterer/', controllers.catererController);
// app.post('/api/caterer/', controllers.catererController);
// app.post('/api/caterer/', controllers.catererController);


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));