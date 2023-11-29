const config = require('./dbConfig');
const sql = require('mssql');

const getCatererAccount = async (email) => {
  try {
    await sql.connect(config)
    const result = await sql.query(`SELECT c.Full_address, c.Cuisine, c.Price_per_attendee
                                    FROM User_Account AS ua, Caterer AS c
                                    WHERE ua.Email = '${email}' AND c.User_id = ua.User_id;`); 
    const data = result.recordset[0];
    console.log(data);
    if (data) {
      return `${data['Full_address']}|${data['Cuisine']}|${data['Price_per_attendee']}`;
    }
    return 'False';
  } catch (err) {
      console.error(err);
      throw err;
  }
};

const updateCatererAccount = async (Account) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`UPDATE User_Account 
                                    SET Full_name = '${Account.Full_name}', Phone_number = ${Account.Phone_number}
                                    WHERE Email = '${Account.Email}';
                                    UPDATE Caterer
                                    SET Full_address = '${Account.Full_address}', Cuisine = '${Account.Cuisine}', Price_per_attendee = ${Account.Price_per_attendee}
                                    WHERE User_id IN (
                                      SELECT User_Account.User_id
                                      FROM User_Account
                                      WHERE User_Account.Email = '${Account.Email}'
                                    );`);
    return result.rowsAffected[0];
  } catch (err) {
    throw err;
  }
};

const deleteAccountCaterer = async (email) => {
  try {
  await sql.connect(config);
  const result = await sql.query(`DELETE FROM caterer
                                  WHERE User_id IN (
                                    SELECT User_Account.User_id
                                    FROM User_Account
                                    WHERE User_Account.email = '${email}');
                                  DELETE FROM User_Account WHERE Email = '${email}';`);
  console.log(result);
  return result.rowsAffected[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getCaterers = async () => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT * FROM Caterer`);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  //createCaterer,
  //getCaterersByCuisine,
  //updateCaterer,
    getCaterers,
    deleteAccountCaterer,
    getCatererAccount,
    updateCatererAccount


};
