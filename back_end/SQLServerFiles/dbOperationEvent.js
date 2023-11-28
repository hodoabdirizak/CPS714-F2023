const config = require('./dbConfig');
const sql = require('mssql');

const getEvents = async () => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Event_table');
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
    getCapacity,

    createEvent,
    updateEvent,
    getEventByName,

    getEventInfo
};
