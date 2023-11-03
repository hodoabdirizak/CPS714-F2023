const config = require('./dbConfig');
const sql = require('mssql');

const fetchTest = async () => {
  try {
    await sql.connect(config)
    const result = await sql.query('SELECT * FROM User_Account'); 
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = fetchTest;