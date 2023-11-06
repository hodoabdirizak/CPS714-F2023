const config = require('./dbConfig');
const sql = require('mssql');

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

const getAccountByName = async (Full_name) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT * FROM User_Account WHERE Full_name='${Full_name}'`); 
    console.log(result);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const addAccount = async (Account) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`INSERT INTO User_Account VALUES(${Account.User_id},'${Account.Email}','${Account.Full_name}', ${Account.Phone_number},'${Account.Pronouns}','${Account.Account_type}')`); 
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAccounts,
  getAccountByName,
  addAccount
}