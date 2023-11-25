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

const getUserAccount = async (Email) => {
  try {
    await sql.connect(config)
    const result = await sql.query(`SELECT Full_name, Phone_number, Pronouns FROM User_Account WHERE Email = '${Email}'`); 
    const data = result.recordset[0];
    console.log(data);
    if (data) {
      return `${data['Full_name']}|${data['Phone_number']}|${data['Pronouns']}`;
    }
    return 'False';
  } catch (err) {
      console.error(err);
      throw err;
  }
};

const getAccountType = async (Email) => {
  try {
    await sql.connect(config)
    const result = await sql.query(`SELECT Account_type FROM User_Account WHERE Email = '${Email}'`); 
    const data = result.recordset[0]['Account_type'];
    return data;
  } catch (err) {
      console.error(err);
      throw err;
  }
}

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

const updateUserAccount = async (Account) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`UPDATE User_Account 
    SET Full_name = '${Account.Full_name}', Phone_number = ${Account.Phone_number}, Pronouns = '${Account.Pronouns}'
    WHERE Email = '${Account.Email}'`);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const changePassword = async (Email,newPassword) => {
  try {
    await sql.connect(config);
    await sql.query(`UPDATE User_Account SET Pswd = '${newPassword}' WHERE Email = '${Email}'`);
    return "True";
  } catch (err) {
    throw err;
  }
};

const addAccount = async (Account) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`INSERT INTO User_Account 
                                    (Email, Full_name, Phone_number, Pronouns, Account_type, Pswd, Account_verified) 
                                    VALUES
                                    ('${Account.Email}',
                                    '${Account.Full_name}', 
                                    ${Account.Phone_number},
                                    '${Account.Pronouns}',
                                    '${Account.Account_type}',
                                    '${Account.Pswd}',
                                    'No')`);
    console.log('yaaar',result.recordset[0]['number']);
    return result.recordset;
  } 
  catch (err) {
    const errorNumber = err.number || (err.info && err.info.number);
    return errorNumber;
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
        console.dir(UserId);
        await sql.query(`INSERT INTO Organizer (User_id) VALUES(${UserId})`);
        
    } catch (err) {
        const errorNumber = err.number || (err.info && err.info.number);
        return errorNumber;
    }
};

const addCatererAccount = async (UserId) => {
  try {
    await sql.connect(config);
    console.dir('dbOp');
    await sql.query(`INSERT INTO Caterer (User_id) VALUES(${UserId})`); 
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

const verifyLogin = async (email, pswd) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT User_id FROM User_Account WHERE Email = '${email}' AND Pswd = '${pswd}'`);    return result.rowsAffected[0];
  } catch (err) {
    console.log('Error in verifyLogin', err);
    throw err;
  }
};

const deleteAccountAttendee = async (Email) => {
  try {
  await sql.connect(config);
  const result = await sql.query(`DELETE FROM User_Account WHERE Email='${Email}'`);
  return result.rowsAffected[0];
} catch (err) {
    console.error(err);
  throw err;
}
};

const sendVerificationCode = async (email) => {
  try {
    // Generate a random verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the verification code in the database
    await sql.query(`UPDATE User_Account SET VerificationCode = '${verificationCode}' WHERE Email = '${email}'`);

    // Return the generated verification code
    return verificationCode;
  } catch (error) {
    console.error('Error in sending verification code:', error);
    throw error;
  }
};


module.exports = {
  addAccount,
  verifyEmail,
  changePassword, 
  addOrganizerAccount,
  addCatererAccount,
  getAccounts,
  getAccountType,
  getUserId,
  getUserAccount,
  getAccountByName, 
  getUserIdByEmail,
  noDupEmails,
  updateUserAccount,
  verifyLogin,
  deleteAccountAttendee,
  sendVerificationCode
}
