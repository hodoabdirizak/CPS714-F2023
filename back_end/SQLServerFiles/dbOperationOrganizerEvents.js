const config = require('./dbConfig');
const sql = require('mssql');

const createOrganizerEvent = async (EventId,OrganizerId) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `INSERT INTO Organizer_events (Organizer_id, Event_id) VALUES (${OrganizerId}, ${EventId})`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const getOrganizerEvents = async (organizerId) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT Event_id FROM Organizer_events WHERE Organizer_id = ${organizerId}`);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createOrganizerEvent,
  getOrganizerEvents,
};
