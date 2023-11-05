// Run `nodemon server.js` in terminal to run the server

const express       = require('express'),
      User_Account  = require('../back_end/SQLServerFiles/user_account'),
      dbOperation   = require('../back_end/SQLServerFiles/dbUserAccountOperation'),
      cors          = require('cors');

async function getAccounts() {
  try {
    const data = await dbOperation.getAccounts();
    console.dir(data); 
  } catch (err) {
    console.log(err);
  }
}
getAccounts();

// will be determined by input from front-end
let newAccount = new User_Account(10, 'burgermania@gmail.ca', 'Burger Mania', 6471001013, 'N/A', 'caterer');

async function addAccount() {
  try {
    const add_data = await dbOperation.addAccount(newAccount);
    const data = await dbOperation.getAccounts();
    console.dir(data); 
  } catch (err) {
    console.log(err);
  }
}
addAccount();

/*
// Define port
const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

// call for API
app.get('/api', function(req,res){
    console.log('Called');
    res.send({result: 'Message was sent'})
})

// call for server quit
app.get('/quit', function(req,res){
    console.log('Called quit');
    res.send({result: 'Bye'})
})

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
*/
