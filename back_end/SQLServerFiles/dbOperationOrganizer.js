const config = require('./dbConfig');
const sql = require('mssql');

const getOrganizers = async () => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Organizer');
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const createOrganizer = async (organizer) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `INSERT INTO Organizer (User_id, Organizer_name, Organizer_description, Organizer_website) VALUES (${organizer.User_id}, '${organizer.Organizer_name}', '${organizer.Organizer_description}', '${organizer.Organizer_website}')`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const updateOrganizer = async (organizerId, updatedOrganizer) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `UPDATE Organizer SET Organizer_name = '${updatedOrganizer.Organizer_name}', Organizer_description = '${updatedOrganizer.Organizer_description}', Organizer_website = '${updatedOrganizer.Organizer_website}' WHERE User_id = ${updatedOrganizer.User_id} AND Organizer_id = ${organizerId}`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getOrganizers,
  createOrganizer,
  updateOrganizer,
};
