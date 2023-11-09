const config = require('./dbConfig');
const sql = require('mssql');

const createVenueCatererAssociation = async (venueCaterer) => {
  try {
    await sql.connect(config);
    const result = await sql.query(
      `INSERT INTO Venue_caterer (Venue_id, Caterer_id) VALUES (${venueCaterer.Venue_id}, ${venueCaterer.Caterer_id})`
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createVenueCatererAssociation,
};
