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

const noDupEmails = async (Email) => {
  try {
    await sql.connect(config)
    const result = await sql.query(`SELECT User_Id FROM User_Account WHERE Email='${Email}'`); 
    const queryResults = result.recordset;
    return queryResults;
  } catch (err) {
    throw err;
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

const addAccount = async (Account) => {
  try {
    await sql.connect(config);
    console.dir(Account);
    const result = await sql.query(`INSERT INTO User_Account VALUES(${Account.User_id},'${Account.Email}','${Account.Full_name}', ${Account.Phone_number},'${Account.Pronouns}','${Account.Password}','${Account.Account_type}')`); 
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAccounts,
  getUserId,
  noDupEmails,
  getAccountByName, 
  addAccount
}