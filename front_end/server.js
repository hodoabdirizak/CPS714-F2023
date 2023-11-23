// Run `nodemon server.js` in terminal to run the server

const express       = require('express'),
      controllers   = require('../back_end/controllers'),
      cors          = require('cors');

// Define port
const API_PORT = process.env.PORT || 5000;
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
app.post('/api/account/getuseraccount', controllers.userAccountController.getUserAccount);
app.post('/api/account/updateuseraccount', controllers.userAccountController.updateUserAccount);
app.post('/api/account/addorganizeraccount', controllers.userAccountController.addOrganizerAccount);
app.post('/api/account/addcatereraccount', controllers.userAccountController.addCatererAccount);
app.get('/api/account/getaccounts', controllers.userAccountController.getAccounts);
app.post('/api/account/getuseridbyemail', controllers.userAccountController.getUserIdByEmail);
app.post('/api/account/verifyemail', controllers.userAccountController.verifyEmail);
app.post('/api/account/changepassword', controllers.userAccountController.changePassword);
app.post('/api/account/verifylogin', controllers.userAccountController.verifyLogin);
app.post('/api/account/getaccounttype', controllers.userAccountController.getAccountType);


// Organizer routes
// app.get('/api/organizer/', controllers.organizerController);
// app.post('/api/organizer/', controllers.organizerController);
// app.post('/api/organizer/', controllers.organizerController);


// Event routes
// app.get('/api/event/', controllers.eventController);
// app.post('/api/event/', controllers.eventController);
app.post('/api/event/getCapacity', controllers.eventController.getCapacity);

//Event Attendee routs
app.post('/api/eventAttendee/getAttendeeQuantity', controllers.eventAttendeeController.getAttendeeQuantity);
app.post('/api/eventAttendee/updateEventAttendee', controllers.eventAttendeeController.updateEventAttendee);
app.post('/api/eventAttendee/getTicketsSold', controllers.eventAttendeeController.getTicketsSold);
app.post('/api/eventAttendee/getUserEvents', controllers.eventAttendeeController.getUserEvents);


// Venue routes
app.get('/api/venue/getVenues', controllers.venueController.getVenues);
// app.post('/api/venue/', controllers.venueController);
// app.post('/api/venue/', controllers.venueController);


// Caterer routes
app.get('/api/caterer/getCaterers', controllers.catererController.getCaterers);
// app.post('/api/caterer/', controllers.catererController);
// app.post('/api/caterer/', controllers.catererController);


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
