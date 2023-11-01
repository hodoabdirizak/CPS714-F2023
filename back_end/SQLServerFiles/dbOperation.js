const config = require('./dbConfig');
const sql = require('mssql');

var connection = new sql.Connection(config);
connection.connect();

var request = new sql.Request(connection);
var sqlquery = "SELECT * From User_Account";
request.query(sqlquery, function (err, recordset) {
    if (err)
        res.json(err);
    else
        res.json(recordset);
});

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

// module.exports = {
//     getAccounts
// }