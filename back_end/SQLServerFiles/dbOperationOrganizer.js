const config = require('./dbConfig');
const sql = require('mssql');

const getOrganizerAccount = async (email) => {
  try {
    await sql.connect(config)
    const result = await sql.query(`SELECT o.Organizer_Description, o.Organizer_Website
                                    FROM User_Account AS ua, Organizer AS o
                                    WHERE ua.Email = '${email}' AND o.User_id = ua.User_id;`); 
    const data = result.recordset[0];
    console.log(data);
    if (data) {
      return `${data['Organizer_Description']}|${data['Organizer_Website']}`;
    }
    return 'False';
  } catch (err) {
      console.error(err);
      throw err;
  }
};

const updateOrganizerAccount = async (Account) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`UPDATE User_Account 
                                    SET Full_name = '${Account.Full_name}', Phone_number = ${Account.Phone_number}
                                    WHERE Email = '${Account.Email}';
                                    UPDATE Organizer
                                    SET Organizer_Description = '${Account.Description}', Organizer_Website = '${Account.Website}'
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

const deleteAccountOrganizer = async (email) => {
  try {
  await sql.connect(config);
  const result = await sql.query(`DELETE FROM Organizer
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

module.exports = {
  getOrganizerAccount,
  updateOrganizerAccount,
  deleteAccountOrganizer
};
