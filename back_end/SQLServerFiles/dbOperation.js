const config = require('./dbConfig');
const sql = require('mssql');


const fetchTest = async () => {
  try {
    await sql.connect(config)
    const result = await sql.query('SELECT * FROM User_Account'); 
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

/*
async () => {
  try {
    await sql.connect(config)
    const result = await sql.query('SELECT * FROM User_Account', 
                                  (err, result) => {
                                      console.dir(result)
                                  })
    console.log(result)
  } catch (err) {
    console.log(err);
  }
}
*/

// const getAccounts = async() => {
//     try {
//         let pool = new sql.ConnectionPool(config);
        
//         pool.connect().then(() => {
//             pool.request().query('SELECT * FROM User_Account', (err, result) => {
//                 console.dir(result)
//             })
//         })

//         let accounts = pool.request().query("SELECT * FROM User_Account");
//         console.log(accounts)
//         return accounts;
//     } catch(error) {
//         console.log(error);
//     }
// }

module.exports = fetchTest;