const config = require('./dbConfig');
const sql = require('mssql');

const createEventHosting = async (eventId,venueId) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `INSERT INTO Event_hosting (Event_id, Venue_id) VALUES (${eventId}, ${venueId})`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const getEventsHostedByVenue = async (venueId) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT Event_id FROM Event_hosting WHERE Venue_id = ${venueId}`);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const updateEventHosting = async (eventHosting) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `UPDATE Event_hosting SET Venue_id = ${eventHosting.Venue_id} WHERE Event_id = ${eventHosting.Event_id}`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createEventHosting,
  getEventsHostedByVenue,
  updateEventHosting,
};
