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

// const createCaterer = async (caterer) => {
//   try {
//     await sql.connect(config);
//     const result = await sql.query(
//       `INSERT INTO Caterer (Caterer_id, User_id, Cuisine, Price_per_attendee) VALUES (${caterer.Caterer_id}, ${caterer.User_id}, '${caterer.Cuisine}', ${caterer.Price_per_attendee})`
//     );
//     return result.recordset;
//   } catch (err) {
//     throw err;
//   }
// };

// const getCaterersByCuisine = async (cuisine) => {
//   try {
//     await sql.connect(config);
//     const result = await sql.query(`SELECT Caterer_id, User_id, Price_per_attendee FROM Caterer WHERE Cuisine = '${cuisine}'`);
//     return result.recordset;
//   } catch (err) {
//     throw err;
//   }
// };

// const updateCaterer = async (caterer) => {
//   try {
//     await sql.connect(config);
//     const result = await sql.query(
//       `UPDATE Caterer SET Cuisine = '${caterer.Cuisine}', Price_per_attendee = ${caterer.Price_per_attendee} WHERE Caterer_id = ${caterer.Caterer_id} AND User_id = ${caterer.User_id}`
//     );
//     return result.recordset;
//   } catch (err) {
//     throw err;
//   }
// };


module.exports = {
  getCatererAccount,
  deleteAccountCaterer,
  updateCatererAccount
  // createCaterer,
  // getCaterersByCuisine,
  // updateCaterer,
};
