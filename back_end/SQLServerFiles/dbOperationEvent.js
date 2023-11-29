const config = require('./dbConfig');
const sql = require('mssql');

const getEvents = async () => {
  try {
    await sql.connect(config);
    events_query = `
    SELECT DISTINCT
      e.Event_id AS id, e.Event_name AS title, CONCAT(e.Event_start_date, ' ', e.Event_end_date) AS date,
      CONCAT(e.Event_start_time, ' ', e.Event_end_time) AS time, ua.Full_name AS organizers, ua.Email AS org_email,
      e.Capacity AS capacity, e.Event_type AS event_type, STRING_AGG(ua2.Full_name, ', ') AS catering, 
      e.Event_description AS event_desc, v.Venue_name AS venue, v.Venue_address AS address, e.imageUrl AS imageUrl
    FROM Event_table AS e JOIN Organizer_events AS oe ON e.Event_id = oe.Event_id JOIN Organizer AS o ON oe.Organizer_id = o.Organizer_id
    JOIN User_Account AS ua ON o.User_id = ua.User_id JOIN Event_hosting AS eh ON e.Event_id = eh.Event_id 
    JOIN Venue AS v ON eh.Venue_id = v.Venue_id JOIN Venue_caterer AS vc ON v.Venue_id = vc.Venue_id 
    JOIN Caterer AS c ON vc.Caterer_id = c.Caterer_id JOIN User_Account AS ua2 ON c.User_id = ua2.User_id
    GROUP BY e.Event_id, e.Event_name, e.Event_start_date, e.Event_end_date, e.Event_start_time, e.Event_end_time,
      ua.Full_name, ua.Email, e.Capacity, e.Event_type, e.Event_description, v.Venue_name, v.Venue_address, e.imageUrl;`;
    const result = await sql.query(events_query);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const getMyEvents = async (userId) => {
  try {
    console.log('USER_ID',userId);
    await sql.connect(config);
    events_query = `
    SELECT DISTINCT
      e.Event_id AS id, e.Event_name AS title, CONCAT(e.Event_start_date, ' ', e.Event_end_date) AS date,
      CONCAT(e.Event_start_time, ' ', e.Event_end_time) AS time, ua.Full_name AS organizers, ua.Email AS org_email,
      e.Capacity AS capacity, e.Event_type AS event_type, STRING_AGG(ua2.Full_name, ', ') AS catering, 
      e.Event_description AS event_desc, v.Venue_name AS venue, v.Venue_address AS address, e.imageUrl AS imageUrl, ea.Number_of_tickets AS no_ticket 
    FROM Event_table AS e 
	JOIN Organizer_events AS oe ON e.Event_id = oe.Event_id 
	JOIN Organizer AS o ON oe.Organizer_id = o.Organizer_id
    JOIN User_Account AS ua ON o.User_id = ua.User_id 
	JOIN Event_hosting AS eh ON e.Event_id = eh.Event_id 
    JOIN Venue AS v ON eh.Venue_id = v.Venue_id 
	JOIN Venue_caterer AS vc ON v.Venue_id = vc.Venue_id 
    JOIN Caterer AS c ON vc.Caterer_id = c.Caterer_id 
	JOIN User_Account AS ua2 ON c.User_id = ua2.User_id 
	JOIN Event_attendees AS ea ON ea.User_id = ${userId}
	WHERE ea.Event_id = e.Event_id
    GROUP BY ea.User_id, e.Event_id, e.Event_name, e.Event_start_date, e.Event_end_date, e.Event_start_time, e.Event_end_time,
      ua.Full_name, ua.Email, e.Capacity, e.Event_type, e.Event_description, v.Venue_name, v.Venue_address, e.imageUrl, ea.Number_of_tickets;`;
    const result = await sql.query(events_query);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const getEventByName = async (Event_Name) => {
    try {
        console.log("Getting Event")
        await sql.connect(config);
        const result = await sql.query(`SELECT * FROM Event_Table WHERE Event_name='${Event_Name}'`);
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const createEvent = async (event) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`INSERT INTO Event_table (Event_name, Event_type, Event_start_date, Event_end_date, Event_start_time,Event_end_time, Event_description, Capacity, Minimum_age, Approved, Ticket_cost,Event_format) VALUES('${event.Event_name}', '${event.Event_type}', '${event.Event_start_date}', '${event.Event_end_date}', '${event.Event_start_time}', '${event.Event_end_time}', '${event.Event_description}', '${event.Capacity}', '${event.Minimum_age}', '${event.Approved}', '${event.Ticket_cost}', '${event.eventFormat}')`);
    console.log(result);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const updateEvent = async (Event_id, updatedEvent) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`UPDATE Event_table SET Event_name = '${updatedEvent.Event_name}',  Event_type = '${updatedEvent.Event_type}', Event_start_date = '${updatedEvent.Event_start_date}', Event_end_date = '${updatedEvent.Event_end_date}', Event_start_time = '${updatedEvent.Event_start_time}', Event_end_time = '${updatedEvent.Event_end_time}', Event_description = '${updatedEvent.Event_description}', Capacity = '${updatedEvent.Capacity}', Minimum_age = '${updatedEvent.Minimum_age}', Ticket_cost = '${updatedEvent.Ticket_cost}' WHERE Event_id = ${Event_id}`);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

const getCapacity = async (eventID) => {
    try {
        await sql.connect(config)
        const result = await sql.query('SELECT Capacity FROM Event_Table where Event_ID = ' + eventID);
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getEventInfo = async (eventID) => {
    try {
        await sql.connect(config)
        const result = await sql.query('SELECT Event_name, FORMAT(Event_start_date, \'yyyy/MM/dd\') AS \'Event_start_date\', FORMAT(Event_end_date, \'yyyy/MM/dd\')  AS \'Event_end_date\', FORMAT(Event_start_time, N\'hh\\:mm\')  AS \'Event_start_time\', FORMAT(Event_end_time, N\'hh\\:mm\')  AS \'Event_end_time\' FROM Event_Table where Event_ID = '+ eventID);
        //console.log(result);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    getEvents,
    getMyEvents,
    getCapacity,

    createEvent,
    updateEvent,
    getEventByName,

    getEventInfo
};
