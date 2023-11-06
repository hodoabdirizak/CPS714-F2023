
To run the applications as a live-server: <br>
1. make sure your login username and password have been updated in `back-end/SQLServerFiles/dbConfig.js`
2. open bash terminal and `cd front-end/`
3. run `npm run dev` in terminal
4. when the app launches in your browser, add "/backend-testing" to the URL. 

API development 
1. `front-end/server.js` is where express.js is set up and where all the api routes are stored. each api route is associated with a specific api route and controller/function. each time u create a new api u gotta add its route and controller to this file. 
2. `back-end/controllers.js` is where all the controllers are. each controller is associated with a specific entity and contains calls async functions related to that entity (ex. getting all user accounts from the sql server). 
3. `front-end/src/pages/BackEndTesting.js` this page doesn't do anything - it's just a place to test APIs and a guide for integrating APIs with the other files in `front-end/src/pages`. we'll need to add similar apis and the async functions (ex. fetchAccounts()) to the other files and to `controllers.js`. note: the api path and http method for each async function MUST match the one in `server.js`!!

