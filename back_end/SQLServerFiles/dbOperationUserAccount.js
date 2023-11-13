const { noDupEmails } = require('../../../../../../AppData/Local/Temp/TFSTemp/vctmp21760_37539.dbOperationUserAccount.7e3a5d06');
const config = require('./dbConfig');
const sql = require('mssql');

const getAccounts = async () => {
  try {
    await sql.connect(config)
    const result = await sql.query('SELECT * FROM User_Account'); 
    console.log(result);
    return result;
  } catch (err) {
        console.error(err);
        throw err;
  }
};

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

const getUserId = async () => {
  try {
    await sql.connect(config)
    const result = await sql.query('SELECT MAX(User_Id) FROM User_Account'); 
    const retValue = parseInt(result.recordset[0]['']) + 1
    return retValue;
  } catch (err) {
    throw err;
  }
};

const addOrganizerAccount = async (UserId) => {
    try {
        await sql.connect(config);
        console.dir('dbOp');
        await sql.query(`INSERT INTO Organizer (User_id) VALUES(${parseInt(UserId) + 1})`);
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

const getAccountByName = async (Full_name) => {
    try {
      console.log("Getting Account")
    await sql.connect(config);
    const result = await sql.query(`SELECT * FROM User_Account WHERE Full_name='${Full_name}'`); 
    console.log(result);
    return result.recordset;
  } catch (err) {
      console.error(err);
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
  getUserId,
  getAccountByName, 
  getUserIdByEmail
  //noDupEmails
}