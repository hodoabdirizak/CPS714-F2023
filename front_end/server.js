// Run `nodemon server.js` in terminal to run the server

const express       = require('express'),
      controllers   = require('../back_end/controllers'),
      cors          = require('cors');

// Define port
const API_PORT = process.env.PORT || 5000;
const app = express();

let client, session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


// ROUTES

// User_Account routes
app.get('/api/account/getaccounts', controllers.userAccountController.getAccounts);
app.post('/api/account/getaccountbyname', controllers.userAccountController.getAccountByName);
app.post('/api/account/addaccount', controllers.userAccountController.createUserAccount);


// Organizer routes
// app.get('/api/organizer/', controllers.organizerController);
// app.post('/api/organizer/', controllers.organizerController);
// app.post('/api/organizer/', controllers.organizerController);


// Event routes
<<<<<<< Updated upstream
// app.get('/api/event/', controllers.eventController);
// app.post('/api/event/', controllers.eventController);
// app.post('/api/event/', controllers.eventController);
=======
app.get('/api/event/getEvents', controllers.eventController.getEvents);
app.post('/api/event/createEvent', controllers.eventController.createEvent);
app.post('/api/event/getEventInfo', controllers.eventController.getEventInfo);
app.post('/api/event/getCapacity', controllers.eventController.getCapacity);
app.get('/api/event/getEventsWithVenues', controllers.eventController.getEventsWithVenues);

//Event Attendee routs
app.post('/api/eventAttendee/getAttendeeQuantity', controllers.eventAttendeeController.getAttendeeQuantity);
app.post('/api/eventAttendee/updateEventAttendee', controllers.eventAttendeeController.updateEventAttendee);
app.post('/api/eventAttendee/getTicketsSold', controllers.eventAttendeeController.getTicketsSold);
app.post('/api/eventAttendee/getUserEvents', controllers.eventAttendeeController.getUserEvents);
>>>>>>> Stashed changes


// Venue routes
// app.get('/api/venue/', controllers.venueController);
// app.post('/api/venue/', controllers.venueController);
// app.post('/api/venue/', controllers.venueController);


// Caterer routes
// app.get('/api/caterer/', controllers.catererController);
// app.post('/api/caterer/', controllers.catererController);
// app.post('/api/caterer/', controllers.catererController);


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));