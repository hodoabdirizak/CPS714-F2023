const config = require('./dbConfig');
const sql = require('mssql');

const createCaterer = async (caterer) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `INSERT INTO Caterer (Caterer_id, User_id, Cuisine, Price_per_attendee) VALUES (${caterer.Caterer_id}, ${caterer.User_id}, '${caterer.Cuisine}', ${caterer.Price_per_attendee})`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const getCaterersByCuisine = async (cuisine) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT Caterer_id, User_id, Price_per_attendee FROM Caterer WHERE Cuisine = '${cuisine}'`);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const updateCaterer = async (caterer) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `UPDATE Caterer SET Cuisine = '${caterer.Cuisine}', Price_per_attendee = ${caterer.Price_per_attendee} WHERE Caterer_id = ${caterer.Caterer_id} AND User_id = ${caterer.User_id}`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const getCaterersByVenue = async (venueID) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT Caterer_id, Cuisine FROM Caterer`);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createCaterer,
  getCaterersByCuisine,
  updateCaterer,
  getCaterersByVenue,
};
