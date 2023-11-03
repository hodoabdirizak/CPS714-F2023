// Initialize Express.js server
const express       = require('express'),
      dbOperation   = require('../back_end/SQLServerFiles/dbOperation'),
      cors          = require('cors');

async function main() {
  try {
    const data = await dbOperation();
    console.dir(data); 
  } catch (err) {
    console.log(err);
  }
}

main();


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


// Run `nodemon server.js` to run the server
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
*/

// dbOperation.getAccounts().then(res => {
//     console.log(res);
// })