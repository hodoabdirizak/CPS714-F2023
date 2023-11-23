const config = require('./dbConfig');
const sql = require('mssql');

const createEventAttendee = async (eventAttendee) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `INSERT INTO Event_attendees (User_id, Event_id, Number_of_tickets) VALUES (${eventAttendee.User_id}, ${eventAttendee.Event_id}, ${eventAttendee.Number_of_tickets})`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const getEventAttendees = async (eventId) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT User_id, Number_of_tickets FROM Event_attendees WHERE Event_id = ${eventId}`);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const getAttendeeQuantity = async (eventId, userID) => {
    try {
        await sql.connect(config)
        const result = await sql.query('SELECT Number_of_tickets FROM Event_attendees where Event_ID = ' + eventId + " and User_id = " + userID);
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getTicketsSold = async (eventID) => {
    try {
        await sql.connect(config)
        const result = await sql.query('SELECT Count(Number_of_tickets) FROM Event_attendees where Event_ID = ' + eventID);
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const updateEventAttendee = async (userEventAssociation) => {
  try {
      await sql.connect(config);
    const existingRecord = await sql.query(
      `SELECT * FROM Event_attendees WHERE User_id = ${userEventAssociation.User_id} AND Event_id = ${userEventAssociation.Event_id}`
    );

    if (existingRecord.recordset.length === 0) {
      // If the association doesn't exist, you can create it as a new record.
      return createEventAttendee(userEventAssociation);
    } else {
      // Update the existing association with the new number of tickets.
      const result = await sql.query(
        `UPDATE Event_attendees SET Number_of_tickets = ${userEventAssociation.Number_of_tickets} WHERE User_id = ${userEventAssociation.User_id} AND Event_id = ${userEventAssociation.Event_id}`
      );
      return result.recordset;
    }
  } catch (err) {
    throw err;
  }
};

const getUserEvents = async (userId) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT Event_Id FROM Event_attendees where User_id = ' + userId);
        const parsedResult = JSON.parse(JSON.stringify(result.recordset));
        const eventIDs = []
        for (var i in parsedResult)
            eventIDs.push(parsedResult[i]["Event_Id"]);

        return eventIDs;

    } catch (err) {
        throw err;
    }
};

module.exports = {
  createEventAttendee,
  getEventAttendees,
    updateEventAttendee,
    getAttendeeQuantity,
    getTicketsSold,
    getUserEvents
};
