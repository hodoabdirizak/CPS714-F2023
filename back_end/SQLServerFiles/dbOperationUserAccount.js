const config = require('./dbConfig');
const sql = require('mssql');

const addAccount = async (Account) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`INSERT INTO User_Account VALUES('${Account.Email}','${Account.Full_name}', ${Account.Phone_number},'${Account.Pronouns}','${Account.Account_type}','${Account.Pswd}')`); 
    return result.recordset;
  } catch (err) {
    const errorNumber = err.number || (err.info && err.info.number);
    return errorNumber;
  }
};

const addOrganizerAccount = async (UserId) => {
  try {
    await sql.connect(config);
    console.dir('dbOp');
    await sql.query(`INSERT INTO Organizer (User_id) VALUES(${parseInt(UserId)+1})`); 
  } catch (err) {
    const errorNumber = err.number || (err.info && err.info.number);
    throw err;
    return errorNumber;
  }
};

const addCatererAccount = async (UserId) => {
  try {
    await sql.connect(config);
    console.dir('dbOp');
    await sql.query(`INSERT INTO Caterer (User_id) VALUES(${parseInt(UserId)+1})`); 
  } catch (err) {
    const errorNumber = err.number || (err.info && err.info.number);
    return errorNumber;
  }
};

const getAccounts = async () => {
  try {
    await sql.connect(config)
    const result = await sql.query('SELECT * FROM User_Account'); 
    console.log(result);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const getUserIdByEmail = async (Email) => {
  try {
    await sql.connect(config);
    console.dir('email',Email);
    const result = await sql.query(`SELECT User_id FROM User_Account WHERE Email = '${Email}'`); 
    console.dir('dboperation',result);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

// const noDupEmails = async (Email) => {
//   try {
//     await sql.connect(config)
//     const result = await sql.query(`SELECT User_Id FROM User_Account WHERE Email='${Email}'`); 
//     const queryResults = result.recordset;
//     return queryResults;
//   } catch (err) {
//     throw err;
//   }
// };

module.exports = {
  addAccount,
  addOrganizerAccount,
  addCatererAccount,
  getAccounts,
  getUserIdByEmail
  // noDupEmails,
}