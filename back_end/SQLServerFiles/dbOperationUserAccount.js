const config = require('./dbConfig');
const sql = require('mssql');


// Get all accounts
const getAccounts = async () => {
  try {
    await sql.connect(config)
    const result = await sql.query('SELECT * FROM User_Account'); 
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const addAccount = async (Account) => {
  try {
    await sql.connect(config)
    const result = await sql.query(`INSERT INTO User_Account VALUES(${Account.User_id},'${Account.Email}','${Account.Full_name}', ${Account.Phone_number},'${Account.Pronouns}','${Account.Account_type}')`); 
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAccounts,
  addAccount
}