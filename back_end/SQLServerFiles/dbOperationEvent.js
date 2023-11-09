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
        return result.recordset;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const createEvent = async (event) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`INSERT INTO Event_table (Event_id, Event_name, Event_type, Event_start_date, Event_end_date, Event_start_time, Event_end_time, Event_description, Capacity, Minimum_age, Approved, Ticket_cost) VALUES('${event.Event_id}', '${event.Event_name}', '${event.Event_type}', '${event.Event_start_date}', '${event.Event_end_date}', '${event.Event_start_time}', '${event.Event_description}', '${event.Capacity}', '${event.Minimum_age}', '${event.Approved}', '${event.Ticket_cost}')`);
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

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
};
