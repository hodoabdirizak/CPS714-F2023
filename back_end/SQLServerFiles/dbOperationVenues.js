const config = require('./dbConfig');
const sql = require('mssql');

const getVenues = async () => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Venue');
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const createVenue = async (venue) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `INSERT INTO Venue (Venue_id, Venue_name, Venue_type, Venue_address, Venue_format, Catering_options) VALUES (${venue.Venue_id}, '${venue.Venue_name}', '${venue.Venue_type}', '${venue.Venue_address}', '${venue.Venue_format}', '${venue.Catering_options}')`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const updateVenue = async (venueId, updatedVenue) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `UPDATE Venue SET Venue_name = '${updatedVenue.Venue_name}', Venue_type = '${updatedVenue.Venue_type}', Venue_address = '${updatedVenue.Venue_address}', Venue_format = '${updatedVenue.Venue_format}', Catering_options = '${updatedVenue.Catering_options}' WHERE Venue_id = ${venueId}`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getVenues,
  createVenue,
  updateVenue,
};
