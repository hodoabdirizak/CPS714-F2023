const config = require('./dbConfigMaster');
const sql = require('mssql');

const getAccounts = async () => {
  try {
    let pool = await sql.connect(config);
    let result = pool.request().query('SELECT * FROM User_Account'); 
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const verifyEmail = async (Email) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT * FROM User_Account WHERE Email = '${Email}'`); 
    if (result.rowsAffected[0] == 1) {
      return "True";
    } else {
      return "False";
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// const getAccounts = async () => {
//   try {
//     await sql.connect(config)
//     const result = await sql.query('SELECT * FROM User_Account'); 
//     console.log(result);
//     return result;
//   } catch (err) {
//         console.error(err);
//         throw err;
//   }
// };

const addAccount = async (Account) => {
    try {
      await sql.connect(config);
      const result = await sql.query(`INSERT INTO User_Account VALUES
      ('${Account.Email}',
      '${Account.Full_name}', 
      ${Account.Phone_number},
      '${Account.Pronouns}',
      '${Account.Account_type}',
      '${Account.Pswd}',
      'No')`);
      return result.recordset;
    } catch (err) {
      throw err;
    }
};


const getUserId = async () => {
  try {
    await sql.connect(config);
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

const changePassword = async (Email,newPassword) => {
  try {
    await sql.connect(config);
    console.dir(`UPDATE User_Account SET Pswd = '${newPassword}' WHERE Email = '${Email}'`);
    await sql.query(`UPDATE User_Account SET Pswd = '${newPassword}' WHERE Email = '${Email}'`);
    return "True";
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addAccount,
  verifyEmail,
  addOrganizerAccount,
  addCatererAccount,
  getAccounts,
  getUserId,
  getAccountByName, 
  getUserIdByEmail,
  changePassword
}